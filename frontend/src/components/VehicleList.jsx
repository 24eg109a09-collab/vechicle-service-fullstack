import React from 'react';

export default function VehicleList({
  vehicles,
  loading,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  onRefresh,
  onView,
  onEdit,
  onDelete
}) {
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
    <div className="vehicle-list-section">
      {/* Search & Filter Controls */}
      <div className="control-bar">
        <div className="search-filters">
          <input
            type="text"
            className="search-input"
            placeholder="Search by Plate, VIN, Make, Model, or Owner..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>

        <button
          className="btn btn-secondary"
          onClick={onRefresh}
          title="Refresh vehicle list"
        >
          ↻ Refresh
        </button>
      </div>

      {/* Records Table */}
      <div className="table-wrapper">
        <div className="table-header-info">
          <span>Found {vehicles.length} vehicle record{vehicles.length === 1 ? '' : 's'}</span>
          {loading && <span>Loading records...</span>}
        </div>

        <table className="records-table">
          <thead>
            <tr>
              <th style={{ width: '50px' }}>ID</th>
              <th>License Plate</th>
              <th>Make & Model</th>
              <th>Year</th>
              <th>VIN</th>
              <th>Owner & Contact</th>
              <th>Status</th>
              <th>Mileage</th>
              <th style={{ textAlign: 'right', paddingRight: '20px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="9" className="table-empty">
                  <p>Loading vehicle records from database...</p>
                </td>
              </tr>
            ) : vehicles.length === 0 ? (
              <tr>
                <td colSpan="9" className="table-empty">
                  <p>No vehicle records found.</p>
                  <small>Try adjusting your search criteria or register a new vehicle.</small>
                </td>
              </tr>
            ) : (
              vehicles.map((v) => (
                <tr key={v.id}>
                  <td>#{v.id}</td>
                  <td>
                    <span className="plate-badge">{v.licensePlate}</span>
                  </td>
                  <td>
                    <strong>{v.make}</strong> {v.model}
                  </td>
                  <td>{v.year}</td>
                  <td>
                    <span className="vin-code" title={v.vin}>
                      {v.vin}
                    </span>
                  </td>
                  <td>
                    <div>{v.ownerName}</div>
                    <small style={{ color: '#64748b' }}>{v.ownerContact}</small>
                  </td>
                  <td>
                    <span className={`status-badge ${getStatusClass(v.serviceStatus)}`}>
                      {v.serviceStatus}
                    </span>
                  </td>
                  <td>
                    {v.mileage != null ? `${v.mileage.toLocaleString()} km` : '—'}
                  </td>
                  <td style={{ textAlign: 'right', paddingRight: '20px' }}>
                    <div className="action-buttons" style={{ justifyContent: 'flex-end' }}>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => onView(v)}
                        title="View details"
                      >
                        View
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => onEdit(v)}
                        title="Edit record"
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => onDelete(v)}
                        title="Delete record"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
