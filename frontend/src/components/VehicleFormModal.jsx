import React, { useState, useEffect } from 'react';

const INITIAL_FORM = {
  vin: '',
  make: '',
  model: '',
  year: new Date().getFullYear(),
  licensePlate: '',
  ownerName: '',
  ownerContact: '',
  serviceStatus: 'Pending',
  mileage: '',
  notes: ''
};

export default function VehicleFormModal({ isOpen, onClose, onSave, editingVehicle }) {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editingVehicle) {
      setFormData({
        vin: editingVehicle.vin || '',
        make: editingVehicle.make || '',
        model: editingVehicle.model || '',
        year: editingVehicle.year || new Date().getFullYear(),
        licensePlate: editingVehicle.licensePlate || '',
        ownerName: editingVehicle.ownerName || '',
        ownerContact: editingVehicle.ownerContact || '',
        serviceStatus: editingVehicle.serviceStatus || 'Pending',
        mileage: editingVehicle.mileage != null ? editingVehicle.mileage : '',
        notes: editingVehicle.notes || ''
      });
    } else {
      setFormData(INITIAL_FORM);
    }
    setErrors({});
  }, [editingVehicle, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.vin.trim()) {
      newErrors.vin = 'VIN is required';
    } else if (formData.vin.trim().length < 11 || formData.vin.trim().length > 17) {
      newErrors.vin = 'VIN must be 11-17 characters';
    }

    if (!formData.make.trim()) newErrors.make = 'Make is required';
    if (!formData.model.trim()) newErrors.model = 'Model is required';

    const numYear = Number(formData.year);
    if (!formData.year || isNaN(numYear) || numYear < 1900 || numYear > 2100) {
      newErrors.year = 'Enter a valid year (1900-2100)';
    }

    if (!formData.licensePlate.trim()) newErrors.licensePlate = 'License plate is required';
    if (!formData.ownerName.trim()) newErrors.ownerName = 'Owner name is required';
    if (!formData.ownerContact.trim()) newErrors.ownerContact = 'Owner contact is required';

    if (formData.mileage !== '' && (isNaN(Number(formData.mileage)) || Number(formData.mileage) < 0)) {
      newErrors.mileage = 'Mileage must be a positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setSubmitting(true);
      const payload = {
        ...formData,
        vin: formData.vin.trim().toUpperCase(),
        licensePlate: formData.licensePlate.trim().toUpperCase(),
        year: Number(formData.year),
        mileage: formData.mileage !== '' ? Number(formData.mileage) : null
      };
      await onSave(payload, editingVehicle ? editingVehicle.id : null);
      onClose();
    } catch (err) {
      setErrors((prev) => ({ ...prev, server: err.message }));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{editingVehicle ? 'Edit Vehicle Record' : 'Register New Vehicle'}</h2>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {errors.server && (
              <div className="alert alert-error" style={{ marginBottom: '16px' }}>
                {errors.server}
              </div>
            )}

            <div className="form-grid">
              <div className="form-group">
                <label>
                  License Plate <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="licensePlate"
                  className={`form-control ${errors.licensePlate ? 'error-input' : ''}`}
                  placeholder="e.g. MH 02 AB 1234"
                  value={formData.licensePlate}
                  onChange={handleChange}
                />
                {errors.licensePlate && <span className="field-error">{errors.licensePlate}</span>}
              </div>

              <div className="form-group">
                <label>
                  VIN (Vehicle ID Number) <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="vin"
                  className={`form-control ${errors.vin ? 'error-input' : ''}`}
                  placeholder="e.g. MAT621354N1234567"
                  value={formData.vin}
                  onChange={handleChange}
                />
                {errors.vin && <span className="field-error">{errors.vin}</span>}
              </div>

              <div className="form-group">
                <label>
                  Make <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="make"
                  className={`form-control ${errors.make ? 'error-input' : ''}`}
                  placeholder="e.g. Tata, Hyundai, Mahindra"
                  value={formData.make}
                  onChange={handleChange}
                />
                {errors.make && <span className="field-error">{errors.make}</span>}
              </div>

              <div className="form-group">
                <label>
                  Model <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="model"
                  className={`form-control ${errors.model ? 'error-input' : ''}`}
                  placeholder="e.g. Nexon, Creta, Thar"
                  value={formData.model}
                  onChange={handleChange}
                />
                {errors.model && <span className="field-error">{errors.model}</span>}
              </div>

              <div className="form-group">
                <label>
                  Year <span className="required">*</span>
                </label>
                <input
                  type="number"
                  name="year"
                  className={`form-control ${errors.year ? 'error-input' : ''}`}
                  placeholder="e.g. 2023"
                  value={formData.year}
                  onChange={handleChange}
                />
                {errors.year && <span className="field-error">{errors.year}</span>}
              </div>

              <div className="form-group">
                <label>Mileage (km / miles)</label>
                <input
                  type="number"
                  name="mileage"
                  className={`form-control ${errors.mileage ? 'error-input' : ''}`}
                  placeholder="e.g. 15000"
                  value={formData.mileage}
                  onChange={handleChange}
                />
                {errors.mileage && <span className="field-error">{errors.mileage}</span>}
              </div>

              <div className="form-group">
                <label>
                  Owner Full Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="ownerName"
                  className={`form-control ${errors.ownerName ? 'error-input' : ''}`}
                  placeholder="e.g. Aarav Mehta, Ananya Roy"
                  value={formData.ownerName}
                  onChange={handleChange}
                />
                {errors.ownerName && <span className="field-error">{errors.ownerName}</span>}
              </div>

              <div className="form-group">
                <label>
                  Owner Contact <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="ownerContact"
                  className={`form-control ${errors.ownerContact ? 'error-input' : ''}`}
                  placeholder="e.g. +91 98201 14523"
                  value={formData.ownerContact}
                  onChange={handleChange}
                />
                {errors.ownerContact && <span className="field-error">{errors.ownerContact}</span>}
              </div>

              <div className="form-group form-full-width">
                <label>
                  Service Status <span className="required">*</span>
                </label>
                <select
                  name="serviceStatus"
                  className="form-control"
                  value={formData.serviceStatus}
                  onChange={handleChange}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>

              <div className="form-group form-full-width">
                <label>Service Notes / Description</label>
                <textarea
                  name="notes"
                  className="form-control"
                  rows="3"
                  placeholder="e.g. Periodic maintenance, brake pads, oil leak investigation..."
                  value={formData.notes}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting ? 'Saving...' : editingVehicle ? 'Update Record' : 'Save Record'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
