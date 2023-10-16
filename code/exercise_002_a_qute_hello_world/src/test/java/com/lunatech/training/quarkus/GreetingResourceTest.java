package com.lunatech.training.quarkus;

import io.quarkus.test.common.http.TestHTTPEndpoint;
import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;

import jakarta.ws.rs.core.MediaType;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;

@QuarkusTest
@TestHTTPEndpoint(GreetingResource.class)
public class GreetingResourceTest {

    @Test
    public void testHelloEndpoint() {
        given()
                .when()
                .get()
                .then()
                .statusCode(200)
                .contentType(MediaType.TEXT_PLAIN)
                .body(is("Hello, Quarkians!"));
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
