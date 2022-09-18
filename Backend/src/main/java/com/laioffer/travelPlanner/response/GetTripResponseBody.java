package com.laioffer.travelPlanner.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.laioffer.travelPlanner.entity.DailyPlan;

import java.util.Date;
import java.util.List;

public class GetTripResponseBody {
    @JsonProperty("trip_id")
    private final String tripId;
    @JsonProperty("trip_name")
    private final String tripName;
    @JsonProperty("start_date")
    @JsonFormat(pattern="yyyy-MM-dd")
    private final Date startDate;
    @JsonProperty("end_date")
    @JsonFormat(pattern="yyyy-MM-dd")
    private final Date endDate;
    @JsonProperty("daily_plans")
    private final List<DailyPlan> dailyPlanList;

    public GetTripResponseBody(String tripId, String tripName, Date startDate, Date endDate, List<DailyPlan> dailyPlanList) {
        this.tripId = tripId;
        this.tripName = tripName;
        this.startDate = startDate;
        this.endDate = endDate;
        this.dailyPlanList = dailyPlanList;
    }

    public String getTripId() {
        return tripId;
    }

    public String getTripName() {
        return tripName;
    }

    public Date getStartDate() {
        return startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public List<DailyPlan> getDailyPlanList() {
        return dailyPlanList;
    }
}
