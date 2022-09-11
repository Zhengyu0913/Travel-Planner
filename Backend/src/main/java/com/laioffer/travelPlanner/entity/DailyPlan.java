package com.laioffer.travelPlanner.entity;

import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.*;

@Entity
@Table(name = "Daily_Plans")
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DailyPlan implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty("daily_plan_id")
    private int id;

    @JsonProperty("daily_plan_date")
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date date;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "trip_id", nullable = false)
    private Trip trip;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy="dailyPlan")
    Set<PlaceEntry> placeEntrySet = new HashSet<>();

    public Trip getTrip() {
        return trip;
    }

    public void setTrip(Trip trip) {
        this.trip = trip;
    }

    public Set<PlaceEntry> getPlaceEntrySet() {
        return placeEntrySet;
    }

    public void setPlaceEntrySet(Set<PlaceEntry> placeEntrySet) {
        this.placeEntrySet = this.placeEntrySet;
    }

    public int getId() {
        return id;
    }

    public void setId(int dailyPlanId) {
        this.id = dailyPlanId;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date dailyPlanDate) {
        this.date = dailyPlanDate;
    }
}

