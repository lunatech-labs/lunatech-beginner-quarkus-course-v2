## Exercise 12: Reactive search endpoint

In this exercise we will add a search endpoint to the Hiquea backend, using the low-level SQL client.

* Create a method `public static Product from(Row row)` on the `Product` class, that creates a `Product` from an `io.vertx.mutiny.sqlclient.Row`.
* `@Inject` a `PgPool` instance into your `ProductsResource` class. (Note: There are two `PgPool` types in two packages; which one do you need?)
* Now make the following resource method into your `ProductsResource` class:

      @GET
      @Path("search/{term}")
      public Multi<Product> search(@PathParam("term") String term) {
        return client
          .preparedQuery("SELECT id, name, description, price FROM product WHERE name ILIKE $1 OR description ILIKE $1")
          .execute(Tuple.of("%" + term + "%"))
            <fill in this part yourself!!!>
          .map(Product::from);
      }

    Fill in the missing part! You need to transform from a `Uni<RowSet<Row>>` to a `Multi<Row>`.
* Try out your new endpoint by searching for all products that have 'oak' in their name or description: http://localhost:8080/products/search/oak
* Enable the feature flag `productSearch`, and notice a search field appearing at the top right of the Hiquea frontend!

