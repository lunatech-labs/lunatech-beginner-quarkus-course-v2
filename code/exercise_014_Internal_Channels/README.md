## Exercise 14: Internal Channels

In this exercise we will start using the Microprofile Reactive Messaging specification to build some streaming stuff!

In an ever-demanding market, we just can’t have a furniture store with fixed prices for furniture. Instead, we want new prices for everything, every five seconds!

We will create a _Generator_ that generates new prices for all our products every five seconds, and connect this stream to other components.

* Add the `quarkus-smallrye-reactive-messaging` extension to your `pom.xml`

* Pull in the class `PriceUpdate` by executing this command from the command line: `cmtc pull-template src/main/java/com/lunatech/training/quarkus/PriceUpdate.java <root folder of exercise repo>`. The `PriceUpdate` class represents an updated price for the product with the product id in the class. 

* Create the file `PriceUpdateStream.java` with the following template:

```java
package com.lunatech.training.quarkus;

import io.smallrye.mutiny.Multi;
import org.eclipse.microprofile.reactive.messaging.Incoming;
import org.eclipse.microprofile.reactive.messaging.Outgoing;

import java.util.Random;

public class PriceUpdateStreams {

    private final Random random = new Random();

    @Outgoing("raw-price-updates")
    public Multi<PriceUpdate> generate() {
        // To be implemented!
    }

    @Incoming("raw-price-updates")
    public void print(PriceUpdate update) {
        System.out.println("Observed price update: " + update);
    }
}
```

* Implement the method `public Multi<PriceUpdate> generate()` on the `PriceUpdateStream` class, and make it return a `Multi` that emits a `PriceUpdate` item for each of the products in our database (You can hardcode it to use product ids 1 to 7) *every five seconds*, using a random price between 0 and 100.
  
  Tip, look at the `Multi.createFrom().ticks()` method!
  Note that the `print` method has an `@Incoming` annotation that matches the `@Outgoing` from the `generate` method. Running the application should print seven lines to the console every five seconds, each line being a price update for a product. Run the app to try this :)

This demonstrates the _internal channels_ feature of the Reactive Messaging spec. Quarkus will feed the items coming from the outgoing stream from the `generate` method into the `print` method, because they have the same channel name.

* What happens if you change the channel name on the `@Incoming` annotation?

Now, we will create a _processor_; a method that has both an `@Incoming` and an `@Outgoing` annotation.

* Create a method `process` that takes a PriceUpdate and returns a PriceUpdate. Add the following annotations:

      @Incoming("raw-price-updates")
      @Outgoing("price-updates")

  And change the channel name on the `print` method `@Incoming` annotation to `price-updates`
* Implement the method such that if the `price` field on the `PriceUpdate` is less than 30, 30 is added to it. (We neeeeever want to sell anything for less than 30 euro!)
* Run the app again, and check if you still see price updates. Notice that you shouldn’t see any more updates with a price less than 30.

Finally, we will create a `PriceUpdatesResource` class, so we can expose the price updates as Server Sent Events.

* Remove the `print` method from the `PriceUpdateStreams` class
* Create a class `PriceUpdatesResource`
* Annotate it with `@Path("/prices")`
* You can inject a `Multi<PriceUpdate>` that’s connected to a stream into the `PriceUpdatesResource` as follows:

      @Channel("price-updates")
      Multi<PriceUpdate> priceUpdates;
  
* `@Channel` is also a Reactive Messaging annotation, and Quarkus will connect this `Multi` to the 'price-updates' channel. This is an alternative method to receive the items in that channel (different from how we did it with an `@Incoming` annotation on the `print` method!)
* Next, add this method

      @GET
      @Produces(MediaType.SERVER_SENT_EVENTS)
      @RestSseElementType(MediaType.APPLICATION_JSON)
      public Multi<PriceUpdate> prices() {
        return priceUpdates;
      }

* Now, connect to this endpoint using Curl:

      curl localhost:8080/prices

  You should see prices streaming by.
