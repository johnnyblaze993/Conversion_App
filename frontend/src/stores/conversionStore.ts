import create from 'zustand';
import axios from 'axios';
import { useAuthStore } from './authStore';

interface ConversionItem {
  ingredient: string;
  originalMeasurement: number;
  originalUnitId: number;
  convertedMeasurement: number;
  convertedUnitId: number;
}

interface ConversionState {
  addConversionsToList: (listId: number, items: ConversionItem[]) => Promise<void>;
  fetchConversionsByList: (listId: number) => void;
  conversions: ConversionItem[];
}

export const useConversionStore = create<ConversionState>((set) => ({
  conversions: [],

  // Add conversion items to a specific conversion list
  addConversionsToList: async (listId: number, items: ConversionItem[]) => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    try {
      // Add each conversion item to the conversions table
      for (const item of items) {
        await axios.post('http://localhost:8081/conversions', {
          userId: user.id,
          listId: listId,
          ingredient: item.ingredient,
          originalMeasurement: item.originalMeasurement,
          originalUnitId: item.originalUnitId, // Assuming these IDs are coming from a units table
          convertedMeasurement: item.convertedMeasurement,
          convertedUnitId: item.convertedUnitId, // Assuming these IDs are coming from a units table
        });
      }

      console.log('Conversion items added successfully.');
    } catch (error) {
      console.error('Error adding conversion items:', error);
    }
  },

  // Fetch conversions for a specific list
  fetchConversionsByList: async (listId: number) => {
    try {
      const response = await axios.get(`http://localhost:8081/conversions/list/${listId}`);
      set({ conversions: response.data });
    } catch (error) {
      console.error('Error fetching conversions:', error);
    }
  },
}));
