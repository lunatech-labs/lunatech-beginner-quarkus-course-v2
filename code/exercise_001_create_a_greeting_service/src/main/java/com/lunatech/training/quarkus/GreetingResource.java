package com.lunatech.training.quarkus;

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

    @Path("{subject}")
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String helloSubject(@PathParam("subject") String subject) {
        return "Hello " + subject;
    }
}
