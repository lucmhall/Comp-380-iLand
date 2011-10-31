package net.user1.union.example.roommodule;

import net.user1.union.api.Module;
import net.user1.union.core.context.ModuleContext;
import net.user1.union.core.event.RoomEvent;

/**
 * Joins a chat room (see Your First Union Application at www.unionplatform.com) and welcomes users, says goodbye, 
 * and occasionally adds to the conversation.
 */
public class ChatBotRoomModule implements Module, Runnable {
    private ModuleContext m_ctx;
    private Thread m_thrThis;
    
    // --- the random messages the module will add to the chat
    private String[] m_messages = {
            "We have them just where they want us.",
            "Random chance seems to have operated in our favor.",
            "Mr Spock, sometimes I think if I hear that word frequency once more I'll cry."
    };
    
    public boolean init(ModuleContext ctx) {
        // --- save the context.  the room in the context (getRoom()) is the room to which this room module 
        // --- is associated
        m_ctx = ctx;
        
        // --- register to receive notification when a client is added or removed to the room
        m_ctx.getRoom().addEventListener(RoomEvent.ADD_CLIENT, this, "onAddClient");
        m_ctx.getRoom().addEventListener(RoomEvent.REMOVE_CLIENT, this, "onRemoveClient");
        
        // --- start our thread
        m_thrThis = new Thread(this);
        m_thrThis.start();
        
        // --- everything is OK!
        return true;
    }

    /**
     * This method is the callback for the event we specified in the init method.  It will be called whenever a client
     * is added to the room.
     */
    public void onAddClient(RoomEvent evt) {
        m_ctx.getRoom().sendMessage("CHAT_MESSAGE", "Welcome User" + evt.getClient().getClientID() + ". We are USER1.");
    }
    
    /**
     * This method is the callback for the event we specified in the init method.  It will be called whenever a client
     * is removed from the room.
     */    
    public void onRemoveClient(RoomEvent evt) {
        m_ctx.getRoom().sendMessage("CHAT_MESSAGE", "I'll miss User" + evt.getClient().getClientID() + ".");
    }
    
    public void run() {
        while (m_thrThis != null) {
            // --- if there are clients in the room then say something random
            if (m_ctx.getRoom().getNumClients() > 0) {
                m_ctx.getRoom().sendMessage("CHAT_MESSAGE", m_messages[(int)(Math.random()*m_messages.length)]);
            }

            // --- sleep for 1-60 seconds before we say something else
            try {
                Thread.sleep((long)(Math.random()*60000+1000));
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
    
    public void shutdown() {
        // --- stop listening for the events we registered for in the init method
        m_ctx.getRoom().removeEventListener(RoomEvent.ADD_CLIENT, this, "onAddClient");
        m_ctx.getRoom().removeEventListener(RoomEvent.REMOVE_CLIENT, this, "onRemoveClient");
        
        m_thrThis = null;
    }
}
