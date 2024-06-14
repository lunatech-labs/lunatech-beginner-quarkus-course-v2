package com.lunatech.training.quarkus;

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
        return Multi.createFrom()
            .emitter(multiEmitter -> connection.notificationHandler(multiEmitter::emit));
    }
}
