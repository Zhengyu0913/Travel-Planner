package com.laioffer.travelPlanner.request;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.laioffer.travelPlanner.entity.TimeBlock;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

public class AddTripRequestBody {
    private final int tripId;
    private final String tripName;
    private final Date startDate;
    private final Date endDate;

    // need revision
    @JsonCreator
    public AddTripRequestBody(@JsonProperty("trip_id") int tripId,
                              @JsonProperty("trip_name") String tripName,
                              @JsonProperty("start_date") @DateTimeFormat(pattern="yyyy-MM-dd") Date startDate,
                              @JsonProperty("end_date") @DateTimeFormat(pattern="yyyy-MM-dd") Date endDate) {
        this.tripId = tripId;
        this.tripName = tripName;
        this.startDate = startDate;
        this.endDate = endDate;
    }
    public int getTripId(){return tripId;}
    public String getTripName() {
        return tripName;
    }

    public Date getStartDate() {
        return startDate;
    }

    public Date getEndDate() {
        return endDate;
    }
}
