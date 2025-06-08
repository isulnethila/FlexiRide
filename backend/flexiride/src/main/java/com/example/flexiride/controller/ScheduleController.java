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
import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/api/schedule")
@CrossOrigin(origins = "*")
public class ScheduleController {

    @Autowired
    private ScheduleService scheduleService;

    @Autowired
    private UserService userService;

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
        return ResponseEntity.ok(updatedSchedule);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSchedule(@PathVariable Long id) {
        Optional<Schedule> optionalSchedule = scheduleService.getSchedulesById(id);
        if (!optionalSchedule.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        scheduleService.deleteScheduleById(id);
        return ResponseEntity.noContent().build();
    }
}
