package com.lunatech.training.quarkus;

import io.smallrye.mutiny.Multi;
import org.eclipse.microprofile.reactive.messaging.Channel;
import org.jboss.resteasy.reactive.RestStreamElementType;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/prices")
public class PriceUpdatesResource {

    @Channel("price-updates-in")
    Multi<PriceUpdate> priceUpdates;

    @GET
    @Produces(MediaType.SERVER_SENT_EVENTS)
    @RestStreamElementType(MediaType.APPLICATION_JSON)
    public Multi<PriceUpdate> prices() {
        return priceUpdates;
    }

    @GET
    @Produces(MediaType.SERVER_SENT_EVENTS)
    @RestStreamElementType(MediaType.APPLICATION_JSON)
    @Path("{id}")
    public Multi<PriceUpdate> pricesForProduct(@PathParam("id") Long id) {
        return priceUpdates.filter(priceUpdate -> priceUpdate.productId.equals(id));
    }

}
