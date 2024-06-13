## Exercise 15: Kafka

In this exercise, we will connect our price processing components to Kafka. For this we will use the `quarkus-messaging-kafka` extension to connect our reactive messaging components to Kafka. We will then rely on Dev Services Kafka to automatically start a Kafka broker and to automatically configure the application to find the broker.

* Add the `quarkus-messaging-kafka` extension to your `pom.xml`
* On the class `PriceUpdateStreams`:
    - On the `generate` method, change the `@Outgoing` channel name to `raw-price-updates-out`
    - On the `process` method, change the `@Incoming` channel name to `raw-price-updates-in`
    - On the `process` method, change the `@Outoing` channel name to `price-updates-out`
* On the class PriceUpdatesResource:
    - Change the channel name in the `@Channel` annotation to `price-updates-in`
* Add the following config:

      mp.messaging.outgoing.raw-price-updates-out.topic=raw-prices
      mp.messaging.incoming.raw-price-updates-in.topic=raw-prices
      mp.messaging.outgoing.price-updates-out.topic=prices
      mp.messaging.incoming.price-updates-in.topic=prices

* Execute the cURL command again from the previous exercise:

      curl http://localhost:8080/prices

* You should see price updates streaming by again.
* You can check what’s going on in Kafka with the Kafka Dev UI:
  * http://localhost:8080/q/dev-ui/io.quarkus.quarkus-kafka-client/topics
