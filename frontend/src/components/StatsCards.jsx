import React from 'react';

export default function StatsCards({ stats }) {
  return (
    <div className="stats-grid">
      <div className="stat-card">
        <h3>Total Vehicles</h3>
        <div className="stat-value">{stats.total ?? 0}</div>
      </div>
      <div className="stat-card">
        <h3>Pending Service</h3>
        <div className="stat-value" style={{ color: '#d97706' }}>{stats.pending ?? 0}</div>
      </div>
      <div className="stat-card">
        <h3>In Progress</h3>
        <div className="stat-value" style={{ color: '#0284c7' }}>{stats.inProgress ?? 0}</div>
      </div>
      <div className="stat-card">
        <h3>Completed / Delivered</h3>
        <div className="stat-value" style={{ color: '#16a34a' }}>
          {(stats.completed ?? 0) + (stats.delivered ?? 0)}
        </div>
      </div>
    </div>
  );
}
