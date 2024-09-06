import { create } from 'zustand';
import axios from 'axios';

interface Unit {
  id: number;
  unitName: string;
}

interface UnitStore {
  units: Unit[];
  fetchUnits: () => void;
}

export const useUnitStore = create<UnitStore>((set) => ({
  units: [],

  fetchUnits: async () => {
    try {
      const response = await axios.get('http://localhost:8081/units');
      set({ units: response.data });
    } catch (error) {
      console.error('Error fetching units:', error);
    }
  },
}));
