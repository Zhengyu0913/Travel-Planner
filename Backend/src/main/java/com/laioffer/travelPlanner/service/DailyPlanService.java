package com.laioffer.travelPlanner.service;

import com.laioffer.travelPlanner.dao.DailyPlanDAO;
import com.laioffer.travelPlanner.dao.PlaceEntryDAO;
import com.laioffer.travelPlanner.dao.TripDAO;
import com.laioffer.travelPlanner.entity.DailyPlan;
import com.laioffer.travelPlanner.entity.PlaceEntry;
import com.laioffer.travelPlanner.entity.Trip;
import com.laioffer.travelPlanner.entity.TimeBlock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

@Service
public class DailyPlanService {

    @Autowired
    private DailyPlanDAO dailyPlanDAO;
    @Autowired
    private TripDAO tripDAO;
    @Autowired
    private PlaceEntryDAO placeEntryDAO;

    public void saveDailyPlan(int tripId, Date date) {
        Trip trip = tripDAO.getTripByID(tripId);

        // trip might be null
        DailyPlan dailyPlan = new DailyPlan();
        dailyPlan.setDate(date);
        dailyPlan.setTrip(trip);
        dailyPlanDAO.saveDailyPlan(dailyPlan);
    }

    public DailyPlan getDailyPlanById(int dailyPlanId) {
        return dailyPlanDAO.getDailyPlanById(dailyPlanId);
    }

    public void deleteDailyPlanById(int dailyPlanId) {
        DailyPlan dailyPlan = getDailyPlanById(dailyPlanId);
        if (dailyPlan != null) {
            dailyPlanDAO.deleteDailyPlan(dailyPlan);
        }
    }

    public void clearDailyPlan(int dailyPlanId) {
        DailyPlan dailyPlan = dailyPlanDAO.getDailyPlanById(dailyPlanId);
        List<PlaceEntry> placeEntryList = dailyPlan.getPlaceEntryList();
        Iterator<PlaceEntry> i = placeEntryList.iterator();
        while (i.hasNext()) {
            PlaceEntry placeEntry = i.next();
            i.remove();
            placeEntryDAO.deletePlaceEntry(placeEntry);
        }
    }

    public void clearDailyPlanByTimeBlock(int dailyPlanId, TimeBlock timeBlock) {
        DailyPlan dailyPlan = dailyPlanDAO.getDailyPlanById(dailyPlanId);
        List<PlaceEntry> placeEntryList = dailyPlan.getPlaceEntryList();
        Iterator<PlaceEntry> i = placeEntryList.iterator();
        while (i.hasNext()) {
            PlaceEntry placeEntry = i.next();
            if (placeEntry.getTimeBlock() == timeBlock) {
                i.remove();
                placeEntryDAO.deletePlaceEntry(placeEntry);
            }
        }
    }

}
