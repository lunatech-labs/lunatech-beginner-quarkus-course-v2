## Exercise 15: Kafka

In this exercise, we will connect our price processing components to Kafka. We will add Kafka to our `docker-compose` setup, and connect the reactive messaging components to Kafka using the `smallrye-reactive-messaging-kafka` extension.

Tip: If something fails, you can use [Conductor](https://conduktor.io) to check what’s going on in Kafka.

* Uncomment the 'zookeeper' and 'kafka' services in the `docker-compose.yml`
* Run `docker-compose up -d`. This will now start Zookeeper and Kafka (next to the still-running Postgres)
* Add the `quarkus-smallrye-reactive-messaging-kafka` extension to your `pom.xml`
* Pull in the class `PriceUpdateDeserializer` by executing this command from the command line: `cmtc pull-template src/main/java/com/lunatech/training/quarkus/PriceUpdateDeserializer.java <root folder of exercise repo>`.
* On the class `PriceUpdateStreams`:
    - On the `generate` method, change the `@Outgoing` channel name to `raw-price-updates-out`
    - On the `process` method, change the `@Incoming` channel name to `raw-price-updates-in`
    - On the `process` method, change the `@Outoing` channel name to `price-updates-out`
* On the class PriceUpdatesResource:
    - Change the channel name in the `@Channel` annotation to `price-updates-in`
* Add the following config:

      kafka.bootstrap.servers=127.0.0.1:9092
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
* Check what’s going on in Kafka with Conduktor if you haven’t yet. 
* You can check it without Conduktor. There are two cases:
  * You have already installed Kafka on your machine and in this case you can type the following commands each in a terminal 
    * `$ kafka-console-consumer --bootstrap-server localhost:9092 --topic price-updates --from-beginning` 
    * `$ kafka-console-consumer --bootstrap-server localhost:9092 --topic raw-price-updates --from-beginning` 
    * `$ kafka-console-consumer --bootstrap-server localhost:9092 --topic price-updates` 
      * `--from-beginning` allows to display from the beginning 
      * They do almost the same thing, we listen to different topics:  `price-updates` and `raw-price-updates` and we receive something like this:
      
            {"productId":1,"price":77}
            {"productId":2,"price":83}
            {"productId":3,"price":71}
            {"productId":4,"price":84}
            {"productId":6,"price":36}
            {"productId":7,"price":43}

  * You haven't installed Conduktor, Kafka, or Zookeeper on your machine and you certainly don't want to install them: but you have docker since you are using `docker-compose`
    * Launch the containers: `docker-compose up -d`
    * You retrieve the name of the kafka container to connect to it (or ID): `docker-compose ps`
    * You can now connect to the shell of this container and execute commands. This container contains all Kafka configurations: `docker exec -it quarkus-course-kafka sh`
    * Now you are connected to the container and you can use the same command lines as above but with a bit difference, you have to mention the executable path : bin files are located here `/opt/kafka/bin/`
    * Don’t forget .sh for extension file
      * `/opt/kafka/bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic price-updates --from-beginning`
