## Exercise 16: Dead Letter Queue & Stream filtering

In this exercise we will see a method to deal with ‘broken’ messages.

* Go to the `PriceUpdateStreams`, and change the `process` method so that it no longer changes the `PriceUpdate` when the price is below 30, but rather throws a runtime exception.
* What happens if you run the application now, and connect a consumer (`curl http://localhost:8080/prices`)?
* Answer: the stream stops after the failure. This is sometimes the right behaviour (maybe we need to update our application to deal with the messages properly), but sometimes wrong. We want to use the _dead letter_ functionality instead.
* Add the following config:

      mp.messaging.incoming.raw-price-updates-in.failure-strategy=dead-letter-queue

* Restart the app, and observe that the stream works again (curl http://localhost:8080/prices), although now most of the times you end up with less than 7 updates per 5 seconds. The failures end up in the topic `dead-letter-topic-raw-price-updates-in`. You can easily inspect it with the Kafka Dev UI - http://localhost:8080/q/dev-ui/io.quarkus.quarkus-kafka-client/topics

Finally, we want to connect our React frontend to the cool new price-streaming feature. But before we do so, we have to make one more endpoint; that only streams prices for an individual product.

* Create an endpoint `/prices/{productId}` that returns only the prices for the product with that id. Thinks about the methods you have on `Multi` to achieve this given the `@Channel`-injected `Multi` in the class.

Next, we need to update the last remaining feature flag (`reactivePrices`), and take one more look at our Hiquea app. The prices are now updated every five seconds!

Congratulations, you have finished all exercises :)
