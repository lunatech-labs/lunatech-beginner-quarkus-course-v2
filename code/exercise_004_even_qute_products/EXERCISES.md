## Exercise 4: Even Quter Products

In this exercise, we will use some more Qute features to make some parts of our templates reusable. You will probably need the Qute Reference Documentation to figure out how to do these things.

* Create a file `layout.html`, that contains the `<html>`, `<head>` and `<body>` tags, and which can be used by other templates as a layout, using `{#include}`.
* Let the templates `catalogue.html` and `details.html` make use of this `layout.html`. Make sure that both the body content and the content of the `<title>` tag can be overridden by a template that includes the layout.
* Write an extension method `monetary`, such that `BigDecimal` values can be printed as money, with always two decimal places. So “40” should be printed as “€ 40.00” and “39.95” as “€ 39.95”. Use it in the `details` template where we display the price of a product.
    
  Tip: You may need to use the `RawString` feature to avoid escaping.
* Write a _user-defined tag_ `productListItem` that displays a single list item of the products list page. So essentially the `<li>` tag.

