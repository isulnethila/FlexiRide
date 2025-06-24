package com.example.flexiride.model;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

import jakarta.persistence.Id;
import jakarta.persistence.Column;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String user;
    private String vehicle;

    @Column(name = "vehicle_user_id")
    @JsonProperty("vehicleUserId")
    private String vehicleUserId;

    private Date pickupDate;
    private Date returnDate;
    private String pickupTime;
    private int cost;
    private String phoneNumber;

    public Schedule() {
    }

    public Schedule(String user, String vehicle, String vehicleUserId, Date pickupDate, Date returnDate, String pickupTime, int cost,
            String phoneNumber) {
        this.user = user;
        this.vehicle = vehicle;
        this.vehicleUserId = vehicleUserId;
        this.pickupDate = pickupDate;
        this.returnDate = returnDate;
        this.pickupTime = pickupTime;
        this.cost = cost;
        this.phoneNumber = phoneNumber;
    }

    public Long getId() {
        return id;
    }

    public String getUser() {
        return user;
    }

    public String getVehicle() {
        return vehicle;
    }

    public String getVehicleUserId() {
        return vehicleUserId;
    }

    public Date getPickupDate() {
        return pickupDate;
    }

    public Date getReturnDate() {
        return returnDate;
    }

    public String getPickupTime() {
        return pickupTime;
    }

    public int getCost() {
        return cost;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public void setVehicle(String vehicle) {
        this.vehicle = vehicle;
    }

    public void setVehicleUserId(String vehicleUserId) {
        this.vehicleUserId = vehicleUserId;
    }

    public void setPickupDate(Date pickupDate) {
        this.pickupDate = pickupDate;
    }

    public void setReturnDate(Date returnDate) {
        this.returnDate = returnDate;
    }

    public void setPickupTime(String pickupTime) {
        this.pickupTime = pickupTime;
    }

    public void setCost(int cost) {
        this.cost = cost;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}
