package com.lunatech.training.quarkus;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/feature-flags")
@Produces(MediaType.APPLICATION_JSON)
public class FeatureFlagsResource {

    @Inject
    FeatureFlags featureFlags;

    @GET
    public FeatureFlags featureFlags() {
        return featureFlags;
    }


}
