package com.laioffer.travelPlanner.service;

import com.laioffer.travelPlanner.dao.TripDAO;
import com.laioffer.travelPlanner.entity.Trip;
import com.laioffer.travelPlanner.entity.User;
import com.laioffer.travelPlanner.util.Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.List;

@Service
public class TripService {

    @Autowired
    private TripDAO tripDAO;
    @Autowired
    private DailyPlanService dailyPlanService;
    public Util util;

    public void saveTrip(String tripId, String tripName, Date startDate, Date endDate, User user) {
        // create new trip
        Trip trip = new Trip();
        trip.setId(tripId);
        trip.setName(tripName);
        trip.setStartDate(startDate);
        trip.setEndDate(endDate);
        trip.setUser(user);
        tripDAO.saveTrip(trip);

        // generate all dates and create corresponding daily plans
        List<Date> dateList = util.createDateList(trip.getStartDate(), trip.getEndDate());
        for (Date date : dateList) {
            dailyPlanService.saveDailyPlan(tripId, date);
        }
    }

    public Trip getTrip(String tripId) {
        return tripDAO.getTripByID(tripId);
    }

    public void deleteTrip(String tripId) {
        Trip trip = getTrip(tripId);
        tripDAO.deleteTrip(trip);
    }
}
