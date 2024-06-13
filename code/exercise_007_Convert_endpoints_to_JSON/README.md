## Exercise 7a: Convert endpoints to JSON

In this exercise, we will abandon our Qute templates, and convert our endpoints to returning JSON instead of HTML. Later, we will hook up a React frontend application to these endpoints.

* Remove the `@Inject` templates from the `ProductsResource`
* Make the `products` and `details` method return a JSON representation of a list of products or a single product, respectively, instead. For this you will need to add an `@Produces` annotation with the right `MediaType` either on the class, or on each of the methods.

The following three steps are only useful if you wrote the tests for these endpoints in Exercise #3: 

* Extra: Update the tests for the list and details endpoint and make them check for the right content-type.
* Extra: Update the test for the details endpoint, and use the Json-path expression `name` to test that the value for the url `/products/1` equals "Chair".

## Exercise 7b: Add OpenAPI support and Swagger UI

Now, we will be adding OpenAPI support and Swagger UI to our application, so we have better visibility into our REST endpoint. 

* Add the `quarkus-smallrye-openapi` extension to your application:
    
      <dependency>
        <groupId>io.quarkus</groupId>
        <artifactId>quarkus-smallrye-openapi</artifactId>
      </dependency>

* Browse to http://localhost:8080/ and observe under _Additional endpoints_, that two new endpoints emerged: `/q/openapi` and `/q/swagger-ui/`
* Browse to http://localhost:8080/q/swagger-ui/. You will see our four endpoints, and you can try them out in the UI. Try sending some requests to them!

