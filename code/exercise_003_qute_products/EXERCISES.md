## Exercise 3: Qute Products

In this exercise, we will start on the HIQUEA catalogue. We will make two pages, a page that lists all products, and a page that shows the details of a product.

* Create a class `Product`, with the following *public final* fields, and *a suitable constructor*:
    - Long id
    - String name
    - String description
    - BigDecimal price
* Copy the file `materials/exercise-3/Products.java` into `src/main/java/com/lunatech/training/quarkus/`.
* Create a new `ProductsResource`
* Create a `products` endpoint, that shows an HTML page with all products (use the products from the `all()` method on the `Products` class). You can use the HTML from the file `materials/exercise-3/catalogue.html`. Make sure to replace the following with Qute expressions:
    - Product names
    - Path parameters in URLs
    - Total number of products
* Create a `products/{productId}` endpoint, that lists the details of a product (use the `getById` method on the `Products` class).  You can use the HTML from the file `materials/exercise-3/details.html`. Make sure to replace the following with Qute expressions:
    - Product name (twice)
    - Product ID
    - Description
    - Price
* Extra: How would you deal with products that can’t be found?
* Extra: Write a test for both endpoints, testing that they give a `200` response, and contain some strings that should be there.

