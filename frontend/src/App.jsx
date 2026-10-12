import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import StatsCards from './components/StatsCards';
import VehicleList from './components/VehicleList';
import VehicleFormModal from './components/VehicleFormModal';
import VehicleDetailsModal from './components/VehicleDetailsModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import { vehicleService } from './services/vehicleService';
import './App.css';

export default function App() {
  const [vehicles, setVehicles] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, inProgress: 0, completed: 0, delivered: 0 });
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Notification banners
  const [notification, setNotification] = useState(null);

  // Modals state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [viewingVehicle, setViewingVehicle] = useState(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingVehicle, setDeletingVehicle] = useState(null);
  const [deletingInProgress, setDeletingInProgress] = useState(false);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
  };

  const clearNotification = () => {
    setNotification(null);
  };

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [vehicleList, statsData] = await Promise.all([
        vehicleService.getAllVehicles(searchTerm, statusFilter),
        vehicleService.getStats()
      ]);
      setVehicles(vehicleList);
      setStats(statsData);
    } catch (err) {
      showNotification(err.message || 'Error connecting to backend server', 'error');
    } finally {
      setLoading(false);
    }
  }, [searchTerm, statusFilter]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleAddNew = () => {
    setEditingVehicle(null);
    setIsFormOpen(true);
  };

  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle);
    setIsFormOpen(true);
  };

  const handleView = (vehicle) => {
    setViewingVehicle(vehicle);
    setIsDetailsOpen(true);
  };

  const handleDeletePrompt = (vehicle) => {
    setDeletingVehicle(vehicle);
    setIsDeleteOpen(true);
  };

  const handleSaveVehicle = async (formData, id) => {
    if (id) {
      await vehicleService.updateVehicle(id, formData);
      showNotification(`Vehicle "${formData.licensePlate}" updated successfully.`);
    } else {
      await vehicleService.createVehicle(formData);
      showNotification(`Vehicle "${formData.licensePlate}" created successfully.`);
    }
    await loadData();
  };

  const handleConfirmDelete = async (id) => {
    try {
      setDeletingInProgress(true);
      await vehicleService.deleteVehicle(id);
      showNotification('Vehicle record deleted successfully.');
      setIsDeleteOpen(false);
      setDeletingVehicle(null);
      await loadData();
    } catch (err) {
      showNotification(err.message || 'Failed to delete vehicle', 'error');
    } finally {
      setDeletingInProgress(false);
    }
  };

  return (
    <div className="app-container">
      <Navbar onAddNew={handleAddNew} />

      <main className="main-content">
        {notification && (
          <div className={`alert alert-${notification.type}`}>
            <span>{notification.message}</span>
            <button className="alert-close" onClick={clearNotification}>
              &times;
            </button>
          </div>
        )}

        <StatsCards stats={stats} />

        <VehicleList
          vehicles={vehicles}
          loading={loading}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          onRefresh={loadData}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDeletePrompt}
        />
      </main>

      <footer className="app-footer">
        Vehicle Management System
      </footer>

      {/* Modals */}
      <VehicleFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveVehicle}
        editingVehicle={editingVehicle}
      />

      <VehicleDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        vehicle={viewingVehicle}
        onEdit={handleEdit}
      />

      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        vehicle={deletingVehicle}
        deleting={deletingInProgress}
      />
    </div>
  );
}
