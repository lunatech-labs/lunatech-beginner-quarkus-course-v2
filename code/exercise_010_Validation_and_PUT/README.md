## Exercise 10: Validation & PUT

In this exercise, we will add a `PUT` endpoint to the backend, so that products can also be updated. We will use the `quarkus-hibernate-validator` extension to validate input. We will also *remove* the `quarkus-hibernate-orm-rest-data-panache` extension, and make our own endpoint instead.

* Remove the `quarkus-hibernate-orm-rest-data-panache` extension and the `PanacheProductsResource`.
* In the `ProductsResource`, create a new `update()` method that takes a `PUT` request, with the product id as a path parameter, and the updated product as a body parameter (you can just add a parameter `Product product` to the method, and it will happen automatically).
* Add an `@Consumes` with the right media type.  
* In the method, lookup the existing product by the id path parameter, and throw a `NotFoundException` if it doesn’t exist. If it does exist, update the `name`, `description` and `price` and persist (and flush) it again. Then return the updated `Product`.
* Check if it works with the Swagger UI. For example, try this input to `PUT /products/1`:

      {
        "description": "A Very Comfy Chair",
        "name": "Comfy, expensive, but worth it!",
        "price": 999.99
      }
  Probably you ran into an error - what was missing from the instructions?


Now, some validation.

* Add the `quarkus-hibernate-validator` extension, and mark the `Product` parameter with the `@Valid` annotation.
Use `@Length`, `@DecimalMin` and `@Digits` annotations to achieve the following validation rules:
    - Name must be set and have a length of at least 3 characters
    - Description must be set and have a length of at least 10 character
    - Price must be set and not be negative
    - Price must not have more than two fractional digits

* Try your new endpoint with the Swagger UI (http://localhost:8080/q/swagger-ui)
  This input to `PUT /products/1` should still work:
    
      {
        "description": "A Very Comfy Chair",
        "name": "Comfy, expensive, but worth it!",
        "price": 999.99
      }

  But this should return an error response;

      {
        "name": "Chair",
        "description": "Comfy",
        "price": 12.345
      }

* Finally, enable the `productUpdate` feature flag to make it also possible from the React app to edit products! You should see an 'edit' button appear in each product card in the catalogue. Give it a spin :)

