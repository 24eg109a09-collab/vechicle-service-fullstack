package com.example.vehicleservice.repository;

import com.example.vehicleservice.model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

    Optional<Vehicle> findByVin(String vin);

    Optional<Vehicle> findByLicensePlate(String licensePlate);

    boolean existsByVin(String vin);

    boolean existsByVinAndIdNot(String vin, Long id);

    boolean existsByLicensePlate(String licensePlate);

    boolean existsByLicensePlateAndIdNot(String licensePlate, Long id);

    List<Vehicle> findByServiceStatusIgnoreCase(String serviceStatus);

    @Query("SELECT v FROM Vehicle v WHERE " +
           "(:status IS NULL OR LOWER(v.serviceStatus) = LOWER(:status)) AND " +
           "(:search IS NULL OR " +
           "LOWER(v.vin) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(v.make) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(v.model) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(v.licensePlate) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(v.ownerName) LIKE LOWER(CONCAT('%', :search, '%'))) " +
           "ORDER BY v.id DESC")
    List<Vehicle> searchVehicles(@Param("search") String search, @Param("status") String status);

    long countByServiceStatusIgnoreCase(String serviceStatus);
}
