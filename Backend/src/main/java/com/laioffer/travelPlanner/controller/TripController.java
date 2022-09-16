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
import java.util.Date;
import java.util.List;
import java.util.Set;

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
        User user = userService.getUserByEmail(email);

        tripService.saveTrip(requestBody.getTripId(),requestBody.getTripName(), requestBody.getStartDate(),
                            requestBody.getEndDate(), user);
    }

    // 只是开发中测试用的
    @RequestMapping(value = "/trips", method = RequestMethod.GET)
    @ResponseBody
    public Set<Trip> getAllTrips(HttpServletRequest request, HttpServletResponse response) {
        if (!userService.isLoggedIn(request, response)) return null;
        String email = (String) request.getSession(false).getAttribute("email");
        User user = userService.getUserByEmail(email);
        return user.getTripSet();
    }

    // 只是开发中测试用的
    @RequestMapping(value = "/trip/{trip_id}", method = RequestMethod.GET)
    @ResponseBody
    public Trip getTrip(@PathVariable("trip_id") int tripId, HttpServletRequest request, HttpServletResponse response) {
        if (!userService.isLoggedIn(request, response)) return null;
        return tripService.getTrip(tripId);
    }

    //delete trip
    @RequestMapping(value = "/trip/{trip_id}", method = RequestMethod.DELETE)
    @ResponseBody
    public List<Trip> deleteTrip(@PathVariable("trip_id") int tripId,
                                HttpServletRequest request, HttpServletResponse response){
        HttpSession session = request.getSession(false);
        if (session == null) {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            return new ArrayList<>();
        }


        Trip deletedTrip = tripService.deleteTrip(tripId);
        User user = deletedTrip.getUser();
        return user.getTripSet();
    }

    //create trip
    @RequestMapping(value = "/trip/{trip_id}", method = RequestMethod.POST)
    @ResponseBody
    public List<Trip> createTrip(@PathVariable("trip_id") int tripId,
                                 @PathVariable("trip_name") String tripName,
                                 @PathVariable("start_date") Date startDate,
                                 @PathVariable("end_date") Date endDate,
                                 HttpServletRequest request, HttpServletResponse response){
        HttpSession session = request.getSession(false);
        if (session == null) {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            return null;
        }

        String email = (String) session.getAttribute("email");
        User user = userService.getUserByEmail(email);

        tripService.saveTrip(tripId, tripName, startDate, endDate, user);

        return user.getTripSet();
    }
}
