"use client";

// Components
import { Button } from "@/components/Button";

// Context
import { useColorContext } from "@/context/ColorContext";

// External packages
import * as React from "react";

export default function MyPalette() {
  const { colors, removeColor } = useColorContext();

  return (
    <div className="flex flex-col items-center rounded-2xl bg-white p-4 md:p-10">
      <h1 className="text-center text-3xl font-bold">My Palette</h1>

      {colors.length === 0 ? (
        <p className="mt-6 text-gray-500">No saved colors yet.</p>
      ) : (
        <div className="mt-6 flex flex-wrap justify-center gap-2 sm:gap-4">
          {colors.map((color, key) => (
            <div
              key={key}
              style={{ backgroundColor: color }}
              className="group relative flex h-24 w-24 items-center justify-center rounded-lg shadow"
            >
              <span className="font-semibold text-white drop-shadow-2xl">
                {color}
              </span>
              <Button
                size="sm"
                className="absolute bottom-1 w-[88px] rounded-sm py-1 font-normal opacity-0 transition-opacity group-hover:opacity-100"
                onPress={() => removeColor(color)}
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
