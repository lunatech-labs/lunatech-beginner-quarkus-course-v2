# Exercises

These exercises belong to the Lunatech Beginner Quarkus Course.


## Exercise 1: Hello World

In this exercise, we will be exploring Quarkus, and create a Hello World endpoint.

* This repository contains the start of the student app.
* Check out the 'start' tag if you haven't yet: `git checkout start`
* Import the application in your IDE
* Run the application
* Browse to http://localhost:8080/. What do you see?
* Take a look at the config in http://localhost:8080/q/dev/io.quarkus.quarkus-vertx-http/config
* Create a new folder src/main/resources
* Change the value of `quarkus.log.level` to `FINE` (equivalent to `DEBUG`). What happens in the config file `src/main/resources/application.properties`?
* Create a new `hello` endpoint on the existing `GreetingResource`, with path parameter `subject`, and make it return `Hello` plus the subject. So that you can go to http://localhost:8080/hello/world to see `Hello World`

