package com.laioffer.travelPlanner.entity;

import com.fasterxml.jackson.annotation.*;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

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
    @JsonProperty("trip_id")
    private String id;

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
    @Fetch(FetchMode.SUBSELECT)
    @JsonIgnore
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

    public String getId() {
        return id;
    }

    public void setId(String tripId) {
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
