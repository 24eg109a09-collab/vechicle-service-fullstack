// Support environment variable (for Vercel/production), Vite dev proxy, and direct localhost backend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL 
  || (import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL.replace(/\/$/, '')}/api/vehicles` : null)
  || (window.location.port === '5173' ? '/api/vehicles' : 'http://localhost:8080/api/vehicles');

export const vehicleService = {
  async getAllVehicles(search = '', status = 'ALL') {
    const params = new URLSearchParams();
    if (search && search.trim()) {
      params.append('search', search.trim());
    }
    if (status && status !== 'ALL') {
      params.append('status', status);
    }
    const queryString = params.toString();
    const url = queryString ? `${API_BASE_URL}?${queryString}` : API_BASE_URL;

    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to fetch vehicles');
    }
    return response.json();
  },

  async getVehicleById(id) {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to fetch vehicle');
    }
    return response.json();
  },

  async createVehicle(vehicleData) {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(vehicleData)
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const validationMsgs = errorData.validationErrors 
        ? Object.values(errorData.validationErrors).join(', ') 
        : '';
      throw new Error(validationMsgs || errorData.message || 'Failed to create vehicle');
    }
    return response.json();
  },

  async updateVehicle(id, vehicleData) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(vehicleData)
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const validationMsgs = errorData.validationErrors 
        ? Object.values(errorData.validationErrors).join(', ') 
        : '';
      throw new Error(validationMsgs || errorData.message || 'Failed to update vehicle');
    }
    return response.json();
  },

  async deleteVehicle(id) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to delete vehicle');
    }
    return response.json();
  },

  async getStats() {
    const response = await fetch(`${API_BASE_URL}/stats`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to fetch statistics');
    }
    return response.json();
  }
};
