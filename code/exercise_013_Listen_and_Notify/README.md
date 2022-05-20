## Exercise 13: Listen & Notify

In this exercise, we will play a bit with Postgres’ `LISTEN / NOTIFY` feature, to get a better grip on reactive streams, and we will also use Server Sent Events.

The `LISTEN / NOTIFY` feature of Postgres allows you to setup a connection to Postgres, and listen for evens that pass by on a channel, as well as notifying such channels. With the reactive sql clients, we can connect to these channels as a `Multi` in Quarkus.

* Get the code for `ListenNotifyResource` by executing this command from the command line: `cmtc pull-template src/main/java/com/lunatech/training/quarkus/ListenNotifyResource.java <root folder of exercise repo>`.

* Connect to the channel `milkshakes` using the following cURL command.

      curl localhost:8080/channel/milkshakes

  Note that it’s expected to ‘hang’; because it’s connecting to a chunked HTTP endpoint and waiting for chunks. 
  
* In a different terminal window, run

		curl -X POST --data "strawberry" localhost:8080/channel/milkshakes 

	(Or use other flavours of milkshake if you don’t like strawberry). You can run it multiple times.
* You should see the chunks with the Postgres notifications in JSON format flow by in the first terminal window.
* Inspect the code. Can you describe what happens?
