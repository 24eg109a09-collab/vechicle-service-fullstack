# Vehicle Service Management System

A full-stack web application designed to manage vehicle service records with full CRUD (Create, Read, Update, Delete) operations.

## Technology Stack

- **Backend**: Java 21, Spring Boot 3.3.4 (Spring Data JPA, Hibernate, Bean Validation)
- **Frontend**: Spring Boot Integrated Static UI, Zero Animations, 100% Offline/Network-Proof
- **Database**: MySQL 8.0 (`vehicle_db`)
- **Security**: Role-Based Access Control (Public Read-Only, Admin Write with Secret PIN)
- **Deployment**: Live Public HTTPS Server via direct TLS tunnel

---

## Live Public Access & Permissions

- **Public Access**: Anyone with your link can view records, search by keyword, filter by service status, and inspect vehicle details.
- **Admin Only Changes**:
  - The **"+ Add New Vehicle"**, **"Edit"**, and **"Delete"** actions are restricted.
  - Only the user who unlocks Admin mode using the **Admin PIN** (`admin123`) can perform vehicle changes.
  - All backend endpoints (`POST`, `PUT`, `DELETE`) require the `X-Admin-Key` header and return `403 Forbidden` for unauthorized users.
  - You can change the PIN anytime in `backend/src/main/resources/application.properties` via `app.admin.pin=<your_pin>`.

---

## Features

- **Full CRUD Capabilities**:
  - **Create**: Register new vehicle records with VIN, Make, Model, Year, License Plate, Owner Details, Service Status, Mileage, and Notes.
  - **Read**: View list of all vehicles, search by keywords, filter by service status, and inspect detailed records.
  - **Update**: Edit existing records with validation checks.
  - **Delete**: Safely delete vehicle records with a confirmation prompt.
- **Service Status Tracking**: Categorize vehicles as `Pending`, `In Progress`, `Completed`, or `Delivered`.
- **Search & Filter**: Real-time filtering by status and instant multi-field search across VIN, License Plate, Owner, Make, and Model.
- **Data Validation**: Strict server-side and client-side validation for mandatory fields, valid manufacturing years, and unique constraints on VIN & License Plates.
- **Seed Data**: Automatically populates 5 realistic sample vehicle records on first startup if the database is empty.
- **Simple & Fast UI**: Clean, accessible layout with crisp contrast and **strictly no animations**.

---

## Project Structure

```
vehicle-service/
├── backend/
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/example/vehicleservice/
│       │   ├── VehicleServiceApplication.java
│       │   ├── config/
│       │   │   ├── WebConfig.java             (CORS configuration)
│       │   │   └── DataInitializer.java       (Database seed data)
│       │   ├── controller/
│       │   │   └── VehicleController.java     (REST API endpoints)
│       │   ├── dto/
│       │   │   └── VehicleRequestDTO.java     (Request validation DTO)
│       │   ├── exception/
│       │   │   ├── BadRequestException.java
│       │   │   ├── ResourceNotFoundException.java
│       │   │   └── GlobalExceptionHandler.java
│       │   ├── model/
│       │   │   └── Vehicle.java               (JPA Entity)
│       │   ├── repository/
│       │   │   └── VehicleRepository.java     (Spring Data JPA queries)
│       │   └── service/
│       │       └── VehicleService.java        (Business logic & CRUD operations)
│       └── resources/
│           └── application.properties         (MySQL database configuration)
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── App.jsx
│       ├── App.css                            (No animations, clean table UI)
│       ├── index.css
│       ├── main.jsx
│       ├── services/
│       │   └── vehicleService.js              (Frontend API client)
│       └── components/
│           ├── Navbar.jsx
│           ├── StatsCards.jsx
│           ├── VehicleList.jsx
│           ├── VehicleFormModal.jsx
│           ├── VehicleDetailsModal.jsx
│           └── DeleteConfirmModal.jsx
├── postman/
│   └── Vehicle_Management_API.postman_collection.json
└── run-app.bat                                (One-click launcher for Windows)
```

---

## MySQL Database Configuration

- **Host**: `localhost:3306`
- **Database**: `vehicle_db`
- **User**: `root`
- **Password**: `12345678`

The configuration can be modified in `backend/src/main/resources/application.properties`. Hibernate automatically creates and updates the `vehicles` table schema.

---

## REST API Endpoints

Base URL: `http://localhost:8080/api/vehicles`

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/vehicles` | Get all vehicles (optional params: `search`, `status`) |
| `GET` | `/api/vehicles/{id}` | Get single vehicle by ID |
| `GET` | `/api/vehicles/stats` | Get statistics summary by status |
| `POST` | `/api/vehicles` | Create new vehicle record |
| `PUT` | `/api/vehicles/{id}` | Update existing vehicle record |
| `DELETE` | `/api/vehicles/{id}` | Delete vehicle record by ID |

### Sample Vehicle Request JSON Body
```json
{
  "vin": "1HGCR2F83HA123456",
  "make": "Honda",
  "model": "Accord",
  "year": 2021,
  "licensePlate": "ABC-7890",
  "ownerName": "Robert Smith",
  "ownerContact": "+1-555-0101",
  "serviceStatus": "In Progress",
  "mileage": 34500,
  "notes": "Brake pads replacement and oil change"
}
```

---

## Running with Postman

1. Open **Postman**.
2. Click **Import** in the top-left corner.
3. Select the file: `postman/Vehicle_Management_API.postman_collection.json`.
4. The collection contains all CRUD requests pre-configured with the `{{baseUrl}}` variable pointing to `http://localhost:8080`.

---

## How to Run the Application

### Option 1: Direct Spring Boot All-In-One (Recommended - No Network or Node Dependency)
Simply double-click `run-app.bat` or run:
```bash
cd backend
java -jar target\vehicleservice-0.0.1-SNAPSHOT.jar
```
Open **[http://localhost:8080](http://localhost:8080)** in your browser.
Both the frontend and REST APIs are served directly by Spring Boot on port 8080. Zero CORS, zero multi-port issues, zero network dependencies.

### Option 2: React Dev Server (Optional)
If you wish to run the standalone React Vite dev server:
```bash
cd frontend
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.
