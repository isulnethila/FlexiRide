package com.example.flexiride.repository;

import com.example.flexiride.model.Vehicle;
import com.example.flexiride.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    List<Vehicle> findByUser(User user);
    List<Vehicle> findByDistrict(String district);
}
