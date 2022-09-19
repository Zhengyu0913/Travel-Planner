package com.laioffer.travelPlanner.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.annotations.Formula;

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

    @Column(name = "place_entry_name")
    @JsonProperty("place_entry_name")
    private String placeEntryName;

    @Column(name = "rapid_place_id")
    @JsonProperty("rapid_place_id")
    private String rapidPlaceId;

    @Column(name = "time_block")
    @JsonProperty("time_block")
    @Enumerated(EnumType.STRING)
    private TimeBlock timeBlock;

    @Formula("FIELD(time_block, 'BREAKFAST', 'MORNING', 'LUNCH', 'AFTERNOON', 'DINNER', 'NIGHT', 'STAY')")
    private String timeBlockSort;

    @Column(name = "latitude")
    @JsonProperty("lat")
    private double latitude;

    @Column(name = "longitude")
    @JsonProperty("lng")
    private double longitude;

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

    public void setTimeBlock(TimeBlock timeBlock) { this.timeBlock = timeBlock; }

    public String getRapidPlaceId() {
        return rapidPlaceId;
    }

    public void setRapidPlaceId(String rapidPlaceId) {
        this.rapidPlaceId = rapidPlaceId;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public String getPlaceEntryName() { return placeEntryName; }

    public void setPlaceEntryName(String placeEntryName) { this.placeEntryName = placeEntryName; }

    public String getTimeBlockSort() { return timeBlockSort; }

    public void setTimeBlockSort(String timeBlockSort) { this.timeBlockSort = timeBlockSort; }

    public void setLatitude(double latitude) { this.latitude = latitude; }

    public void setLongitude(double longitude) { this.longitude = longitude; }
}
