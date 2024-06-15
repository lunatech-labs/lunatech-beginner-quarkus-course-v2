## Exercise 5: Products from the database, using Hibernate + Panache

In this exercise, we will start reading products from the database, rather than from the hardcoded `Products` class. We will use Hibernate + Panache as the ORM, with a Postgres database that will be started up in dev mode as a Dev Service.

* We need to add some extensions. Add the following to your `pom.xml` in the dependencies section:

    <dependency>
      <groupId>io.quarkus</groupId>
      <artifactId>quarkus-hibernate-orm-panache</artifactId>
    </dependency>
    <dependency>
      <groupId>io.quarkus</groupId>
      <artifactId>quarkus-jdbc-postgresql</artifactId>
    </dependency>

* In dev mode we will configure Hibernate to recreate the database with every application startup. The Dev Service takes care of configuring the application so it can connect to the database. So you can just add the following to your `application.properties’:

        quarkus.hibernate-orm.database.generation = drop-and-create
  
* Next, make your existing `Product` class extend from `PanacheEntity`, and add an `@Entity` annotation. This makes your `Product` class suitable for _Active Record_-style persistence, where the class you persist has static methods to interact with the storage.
* Add a default constructor, and make the fields non-final. Also, remove the `id` field from Product, since that field is already defined on `PanacheEntity`.
* Delete your old `Products` class, and update your `ProductsResource` to use the static methods on `Product` instead.
* Which methods did you pick?

* Pull in a file `import.sql` by executing the following command in a terminal:

`cmtc pull-template src/main/resources/import.sql <root folder of exercise repo>`.

Hibernate will automatically pick up this file, and execute its contents after creating the database. The file will populate your database with the HIQUEA products we love so much.

* Run your app and check if everything still works :)

