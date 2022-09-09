package com.laioffer.travelPlanner.service;

import com.laioffer.travelPlanner.dao.TripDAO;
import com.laioffer.travelPlanner.entity.Trip;
import com.laioffer.travelPlanner.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class TripService {
    @Autowired
    private TripDAO tripDAO;
    @Autowired
    private UserService userService;

    public void saveTrip(String tripName, Date startDate, Date endDate, String email) {
        User user = userService.getUserByEmail(email);
        if (user != null) {
            Trip trip = new Trip();
            trip.setTripName(tripName);
            trip.setStartDate(startDate);
            trip.setEndDate(endDate);
            trip.setUser(user);
            tripDAO.saveTrip(trip);
        }
    }

    public Trip getTrip(int tripId) {
        return tripDAO.getTripByID(tripId);
    }
}
