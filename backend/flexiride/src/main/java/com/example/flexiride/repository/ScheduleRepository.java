package com.example.flexiride.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.flexiride.model.Schedule;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    
}
