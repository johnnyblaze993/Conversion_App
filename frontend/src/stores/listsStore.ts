import create from 'zustand';
import axios from 'axios';
import { useAuthStore } from './authStore';

interface ConversionList {
  id: number;
  name: string;
  favorite: boolean;
}

interface ListsState {
  lists: ConversionList[];
  fetchLists: () => void;
  toggleFavorite: (id: number, currentFavorite: boolean) => void; // Pass current favorite state
}

export const useListsStore = create<ListsState>((set) => ({
  lists: [],

  // Fetch all conversion lists for the logged-in user
  fetchLists: async () => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    try {
      const response = await axios.get(`http://localhost:8081/conversion-lists/user/${user.id}`);
      set({ lists: response.data });
    } catch (error) {
      console.error('Error fetching conversion lists:', error);
    }
  },

  // Toggle favorite status for a conversion list
  toggleFavorite: async (id: number, currentFavorite: boolean) => {
    console.log(`Toggling favorite status for list with id: ${id}, current status: ${currentFavorite}`);

    try {
      // Send the opposite of the current favorite status in the request body
      await axios.put(`http://localhost:8081/conversion-lists/${id}/favorite`, {
        favorite: !currentFavorite, // Toggle the current favorite status
      });

      // Update the state after toggling favorite
      set((state: ListsState) => ({
        lists: state.lists.map((list: ConversionList) =>
          list.id === id ? { ...list, favorite: !list.favorite } : list
        ),
      }));
    } catch (error) {
      console.error('Error toggling favorite status:', error);
    }
  },
}));
