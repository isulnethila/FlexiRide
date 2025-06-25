package com.example.flexiride.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.flexiride.repository.ScheduleRepository;
import com.example.flexiride.model.Schedule;
import com.example.flexiride.model.User;
import com.example.flexiride.model.Vehicle;
import com.example.flexiride.model.Notification;
import com.example.flexiride.repository.VehicleRepository;


import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ScheduleService {
    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private NotificationService notificationService;

    public List<Schedule> getAllSchedules(){
        return scheduleRepository.findAll();
    }

    public Optional<Schedule> getSchedulesById(Long id){
        return scheduleRepository.findById(id);
    }

    public List<Schedule> getSchedulesByUser(User user){
        return scheduleRepository.findByUser(user);
    }


    public Schedule saveSchedule(Schedule schedule) {
        Schedule savedSchedule = scheduleRepository.save(schedule);

        try {
            Long vehicleId = Long.parseLong(schedule.getVehicle());
            Optional<Vehicle> vehicleOptional = vehicleRepository.findById(vehicleId);
            if (vehicleOptional.isPresent()) {
                Vehicle vehicle = vehicleOptional.get();
                User owner = vehicle.getUser();
                if (owner != null) {
                    Notification notification = new Notification();
                    notification.setId(UUID.randomUUID().toString());
                    notification.setType("vehicleRequest");
                    notification.setMessage("Your vehicle is requested");
                    notification.setStatus("Unread");
                    notification.setUserId(schedule.getUser());
                    notification.setVehicleOwnerId(owner.getUsername());
                    notification.setPhoneNumber(schedule.getPhoneNumber());
                    notification.setCost(schedule.getCost());
                    notification.setPickupDate(schedule.getPickupDate().toString());
                    notification.setReturnDate(schedule.getReturnDate().toString());
                    notification.setPickupTime(schedule.getPickupTime());
                    notification.setVehicleName(vehicle.getName());
                    notificationService.saveNotification(notification);
                }
            }
        } catch (NumberFormatException e) {
            // Log or handle invalid vehicle id format
            e.printStackTrace();
        }

        return savedSchedule;
    }

    public void deleteScheduleById(Long id) {
        scheduleRepository.deleteById(id);
    }
}
