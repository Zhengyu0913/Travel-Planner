package com.laioffer.travelPlanner.service;

import com.laioffer.travelPlanner.dao.TripDAO;
import com.laioffer.travelPlanner.entity.DailyPlan;
import com.laioffer.travelPlanner.entity.PlaceEntry;
import com.laioffer.travelPlanner.entity.Trip;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class TripService {
    @Autowired
    private TripDAO tripDAO;
    @Autowired
    private UserService userService;

    @Autowired
    private DailyPlanService dailyPlanService;

    @Autowired
    private PlaceEntryService placeEntryService;

    public void saveTrip(int tripId, String tripName, Date startDate, Date endDate, User user) {
        Trip trip = new Trip();
        trip.setId(tripId);
        trip.setName(tripName);
        trip.setStartDate(startDate);
        trip.setEndDate(endDate);
        trip.setUser(user);
        // iterate through startDate to endDate and save DailyPlan's
        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);
        List<LocalDate> totalDates = new ArrayList<>();
        while (!start.isAfter(end)) {
            totalDates.add(start);
            start = start.plusDays(1);
        }
        for(LocalDate date : totalDates){
            Date curDate = Date.from(date.atStartOfDay(ZoneId.systemDefault()).toInstant());
            dailyPlanService.saveDailyPlan(tripId,curDate);
        }
        tripDAO.saveTrip(trip);
    }

    public Trip getTrip(int tripId) {
        return tripDAO.getTripByID(tripId);
    }

    public Trip deleteTrip(int tripId) {
        Trip trip = this.getTrip(tripId);

        // delete all daily plans associated with the trip
        List<DailyPlan> dailyPlans = trip.getDailyPlanList();
        for (DailyPlan dailyPlan : dailyPlans) {
            // delete all the place entries associated with the daily plans
            List<PlaceEntry> placeEntries = dailyPlan.getPlaceEntrySet();
            for (PlaceEntry placeEntry : placeEntries) {
                placeEntryService.deletePlaceEntryByID(placeEntry.getId());
            }
            dailyPlanService.clearDailyPlan(dailyPlan.getId());
        }

        tripDAO.deleteTrip(trip);
        return trip;
    }
}
