package com.example.flexiride.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.example.flexiride.service.ScheduleService;
import com.example.flexiride.model.Schedule;
import com.example.flexiride.model.User;
import com.example.flexiride.service.UserService;
import com.example.flexiride.service.NotificationService;
import com.example.flexiride.model.Notification;
import com.example.flexiride.service.VehicleService;
import com.example.flexiride.model.Vehicle;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/schedule")
@CrossOrigin(origins = "*")
public class ScheduleController {

    @Autowired
    private ScheduleService scheduleService;

    @Autowired
    private UserService userService;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private VehicleService vehicleService;

    @GetMapping
    public List<Schedule> getAllSchedules(){
        return scheduleService.getAllSchedules();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Schedule> getVehicleById(@PathVariable Long id){
        Optional<Schedule> schedule= scheduleService.getSchedulesById(id);
        if(schedule.isPresent()){
            return ResponseEntity.ok(schedule.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<List<Schedule>> getScheduleByUsername(@PathVariable String username){
        Optional<User> userOptional=userService.findByUsername(username);
        if(!userOptional.isPresent()){
            return ResponseEntity.notFound().build();
        }
        List<Schedule> schedules=scheduleService.getSchedulesByUser(userOptional.get());
        return ResponseEntity.ok(schedules);
    }

    @PostMapping
    public ResponseEntity<Schedule> createSchedule(@RequestBody Schedule schedule) {
        Schedule createdSchedule = scheduleService.saveSchedule(schedule);

        Notification notification = new Notification();
        notification.setId(java.util.UUID.randomUUID().toString());
        notification.setUserId(schedule.getUser());
        notification.setMessage("Your schedule has been created successfully.");
        notification.setType("Schedule");
        notification.setStatus("Unread");
        notification.setVehicleOwnerId(schedule.getVehicleUserId());
        notification.setPhoneNumber(schedule.getPhoneNumber());
        notification.setCost(schedule.getCost());
        notification.setPickupDate(schedule.getPickupDate() != null ? schedule.getPickupDate().toString() : null);
        notification.setReturnDate(schedule.getReturnDate() != null ? schedule.getReturnDate().toString() : null);
        notification.setPickupTime(schedule.getPickupTime());

        // Fetch vehicle name
        String vehicleName = null;
        try {
            Long vehicleId = Long.parseLong(schedule.getVehicle());
            Optional<Vehicle> vehicleOpt = vehicleService.getVehicleById(vehicleId);
            if (vehicleOpt.isPresent()) {
                vehicleName = vehicleOpt.get().getName();
            }
        } catch (NumberFormatException e) {
            // handle invalid vehicle format
        }
        notification.setVehicleName(vehicleName);

        notificationService.saveNotification(notification);

        return new ResponseEntity<>(createdSchedule, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Schedule> updateSchedule(@PathVariable Long id, @RequestBody Schedule scheduleDetails) {
        Optional<Schedule> optionalSchedule = scheduleService.getSchedulesById(id);
        if (!optionalSchedule.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        Schedule scheduleToUpdate = optionalSchedule.get();
        scheduleToUpdate.setUser(scheduleDetails.getUser());
        scheduleToUpdate.setVehicle(scheduleDetails.getVehicle());
        scheduleToUpdate.setPickupDate(scheduleDetails.getPickupDate());
        scheduleToUpdate.setReturnDate(scheduleDetails.getReturnDate());
        scheduleToUpdate.setPickupTime(scheduleDetails.getPickupTime());
        scheduleToUpdate.setCost(scheduleDetails.getCost());
        scheduleToUpdate.setPhoneNumber(scheduleDetails.getPhoneNumber());

        Schedule updatedSchedule = scheduleService.saveSchedule(scheduleToUpdate);

        Notification notification = new Notification();
        notification.setId(java.util.UUID.randomUUID().toString());
        notification.setUserId(scheduleToUpdate.getUser());
        notification.setMessage("Your schedule has been updated successfully.");
        notification.setType("Schedule");
        notification.setStatus("Unread");
        notification.setVehicleOwnerId(scheduleToUpdate.getVehicleUserId());
        notification.setPhoneNumber(scheduleToUpdate.getPhoneNumber());
        notification.setCost(scheduleToUpdate.getCost());
        notification.setPickupDate(scheduleToUpdate.getPickupDate() != null ? scheduleToUpdate.getPickupDate().toString() : null);
        notification.setReturnDate(scheduleToUpdate.getReturnDate() != null ? scheduleToUpdate.getReturnDate().toString() : null);
        notification.setPickupTime(scheduleToUpdate.getPickupTime());

        // Fetch vehicle name
        String vehicleName = null;
        try {
            Long vehicleId = Long.parseLong(scheduleToUpdate.getVehicle());
            Optional<Vehicle> vehicleOpt = vehicleService.getVehicleById(vehicleId);
            if (vehicleOpt.isPresent()) {
                vehicleName = vehicleOpt.get().getName();
            }
        } catch (NumberFormatException e) {
            // handle invalid vehicle format
        }
        notification.setVehicleName(vehicleName);

        notificationService.saveNotification(notification);

        return ResponseEntity.ok(updatedSchedule);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSchedule(@PathVariable Long id) {
        Optional<Schedule> optionalSchedule = scheduleService.getSchedulesById(id);
        if (!optionalSchedule.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Schedule scheduleToDelete = optionalSchedule.get();

        Notification notification = new Notification();
        notification.setId(java.util.UUID.randomUUID().toString());
        notification.setUserId(scheduleToDelete.getUser());
        notification.setMessage("Your schedule has been deleted successfully.");
        notification.setType("Schedule");
        notification.setStatus("Unread");
        notification.setVehicleOwnerId(scheduleToDelete.getVehicleUserId());
        notification.setPhoneNumber(scheduleToDelete.getPhoneNumber());
        notification.setCost(scheduleToDelete.getCost());
        notification.setPickupDate(scheduleToDelete.getPickupDate() != null ? scheduleToDelete.getPickupDate().toString() : null);
        notification.setReturnDate(scheduleToDelete.getReturnDate() != null ? scheduleToDelete.getReturnDate().toString() : null);
        notification.setPickupTime(scheduleToDelete.getPickupTime());

        // Fetch vehicle name
        String vehicleName = null;
        try {
            Long vehicleId = Long.parseLong(scheduleToDelete.getVehicle());
            Optional<Vehicle> vehicleOpt = vehicleService.getVehicleById(vehicleId);
            if (vehicleOpt.isPresent()) {
                vehicleName = vehicleOpt.get().getName();
            }
        } catch (NumberFormatException e) {
            // handle invalid vehicle format
        }
        notification.setVehicleName(vehicleName);

        notificationService.saveNotification(notification);

        scheduleService.deleteScheduleById(id);
        return ResponseEntity.noContent().build();
    }
}
