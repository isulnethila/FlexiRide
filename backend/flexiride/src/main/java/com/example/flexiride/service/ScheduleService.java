package com.example.flexiride.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.flexiride.repository.ScheduleRepository;
import com.example.flexiride.model.Schedule;
import com.example.flexiride.model.User;

import java.util.List;
import java.util.Optional;
@Service
public class ScheduleService {
    @Autowired
    private ScheduleRepository scheduleRepository;

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
        return scheduleRepository.save(schedule);
    }

    public void deleteScheduleById(Long id) {
        scheduleRepository.deleteById(id);
    }
}
