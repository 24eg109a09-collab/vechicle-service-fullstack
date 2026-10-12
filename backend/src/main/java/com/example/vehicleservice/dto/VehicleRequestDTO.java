package com.example.vehicleservice.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class VehicleRequestDTO {

    @NotBlank(message = "VIN is required")
    @Size(min = 11, max = 17, message = "VIN must be between 11 and 17 characters")
    private String vin;

    @NotBlank(message = "Make is required")
    @Size(max = 50, message = "Make cannot exceed 50 characters")
    private String make;

    @NotBlank(message = "Model is required")
    @Size(max = 50, message = "Model cannot exceed 50 characters")
    private String model;

    @NotNull(message = "Year is required")
    @Min(value = 1900, message = "Year must be 1900 or later")
    @Max(value = 2100, message = "Year must be a valid future or present year")
    private Integer year;

    @NotBlank(message = "License plate is required")
    @Size(max = 20, message = "License plate cannot exceed 20 characters")
    private String licensePlate;

    @NotBlank(message = "Owner name is required")
    @Size(max = 100, message = "Owner name cannot exceed 100 characters")
    private String ownerName;

    @NotBlank(message = "Owner contact is required")
    @Size(max = 50, message = "Owner contact cannot exceed 50 characters")
    private String ownerContact;

    @NotBlank(message = "Service status is required")
    private String serviceStatus;

    @Min(value = 0, message = "Mileage cannot be negative")
    private Integer mileage;

    @Size(max = 500, message = "Notes cannot exceed 500 characters")
    private String notes;

    public VehicleRequestDTO() {
    }

    public String getVin() {
        return vin;
    }

    public void setVin(String vin) {
        this.vin = vin;
    }

    public String getMake() {
        return make;
    }

    public void setMake(String make) {
        this.make = make;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public String getLicensePlate() {
        return licensePlate;
    }

    public void setLicensePlate(String licensePlate) {
        this.licensePlate = licensePlate;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public String getOwnerContact() {
        return ownerContact;
    }

    public void setOwnerContact(String ownerContact) {
        this.ownerContact = ownerContact;
    }

    public String getServiceStatus() {
        return serviceStatus;
    }

    public void setServiceStatus(String serviceStatus) {
        this.serviceStatus = serviceStatus;
    }

    public Integer getMileage() {
        return mileage;
    }

    public void setMileage(Integer mileage) {
        this.mileage = mileage;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
