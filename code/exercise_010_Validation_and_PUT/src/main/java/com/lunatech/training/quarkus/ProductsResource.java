package com.lunatech.training.quarkus;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import java.util.List;

@Path("/products")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
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

    @PUT
    @Path("{productId}")
    @Transactional
    public Product update(@PathParam("productId") Long productId, @Valid Product product) {
        Product existing = Product.findById(productId);
        if (existing == null) {
            throw new NotFoundException();
        } else {
            existing.name = product.name;
            existing.description = product.description;
            existing.price = product.price;
            existing.persistAndFlush();
            return existing;
        }
    }
}
