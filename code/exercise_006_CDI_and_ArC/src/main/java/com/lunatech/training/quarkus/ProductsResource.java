package com.lunatech.training.quarkus;

import io.quarkus.qute.Template;
import io.quarkus.qute.TemplateInstance;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;

@Path("/products")
public class ProductsResource {

    @Inject
    Template catalogue;

    @Inject
    Template details;

    @GET
    public TemplateInstance products() {
        return catalogue.data("products", Product.listAll());
    }

    @GET
    @Path("{productId}")
    public TemplateInstance details(@PathParam("productId") Long productId) {
        Product product = Product.findById(productId);
        if(product != null) {
            return details.data("product", product);
        } else {
            // Let RESTEasy handle it for us. Of course, alternatively we could also render a custom 404 page.
            throw new NotFoundException("Product not found!");
        }
    }

}
