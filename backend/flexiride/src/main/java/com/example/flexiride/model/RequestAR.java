package com.example.flexiride.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "request_a_r")
public class RequestAR {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String vehicleOwnerUsername;
    private String requestUsername;
    private String message;
    private String vehicleName;
    private String pickupDate;
    private String returnDate;
    private Double cost;
    private String pickupTime;

    public RequestAR() {
    }

    public RequestAR(String vehicleOwnerUsername, String requestUsername, String message, String vehicleName,
                     String pickupDate, String returnDate, Double cost, String pickupTime) {
        this.vehicleOwnerUsername = vehicleOwnerUsername;
        this.requestUsername = requestUsername;
        this.message = message;
        this.vehicleName = vehicleName;
        this.pickupDate = pickupDate;
        this.returnDate = returnDate;
        this.cost = cost;
        this.pickupTime = pickupTime;
    }

    // Getters and setters

    public Long getId() {
        return id;
    }

    public String getVehicleOwnerUsername() {
        return vehicleOwnerUsername;
    }

    public void setVehicleOwnerUsername(String vehicleOwnerUsername) {
        this.vehicleOwnerUsername = vehicleOwnerUsername;
    }

    public String getRequestUsername() {
        return requestUsername;
    }

    public void setRequestUsername(String requestUsername) {
        this.requestUsername = requestUsername;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getVehicleName() {
        return vehicleName;
    }

    public void setVehicleName(String vehicleName) {
        this.vehicleName = vehicleName;
    }

    public String getPickupDate() {
        return pickupDate;
    }

    public void setPickupDate(String pickupDate) {
        this.pickupDate = pickupDate;
    }

    public String getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(String returnDate) {
        this.returnDate = returnDate;
    }

    public Double getCost() {
        return cost;
    }

    public void setCost(Double cost) {
        this.cost = cost;
    }

    public String getPickupTime() {
        return pickupTime;
    }

    public void setPickupTime(String pickupTime) {
        this.pickupTime = pickupTime;
    }
}
