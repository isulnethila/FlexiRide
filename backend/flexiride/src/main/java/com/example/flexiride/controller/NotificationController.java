package com.example.flexiride.controller;

import com.example.flexiride.model.Notification;
import com.example.flexiride.service.NotificationService;
import com.example.flexiride.dto.NotificationWithUserNameDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @GetMapping
    public List<Notification> getAllNotifications() {
        return notificationService.getAllNotifications();
    }

    @GetMapping("/allWithUserName")
    public List<NotificationWithUserNameDTO> getAllNotificationsWithUserName() {
        return notificationService.getAllNotificationsWithUserName();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Notification> getNotificationById(@PathVariable String id) {
        Optional<Notification> notification = notificationService.getNotificationById(id);
        return notification.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public List<Notification> getNotificationsByUserId(@PathVariable String userId) {
        return notificationService.getNotificationsByUserId(userId);
    }

    @GetMapping("/vehicleOwner/{vehicleOwnerId}")
    public List<Notification> getNotificationsByVehicleOwnerId(@PathVariable String vehicleOwnerId) {
        return notificationService.getNotificationsByVehicleOwnerId(vehicleOwnerId);
    }

    @PostMapping
    public Notification createNotification(@RequestBody Notification notification) {
        return notificationService.saveNotification(notification);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Notification> updateNotification(@PathVariable String id, @RequestBody Notification notificationDetails) {
        Optional<Notification> notificationOptional = notificationService.getNotificationById(id);
        if (notificationOptional.isPresent()) {
            Notification notification = notificationOptional.get();
            notification.setType(notificationDetails.getType());
            notification.setMessage(notificationDetails.getMessage());
            notification.setStatus(notificationDetails.getStatus());
            Notification updatedNotification = notificationService.saveNotification(notification);
            return ResponseEntity.ok(updatedNotification);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotification(@PathVariable String id) {
        Optional<Notification> notification = notificationService.getNotificationById(id);
        if (notification.isPresent()) {
            notificationService.deleteNotification(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
