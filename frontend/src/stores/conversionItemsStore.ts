import { create } from "zustand";
import axios from "axios";

interface ConversionItem {
	id: number;
	ingredient: string;
	originalMeasurement: number;
	originalUnitId: number;
	convertedMeasurement: number;
	convertedUnitId: number;
}

interface ConversionItemsState {
	conversionItems: ConversionItem[];
	fetchConversionItems: (listId: number) => Promise<void>;
}

export const useConversionItemsStore = create<ConversionItemsState>((set) => ({
	conversionItems: [],

	fetchConversionItems: async (listId: number) => {
		try {
			const response = await axios.get(
				`http://localhost:8081/conversions/list/${listId}`
			);
			set({ conversionItems: response.data });
		} catch (error) {
			console.error("Error fetching conversion items:", error);
		}
	},
}));
