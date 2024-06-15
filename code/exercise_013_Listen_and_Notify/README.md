## Exercise 13: Listen & Notify

In this exercise, we will play a bit with Postgres’ `LISTEN / NOTIFY` feature, to get a better grip on reactive streams, and we will also use Server Sent Events.

The `LISTEN / NOTIFY` feature of Postgres allows you to setup a connection to Postgres, and listen for evens that pass by on a channel, as well as notifying such channels. With the reactive sql clients, we can connect to these channels as a `Multi` in Quarkus.

* Create the class `ListenNotifyResource` from the following template:

```java
import io.smallrye.mutiny.Multi;
import io.smallrye.mutiny.Uni;
import io.vertx.core.json.JsonObject;
import io.vertx.mutiny.pgclient.PgConnection;
import io.vertx.mutiny.pgclient.PgPool;
import io.vertx.pgclient.PgNotification;
import org.jboss.resteasy.reactive.RestStreamElementType;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

@Path("/channel")
public class ListenNotifyResource {

    @Inject
    PgPool client;

    @Path("{channel}")
    @GET
    @Produces(MediaType.SERVER_SENT_EVENTS)
    @RestStreamElementType(MediaType.APPLICATION_JSON)
    public Multi<JsonObject> listen(@PathParam("channel") String channel) {
        return client
                .getConnection()
                .map(PgConnection::cast)
                .toMulti()
                .flatMap(connection ->
                    connection.query("LISTEN " + channel)
                        .execute()
                        .toMulti()
                        .flatMap(__ -> streamNotifications(connection))
                )
                .map(PgNotification::toJson);
    }

    @Path("{channel}")
    @POST
    @Produces(MediaType.TEXT_PLAIN)
    @Consumes(MediaType.WILDCARD)
    public Uni<String> notify(@PathParam("channel") String channel, String stuff) {
        return client.preparedQuery("NOTIFY " + channel +  ", $$" + stuff + "$$")
                .execute()
                .map(rs -> "Posted to " + channel + " channel");
    }

    // Use PgConnection::notificationHandler to register a handler that emits PgNotification values on a Multi stream
    private Multi<PgNotification> streamNotifications(PgConnection connection) {
        // To be implemented
    }
}
```

* Connect to the channel `milkshakes` using the following cURL command.

      curl localhost:8080/channel/milkshakes

  Note that it’s expected to ‘hang’; because it’s connecting to a chunked HTTP endpoint and waiting for chunks. 
  
* In a different terminal window, run

		curl -X POST --data "strawberry" localhost:8080/channel/milkshakes 

	(Or use other flavours of milkshake if you don’t like strawberry). You can run it multiple times.
* You should see the chunks with the Postgres notifications in JSON format flow by in the first terminal window.
* Inspect the code. Can you describe what happens?
