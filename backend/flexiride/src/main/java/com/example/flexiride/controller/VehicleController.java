package com.example.flexiride.controller;

import com.example.flexiride.model.Vehicle;
import com.example.flexiride.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/vehicles")
@CrossOrigin(origins = "*")
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    @GetMapping
    public List<Vehicle> getAllVehicles() {
        return vehicleService.getAllVehicles();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vehicle> getVehicleById(@PathVariable Long id) {
        Optional<Vehicle> vehicle = vehicleService.getVehicleById(id);
        if (vehicle.isPresent()) {
            return ResponseEntity.ok(vehicle.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public Vehicle createVehicle(@RequestBody Vehicle vehicle) {
        return vehicleService.saveVehicle(vehicle);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Vehicle> updateVehicle(@PathVariable Long id, @RequestBody Vehicle vehicleDetails) {
        Optional<Vehicle> vehicleOptional = vehicleService.getVehicleById(id);
        if (vehicleOptional.isPresent()) {
            Vehicle vehicle = vehicleOptional.get();
            vehicle.setName(vehicleDetails.getName());
            vehicle.setDetails(vehicleDetails.getDetails());
            vehicle.setPrice(vehicleDetails.getPrice());
            vehicle.setCategory(vehicleDetails.getCategory());
            vehicle.setImageUri(vehicleDetails.getImageUri());
            vehicle.setBrandName(vehicleDetails.getBrandName());
            vehicle.setCity(vehicleDetails.getCity());
            vehicle.setDistrict(vehicleDetails.getDistrict());
            vehicle.setSeatCount(vehicleDetails.getSeatCount());
            vehicle.setModel(vehicleDetails.getModel());
            vehicle.setYearOfManufacture(vehicleDetails.getYearOfManufacture());
            vehicle.setTransmission(vehicleDetails.getTransmission());
            vehicle.setFuelType(vehicleDetails.getFuelType());
            vehicle.setEngineCapacity(vehicleDetails.getEngineCapacity());
            Vehicle updatedVehicle = vehicleService.saveVehicle(vehicle);
            return ResponseEntity.ok(updatedVehicle);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVehicle(@PathVariable Long id) {
        Optional<Vehicle> vehicle = vehicleService.getVehicleById(id);
        if (vehicle.isPresent()) {
            vehicleService.deleteVehicle(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
