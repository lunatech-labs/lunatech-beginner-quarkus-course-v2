package com.lunatech.training.quarkus;

import io.quarkus.qute.Template;
import io.quarkus.qute.TemplateInstance;
import io.smallrye.common.annotation.Blocking;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

@Path("/products")
public class ProductsResource {

    @Inject
    Template catalogue;

    @Inject
    Template details;

    @GET
    @Blocking
    public TemplateInstance products() {
        return catalogue.data("products", Product.listAll());
    }

    @GET
    @Path("{productId}")
    @Blocking
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
