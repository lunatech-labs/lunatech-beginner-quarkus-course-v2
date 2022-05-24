package com.lunatech.training.quarkus;

import io.quarkus.test.common.http.TestHTTPEndpoint;
import io.quarkus.test.junit.QuarkusTest;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.junit.jupiter.api.Test;

import javax.inject.Inject;

import javax.ws.rs.core.MediaType;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.containsString;
import static org.hamcrest.CoreMatchers.is;

@QuarkusTest
@TestHTTPEndpoint(GreetingResource.class)
public class GreetingResourceTest {

    @Inject
    @ConfigProperty(name = "greeting")
    String greeting;

    @Test
    public void testHelloEndpoint() {
        given()
                .when()
                .get()
                .then()
                .statusCode(200)
                .contentType(MediaType.TEXT_PLAIN)
                .body(containsString(greeting));
    }

    @Test
    public void testHelloSubjectEndpoint() {
        given()
                .when()
                .get("/world")
                .then()
                .statusCode(200)
                .contentType(MediaType.TEXT_HTML)
                .body("html.body.h1", is("Hello world!"));
    }
}
