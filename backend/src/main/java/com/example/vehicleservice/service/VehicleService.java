package com.example.vehicleservice.service;

import com.example.vehicleservice.dto.VehicleRequestDTO;
import com.example.vehicleservice.exception.BadRequestException;
import com.example.vehicleservice.exception.ResourceNotFoundException;
import com.example.vehicleservice.model.Vehicle;
import com.example.vehicleservice.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class VehicleService {

    private final VehicleRepository vehicleRepository;

    @Autowired
    public VehicleService(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    @Transactional(readOnly = true)
    public List<Vehicle> getAllVehicles(String search, String status) {
        String cleanSearch = (search != null && !search.trim().isEmpty()) ? search.trim() : null;
        String cleanStatus = (status != null && !status.trim().isEmpty() && !status.equalsIgnoreCase("ALL")) ? status.trim() : null;
        return vehicleRepository.searchVehicles(cleanSearch, cleanStatus);
    }

    @Transactional(readOnly = true)
    public Vehicle getVehicleById(Long id) {
        return vehicleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vehicle not found with ID: " + id));
    }

    public Vehicle createVehicle(VehicleRequestDTO dto) {
        String vin = dto.getVin().trim().toUpperCase();
        String licensePlate = dto.getLicensePlate().trim().toUpperCase();

        if (vehicleRepository.existsByVin(vin)) {
            throw new BadRequestException("A vehicle with VIN '" + vin + "' already exists.");
        }
        if (vehicleRepository.existsByLicensePlate(licensePlate)) {
            throw new BadRequestException("A vehicle with License Plate '" + licensePlate + "' already exists.");
        }

        Vehicle vehicle = new Vehicle();
        copyDtoToEntity(dto, vehicle);
        vehicle.setVin(vin);
        vehicle.setLicensePlate(licensePlate);

        return vehicleRepository.save(vehicle);
    }

    public Vehicle updateVehicle(Long id, VehicleRequestDTO dto) {
        Vehicle vehicle = getVehicleById(id);

        String vin = dto.getVin().trim().toUpperCase();
        String licensePlate = dto.getLicensePlate().trim().toUpperCase();

        if (vehicleRepository.existsByVinAndIdNot(vin, id)) {
            throw new BadRequestException("A vehicle with VIN '" + vin + "' already exists.");
        }
        if (vehicleRepository.existsByLicensePlateAndIdNot(licensePlate, id)) {
            throw new BadRequestException("A vehicle with License Plate '" + licensePlate + "' already exists.");
        }

        copyDtoToEntity(dto, vehicle);
        vehicle.setVin(vin);
        vehicle.setLicensePlate(licensePlate);

        return vehicleRepository.save(vehicle);
    }

    public void deleteVehicle(Long id) {
        Vehicle vehicle = getVehicleById(id);
        vehicleRepository.delete(vehicle);
    }

    @Transactional(readOnly = true)
    public Map<String, Long> getVehicleStats() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("total", vehicleRepository.count());
        stats.put("pending", vehicleRepository.countByServiceStatusIgnoreCase("Pending"));
        stats.put("inProgress", vehicleRepository.countByServiceStatusIgnoreCase("In Progress"));
        stats.put("completed", vehicleRepository.countByServiceStatusIgnoreCase("Completed"));
        stats.put("delivered", vehicleRepository.countByServiceStatusIgnoreCase("Delivered"));
        return stats;
    }

    private void copyDtoToEntity(VehicleRequestDTO dto, Vehicle vehicle) {
        vehicle.setMake(dto.getMake().trim());
        vehicle.setModel(dto.getModel().trim());
        vehicle.setYear(dto.getYear());
        vehicle.setOwnerName(dto.getOwnerName().trim());
        vehicle.setOwnerContact(dto.getOwnerContact().trim());
        vehicle.setServiceStatus(dto.getServiceStatus().trim());
        vehicle.setMileage(dto.getMileage());
        vehicle.setNotes(dto.getNotes() != null ? dto.getNotes().trim() : null);
    }
}
