package com.lunatech.training.quarkus;

import io.quarkus.hibernate.reactive.panache.common.WithTransaction;
import io.smallrye.mutiny.Multi;
import io.smallrye.mutiny.Uni;
import io.vertx.mutiny.pgclient.PgPool;
import io.vertx.mutiny.sqlclient.Tuple;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("/products")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductsResource {

    @Inject
    PgPool client;

    @GET
    @WithTransaction
    public Uni<List<Product>> products(){
        return Product.listAll();
    }

    @GET
    @Path("{productId}")
    public Uni<Product> details(@PathParam("productId") Long productId) {
        return Product.<Product>findById(productId).map(p -> {
            if (p == null) {
                throw new NotFoundException();
            } else {
                return p;
            }
        });
    }

    @PUT
    @Path("{productId}")
    @WithTransaction
    public Uni<Product> update(@PathParam("productId") Long productId, @Valid Product product) {
        return Product.<Product>findById(productId).flatMap(p -> {
            if (p == null) {
                return Uni.createFrom().failure(new NotFoundException());
            } else {
                p.name = product.name;
                p.description = product.description;
                p.price = product.price;
                return p.persistAndFlush().map(__ -> p);
            }
        });
    }

    @GET
    @Path("search/{term}")
    public Multi<Product> search(@PathParam("term") String term) {
        return client
                .preparedQuery("SELECT id, name, description, price FROM product WHERE name ILIKE $1 OR description ILIKE $1")
                .execute(Tuple.of("%" + term + "%"))
                .toMulti().flatMap(Multi.createFrom()::iterable)
                .map(Product::from);
    }
}
