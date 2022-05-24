package com.lunatech.training.quarkus;

import io.smallrye.common.annotation.Blocking;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/products")
@Produces(MediaType.APPLICATION_JSON)
public class ProductsResource {

    @GET
    @Blocking
    public List<Product> products() {
        return Product.listAll();
    }

    @GET
    @Path("{productId}")
    @Blocking
    public Product details(@PathParam("productId") Long productId) {
        Product product = Product.findById(productId);
        if (product != null) {
            return product;
        } else {
            throw new NotFoundException("Product not found");
        }
    }
}
