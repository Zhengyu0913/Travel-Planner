package com.laioffer.travelPlanner.entity;

import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.*;

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
    private String name;

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
    Set<DailyPlan> dailyPlanSet = new HashSet<>();

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<DailyPlan> getDailyPlanSet() {
        return dailyPlanSet;
    }

    public void setDailyPlanSet(Set<DailyPlan> dailyPlanSet) {
        this.dailyPlanSet = dailyPlanSet;
    }

    public int getId() {
        return id;
    }

    public void setId(int tripId) {
        this.id = tripId;
    }

    public String getName() {
        return name;
    }

    public void setName(String tripName) {
        this.name = tripName;
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
