package com.laioffer.travelPlanner.service;

import com.laioffer.travelPlanner.dao.DailyPlanDAO;
import com.laioffer.travelPlanner.dao.PlaceEntryDAO;
import com.laioffer.travelPlanner.entity.DailyPlan;
import com.laioffer.travelPlanner.entity.PlaceEntry;
import com.laioffer.travelPlanner.entity.TimeBlock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class PlaceEntryService {
    @Autowired
    private PlaceEntryDAO placeEntryDAO;
    @Autowired
    private DailyPlanDAO dailyPlanDao;

    public void savePlaceEntry(String tripId, Date date, String rapidPlaceId, TimeBlock timeBlock,
                               double latitude, double longitude) {
        DailyPlan dailyPlan = dailyPlanDao.getDailyPlanByTripIDAndDate(tripId, date);

        if (dailyPlan != null) {
            PlaceEntry placeEntry = new PlaceEntry();
            placeEntry.setRapidPlaceId(rapidPlaceId);
            placeEntry.setDailyPlan(dailyPlan);
            placeEntry.setTimeBlock(timeBlock);
            placeEntry.setLatitude(latitude);
            placeEntry.setLongitude(longitude);

            placeEntryDAO.savePlaceEntry(placeEntry);
        }
    }

    public PlaceEntry getPlaceEntryByID(int placeEntryId) {
        return placeEntryDAO.getPlaceEntryByID(placeEntryId);
    }

    public void deletePlaceEntryByID(int placeEntryId) {
        PlaceEntry placeEntry = placeEntryDAO.getPlaceEntryByID(placeEntryId);
        if (placeEntry != null) {
            placeEntryDAO.deletePlaceEntry(placeEntry);
        }
    }
}
