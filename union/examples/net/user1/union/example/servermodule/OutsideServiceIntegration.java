package net.user1.union.example.servermodule;

import java.util.HashMap;
import java.util.Map;

import net.user1.union.api.Client;
import net.user1.union.api.Message;
import net.user1.union.api.Module;
import net.user1.union.core.attribute.Attribute;
import net.user1.union.core.context.ModuleContext;
import net.user1.union.core.exception.AttributeException;

public class OutsideServiceIntegration implements Module {

    public boolean init(ModuleContext ctx) {
        return true;
    }

    public void LOGIN_OUTSIDE_SERVICE(Message message, Client client) {
        // --- get the token from the message
        String token = message.getArg("token");
        
        // --- determine if the token is valid
        boolean authenticated = authenticateWithServer(token);       
        if (authenticated) {
            // --- get any custom fields for this token
            Map<String, String> customFields = loadCustomFields(token);
            
            // --- load them as attributes so they can be used in the Union app
            for (String key : customFields.keySet()) {
                String value = customFields.get(key);
                try {
                    client.setAttribute(key, value, Attribute.SCOPE_GLOBAL, Attribute.FLAG_NONE);
                } catch (AttributeException e) {
                    e.printStackTrace();
                }
            }
            
            // --- tell the client they have completed login
            client.sendMessage("LOGGED_IN", token);
        } else {
            // --- tell the client there was an error
            // --- (the client would have to implement a handler for this message)
            client.sendMessage("INVALID_LOGIN", token);
        }
    }
    
    private boolean authenticateWithServer(String token) {
        // Code here would contact the outside service using the token
        // and determine if the client is legitimate. If the outside service
        // takes a userID and password then the client would instead
        // have passed these arguments to this method.
        
        return true;
    }
    
    private Map<String, String> loadCustomFields(String token) {
        // Code here would contact the outside service and load any custom
        // fields for the given token. For example, it might return the 
        // favorite color of a Facebook user.
        
        return new HashMap<String, String>();
    }
    
    public void shutdown() {
    }
}
