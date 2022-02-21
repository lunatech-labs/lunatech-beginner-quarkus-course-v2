## Exercise 2: A Qute Hello World

In this exercise, we will use the Qute template engine to make our Hello World endpoint a tiny bit nicer.

* Create an HTML file that shows `Hello World!`. You can create one yourself, or copy the example from `materials/exercise-2/greet.html`. Save it as `src/main/resources/templates/greet.html`.
* Inject a `io.quarkus.qute.Template` field with name `greet` using a `javax.inject.Inject` annotation. Quarkus will look for a template with that name, and automatically generate the `Template` object for you!
* Make your hello endpoint return `greet.instance()`
* Check http://localhost:8080/hello/world to see if it works :)
* Now, change your template to use an expression `{subject}` instead of the hardcoded `World`, and change your resource to supply the subject parameter to the template.
* Check http://localhost:8080/hello/quarkus to see if it works!


