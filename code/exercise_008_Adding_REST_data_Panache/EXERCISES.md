## Exercise 8: Adding REST data Panache

In this exercise, we will see how we can create close to no-code CRUD endpoints with the _hibernate-orm-rest-data-panache_ extension.

* Add the following extension to your dependencies:
      
      <dependency>
        <groupId>io.quarkus</groupId>
        <artifactId>quarkus-hibernate-orm-rest-data-panache</artifactId>
      </dependency>

* Create a new *interface* `PanacheProductsResource` that extends `PanacheEntityResource<Product, Long>`
* Browse to the Swagger UI endpoint at http://localhost:8080/q/swagger-ui/ and observe the new endpoints that Panache created.
* Create a new product using Swagger UI, by posting the following JSON to the `POST panache-products` endpoint:

      {
        "name": "Couch",
        "description": "A leather couch",
        "price": 399
      }

* Check the `/panache-products` (or your own `/products`) endpoint to see if you find your newly created couch back.

Tip: If creation of a new Product doesn't work, try to add setters in the `Product` class.

