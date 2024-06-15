## Exercise 11: Going Reactive

In this exercise, we will migrate all the layers of our Hiquea app to the Reactive programming model. We are already using `quarkus-rest` which supports both reactive and imperative programming models. Now for the database access layer, we will use Hibernate Reactive.
 
* Replace `quarkus-jdbc-postgresql` with `quarkus-reactive-pg-client`.
* Replace `quarkus-hibernate-orm-panache` with `quarkus-hibernate-reactive-panache`

* Go to your `Product` class. Delete the old `PanacheEntity` import, and find the proper import to use now.
* Now, go to `ProductsResource`, and make it work again. Note that you can return `Uni` responses from your resource methods now that you have RESTeasy reactive.
* For the `PUT` endpoint, do the following:
  - Start with `Product.<Product>findById(id)`, which now returns a `Uni`.
  - Decide which `Uni` operator we need to invoke (`map`, or `flatMap`, etc.)
  - As before we want to check if the product exists
    - if the product does not exist we want to return a NotFound
    - if the product exists we want to update the product and invoke `persistAndFlush` (which now also returns a `Uni`)
* Run the tests with `./mvnw test` to make sure they still pass
* Rerun the application and check that the frontend still works :)

