package com.laioffer.travelPlanner.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.laioffer.travelPlanner.entity.User;
import com.laioffer.travelPlanner.request.SignInRequestBody;
import com.laioffer.travelPlanner.response.SignInResponseBody;
import com.laioffer.travelPlanner.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@Controller
public class UserController {
    @Autowired
    private UserService userService;

    @RequestMapping(value = "/api/signin", method = RequestMethod.POST)
    public void signIn(@RequestBody SignInRequestBody requestBody,
                       HttpServletRequest request,
                       HttpServletResponse response) throws IOException {
        String firstname = userService.verifyUser(requestBody.getEmail(), requestBody.getPassword());

        // Create a new session for the user if user email and password are correct, otherwise return Unauthorized error.
        if (!firstname.isEmpty()) {
            // Create a new session, put user email as an attribute into the session object, and set the expiration time to 600 seconds.
            HttpSession session = request.getSession();
            session.setAttribute("email", requestBody.getEmail());
            session.setMaxInactiveInterval(600);

            SignInResponseBody loginResponseBody = new SignInResponseBody(requestBody.getEmail(), firstname);
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().print(new ObjectMapper().writeValueAsString(loginResponseBody));
        } else {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }
    }

    @RequestMapping(value = "/api/signout", method = RequestMethod.POST)
    public void signOut(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        Cookie cookie = new Cookie("JSESSIONID", null);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }

    @RequestMapping(value = "/api/signup", method = RequestMethod.POST)
    public void signUp(@RequestBody User user, HttpServletResponse response) throws IOException {
        if (!userService.saveUser(user)) {
            response.setStatus(HttpServletResponse.SC_CONFLICT);
        }
    }
}
