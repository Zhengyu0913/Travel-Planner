package com.laioffer.travelPlanner.request;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.laioffer.travelPlanner.entity.TimeBlock;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

public class AddPlaceEntryRequestBody {
    private final String tripId;
    private final Date date;
    private final TimeBlock timeBlock;
    private final String rapidPlaceId;
    private final double latitude;
    private final double longitude;

    @JsonCreator
    public AddPlaceEntryRequestBody(@JsonProperty("trip_id") String tripId,
                                    @JsonProperty("date") @DateTimeFormat(pattern="yyyy-MM-dd") Date date,
                                    @JsonProperty("time_block") TimeBlock timeBlock,
                                    @JsonProperty("rapid_place_id") String rapidPlaceId,
                                    @JsonProperty("latitude") double latitude,
                                    @JsonProperty("longitude") double longitude) {
        this.tripId = tripId;
        this.date = date;
        this.timeBlock = timeBlock;
        this.rapidPlaceId = rapidPlaceId;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public String getTripId() {
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

    public double getLatitude() { return latitude; }

    public double getLongitude() { return longitude; }
}
