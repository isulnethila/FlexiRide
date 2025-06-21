package com.example.flexiride.service;

import com.example.flexiride.model.Vehicle;
import com.example.flexiride.model.User;
import com.example.flexiride.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    public Optional<Vehicle> getVehicleById(Long id) {
        return vehicleRepository.findById(id);
    }

    public List<Vehicle> getVehiclesByUser(User user) {
        return vehicleRepository.findByUser(user);
    }

    public List<Vehicle> getVehiclesByDistrict(String district) {
        return vehicleRepository.findByDistrict(district);
    }

    public Vehicle saveVehicle(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    public void deleteVehicle(Long id) {
        vehicleRepository.deleteById(id);
    }
}
