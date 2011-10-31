package net.user1.union.example.roommodule;

import net.user1.union.api.Module;
import net.user1.union.core.context.ModuleContext;
import net.user1.union.core.event.RoomEvent;

/**
 * A simple example of a RoomModule listening to a RoomEvent.
 */
public class SimpleEventListener implements Module {
    private ModuleContext m_ctx;
    
    public boolean init(ModuleContext ctx) {
        m_ctx = ctx;
        
        // Listen for clients joining the room to which this module is attached.
        // When the event happens call the method onAddClient below.
        m_ctx.getRoom().addEventListener(RoomEvent.ADD_CLIENT, this, "onAddClient");
        return true;
    }

    public void onAddClient(RoomEvent evt) {
        // this method is called when a client joins the room
    }
    
    public void shutdown() {
        // stop listening for the event
        m_ctx.getRoom().removeEventListener(RoomEvent.ADD_CLIENT, this, "onAddClient");
    }
}
