package com.example.flexiride.controller;

import com.example.flexiride.model.Vehicle;
import com.example.flexiride.model.User;
import com.example.flexiride.service.VehicleService;
import com.example.flexiride.service.UserService;
import com.example.flexiride.dto.VehicleDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/vehicles")
@CrossOrigin(origins = "*")
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    @Autowired
    private UserService userService;

    @GetMapping
    public List<VehicleDTO> getAllVehicles() {
        List<Vehicle> vehicles = vehicleService.getAllVehicles();
        return vehicles.stream().map(vehicle -> new VehicleDTO(
                vehicle.getId(),
                vehicle.getName(),
                vehicle.getDetails(),
                vehicle.getPrice(),
                vehicle.getCategory(),
                vehicle.getImageUri(),
                vehicle.getBrandName(),
                vehicle.getCity(),
                vehicle.getDistrict(),
                vehicle.getSeatCount(),
                vehicle.getModel(),
                vehicle.getYearOfManufacture(),
                vehicle.getTransmission(),
                vehicle.getFuelType(),
                vehicle.getEngineCapacity(),
                vehicle.getUser() != null ? vehicle.getUser().getUsername() : null
        )).collect(java.util.stream.Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<VehicleDTO> getVehicleById(@PathVariable Long id) {
        Optional<Vehicle> vehicle = vehicleService.getVehicleById(id);
        if (vehicle.isPresent()) {
            Vehicle v = vehicle.get();
            VehicleDTO vehicleDTO = new VehicleDTO(
                    v.getId(),
                    v.getName(),
                    v.getDetails(),
                    v.getPrice(),
                    v.getCategory(),
                    v.getImageUri(),
                    v.getBrandName(),
                    v.getCity(),
                    v.getDistrict(),
                    v.getSeatCount(),
                    v.getModel(),
                    v.getYearOfManufacture(),
                    v.getTransmission(),
                    v.getFuelType(),
                    v.getEngineCapacity(),
                    v.getUser() != null ? v.getUser().getUsername() : null
            );
            return ResponseEntity.ok(vehicleDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<List<Vehicle>> getVehiclesByUsername(@PathVariable String username) {
        Optional<User> userOptional = userService.findByUsername(username);
        if (!userOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        List<Vehicle> vehicles = vehicleService.getVehiclesByUser(userOptional.get());
        return ResponseEntity.ok(vehicles);
    }

    @GetMapping("/district/{district}")
    public ResponseEntity<List<VehicleDTO>> getVehiclesByDistrict(@PathVariable String district) {
        List<Vehicle> vehicles = vehicleService.getVehiclesByDistrict(district);
        List<VehicleDTO> vehicleDTOs = vehicles.stream().map(vehicle -> new VehicleDTO(
                vehicle.getId(),
                vehicle.getName(),
                vehicle.getDetails(),
                vehicle.getPrice(),
                vehicle.getCategory(),
                vehicle.getImageUri(),
                vehicle.getBrandName(),
                vehicle.getCity(),
                vehicle.getDistrict(),
                vehicle.getSeatCount(),
                vehicle.getModel(),
                vehicle.getYearOfManufacture(),
                vehicle.getTransmission(),
                vehicle.getFuelType(),
                vehicle.getEngineCapacity(),
                vehicle.getUser() != null ? vehicle.getUser().getUsername() : null
        )).collect(Collectors.toList());
        return ResponseEntity.ok(vehicleDTOs);
    }

    @PostMapping
    public ResponseEntity<?> createVehicle(@RequestBody Vehicle vehicle) {
        if (vehicle.getUser() == null || vehicle.getUser().getUsername() == null) {
            return ResponseEntity.badRequest().body("Username must be provided");
        }
        Optional<User> userOptional = userService.findByUsername(vehicle.getUser().getUsername());
        if (!userOptional.isPresent()) {
            return ResponseEntity.badRequest().body("Invalid Username");
        }
        vehicle.setUser(userOptional.get());
        Vehicle savedVehicle = vehicleService.saveVehicle(vehicle);
        VehicleDTO vehicleDTO = new VehicleDTO(
                savedVehicle.getId(),
                savedVehicle.getName(),
                savedVehicle.getDetails(),
                savedVehicle.getPrice(),
                savedVehicle.getCategory(),
                savedVehicle.getImageUri(),
                savedVehicle.getBrandName(),
                savedVehicle.getCity(),
                savedVehicle.getDistrict(),
                savedVehicle.getSeatCount(),
                savedVehicle.getModel(),
                savedVehicle.getYearOfManufacture(),
                savedVehicle.getTransmission(),
                savedVehicle.getFuelType(),
                savedVehicle.getEngineCapacity(),
                savedVehicle.getUser() != null ? savedVehicle.getUser().getUsername() : null
        );
        return ResponseEntity.ok(vehicleDTO);
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
