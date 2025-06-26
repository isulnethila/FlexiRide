package com.example.flexiride.service;

import com.example.flexiride.model.Notification;
import com.example.flexiride.repository.NotificationRepository;
import com.example.flexiride.service.UserService;
import com.example.flexiride.dto.NotificationWithUserNameDTO;
import com.example.flexiride.model.User;
import com.example.flexiride.repository.VehicleRepository;
import com.example.flexiride.model.Vehicle;
import com.example.flexiride.repository.RequestARRepository;
import com.example.flexiride.model.RequestAR;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private RequestARRepository requestARRepository;

    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }

    public Optional<Notification> getNotificationById(String id) {
        return notificationRepository.findById(id);
    }

    public List<Notification> getNotificationsByUserId(String userId) {
        return notificationRepository.findByUserId(userId);
    }

    public List<Notification> getNotificationsByVehicleOwnerId(String vehicleOwnerId) {
        return notificationRepository.findByVehicleOwnerId(vehicleOwnerId);
    }

    public Notification saveNotification(Notification notification) {
        return notificationRepository.save(notification);
    }

    public void deleteNotification(String id) {
        notificationRepository.deleteById(id);
    }

    public List<NotificationWithUserNameDTO> getAllNotificationsWithUserName() {
        List<Notification> notifications = notificationRepository.findAll();
        return notifications.stream().map(notification -> {
            String userName = "";
            String vehicleName = notification.getVehicleName();
            try {
                if (notification.getVehicleOwnerId() != null) {
                    Long vehicleOwnerIdLong = Long.parseLong(notification.getVehicleOwnerId());
                    Optional<User> userOpt = userService.getUserById(vehicleOwnerIdLong);
                    if (userOpt.isPresent()) {
                        userName = userOpt.get().getUsername();
                        // Enrich vehicleName for Vehicle Request notifications if null
                        if ("Vehicle Request".equalsIgnoreCase(notification.getType()) && (vehicleName == null || vehicleName.isEmpty())) {
                            List<Vehicle> vehicles = vehicleRepository.findByUser(userOpt.get());
                            if (!vehicles.isEmpty()) {
                                vehicleName = vehicles.get(0).getName();
                            }
                        }
                    }
                }
            } catch (NumberFormatException e) {
                // Log or handle invalid vehicleOwnerId format
            }
            return new NotificationWithUserNameDTO(
                notification.getId(),
                notification.getType(),
                notification.getMessage(),
                notification.getStatus(),
                notification.getUserId(),
                notification.getVehicleOwnerId(),
                notification.getPhoneNumber(),
                notification.getCost(),
                notification.getPickupDate(),
                notification.getReturnDate(),
                notification.getPickupTime(),
                vehicleName,
                userName
            );
        }).collect(Collectors.toList());
    }

    public Optional<Notification> acceptNotification(String id) {
        Optional<Notification> notificationOpt = notificationRepository.findById(id);
        if (notificationOpt.isPresent()) {
            Notification notification = notificationOpt.get();
            notification.setStatus("accepted");
            notificationRepository.save(notification);

            // Get usernames directly from the notification if available
            String vehicleOwnerUsername = notification.getVehicleOwnerId();
            String requestUsername = notification.getUserId();

            // If they're numeric IDs, try to convert to usernames
            try {
                if (vehicleOwnerUsername != null && vehicleOwnerUsername.matches("\\d+")) {
                    Long ownerId = Long.parseLong(vehicleOwnerUsername);
                    Optional<User> ownerOpt = userService.getUserById(ownerId);
                    if (ownerOpt.isPresent()) {
                        vehicleOwnerUsername = ownerOpt.get().getUsername();
                    }
                }

                if (requestUsername != null && requestUsername.matches("\\d+")) {
                    Long requesterId = Long.parseLong(requestUsername);
                    Optional<User> requesterOpt = userService.getUserById(requesterId);
                    if (requesterOpt.isPresent()) {
                        requestUsername = requesterOpt.get().getUsername();
                    }
                }
            } catch (NumberFormatException e) {
                // Handle conversion error
            }

            String vehicleName = notification.getVehicleName();
            String pickupDate = notification.getPickupDate();
            String returnDate = notification.getReturnDate();
            Double cost = notification.getCost() != null ? notification.getCost().doubleValue() : 0.0;
            String pickupTime = notification.getPickupTime();

            RequestAR requestAR = new RequestAR(
                vehicleOwnerUsername,
                requestUsername,
                "user request is accepted",
                vehicleName,
                pickupDate,
                returnDate,
                cost,
                pickupTime
            );
            requestARRepository.save(requestAR);

            return Optional.of(notification);
        }
        return Optional.empty();
    }

    public Optional<Notification> rejectNotification(String id) {
        Optional<Notification> notificationOpt = notificationRepository.findById(id);
        if (notificationOpt.isPresent()) {
            Notification notification = notificationOpt.get();
            notification.setStatus("rejected");
            notificationRepository.save(notification);

            // Get usernames directly from the notification if available
            String vehicleOwnerUsername = notification.getVehicleOwnerId();
            String requestUsername = notification.getUserId();

            // If they're numeric IDs, try to convert to usernames
            try {
                if (vehicleOwnerUsername != null && vehicleOwnerUsername.matches("\\d+")) {
                    Long ownerId = Long.parseLong(vehicleOwnerUsername);
                    Optional<User> ownerOpt = userService.getUserById(ownerId);
                    if (ownerOpt.isPresent()) {
                        vehicleOwnerUsername = ownerOpt.get().getUsername();
                    }
                }

                if (requestUsername != null && requestUsername.matches("\\d+")) {
                    Long requesterId = Long.parseLong(requestUsername);
                    Optional<User> requesterOpt = userService.getUserById(requesterId);
                    if (requesterOpt.isPresent()) {
                        requestUsername = requesterOpt.get().getUsername();
                    }
                }
            } catch (NumberFormatException e) {
                // Handle conversion error
            }

            String vehicleName = notification.getVehicleName();
            String pickupDate = notification.getPickupDate();
            String returnDate = notification.getReturnDate();
            Double cost = notification.getCost() != null ? notification.getCost().doubleValue() : 0.0;
            String pickupTime = notification.getPickupTime();

            RequestAR requestAR = new RequestAR(
                vehicleOwnerUsername,
                requestUsername,
                "user request is reject",
                vehicleName,
                pickupDate,
                returnDate,
                cost,
                pickupTime
            );
            requestARRepository.save(requestAR);

            return Optional.of(notification);
        }
        return Optional.empty();
    }

    // New method to create notification with userId and vehicleOwnerId
    public Notification createNotification(Notification notification) {
        return notificationRepository.save(notification);
    }

    // Helper method to get username from userId
    private String getUsernameFromUserId(String userId) {
        if (userId == null || userId.isEmpty()) {
            return "";
        }
        try {
            Long userIdLong = Long.parseLong(userId);
            Optional<User> userOpt = userService.getUserById(userIdLong);
            return userOpt.map(User::getUsername).orElse("");
        } catch (NumberFormatException e) {
            return "";
        }
    }
}
