package com.example.vehicleservice.controller;

import com.example.vehicleservice.dto.VehicleRequestDTO;
import com.example.vehicleservice.model.Vehicle;
import com.example.vehicleservice.service.VehicleService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/vehicles")
@CrossOrigin(originPatterns = "*")
public class VehicleController {

    private final VehicleService vehicleService;

    @Value("${app.admin.pin:admin123}")
    private String configuredAdminPin;

    @Autowired
    public VehicleController(VehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }

    private void validateAdminAccess(String providedKey) {
        if (configuredAdminPin != null && !configuredAdminPin.isBlank()) {
            if (providedKey == null || !providedKey.trim().equals(configuredAdminPin.trim())) {
                throw new ResponseStatusException(
                        HttpStatus.FORBIDDEN,
                        "Unauthorized: Valid Admin PIN is required to make vehicle changes."
                );
            }
        }
    }

    @PostMapping("/verify-admin")
    public ResponseEntity<Map<String, Object>> verifyAdminPin(@RequestBody Map<String, String> body) {
        String enteredPin = body.get("pin");
        boolean isValid = configuredAdminPin != null && configuredAdminPin.equals(enteredPin != null ? enteredPin.trim() : null);
        Map<String, Object> resp = new HashMap<>();
        resp.put("valid", isValid);
        resp.put("message", isValid ? "Admin authenticated successfully." : "Invalid Admin PIN.");
        return ResponseEntity.ok(resp);
    }

    @GetMapping
    public ResponseEntity<List<Vehicle>> getAllVehicles(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String status) {
        List<Vehicle> vehicles = vehicleService.getAllVehicles(search, status);
        return ResponseEntity.ok(vehicles);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vehicle> getVehicleById(@PathVariable Long id) {
        Vehicle vehicle = vehicleService.getVehicleById(id);
        return ResponseEntity.ok(vehicle);
    }

    @PostMapping
    public ResponseEntity<Vehicle> createVehicle(
            @RequestHeader(value = "X-Admin-Key", required = false) String adminKey,
            @Valid @RequestBody VehicleRequestDTO requestDTO) {
        validateAdminAccess(adminKey);
        Vehicle created = vehicleService.createVehicle(requestDTO);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Vehicle> updateVehicle(
            @PathVariable Long id,
            @RequestHeader(value = "X-Admin-Key", required = false) String adminKey,
            @Valid @RequestBody VehicleRequestDTO requestDTO) {
        validateAdminAccess(adminKey);
        Vehicle updated = vehicleService.updateVehicle(id, requestDTO);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteVehicle(
            @PathVariable Long id,
            @RequestHeader(value = "X-Admin-Key", required = false) String adminKey) {
        validateAdminAccess(adminKey);
        vehicleService.deleteVehicle(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Vehicle record deleted successfully with ID: " + id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Long>> getVehicleStats() {
        return ResponseEntity.ok(vehicleService.getVehicleStats());
    }
}
