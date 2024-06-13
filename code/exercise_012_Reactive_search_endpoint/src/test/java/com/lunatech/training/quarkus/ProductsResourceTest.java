package com.lunatech.training.quarkus;

import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;

import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;

@QuarkusTest
@TestMethodOrder(OrderAnnotation.class)
public class ProductsResourceTest {

    @Test
    @Order(1)
    public void testProductsEndpoint() {
        given()
                .when().get("/products")
                .then()
                .statusCode(200)
                .contentType(ContentType.JSON)
                .body("name[0]", is("Chair"));
    }

    @Test
    @Order(2)
    public void testProductDetailsEndpoint() {
        given()
                .when().get("/products/1")
                .then()
                .statusCode(200)
                .contentType(ContentType.JSON)
                .body("description", is("A metal frame chair, with oak seat"));
    }

    @Test
    @Order(3)
    public void testProductDetailsEndpointNotFound() {
        given()
                .when().get("/products/11")
                .then()
                .statusCode(404);
    }

    @Test
    @Order(4)
    public void testProductUpdateEndpoint() {
        String updateRequestBody = """
            {
                "name" : "Chair",
                "description" : "A steel frame chair, with oak seat",
                "price" : 59.95
            }""";

        given()
                .contentType(ContentType.JSON)
                .body(updateRequestBody)
                .when().put("/products/1")
                .then()
                .statusCode(200)
                .contentType(ContentType.JSON)
                .body("description", is("A steel frame chair, with oak seat"));
    }

    @Test
    @Order(5)
    public void testProductUpdateEndpointNotFound() {
        String updateRequestBody = """
            {
                "name" : "Chair",
                "description" : "A steel frame chair, with oak seat",
                "price" : 69.95
            }""";

        given()
                .contentType(ContentType.JSON)
                .body(updateRequestBody)
                .when().put("/products/11")
                .then()
                .statusCode(404);
    }

    @Test
    @Order(6)
    public void testProductSearchEndpoint() {
        given()
                .when().get("/products/search/oak")
                .then()
                .statusCode(200)
                .contentType(ContentType.JSON)
                .body("size()", is(5));
    }
}
