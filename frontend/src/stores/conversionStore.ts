// src/stores/conversionStore.ts
import create from 'zustand';
import axios from 'axios';
import { useAuthStore } from './authStore';

interface ConversionItem {
  ingredient: string;
  originalMeasurement: number;
  originalUnit: string;
  convertedMeasurement: number;
  convertedUnit: string;
}

interface ConversionState {
  createConversionList: (name: string, items: ConversionItem[], favorite: boolean) => void;
}

export const useConversionStore = create<ConversionState>((set) => ({
  createConversionList: async (name: string, items: ConversionItem[], favorite: boolean) => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    try {
      // First, create the conversion list with the favorite status
      const listResponse = await axios.post('http://localhost:8081/conversion-lists', {
        userId: user.id,
        name: name,
        favorite: favorite,  // Pass the favorite status
      });

      const listId = listResponse.data.id;

      // Then, add each conversion item to the conversions table
      for (const item of items) {
        await axios.post('http://localhost:8081/conversions', {
          userId: user.id,
          listId: listId,
          ingredient: item.ingredient,
          originalMeasurement: item.originalMeasurement,
          originalUnitId: item.originalUnit, // Assuming these IDs are coming from a units table
          convertedMeasurement: item.convertedMeasurement,
          convertedUnitId: item.convertedUnit, // Assuming these IDs are coming from a units table
        });
      }

      console.log('Conversion list and items created successfully.');
    } catch (error) {
      console.error('Error creating conversion list or items:', error);
    }
  },
}));
