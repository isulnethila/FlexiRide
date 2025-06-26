package com.example.flexiride.dto;

public class RequestARDTO {
    private Double cost;
    private String pickupDate;
    private String pickupTime;
    private String vehicleName;
    private String requestUsername;
    private String vehicleOwnerUsername;

    public RequestARDTO() {
    }

    public RequestARDTO(Double cost, String pickupDate, String pickupTime, String vehicleName, String requestUsername, String vehicleOwnerUsername) {
        this.cost = cost;
        this.pickupDate = pickupDate;
        this.pickupTime = pickupTime;
        this.vehicleName = vehicleName;
        this.requestUsername = requestUsername;
        this.vehicleOwnerUsername = vehicleOwnerUsername;
    }

    public Double getCost() {
        return cost;
    }

    public void setCost(Double cost) {
        this.cost = cost;
    }

    public String getPickupDate() {
        return pickupDate;
    }

    public void setPickupDate(String pickupDate) {
        this.pickupDate = pickupDate;
    }

    public String getPickupTime() {
        return pickupTime;
    }

    public void setPickupTime(String pickupTime) {
        this.pickupTime = pickupTime;
    }

    public String getVehicleName() {
        return vehicleName;
    }

    public void setVehicleName(String vehicleName) {
        this.vehicleName = vehicleName;
    }

    public String getRequestUsername() {
        return requestUsername;
    }

    public void setRequestUsername(String requestUsername) {
        this.requestUsername = requestUsername;
    }

    public String getVehicleOwnerUsername() {
        return vehicleOwnerUsername;
    }

    public void setVehicleOwnerUsername(String vehicleOwnerUsername) {
        this.vehicleOwnerUsername = vehicleOwnerUsername;
    }
}
