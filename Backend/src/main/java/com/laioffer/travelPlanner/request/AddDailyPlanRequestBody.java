package com.laioffer.travelPlanner.request;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

public class AddDailyPlanRequestBody {
    private final String tripId;
    private final Date date;

    @JsonCreator
    public AddDailyPlanRequestBody(@JsonProperty("trip_id") String tripId,
                                   @JsonProperty("date") @DateTimeFormat(pattern="yyyy-MM-dd") Date date) {
        this.tripId = tripId;
        this.date = date;
    }

    public String getTripId() {
        return tripId;
    }

    public Date getDate() {
        return date;
    }
}
