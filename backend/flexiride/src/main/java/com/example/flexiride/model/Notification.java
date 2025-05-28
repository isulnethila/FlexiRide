package com.example.flexiride.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Notification {

    @Id
    private String id;

    private String type;
    private String message;
    private String status;

    public Notification() {
    }

    public Notification(String id, String type, String message, String status) {
        this.id = id;
        this.type = type;
        this.message = message;
        this.status = status;
    }

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
}
