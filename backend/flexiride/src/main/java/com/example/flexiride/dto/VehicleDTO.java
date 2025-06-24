package com.example.flexiride.dto;

public class VehicleDTO {
    private Long id;
    private String name;
    private String details;
    private String price;
    private String category;
    private String imageUri;
    private String brandName;
    private String city;
    private String district;
    private Integer seatCount;
    private String model;
    private Integer yearOfManufacture;
    private String transmission;
    private String fuelType;
    private String engineCapacity;
    private String username;

    public VehicleDTO() {}

    public VehicleDTO(Long id, String name, String details, String price, String category, String imageUri, String brandName,
                      String city, String district, Integer seatCount, String model, Integer yearOfManufacture,
                      String transmission, String fuelType, String engineCapacity, String username) {
        this.id = id;
        this.name = name;
        this.details = details;
        this.price = price;
        this.category = category;
        this.imageUri = imageUri;
        this.brandName = brandName;
        this.city = city;
        this.district = district;
        this.seatCount = seatCount;
        this.model = model;
        this.yearOfManufacture = yearOfManufacture;
        this.transmission = transmission;
        this.fuelType = fuelType;
        this.engineCapacity = engineCapacity;
        this.username = username;
    }

    // Getters and setters for all fields

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getImageUri() {
        return imageUri;
    }

    public void setImageUri(String imageUri) {
        this.imageUri = imageUri;
    }

    public String getBrandName() {
        return brandName;
    }

    public void setBrandName(String brandName) {
        this.brandName = brandName;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public Integer getSeatCount() {
        return seatCount;
    }

    public void setSeatCount(Integer seatCount) {
        this.seatCount = seatCount;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public Integer getYearOfManufacture() {
        return yearOfManufacture;
    }

    public void setYearOfManufacture(Integer yearOfManufacture) {
        this.yearOfManufacture = yearOfManufacture;
    }

    public String getTransmission() {
        return transmission;
    }

    public void setTransmission(String transmission) {
        this.transmission = transmission;
    }

    public String getFuelType() {
        return fuelType;
    }

    public void setFuelType(String fuelType) {
        this.fuelType = fuelType;
    }

    public String getEngineCapacity() {
        return engineCapacity;
    }

    public void setEngineCapacity(String engineCapacity) {
        this.engineCapacity = engineCapacity;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
