package com.laioffer.travelPlanner.request;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.laioffer.travelPlanner.entity.TimeBlock;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

public class AddPlaceEntryRequestBody {
    private final int tripId;
    private final Date date;
    private final TimeBlock timeBlock;
    private final String rapidPlaceId;

    @JsonCreator
    public AddPlaceEntryRequestBody(@JsonProperty("trip_id") int tripId,
                                    @JsonProperty("date") @DateTimeFormat(pattern="yyyy-MM-dd") Date date,
                                    @JsonProperty("time_block") TimeBlock timeBlock,
                                    @JsonProperty("rapid_place_id") String rapidPlaceId) {
        this.tripId = tripId;
        this.date = date;
        this.timeBlock = timeBlock;
        this.rapidPlaceId = rapidPlaceId;
    }

    public int getTripId() {
        return tripId;
    }

    public Date getDate() {
        return date;
    }

    public TimeBlock getTimeBlock() {
        return timeBlock;
    }

    public String getRapidPlaceId() {
        return rapidPlaceId;
    }
}
