import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const watchlistService = {
  // Get all watchlist items for a user
  getWatchlist: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/watchlist/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching watchlist:', error);
      throw error;
    }
  },

  // Add item to watchlist
  addToWatchlist: async (userId, item) => {
    try {
      const response = await axios.post(`${API_URL}/watchlist/${userId}`, {
        itemId: item.id,
        itemType: item.type,
        itemData: item
      });
      return response.data;
    } catch (error) {
      console.error('Error adding to watchlist:', error);
      throw error;
    }
  },

  // Remove item from watchlist
  removeFromWatchlist: async (userId, itemId) => {
    try {
      const response = await axios.delete(`${API_URL}/watchlist/${userId}/${itemId}`);
      return response.data;
    } catch (error) {
      console.error('Error removing from watchlist:', error);
      throw error;
    }
  },

  // Check if item is in watchlist
  isInWatchlist: async (userId, itemId) => {
    try {
      const response = await axios.get(`${API_URL}/watchlist/${userId}/check/${itemId}`);
      return response.data.isInWatchlist;
    } catch (error) {
      console.error('Error checking watchlist status:', error);
      throw error;
    }
  }
}; 