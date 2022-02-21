## Exercise 9: Hook up the React app

In this exercise we will add a (premade) React frontend to our application. This frontend application understands some _feature flags_ to enable or disable certain functionality. So first, we will add a backend resource to serve these feature flags to the frontend.

* Create a `FeatureFlagsResource` with a  `/feature-flags` endpoint that serves the following JSON structure. Make it such that the flags can be configured in the `application.properties` configuration file:

      {
        "productDetails": true,
        "productSearch": false,
        "productUpdate": false,
        "reactivePrices": false
      }

* Next, copy the files `index.html` and `bundle.min.js` from `/materials/exercise-9` into a new directory `src/main/resources/META-INF/resources`
* Now, browse to http://localhost:8080/ and you should see the HIQUEA frontend application!

