import { create } from "zustand";

interface PreferencesStore {
	preferredUnit: string;
	setPreferredUnit: (unit: string) => void;
}

export const usePreferencesStore = create<PreferencesStore>((set) => ({
	preferredUnit: "", // Store the user's preferred unit
	setPreferredUnit: (unit: string) => set({ preferredUnit: unit }),
}));
