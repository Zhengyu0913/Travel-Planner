package com.travelplanner.backend.response;

import com.fasterxml.jackson.annotation.JsonProperty;

public class SignInResponseBody {
    @JsonProperty("user_id")
    private final String userId;

    @JsonProperty("name")
    private final String name;

    public SignInResponseBody(String userId, String name) {
        this.userId = userId;
        this.name = name;
    }

    public String getUserId() {
        return userId;
    }

    public String getName() {
        return name;
    }
}
