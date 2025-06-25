package com.example.flexiride.dto;

public class NotificationWithUserNameDTO {
    private String id;
    private String type;
    private String message;
    private String status;
    private String userId;
    private String vehicleOwnerId;
    private String phoneNumber;
    private Integer cost;
    private String pickupDate;
    private String returnDate;
    private String pickupTime;
    private String vehicleName;
    private String userName;

    public NotificationWithUserNameDTO() {
    }

    public NotificationWithUserNameDTO(String id, String type, String message, String status, String userId, String vehicleOwnerId, String phoneNumber, Integer cost, String pickupDate, String returnDate, String pickupTime, String vehicleName, String userName) {
        this.id = id;
        this.type = type;
        this.message = message;
        this.status = status;
        this.userId = userId;
        this.vehicleOwnerId = vehicleOwnerId;
        this.phoneNumber = phoneNumber;
        this.cost = cost;
        this.pickupDate = pickupDate;
        this.returnDate = returnDate;
        this.pickupTime = pickupTime;
        this.vehicleName = vehicleName;
        this.userName = userName;
    }

    // Getters and setters for all fields

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getVehicleOwnerId() {
        return vehicleOwnerId;
    }

    public void setVehicleOwnerId(String vehicleOwnerId) {
        this.vehicleOwnerId = vehicleOwnerId;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Integer getCost() {
        return cost;
    }

    public void setCost(Integer cost) {
        this.cost = cost;
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

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}
