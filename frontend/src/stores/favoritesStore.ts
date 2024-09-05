import create from 'zustand';
import axios from 'axios';
import { useAuthStore } from './authStore';

interface ConversionList {
  id: number;
  name: string;
  favorite: boolean;
}

interface FavoritesState {
  favorites: ConversionList[];
  fetchFavorites: () => void;
  toggleFavorite: (id: number) => void;
}

export const useFavoritesStore = create<FavoritesState>((set) => ({
  favorites: [],

  // Fetch the user's favorite conversion lists
  fetchFavorites: async () => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    try {
      const response = await axios.get(`http://localhost:8081/conversion-lists/user/${user.id}`);
      set({ favorites: response.data });
    } catch (error) {
      console.error('Error fetching favorite conversion lists:', error);
    }
  },

  // Toggle favorite status for a conversion list
  toggleFavorite: async (id: number) => {
    console.log(`Toggling favorite status for list with id: ${id}`);

    try {
      await axios.put(`http://localhost:8081/conversion-lists/${id}/favorite`);

      // Update the state after toggling favorite
      set((state: FavoritesState) => ({
        favorites: state.favorites.map((list: ConversionList) =>
          list.id === id ? { ...list, favorite: !list.favorite } : list
        ),
      }));
    } catch (error) {
      console.error('Error toggling favorite status:', error);
    }
  },
}));
