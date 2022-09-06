package com.travelplanner.backend.controller;

import com.travelplanner.backend.entity.Timeblock;
import com.travelplanner.backend.service.PlaceEntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class PlaceEntryController {
    @Autowired
    private PlaceEntryService placeEntryService;

    @RequestMapping(value = "/place/{placeId}/dailyplan/{dailyplanId}/timeblock/{timeblock}", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.CREATED)
    public void addToDailyPlan(@PathVariable("placeId") String placeId,
                               @PathVariable("dailyplanId") int dailyplanId, @PathVariable("timeblock") Timeblock timeblock) {
        placeEntryService.savePlaceEntry(placeId, dailyplanId, timeblock);
    }

    @RequestMapping(value = "/trip/{tripId}/dailyplan/{dailyplanId}/placeentry/{placeentryId}", method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.OK)
    @ResponseBody
    public void getPlaceEntry(@PathVariable("tripId") int tripId, @PathVariable ("daiplanId") int dailyplanId,
                              @PathVariable("placeentryId") int placeentryId) {
        placeEntryService.getPlaceEntry(tripId, dailyplanId, placeentryId);
    }

    @RequestMapping(value = "/delete/placeentry/{placeentryId}", method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.OK)
    @ResponseBody
    public void deletePlaceEntry(@PathVariable("placeentryId") int placeentryId) {
        placeEntryService.deletePlaceEntry(placeentryId);
    }
}
