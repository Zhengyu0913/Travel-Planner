package com.laioffer.travelPlanner.entity;

import com.fasterxml.jackson.annotation.*;

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
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty("trip_id")
    private int id;

    @Column(name = "trip_name")
    @JsonProperty("trip_name")
    private String tripName;

    @Column(name = "start_date")
    @JsonProperty("start_date")
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date startDate;

    @Column(name = "end_date")
    @JsonProperty("end_date")
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date endDate;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "email", nullable = false)
    private User user;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy="trip")
    List<DailyPlan> dailyPlanList = new ArrayList<>();

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<DailyPlan> getDailyPlanList() {
        return dailyPlanList;
    }

    public void setDailyPlanList(List<DailyPlan> dailyPlanList) {
        this.dailyPlanList = dailyPlanList;
    }

    public int getId() {
        return id;
    }

    public void setId(int tripId) {
        this.id = tripId;
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
