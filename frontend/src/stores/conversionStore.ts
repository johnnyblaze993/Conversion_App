import { create } from "zustand";
import axios from "axios";
import { useAuthStore } from "./authStore";

interface ConversionItem {
	id?: number;
	ingredient: string;
	originalMeasurement: number;
	originalUnitId: number;
	convertedMeasurement: number;
	convertedUnitId: number;
}

interface ConversionState {
	conversions: ConversionItem[];
	addConversionsToList: (listId: number, items: ConversionItem[]) => Promise<void>;
	fetchConversionsByList: (listId: number) => void;
	fetchAllConversions: () => void; // Fetch all conversion items
	fetchConversionById: (id: number) => void; // Fetch a single conversion item by its ID
	updateConversionItem: (id: number, updatedItem: ConversionItem) => void; // Update a conversion item
	deleteConversion: (id: number) => void;
	setConversionItems: (items: ConversionItem[]) => void; // Manually set conversion items
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
				await axios.post("http://localhost:8081/conversions", {
					userId: user.id,
					listId: listId,
					ingredient: item.ingredient,
					originalMeasurement: item.originalMeasurement,
					originalUnitId: item.originalUnitId,
					convertedMeasurement: item.convertedMeasurement,
					convertedUnitId: item.convertedUnitId,
				});
			}

			console.log("Conversion items added successfully.");
		} catch (error) {
			console.error("Error adding conversion items:", error);
		}
	},

	// Fetch conversions for a specific list
	fetchConversionsByList: async (listId: number) => {
		try {
			const response = await axios.get(
				`http://localhost:8081/conversions/list/${listId}`
			);
			set({ conversions: response.data });
		} catch (error) {
			console.error("Error fetching conversions by list:", error);
		}
	},

	// Fetch all conversions
	fetchAllConversions: async () => {
		try {
			const response = await axios.get(`http://localhost:8081/conversions`);
			set({ conversions: response.data });
		} catch (error) {
			console.error("Error fetching all conversions:", error);
		}
	},

	// Fetch a single conversion item by its ID
	fetchConversionById: async (id: number) => {
		try {
			const response = await axios.get(`http://localhost:8081/conversions/${id}`);
			set((state) => ({
				conversions: state.conversions.map((item) =>
					item.id === id ? response.data : item
				),
			}));
		} catch (error) {
			console.error(`Error fetching conversion with ID ${id}:`, error);
		}
	},

	// Update a specific conversion item
	updateConversionItem: async (id: number, updatedItem: ConversionItem) => {
		try {
			await axios.put(`http://localhost:8081/conversions/${id}`, updatedItem);
			set((state) => ({
				conversions: state.conversions.map((item) =>
					item.id === id ? { ...item, ...updatedItem } : item
				),
			}));
			console.log("Conversion item updated successfully.");
		} catch (error) {
			console.error("Error updating conversion item:", error);
		}
	},

	// Delete a specific conversion item
	deleteConversion: async (id: number) => {
		try {
			await axios.delete(`http://localhost:8081/conversions/${id}`);
			set((state) => ({
				conversions: state.conversions.filter(
					(conversion) => conversion.id !== id
				),
			}));
			console.log("Conversion item deleted successfully.");
		} catch (error) {
			console.error("Error deleting conversion:", error);
		}
	},

	// Manually set the conversions list (used to remove an item after deletion or other actions)
	setConversionItems: (items: ConversionItem[]) => {
		set({ conversions: items });
	},
}));
