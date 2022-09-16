package com.laioffer.travelPlanner.controller;

import com.laioffer.travelPlanner.entity.PlaceEntry;
import com.laioffer.travelPlanner.request.AddPlaceEntryRequestBody;
import com.laioffer.travelPlanner.service.PlaceEntryService;
import com.laioffer.travelPlanner.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
public class PlaceEntryController {
    @Autowired
    private PlaceEntryService placeEntryService;
    @Autowired
    private UserService userService;

    @RequestMapping(value = "/place", method = RequestMethod.POST)
    public void addPlaceEntry(@RequestBody AddPlaceEntryRequestBody requestBody, HttpServletRequest request, HttpServletResponse response) {
        if (!userService.isLoggedIn(request, response)) return;
        placeEntryService.savePlaceEntry(requestBody.getTripId(), requestBody.getDate(),
                requestBody.getRapidPlaceId(), requestBody.getTimeBlock(),
                requestBody.getLatitude(), requestBody.getLongitude());
    }

    @RequestMapping(value = "/place/{entry_id}", method = RequestMethod.GET)
    @ResponseBody
    public PlaceEntry getPlaceEntryByID(@PathVariable("entry_id") int entryId, HttpServletRequest request, HttpServletResponse response) {
        if (!userService.isLoggedIn(request, response)) return null;
        return placeEntryService.getPlaceEntryByID(entryId);
    }

    @RequestMapping(value = "/place/{entry_id}", method = RequestMethod.DELETE)
    public void deletePlaceEntryByID(@PathVariable("entry_id") int entryId, HttpServletRequest request, HttpServletResponse response) {
        if (!userService.isLoggedIn(request, response)) return;
        placeEntryService.deletePlaceEntryByID(entryId);
    }
}
