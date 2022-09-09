package com.laioffer.travelPlanner.controller;

import com.laioffer.travelPlanner.entity.PlaceEntry;
import com.laioffer.travelPlanner.request.AddPlaceEntryRequestBody;
import com.laioffer.travelPlanner.service.PlaceEntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class PlaceEntryController {
    @Autowired
    private PlaceEntryService placeEntryService;

    @RequestMapping(value = "/place", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.CREATED)
    public void addPlaceEntry(@RequestBody AddPlaceEntryRequestBody requestBody) {
        placeEntryService.savePlaceEntry(requestBody.getTripId(), requestBody.getDate(), requestBody.getRapidPlaceId(), requestBody.getTimeBlock());
    }

    @RequestMapping(value = "/place/{entry_id}", method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.OK)
    @ResponseBody
    public PlaceEntry getPlaceEntryByID(@PathVariable("entry_id") int entryId) {
        return placeEntryService.getPlaceEntryByID(entryId);
    }

    @RequestMapping(value = "/place/{entry_id}", method = RequestMethod.DELETE)
    @ResponseStatus(value = HttpStatus.OK)
    public void deletePlaceEntryByID(@PathVariable("entry_id") int entryId) {
        placeEntryService.deletePlaceEntryByID(entryId);
    }
}
