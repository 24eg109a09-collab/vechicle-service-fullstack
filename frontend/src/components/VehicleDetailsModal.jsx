import React from 'react';

export default function VehicleDetailsModal({ isOpen, onClose, vehicle, onEdit }) {
  if (!isOpen || !vehicle) return null;

  const formatDate = (isoString) => {
    if (!isoString) return 'N/A';
    try {
      const d = new Date(isoString);
      return d.toLocaleString();
    } catch {
      return isoString;
    }
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'in progress':
        return 'status-in-progress';
      case 'completed':
        return 'status-completed';
      case 'delivered':
        return 'status-delivered';
      default:
        return 'status-pending';
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Vehicle Details - {vehicle.licensePlate}</h2>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            &times;
          </button>
        </div>

        <div className="modal-body">
          <div className="detail-list">
            <div className="detail-item">
              <span className="detail-label">Vehicle ID</span>
              <span className="detail-value">#{vehicle.id}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Status</span>
              <span className="detail-value">
                <span className={`status-badge ${getStatusClass(vehicle.serviceStatus)}`}>
                  {vehicle.serviceStatus}
                </span>
              </span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Make & Model</span>
              <span className="detail-value" style={{ fontWeight: 600 }}>
                {vehicle.make} {vehicle.model}
              </span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Manufacture Year</span>
              <span className="detail-value">{vehicle.year}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">License Plate</span>
              <span className="detail-value">
                <span className="plate-badge">{vehicle.licensePlate}</span>
              </span>
            </div>

            <div className="detail-item">
              <span className="detail-label">VIN Number</span>
              <span className="detail-value vin-code">{vehicle.vin}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Owner Name</span>
              <span className="detail-value">{vehicle.ownerName}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Owner Contact</span>
              <span className="detail-value">{vehicle.ownerContact}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Current Mileage</span>
              <span className="detail-value">
                {vehicle.mileage != null ? `${vehicle.mileage.toLocaleString()} km` : 'Not recorded'}
              </span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Registered Date</span>
              <span className="detail-value">{formatDate(vehicle.createdAt)}</span>
            </div>

            <div className="detail-item detail-full">
              <span className="detail-label">Last Updated</span>
              <span className="detail-value">{formatDate(vehicle.updatedAt)}</span>
            </div>

            <div className="detail-item detail-full">
              <span className="detail-label">Service Notes / Issues</span>
              <div 
                className="detail-value" 
                style={{ 
                  background: '#f8fafc', 
                  padding: '10px 14px', 
                  borderRadius: '4px', 
                  border: '1px solid #e2e8f0',
                  marginTop: '4px',
                  whiteSpace: 'pre-wrap'
                }}
              >
                {vehicle.notes || 'No additional service notes recorded.'}
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={onClose}
          >
            Close
          </button>
          <button 
            type="button" 
            className="btn btn-primary"
            onClick={() => {
              onClose();
              onEdit(vehicle);
            }}
          >
            Edit Vehicle
          </button>
        </div>
      </div>
    </div>
  );
}
