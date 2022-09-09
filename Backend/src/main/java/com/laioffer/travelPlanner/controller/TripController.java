package com.laioffer.travelPlanner.controller;

import com.laioffer.travelPlanner.entity.Trip;
import com.laioffer.travelPlanner.entity.User;
import com.laioffer.travelPlanner.request.AddTripRequestBody;
import com.laioffer.travelPlanner.service.TripService;
import com.laioffer.travelPlanner.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@Controller
public class TripController {

    @Autowired
    private TripService tripService;
    @Autowired
    private UserService userService;

    // 只是开发中测试用的
    @RequestMapping(value = "/trip", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.CREATED)
    public void addTrip(@RequestBody AddTripRequestBody requestBody,
                        HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(false);
        if (session == null) {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            return;
        }
        String email = (String) session.getAttribute("email");

        tripService.saveTrip(requestBody.getTripName(), requestBody.getStartDate(),
                            requestBody.getEndDate(), email);
    }

    // 只是开发中测试用的
    @RequestMapping(value = "/trips", method = RequestMethod.GET)
    @ResponseBody
    public List<Trip> getAllTrips(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(false);
        if (session == null) {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            return new ArrayList<>();
        }
        String email = (String) session.getAttribute("email");
        User user = userService.getUserByEmail(email);
        return user.getTripList();
    }

    // 只是开发中测试用的
    @RequestMapping(value = "/trip/{trip_id}", method = RequestMethod.GET)
    @ResponseBody
    public Trip getTrip(@PathVariable("trip_id") int tripId) {
        return tripService.getTrip(tripId);
    }
}
