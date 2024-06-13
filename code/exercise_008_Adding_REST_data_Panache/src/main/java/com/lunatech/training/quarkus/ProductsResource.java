package com.lunatech.training.quarkus;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import java.util.List;

@Path("/products")
@Produces(MediaType.APPLICATION_JSON)
public class ProductsResource {

    @GET
    public List<Product> products() {
        return Product.listAll();
    }

    @GET
    @Path("{productId}")
    public Product details(@PathParam("productId") Long productId) {
        Product product = Product.findById(productId);
        if (product != null) {
            return product;
        } else {
            throw new NotFoundException("Product not found");
        }
    }
}
