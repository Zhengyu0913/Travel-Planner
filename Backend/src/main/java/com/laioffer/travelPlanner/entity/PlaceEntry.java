package com.laioffer.travelPlanner.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "Place_Entries")
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PlaceEntry implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty("place_entry_id")
    private int id;

    @Column(name = "rapid_place_id")
    @JsonProperty("rapid_place_id")
    private String rapidPlaceId;

    @Column(name = "time_block")
    @Enumerated(value = EnumType.STRING)
    @JsonProperty("time_block")
    private TimeBlock timeBlock;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "daily_plan_id", nullable = false)
    private DailyPlan dailyPlan;

    public DailyPlan getDailyPlan() {
        return dailyPlan;
    }
    public void setDailyPlan(DailyPlan dailyPlan) {
        this.dailyPlan = dailyPlan;
    }

    public int getId() {
        return id;
    }

    public void setId(int placeEntryId) {
        this.id = placeEntryId;
    }

    public TimeBlock getTimeBlock() { return timeBlock; }

    public void setTimeBlock(TimeBlock timeblock) { this.timeBlock = timeblock; }

    public String getRapidPlaceId() {
        return rapidPlaceId;
    }

    public void setRapidPlaceId(String rapidPlaceId) {
        this.rapidPlaceId = rapidPlaceId;
    }
}
