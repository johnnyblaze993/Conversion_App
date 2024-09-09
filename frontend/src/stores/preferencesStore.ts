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
        primary: { main: "#610C9F", light: "#8D40C7", dark: "#48007B" },
        secondary: { main: "#DA0C81", light: "#E850A4", dark: "#B00063" },
        background: { default: "#1B0136", paper: "#1B0136" },
        text: { primary: "#E0E0E0", secondary: "#CFCFCF" },
      },
    },
    {
      palette: {
        primary: { main: "#451952", light: "#6D2B7D", dark: "#320F3B" },
        secondary: { main: "#AE445A", light: "#D87077", dark: "#8C3447" },
        background: { default: "#281230", paper: "#281230" },
        text: { primary: "#EFEFEF", secondary: "#CFCFCF" },
      },
    },
    {
      palette: {
        primary: { main: "#040D12", light: "#1A2C36", dark: "#02080A" },
        secondary: { main: "#5C8374", light: "#789C91", dark: "#406156" },
        background: { default: "#12171A", paper: "#12171A" },
        text: { primary: "#D0D0D0", secondary: "#A3A3A3" },
      },
    },
  ],
  lightThemes: [
    {
      palette: {
        primary: { main: "#F6F5F2", light: "#FFFFFF", dark: "#D9D7D3" },
        secondary: { main: "#F3D0D7", light: "#F9E4E7", dark: "#E5B7BF" },
        background: { default: "#FFF5F5", paper: "#F0EBE3" },
        text: { primary: "#333333", secondary: "#666666" },
      },
    },
    {
      palette: {
        primary: { main: "#FA7070", light: "#FF8C8C", dark: "#E05454" },
        secondary: { main: "#A1C398", light: "#B9D3B4", dark: "#849F7E" },
        background: { default: "#FEFDED", paper: "#FEFDED" },
        text: { primary: "#2A2A2A", secondary: "#555555" },
      },
    },
    {
      palette: {
        primary: { main: "#88AB8E", light: "#A1C3A6", dark: "#6A8D71" },
        secondary: { main: "#EEE7DA", light: "#F5F0E8", dark: "#CFC7B9" },
        background: { default: "#F2F1EB", paper: "#F2F1EB" },
        text: { primary: "#222222", secondary: "#555555" },
      },
    },
  ],
  toggleTheme: () =>
    set((state) => ({
      themeType: state.themeType === "light" ? "dark" : "light",
    })),
  setThemeIndex: (index) => set({ selectedThemeIndex: index }),
}));
