package com.travelplanner.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "Daily_Plans")
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DailyPlan implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "daily_plan_id")
    @JsonProperty("daily_plan_id")
    private int dailyPlanId;

    @Column(name = "daily_plan_date")
    @JsonProperty("daily_plan_date")
    private Date dailyPlanDate;

    @ManyToOne
    @JoinColumn(name="trip_id", nullable = false)
    private Trip trip;

    public Trip getTrip() {
        return trip;
    }
    public void setTrip(Trip trip) {
        this.trip = trip;
    }

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy="dailyPlan")
    List<PlaceEntry> placeEntryList = new ArrayList<>();

    public List<PlaceEntry> getPlaceEntrySet() {
        return placeEntryList;
    }

    public void setPlaceEntryList(List<PlaceEntry> placeEntryList) {
        this.placeEntryList = placeEntryList;
    }

    public int getDailyPlanId() {
        return dailyPlanId;
    }

    public void setDailyPlanId(int dailyPlanId) {
        this.dailyPlanId = dailyPlanId;
    }

    public Date getDailyPlanDate() {
        return dailyPlanDate;
    }

    public void setDailyPlanDate(Date dailyPlanDate) {
        this.dailyPlanDate = dailyPlanDate;
    }
}

