// Resolve the API base URL robustly across environments and formatting
function resolveApiBaseUrl() {
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL.trim().replace(/\/$/, '');
  }
  if (import.meta.env.VITE_API_URL) {
    const raw = import.meta.env.VITE_API_URL.trim().replace(/\/$/, '');
    if (raw.endsWith('/api/vehicles')) return raw;
    if (raw.endsWith('/api')) return `${raw}/vehicles`;
    return `${raw}/api/vehicles`;
  }
  return window.location.port === '5173' ? '/api/vehicles' : 'http://localhost:8080/api/vehicles';
}

const API_BASE_URL = resolveApiBaseUrl();

if (typeof window !== 'undefined') {
  console.log('[VehicleService] Target API URL:', API_BASE_URL);
  if (API_BASE_URL.includes('localhost') && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    console.warn('[VehicleService] Warning: The frontend is running on a live host (' + window.location.hostname + ') but attempting to connect to localhost backend. Please set the VITE_API_URL environment variable in your host settings.');
  }
}

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
