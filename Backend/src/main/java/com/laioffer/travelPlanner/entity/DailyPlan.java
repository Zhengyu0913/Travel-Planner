package com.laioffer.travelPlanner.entity;

import com.fasterxml.jackson.annotation.*;

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
    List<PlaceEntry> placeEntryList = new ArrayList<>();

    public Trip getTrip() {
        return trip;
    }

    public void setTrip(Trip trip) {
        this.trip = trip;
    }

    public List<PlaceEntry> getPlaceEntryList() {
        return placeEntryList;
    }

    public void setPlaceEntryList(List<PlaceEntry> placeEntryList) {
        this.placeEntryList = placeEntryList;
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

