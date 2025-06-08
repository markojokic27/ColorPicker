"use client";

// External packages
import * as React from "react";

type ColorContextType = {
  colors: string[];
  addColor: (color: string) => void;
  removeColor: (color: string) => void;
  moveColor: (index: number, direction: "left" | "right") => void;
  isInitialized: boolean;
};

const ColorContext = React.createContext<ColorContextType | undefined>(
  undefined,
);

export const ColorProvider = ({ children }: { children: React.ReactNode }) => {
  const [colors, setColors] = React.useState<string[]>([]);
  const [isInitialized, setIsInitialized] = React.useState(false);

  React.useEffect(() => {
    const stored = localStorage.getItem("savedColors");
    setColors(stored ? JSON.parse(stored) : []);
    setIsInitialized(true);
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

  const moveColor = (index: number, direction: "left" | "right") => {
    setColors((prev) => {
      const newColors = [...prev];
      const targetIndex = direction === "left" ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex >= newColors.length) return prev;

      [newColors[index], newColors[targetIndex]] = [
        newColors[targetIndex],
        newColors[index],
      ];
      localStorage.setItem("savedColors", JSON.stringify(newColors));
      return newColors;
    });
  };

  return (
    <ColorContext.Provider
      value={{ colors, addColor, removeColor, moveColor, isInitialized }}
    >
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
