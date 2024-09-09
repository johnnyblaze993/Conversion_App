import { create } from "zustand";

interface PreferencesStore {
  preferredUnit: string;
  setPreferredUnit: (unit: string) => void;

  themeType: "light" | "dark";
  selectedThemeIndex: number;
  darkThemes: any[];
  lightThemes: any[];
  toggleTheme: () => void;
  setThemeIndex: (index: number) => void;
}

export const usePreferencesStore = create<PreferencesStore>((set) => ({
  // Existing preferred unit logic
  preferredUnit: "", // Store the user's preferred unit
  setPreferredUnit: (unit: string) => set({ preferredUnit: unit }),

  // Theme-related logic
  themeType: "light",
  selectedThemeIndex: 0,
  darkThemes: [
    {
      palette: {
        primary: { main: "#610C9F" },
        secondary: { main: "#940B92" },
        background: { default: "#DA0C81", paper: "#E95793" },
      },
    },
    {
      palette: {
        primary: { main: "#451952" },
        secondary: { main: "#662549" },
        background: { default: "#AE445A", paper: "#F39F5A" },
      },
    },
    {
      palette: {
        primary: { main: "#040D12" },
        secondary: { main: "#183D3D" },
        background: { default: "#5C8374", paper: "#93B1A6" },
      },
    },
  ],
  lightThemes: [
    {
      palette: {
        primary: { main: "#F6F5F2" },
        secondary: { main: "#F0EBE3" },
        background: { default: "#F3D0D7", paper: "#FFEFEF" },
      },
    },
    {
      palette: {
        primary: { main: "#FA7070" },
        secondary: { main: "#FEFDED" },
        background: { default: "#C6EBC5", paper: "#A1C398" },
      },
    },
    {
      palette: {
        primary: { main: "#88AB8E" },
        secondary: { main: "#AFC8AD" },
        background: { default: "#EEE7DA", paper: "#F2F1EB" },
      },
    },
  ],
  toggleTheme: () =>
    set((state) => ({
      themeType: state.themeType === "light" ? "dark" : "light",
    })),
  setThemeIndex: (index) => set({ selectedThemeIndex: index }),
}));
