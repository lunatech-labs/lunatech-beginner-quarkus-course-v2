package com.lunatech.training.quarkus;

import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;

@QuarkusTest
public class ProductsResourceTest {

    @Test
    public void testProductsEndpoint() {
        given()
                .when().get("/products")
                .then()
                .statusCode(200)
                .contentType(ContentType.JSON)
                .body("name[0]", is("Chair"));
    }

    @Test
    public void testProductDetailsEndpoint() {
        given()
                .when().get("/products/1")
                .then()
                .statusCode(200)
                .contentType(ContentType.JSON)
                .body("description", is("A metal frame chair, with oak seat"));
    }

    @Test
    public void testProductDetailsEndpointNotFound() {
        given()
                .when().get("/products/11")
                .then()
                .statusCode(404);
    }
}
