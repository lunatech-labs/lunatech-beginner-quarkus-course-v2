package com.lunatech.training.quarkus;

import io.quarkus.qute.Template;
import io.quarkus.qute.TemplateInstance;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/hello")
public class GreetingResource {

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String hello() {
        return "Hello, Quarkians!";
    }

    @Inject
    Template greet;

    @GET
    @Path("{subject}")
    @Produces(MediaType.TEXT_HTML)
    public TemplateInstance hello(@PathParam("subject") String subject) {
        return greet.data("subject", subject);
    }
}
