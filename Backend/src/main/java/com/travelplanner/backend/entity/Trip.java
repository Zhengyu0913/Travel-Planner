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
@Table(name = "Trips")
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Trip implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "trip_id")
    @JsonProperty("trip_id")
    private int tripId;

    @Column(name = "trip_name")
    @JsonProperty("trip_name")
    private String tripName;

    @Column(name = "start_date")
    @JsonProperty("start_date")
    private Date startDate;

    @Column(name = "end_date")
    @JsonProperty("end_date")
    private Date endDate;

    @ManyToOne
    @JoinColumn(name="user_id", nullable = false)
    private User user;

    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy="trip")
    List<DailyPlan> dailyPlanList = new ArrayList<>();

    public List<DailyPlan> getDailyPlanList() {
        return dailyPlanList;
    }

    public void setDailyPlanList(List<DailyPlan> dailyPlanList) {
        this.dailyPlanList = dailyPlanList;
    }

    public int getTripId() {
        return tripId;
    }

    public void setTripId(int tripId) {
        this.tripId = tripId;
    }

    public String getTripName() {
        return tripName;
    }

    public void setTripName(String tripName) {
        this.tripName = tripName;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }
}
