## Exercise 11: Going Reactive

In this exercise, we will migrate our Hiquea app to the Reactive programming model. For this, we will use RESTeasy Reactive and Hibernate Reactive.

* Replace in your `pom.xml` the various `quarkus-resteasy` extensions with `quarkus-resteasy-reactive` variants as following: 
  - `quarkus-resteasy` with `quarkus-resteasy-reactive`
  - `quarkus-resteasy-jackson` with `quarkus-resteasy-reactive-jackson`.
  - `quarkus-resteasy-jsonb` with `quarkus-resteasy-reactive-jsonb`.
  - `quarkus-resteasy-qute` with `quarkus-resteasy-reactive-qute`.

Note: Two extensions `quarkus-resteasy-reactive-jackson` and `quarkus-resteasy-reactive-jsonb` can do JSON serialisation but there is only `quarkus-resteasy-reactive-jackson` has some advanced features that RESTEasy Reactive supports. 
* Replace `quarkus-jdbc-postgresql` with `quarkus-reactive-pg-client`.
* Replace `quarkus-hibernate-orm-panache` with `quarkus-hibernate-reactive-panache`
  
Note: one of the reasons we removed the `quarkus-hibernate-orm-rest-data-panache` extension in the previous exercise is that there is no reactive replacement for this extension at the time of writing.

* Remove the setting `quarkus.datasource.jdbc.url`, and replace it with this setting:
` quarkus.datasource.reactive.url=postgresql://localhost:8765/postgres`
* Go to your `Product` class. Delete the old `PanacheEntity` import, and find the proper import to use now.
* Now, go to `ProductsResource`, and make it work again. Note that you can return `Uni` or `Multi` reponses from your resource methods now that you have RESTeasy reactive.
  Try two options: returning a `Multi<Product>` from the `products()` method, or returning a `Uni<List<Product>>`. What’s the conceptual difference between these?
* For the `PUT` endpoint, do the following:
  - Start with `Product.<Product>findById(id)`, and `flatMap` the resulting `Uni`.
  - Within the `flatMap`, update the product, and invoke `persistAndFlush`
   
    … this will properly ‘chain’ the operations.
* Check if the frontend still works :)

