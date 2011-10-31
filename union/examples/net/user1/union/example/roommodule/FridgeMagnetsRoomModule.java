package net.user1.union.example.roommodule;

import net.user1.union.api.Message;
import net.user1.union.api.Module;
import net.user1.union.core.attribute.Attribute;
import net.user1.union.core.context.ModuleContext;
import net.user1.union.core.event.RoomEvent;
import net.user1.union.core.exception.AttributeException;

/**
 * This is the RoomModule that controls the fridge magnets game. The fridge 
 * magnet Reactor (Flash) client requests that the module be attached when it 
 * sends the CREATE_ROOM (u24) UPC request. The server will create a new 
 * instance of this module for each fridge magnets room.
 */
public class FridgeMagnetsRoomModule implements Module, Runnable {
    // --- the module context
    // --- use this to get access to the server and the room this module
    // --- is attached to
    private ModuleContext m_ctx;
    // --- the thread for the fridge magnet app
    private Thread m_thread;
    // --- letter pool
    String[] m_letterPool = new String[] {"A","B","C","D","E","F","G","H","I",
           "J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"};
  
    /**
     * The init method is called when the instance is created.
     */
    public boolean init(ModuleContext ctx) {
        m_ctx = ctx;
      
        // --- initialize our letter attributes
        resetLetters();
        
        // --- create the app thread and start it
        m_thread = new Thread(this);
        m_thread.start();
      
        // --- register to receive room module messages
        // --- the onModuleMessage method will be called whenever a 
        // --- room module message (u70) is sent to the room
        m_ctx.getRoom().addEventListener(RoomEvent.MODULE_MESSAGE, this, 
                "onModuleMessage");
      
        // --- the module initialized fine
        return true;
    }

    /**
     * The main game loop. Reset the letters every 30 seconds.
     */
    public void run() {
        // --- while the room module is running
        while (m_thread != null) {
            // --- reset the letters
            resetLetters();
           
            // --- pause to let clients move the letters around for a bit 
            // --- before resetting them
            try {
                Thread.sleep(30000L);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }      
    }

    /**
     * Reset the letters to their original position.
     */
    private void resetLetters() {
        // --- reset the position of the letters
        for (int i=0;i<m_letterPool.length;i++) {
            // --- set a room scoped attribute for the letter
            try {
                m_ctx.getRoom().setAttribute("magnet"+i, 
                        m_letterPool[i]+","+(140+(i%13)*25)+","+((i/13+1)*25), 
                        Attribute.SCOPE_GLOBAL, Attribute.FLAG_SHARED | 
                        Attribute.FLAG_SERVER_ONLY);
            } catch (AttributeException e) {
                e.printStackTrace();
            }
        }
    }
    
    /**
     * Called when the room receives a room module message.
     * 
     * @param evt The RoomEvent contianing information about the event.
     */
    public void onModuleMessage(RoomEvent evt) {
        Message msg = evt.getMessage();
        // --- if a move letter message then place the letter
        if ("MOVE".equals(msg.getMessageName())) {
            // --- get letter index and set the attribute
            try {
                int magnet = Integer.parseInt(msg.getArg("MAGNET").substring(6));
                int x = Integer.parseInt(msg.getArg("X"));
                int y = Integer.parseInt(msg.getArg("Y"));
                if ((x >= 0 && x <= 600) && (y >= 0 && y <= 400)) {                
                    m_ctx.getRoom().setAttribute(msg.getArg("MAGNET"),
                            m_letterPool[magnet]+","+msg.getArg("X")+","+
                            msg.getArg("Y"), Attribute.SCOPE_GLOBAL, 
                            Attribute.FLAG_SHARED | Attribute.FLAG_SERVER_ONLY);
                }
            } catch (NumberFormatException e) {
                e.printStackTrace();
            } catch (AttributeException e) {
                e.printStackTrace();
            }
        }
    }
  
    /**
     * The shutdown method is called when the server removes the room which
     * also removes the room module.
     */
    public void shutdown() {
        // --- deregister for module messages
        m_ctx.getRoom().removeEventListener(RoomEvent.MODULE_MESSAGE, this, 
                "onModuleMessage");
      
        m_thread = null;
    }
}