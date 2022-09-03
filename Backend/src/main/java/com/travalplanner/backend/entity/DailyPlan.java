package com.travalplanner.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "Daily_Plans")
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DailyPlan implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "daily_plan_id")
    @JsonProperty("daily_plan_id")
    private String dailyPlanId;

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
    Set<PlaceEntry> placeEntrySet = new HashSet<>();

    public Set<PlaceEntry> getDailyPlanSet() {
        return placeEntrySet;
    }

    public void setPlaceEntrySet(Set<PlaceEntry> placeEntrySet) {
        this.placeEntrySet = placeEntrySet;
    }

    public String getDailyPlanId() {
        return dailyPlanId;
    }

    public void setDailyPlanId(String dailyPlanId) {
        this.dailyPlanId = dailyPlanId;
    }

    public Date getDailyPlanDate() {
        return dailyPlanDate;
    }

    public void setDailyPlanDate(Date dailyPlanDate) {
        this.dailyPlanDate = dailyPlanDate;
    }
}

