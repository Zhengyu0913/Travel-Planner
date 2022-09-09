package com.laioffer.travelPlanner.request;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class SignInRequestBody {
    private final String email;
    private final String password;

    @JsonCreator
    public SignInRequestBody(@JsonProperty("email") String email, @JsonProperty("password") String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }
}
