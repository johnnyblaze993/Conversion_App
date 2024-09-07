import { create } from "zustand";

interface SnackbarState {
	isOpen: boolean;
	message: string;
	severity: "success" | "error" | "info"; // Material UI Snackbar severity types
	showSnackbar: (
		message: string,
		severity: "success" | "error" | "info"
	) => void;
	closeSnackbar: () => void;
}

export const useSnackbarStore = create<SnackbarState>((set) => ({
	isOpen: false,
	message: "",
	severity: "info",

	showSnackbar: (message: string, severity: "success" | "error" | "info") =>
		set({ isOpen: true, message, severity }),
	closeSnackbar: () => set({ isOpen: false, message: "", severity: "info" }),
}));
