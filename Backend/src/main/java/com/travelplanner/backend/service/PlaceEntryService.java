package com.travelplanner.backend.service;

import com.travelplanner.backend.dao.PlaceEntryDAO;
import com.travelplanner.backend.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class PlaceEntryService {
//    @Autowired
//    private PlaceEntryDAO placeEntryDAO;
//
//    @Autowired
//    private DailyPlanService dailyPlanService;
//
//    @Autowired
//    private UserService userService;
//
//    public void savePlaceEntry(String placeId, int dailyplanId, Timeblock timeblock) {
//        final PlaceEntry placeEntry = new PlaceEntry();
//        final DailyPlan dailyPlan = dailyPlanService.getDailyPlan(dailyplanId);
//
//        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
//        String email = loggedInUser.getName();
//        User user = userService.getUser(email);
//
//        if (user != null) {
//            placeEntry.setGPlaceId(placeId);
//            placeEntry.setDailyPlan(dailyPlan);
//            placeEntry.setTimeblock(timeblock);
//        }
//        placeEntryDAO.save(placeEntry);
//    }
//
//    public PlaceEntry getPlaceEntry(int tripId, int dailyPlanId, int placeEntryId) {
//            Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
//        String email = loggedInUser.getName();
//        User user = userService.getUser(email);
//        Trip trip = null;
//        DailyPlan dailyPlan = null;
//        if (user != null) {
//            Set<Trip> tripSet = user.getTripSet();
//            for (Trip tmp: tripSet) {
//                if (tmp.getTripId() == tripId) {
//                    trip = tmp;
//                }
//            }
//            Set<DailyPlan> dailyPlans = trip.getDailyPlanSet();
//            for (DailyPlan tmp : dailyPlans) {
//                if (tmp.getDailyPlanId() == dailyPlanId) {
//                    dailyPlan = tmp;
//                }
//            }
//            Set<PlaceEntry> placeEntrySet = dailyPlan.getPlaceEntrySet();
//            for (PlaceEntry entry : placeEntrySet) {
//                if (entry.getPlaceEntryId() == placeEntryId) {
//                    return entry;
//                }
//            }
//        }
//        return new PlaceEntry();
//    }

    public void deletePlaceEntry(int placeEntryId) {
//        placeEntryDAO.deletePlaceEntry(placeEntryId);
    }
}
