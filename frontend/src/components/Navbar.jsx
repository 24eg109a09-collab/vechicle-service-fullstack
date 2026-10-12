import React from 'react';

export default function Navbar({ onAddNew }) {
  return (
    <header className="navbar">
      <div className="navbar-brand">
        <h1>Vehicle Service Record Manager</h1>
      </div>
      <div className="navbar-actions">
        <button 
          className="btn btn-primary"
          onClick={onAddNew}
        >
          + Add New Vehicle
        </button>
      </div>
    </header>
  );
}
