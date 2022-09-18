package com.laioffer.travelPlanner.controller;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.laioffer.travelPlanner.entity.Trip;
import com.laioffer.travelPlanner.entity.User;
import com.laioffer.travelPlanner.request.AddTripRequestBody;
import com.laioffer.travelPlanner.response.GetTripResponseBody;
import com.laioffer.travelPlanner.response.SignInResponseBody;
import com.laioffer.travelPlanner.service.TripService;
import com.laioffer.travelPlanner.service.UserService;
import com.laioffer.travelPlanner.util.Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class TripController {

    @Autowired
    private TripService tripService;
    @Autowired
    private UserService userService;

    @RequestMapping(value = "/api/trips", method = RequestMethod.GET)
    @ResponseBody
    public List<Trip> getAllTrips(HttpServletRequest request,
                                  HttpServletResponse response) throws IOException {
        if (!userService.isLoggedIn(request, response)) return null;
        String email = (String) request.getSession(false).getAttribute("email");
        User user = userService.getUserByEmail(email);
        return user.getTripList();
    }

    @RequestMapping(value = "/api/trip", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.CREATED)
    public void addTrip(@RequestBody AddTripRequestBody requestBody,
                        HttpServletRequest request,
                        HttpServletResponse response) {
        if (!userService.isLoggedIn(request, response)) return;
        String email = (String) request.getSession(false).getAttribute("email");
        User user = userService.getUserByEmail(email);
        tripService.saveTrip(requestBody.getTripId(),requestBody.getTripName(),
                requestBody.getStartDate(), requestBody.getEndDate(), user);
    }

    @RequestMapping(value = "/api/trip/{trip_id}", method = RequestMethod.GET)
    public void getTrip(@PathVariable("trip_id") String tripId,
                                       HttpServletRequest request,
                                       HttpServletResponse response) throws IOException {
        // check if the user is logged in
        if (!userService.isLoggedIn(request, response)) return;
        Trip trip = tripService.getTrip(tripId);
        GetTripResponseBody getTripResponseBody = new GetTripResponseBody(trip.getId(), trip.getName(),
                trip.getStartDate(), trip.getEndDate(), trip.getDailyPlanList());
        response.setContentType("application/json;charset=UTF-8");
        response.getWriter().print(new ObjectMapper().writeValueAsString(getTripResponseBody));
    }

    @RequestMapping(value = "/api/trip/{trip_id}", method = RequestMethod.DELETE)
    @ResponseBody
    public void deleteTrip(@PathVariable("trip_id") String tripId,
                           HttpServletRequest request,
                           HttpServletResponse response){
        if (!userService.isLoggedIn(request, response)) return;
        tripService.deleteTrip(tripId);
    }
}
