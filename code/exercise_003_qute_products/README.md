## Exercise 3: Qute Products

In this exercise, we will start on the HIQUEA catalogue. We will make two pages, a page that lists all products, and a page that shows the details of a product.

* Create a class `Product`, with the following *public final* fields, and *a suitable constructor*:
    - Long id
    - String name
    - String description
    - BigDecimal price

* Pull in a file `Products.java` by executing the following command in a terminal:

`cmtc pull-template <root folder of exercise repo> src/main/java/com/lunatech/training/quarkus/Products.java`.

* Create a new class named `ProductsResource`

* In this class, create a `products` endpoint, that shows an HTML page with all
  products (use the products from the `all()` method on the `Products` class).
  You can use the HTML from the file `materials/exercise-3/catalogue.html`.
  Make sure to replace the following with Qute expressions:
    - Product names
    - Path parameters in URLs
    - Total number of products

* In the same class, create a `products/{productId}` endpoint, that lists the
  details of a product (use the `getById` method on the `Products` class).
  You can use the HTML from the file `materials/exercise-3/details.html`.
  Make sure to replace the following with Qute expressions:
    - Product name (twice)
    - Product ID
    - Description
    - Price

* Extra: How would you deal with products that can’t be found?

* Extra: Write a test for both endpoints, testing that they give a `200` response, and contain some strings that should be there.

