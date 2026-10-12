package com.example.vehicleservice.config;

import com.example.vehicleservice.model.Vehicle;
import com.example.vehicleservice.repository.VehicleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(VehicleRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                List<Vehicle> sampleVehicles = List.of(
                        new Vehicle(
                                "MAT621354N1234567",
                                "Tata",
                                "Nexon EV",
                                2023,
                                "MH 02 FA 8821",
                                "Aarav Mehta",
                                "+91 98201 14523",
                                "In Progress",
                                14500,
                                "Battery diagnostics and brake pad inspection"
                        ),
                        new Vehicle(
                                "MAL532187K9876543",
                                "Hyundai",
                                "Creta SX(O)",
                                2022,
                                "DL 01 CX 4321",
                                "Ananya Roy",
                                "+91 98765 43210",
                                "Pending",
                                22400,
                                "Periodic service, oil filter and AC coil cleaning"
                        ),
                        new Vehicle(
                                "MA1TA2AA5M1357924",
                                "Mahindra",
                                "Thar 4x4",
                                2023,
                                "KA 05 MN 9012",
                                "Kabir Singhania",
                                "+91 99302 87411",
                                "Completed",
                                18200,
                                "Suspension check, wheel balancing and engine tuning"
                        ),
                        new Vehicle(
                                "WBA3A5C50DF901234",
                                "BMW",
                                "330i Gran Limousine",
                                2023,
                                "TS 09 EU 1999",
                                "Rhea Kulkarni",
                                "+91 98190 65432",
                                "Pending",
                                9800,
                                "Brake fluid replacement and software diagnostics"
                        ),
                        new Vehicle(
                                "MAK456123P7654321",
                                "Kia",
                                "Seltos GT Line",
                                2022,
                                "TN 07 BE 5672",
                                "Ishaan Verma",
                                "+91 97654 32109",
                                "Delivered",
                                26500,
                                "Full synthetic oil change and transmission service"
                        ),
                        new Vehicle(
                                "MBJ11AB45P0123456",
                                "Toyota",
                                "Fortuner 4x4 Legender",
                                2023,
                                "HR 26 DQ 9900",
                                "Devansh Singhal",
                                "+91 98112 34567",
                                "In Progress",
                                31200,
                                "40,000 km paid service, brake pads replacement, differential oil check, and wheel balancing"
                        ),
                        new Vehicle(
                                "MA3ERB11SN0456789",
                                "Maruti Suzuki",
                                "Swift ZXi+",
                                2022,
                                "MH 12 QK 4004",
                                "Tara Deshmukh",
                                "+91 99203 45678",
                                "Completed",
                                19400,
                                "Annual periodic maintenance, Mobil 1 0W-20 engine oil, spark plug cleaning, and AC filter change"
                        ),
                        new Vehicle(
                                "MA1TA2AA7P1987654",
                                "Mahindra",
                                "XUV700 AX7L AWD",
                                2023,
                                "KA 01 MJ 7777",
                                "Rohan Kapoor",
                                "+91 97314 56789",
                                "Pending",
                                15800,
                                "ADAS calibration check, panoramic sunroof greasing, and AdBlue level top-up"
                        ),
                        new Vehicle(
                                "MEXA11SK5R0345678",
                                "Volkswagen",
                                "Virtus GT Plus 1.5 TSI",
                                2023,
                                "KL 07 CD 2023",
                                "Siddharth Nambiar",
                                "+91 98405 67890",
                                "In Progress",
                                11500,
                                "DSG transmission fluid inspection, suspension link rod check under warranty, and ECU scan"
                        ),
                        new Vehicle(
                                "MAT621354R0567890",
                                "Tata",
                                "Safari Red Dark Edition",
                                2024,
                                "DL 3C CE 8821",
                                "Tanvi Aggarwal",
                                "+91 98101 23456",
                                "Pending",
                                7200,
                                "Second free service, brake disc inspection, tire rotation, and monsoon underbody anti-rust coating"
                        ),
                        new Vehicle(
                                "W1K2060421F123456",
                                "Mercedes-Benz",
                                "C200 Edition C",
                                2022,
                                "GJ 01 BW 5533",
                                "Aditya Rane",
                                "+91 99090 12345",
                                "Delivered",
                                24800,
                                "B-Service completed: synthetic engine oil, oil filter, brake fluid flush, and multi-point safety inspection"
                        )
                );

                repository.saveAll(sampleVehicles);
                System.out.println("Initialized database with 11 authentic Indian vehicle records.");
            }
        };
    }
}
