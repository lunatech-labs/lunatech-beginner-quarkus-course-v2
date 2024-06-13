## Exercise 6: CDI & ArC

In this exercise we won’t be doing much for HIQUEA, but we’ll practice a little bit with some ArC features!

* Create a class `SubjectBean`, with a public constructor that prints `SubjectBean constructed` and a method `String() subject()` that returns "everyone".

> Note: You can also pull the SubjectBean code by executing this command from the command line: `cmtc pull-template src/main/java/com/lunatech/training/quarkus/SubjectBean.java <root folder of exercise repo>`.

* Next, add the following to your `GreetingResource` class:

        @Inject SubjectBean subjectBean;

* Run the app. What happens?
* Add an `@Singleton` annotation to your SubjectBean class. What gets printed on the console, if you refresh http://localhost:8080/hello several times?
* Change the annotation on `MyBean` from `@Singleton` to `@RequestScoped`. If you refresh several times now, what gets printed now? Why?
* Now, let’s start actually using the bean. Change the `hello` method on `GreetingResource` to:
        
      @GET
      public String hello() {
        return "Hello, " + subjectBean.subject();
      }

  And refresh several times. What happens now? Why is it different from the previous question?
* Make the `GreetingResource` print "GreetingResource Ready" on application startup!
* Add a configuration property `greeting` with value "Howdy" to your configuration file, inject it into your `GreetingResource`, and use it instead of the hardcoded "Hello" in the `hello()` method.
* Don’t forget to update the test `GreetingResourceTest` as well!
* Extra: Constructor injection is typically preferable over field injection. Change `GreetingResource` to use constructor injection instead.

