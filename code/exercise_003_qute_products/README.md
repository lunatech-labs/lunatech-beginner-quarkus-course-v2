## Exercise 4: Even Quter Products

In this exercise, we will use some more Qute features to make some parts of our templates reusable. You will probably need the Qute Reference Documentation to figure out how to do these things.

* Create a class `Product`, with the following *public final* fields, and *a suitable constructor*:
  - Long id
  - String name
  - String description
  - BigDecimal price

* Pull in a file `Products.java` by executing the following command in a terminal:

`cmtc pull-template src/main/java/com/lunatech/training/quarkus/Products.java <root folder of exercise repo>`.

* Create a new class named `ProductsResource`

* In this class, create a `products` endpoint, that shows an HTML page with all
  products (use the products from the `all()` method on the `Products` class).
  Pull in a `catalogue.html` template by executing the following command in a terminal :
  - `cmtc pull-template src/main/resources/templates/catalogue.html <root folder of exercise repo>`
  - Make sure to replace the following with Qute expressions:
    - Product names
    - Path parameters in URLs
    - Total number of products

* In the same class, create a `products/{productId}` endpoint, that lists the
  details of a product (use the `getById` method on the `Products` class).
* Pull in a `details.html` template by executing the following command in a terminal :
  - `cmtc pull-template src/main/resources/templates/details.html <root folder of exercise repo>`
  - Make sure to replace the following with Qute expressions:
    - Product name (twice)
    - Product ID
    - Description
    - Price


* Extra: How would you deal with products that can’t be found?


* Extra: Write a test for both endpoints, testing that they give a `200` response, and contain some strings that should be there.
