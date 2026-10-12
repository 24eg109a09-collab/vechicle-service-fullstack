import React from 'react';

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, vehicle, deleting }) {
  if (!isOpen || !vehicle) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" style={{ maxWidth: '440px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Confirm Deletion</h2>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            &times;
          </button>
        </div>

        <div className="modal-body">
          <p style={{ marginBottom: '12px', fontSize: '14px', color: '#334155' }}>
            Are you sure you want to permanently delete the vehicle record:
          </p>
          <div style={{ background: '#f1f5f9', padding: '12px', borderRadius: '4px', fontSize: '13px' }}>
            <strong>{vehicle.make} {vehicle.model} ({vehicle.year})</strong>
            <br />
            License Plate: <span className="plate-badge">{vehicle.licensePlate}</span>
            <br />
            Owner: {vehicle.ownerName}
          </div>
          <p style={{ marginTop: '12px', fontSize: '12px', color: '#dc2626' }}>
            This action will remove the record permanently from the database.
          </p>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
            disabled={deleting}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => onConfirm(vehicle.id)}
            disabled={deleting}
          >
            {deleting ? 'Deleting...' : 'Delete Permanently'}
          </button>
        </div>
      </div>
    </div>
  );
}
