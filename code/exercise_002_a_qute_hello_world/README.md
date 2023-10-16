## Exercise 2: A Qute Hello World

In this exercise, we will use the Qute template engine to make our Hello World endpoint a tiny bit nicer.

* Create an HTML file that shows `Hello World!`.  Save it as `src/main/resources/templates/greet.html`.
You can create one yourself, or fetch on by executing the following command from a terminal:

`cmtc pull-template src/main/resources/templates/greet.html <code repo root folder>`

<code repo root folder> is the root folder of your exercise repository.

* Inject a `io.quarkus.qute.Template` field with name `greet` using a `jakarta.inject.Inject` annotation. Quarkus will look for a template with that name, and automatically generate the `Template` object for you!
* Make your hello endpoint return `greet.instance()`
* Check http://localhost:8080/hello/world to see if it works :)
* Now, change your template to use an expression `{subject}` instead of the hardcoded `World`, and change your resource to supply the subject parameter to the template.
* Check http://localhost:8080/hello/quarkus to see if it works!


