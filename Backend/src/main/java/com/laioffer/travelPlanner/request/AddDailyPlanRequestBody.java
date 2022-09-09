package com.laioffer.travelPlanner.request;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

public class AddDailyPlanRequestBody {
    private final int tripId;
    private final Date date;

    @JsonCreator
    public AddDailyPlanRequestBody(@JsonProperty("trip_id") int tripId,
                                   @JsonProperty("date") @DateTimeFormat(pattern="yyyy-MM-dd") Date date) {
        this.tripId = tripId;
        this.date = date;
    }

    public int getTripId() {
        return tripId;
    }

    public Date getDate() {
        return date;
    }
}
