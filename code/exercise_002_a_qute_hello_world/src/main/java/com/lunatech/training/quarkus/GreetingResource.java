package com.lunatech.training.quarkus;

import io.quarkus.qute.Template;
import io.quarkus.qute.TemplateInstance;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

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
