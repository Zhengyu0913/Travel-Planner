package com.laioffer.travelPlanner.response;

import com.fasterxml.jackson.annotation.JsonProperty;

public class SignInResponseBody {
    @JsonProperty("email")
    private final String email;

    @JsonProperty("name")
    private final String name;

    public SignInResponseBody(String email, String name) {
        this.email = email;
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }
}
