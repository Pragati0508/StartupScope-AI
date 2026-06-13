"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { StartupData, sampleStartups } from "../data/sampleStartups";

interface AppContextType {
  theme: "dark" | "light";
  toggleTheme: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedStartup: StartupData;
  setSelectedStartupById: (id: string) => void;
  startups: StartupData[];
  addStartup: (startup: StartupData) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [activeTab, setActiveTab] = useState<string>("landing");
  const [startups, setStartups] = useState<StartupData[]>([]);
  const [selectedStartupId, setSelectedStartupId] = useState<string>("aetherfusion");

  // Load startups and theme on client mount
  useEffect(() => {
    // Theme
    const savedTheme = localStorage.getItem("startupscope-theme") as "dark" | "light";
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      document.documentElement.classList.add("dark");
    }

    // Startups list
    const savedStartups = localStorage.getItem("startupscope-startups");
    if (savedStartups) {
      try {
        const parsed = JSON.parse(savedStartups);
        if (parsed.length > 0) {
          // Merge sample startups to make sure they are present
          const merged = [...sampleStartups];
          parsed.forEach((item: StartupData) => {
            if (!merged.find(m => m.id === item.id)) {
              merged.push(item);
            }
          });
          setStartups(merged);
        } else {
          setStartups(sampleStartups);
        }
      } catch (e) {
        setStartups(sampleStartups);
      }
    } else {
      setStartups(sampleStartups);
    }
  }, []);

  // Update DOM when theme changes
  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("startupscope-theme", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  };

  const setSelectedStartupById = (id: string) => {
    setSelectedStartupId(id);
  };

  const addStartup = (newStartup: StartupData) => {
    const nextList = [newStartup, ...startups.filter(s => s.id !== newStartup.id)];
    setStartups(nextList);
    setSelectedStartupId(newStartup.id);
    localStorage.setItem("startupscope-startups", JSON.stringify(nextList.filter(s => !sampleStartups.some(m => m.id === s.id))));
  };

  const selectedStartup = startups.find(s => s.id === selectedStartupId) || startups[0] || sampleStartups[0];

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        activeTab,
        setActiveTab,
        selectedStartup,
        setSelectedStartupById,
        startups,
        addStartup
      }}
    >
      <div className={theme === "dark" ? "dark text-foreground" : "text-foreground"}>
        {children}
      </div>
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
