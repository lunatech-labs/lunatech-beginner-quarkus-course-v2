package com.lunatech.training.quarkus;

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

    @Path("{subject}")
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String helloSubject(@PathParam("subject") String subject) {
        return "Hello " + subject;
    }
}
