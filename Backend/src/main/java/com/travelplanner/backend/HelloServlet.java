package com.travelplanner.backend;

import java.io.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.travelplanner.backend.entity.User;
import org.apache.commons.io.IOUtils;
import org.json.JSONObject;

@WebServlet(name = "helloServlet", value = "/hello-servlet")
public class HelloServlet extends HttpServlet {
    private String message;

    public void init() {
        message = "Hello World!";
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/html");
        String username = request.getParameter("username");

        // Hello
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        out.println("<html><body>");
        out.println("<h1> Hello " + username + "</h1>");
        out.println("</body></html>");
        JSONObject object = new JSONObject();
        object.put("email", "sun@laioffer.com");
        object.put("name", "Rick Sun");
        object.put("age", 45);
        out.println(object);

        // second method to parse json
        ObjectMapper mapper = new ObjectMapper();
        User customer = new User();
        customer.setFirstName("Rick");
        customer.setLastName("Sun");
        response.getWriter().println(mapper.writeValueAsString(customer));
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // Read customer information from request body
        JSONObject jsonRequest = new JSONObject(IOUtils.toString(request.getReader()));
        String email = jsonRequest.getString("email");
        String firstName = jsonRequest.getString("first_name");
        String lastName = jsonRequest.getString("last_name");
        int age = jsonRequest.getInt("age");

        // Print customer information to IDE console
        System.out.println("Email is: " + email);
        System.out.println("First name is: " + firstName);
        System.out.println("Last name is: " + lastName);
        System.out.println("Age is: " + age);

        // Return status = ok as response body to the client
        response.setContentType("application/json");
        JSONObject jsonResponse = new JSONObject();
        jsonResponse.put("status", "ok");
        response.getWriter().print(jsonResponse);
    }

    public void destroy() {
    }
}
