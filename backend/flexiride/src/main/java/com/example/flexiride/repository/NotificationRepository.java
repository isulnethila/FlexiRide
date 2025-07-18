package com.example.flexiride.repository;

import com.example.flexiride.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, String> {
    List<Notification> findByUserId(String userId);

    List<Notification> findByVehicleOwnerId(String vehicleOwnerId);
}
