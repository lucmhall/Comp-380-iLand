package net.user1.union.example.roommodule;

import net.user1.union.api.Module;
import net.user1.union.core.context.ModuleContext;
import net.user1.union.core.event.RoomEvent;

/**
 * An example of preventing the behaviour of an event.
 */
public class PreventDefaultEventListener implements Module {
    private ModuleContext m_ctx;
    
    public boolean init(ModuleContext ctx) {
        m_ctx = ctx;
        
        // Listen for clients requesting to join a room.
        m_ctx.getRoom().addEventListener(RoomEvent.JOIN_ROOM_REQUESTED, this, "onJoinRoomRequest");
        return true;
    }

    public void onJoinRoomRequest(RoomEvent evt) {
        // randomly don't allow clients to join
        if (Math.random() < .2) {
            evt.preventDefault();
        }
    }
    
    public void shutdown() {
        // stop listening for the event
        m_ctx.getRoom().removeEventListener(RoomEvent.JOIN_ROOM_REQUESTED, this, "onJoinRoomRequest");
    }
}
