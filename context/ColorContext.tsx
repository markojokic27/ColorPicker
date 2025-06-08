"use client";

// External packages
import * as React from "react";

type ColorContextType = {
  colors: string[];
  addColor: (color: string) => void;
  removeColor: (color: string) => void;
};

const ColorContext = React.createContext<ColorContextType | undefined>(
  undefined,
);

export const ColorProvider = ({ children }: { children: React.ReactNode }) => {
  const [colors, setColors] = React.useState<string[]>([]);

  React.useEffect(() => {
    const stored = localStorage.getItem("savedColors");
    setColors(stored ? JSON.parse(stored) : []);
  }, []);

  const addColor = (newColor: string) => {
    setColors((prev) => {
      if (prev.includes(newColor)) return prev;
      const updated = [...prev, newColor];
      localStorage.setItem("savedColors", JSON.stringify(updated));
      return updated;
    });
  };

  const removeColor = (colorToRemove: string) => {
    setColors((prev) => {
      const updated = prev.filter((c) => c !== colorToRemove);
      localStorage.setItem("savedColors", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <ColorContext.Provider value={{ colors, addColor, removeColor }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColorContext = () => {
  const ctx = React.useContext(ColorContext);
  if (!ctx)
    throw new Error("useColorContext must be used within ColorProvider");
  return ctx;
};
