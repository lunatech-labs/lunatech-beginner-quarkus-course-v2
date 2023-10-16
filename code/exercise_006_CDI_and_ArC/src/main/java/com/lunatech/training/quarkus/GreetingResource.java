package com.lunatech.training.quarkus;

import io.quarkus.qute.Template;
import io.quarkus.qute.TemplateInstance;
import io.quarkus.runtime.StartupEvent;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import jakarta.enterprise.event.Observes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/hello")
public class GreetingResource {

    private final SubjectBean subjectBean;
    private final String greeting;
    private final Template greet;

    public GreetingResource(SubjectBean subjectBean, @ConfigProperty(name = "greeting") String greeting, Template greet) {
        this.subjectBean = subjectBean;
        this.greeting = greeting;
        this.greet = greet;
    }

    void startup(@Observes StartupEvent event) {
        System.out.println("GreetingResource Ready!");
    }

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String hello() {
        return greeting + ", " + subjectBean.subject();
    }

    @GET
    @Path("{subject}")
    @Produces(MediaType.TEXT_HTML)
    public TemplateInstance hello(@PathParam("subject") String subject) {
        return greet.data("subject", subject);
    }
}
