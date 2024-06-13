## Exercise 15: Kafka

In this exercise, we will connect our price processing components to Kafka. For this we will use the `smallrye-reactive-messaging-kafka` extension to connect our reactive messaging components to Kafka. We will then rely on Dev Services Kafka to automatically start a Kafka broker and to automatically configure the application to find the broker.

* Add the `quarkus-smallrye-reactive-messaging-kafka` extension to your `pom.xml`
* Pull in the class `PriceUpdateDeserializer` by executing this command from the command line: `cmtc pull-template src/main/java/com/lunatech/training/quarkus/PriceUpdateDeserializer.java <root folder of exercise repo>`.
* On the class `PriceUpdateStreams`:
    - On the `generate` method, change the `@Outgoing` channel name to `raw-price-updates-out`
    - On the `process` method, change the `@Incoming` channel name to `raw-price-updates-in`
    - On the `process` method, change the `@Outoing` channel name to `price-updates-out`
* On the class PriceUpdatesResource:
    - Change the channel name in the `@Channel` annotation to `price-updates-in`
* Add the following config:

      mp.messaging.outgoing.raw-price-updates-out.connector=smallrye-kafka
      mp.messaging.outgoing.raw-price-updates-out.topic=raw-prices
      mp.messaging.outgoing.raw-price-updates-out.value.serializer=io.quarkus.kafka.client.serialization.ObjectMapperSerializer
      mp.messaging.incoming.raw-price-updates-in.connector=smallrye-kafka
      mp.messaging.incoming.raw-price-updates-in.topic=raw-prices
      mp.messaging.incoming.raw-price-updates-in.value.deserializer=com.lunatech.training.quarkus.PriceUpdateDeserializer
      mp.messaging.outgoing.price-updates-out.connector=smallrye-kafka
      mp.messaging.outgoing.price-updates-out.topic=prices
      mp.messaging.outgoing.price-updates-out.value.serializer=io.quarkus.kafka.client.serialization.ObjectMapperSerializer
      mp.messaging.incoming.price-updates-in.connector=smallrye-kafka
      mp.messaging.incoming.price-updates-in.topic=prices
      mp.messaging.incoming.price-updates-in.value.deserializer=com.lunatech.training.quarkus.PriceUpdateDeserializer

* Execute the cURL command again from the previous exercise:

      curl http://localhost:8080/prices

* You should see price updates streaming by again.
* You can check what’s going on in Kafka with the Kafka Dev UI:
  * http://localhost:8080/q/dev-ui/io.quarkus.quarkus-kafka-client/topics