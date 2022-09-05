package com.travelplanner.backend.controller;

import com.travelplanner.backend.entity.User;
import com.travelplanner.backend.service.SignUpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Controller
public class SignUpController {

    @Autowired
    private SignUpService signUpService;

    @RequestMapping(value = "/signup", method = RequestMethod.POST)
    public void register(@RequestBody User user, HttpServletResponse response) throws IOException {
        if (!signUpService.signUp(user)) {
            response.setStatus(HttpServletResponse.SC_CONFLICT);
        }
    }
}
