package com.lunatech.training.quarkus;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;

@QuarkusTest
public class GreetingResourceTest {

    @Test
    public void testHelloEndpoint() {
        given()
                .when()
                .get("/hello")
                .then()
                .statusCode(200)
                .body(is("Hello, Quarkians!"));
    }

    @Test
    public void testHelloSubjectEndpoint() {
        given()
                .when()
                .get("hello/world")
                .then()
                .statusCode(200)
                .body(is("Hello world"));
    }

    
}
