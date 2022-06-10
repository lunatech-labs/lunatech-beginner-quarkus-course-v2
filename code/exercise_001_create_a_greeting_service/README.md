## Exercise 1: Hello World

In this exercise, we will create a Hello World endpoint.

* Create a new folder src/main/resources (if it doesn't exist already)
* Change the value of `quarkus.log.level` to `FINE` (equivalent to `DEBUG`).
  What happens in the config file `src/main/resources/application.properties`?
* Create a new `hello` endpoint on the existing `GreetingResource`, with path
  parameter `subject`, and make it return `Hello` plus the subject. So that
  you can go to http://localhost:8080/hello/world to see `Hello World`

