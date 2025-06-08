"use client";

// Components
import { Button } from "@/components/Button";
import { TrashIcon } from "@/components/icons/TrashIcon";

// Context
import { useColorContext } from "@/context/ColorContext";

// External packages
import * as React from "react";
import { twMerge } from "tailwind-merge";

export default function MyPalette() {
  const { colors, removeColor, isInitialized } = useColorContext();
  const [edit, setEdit] = React.useState(false);

  return (
    <div className="flex flex-col items-center rounded-2xl bg-white p-4 md:p-10">
      <h1 className="mt-4 text-center text-3xl font-bold md:mt-0">
        My Palette
      </h1>
      <Button
        size="sm"
        onPress={setEdit.bind(null, !edit)}
        className={twMerge(
          "my-8 w-37 disabled:border-gray-300 disabled:bg-gray-300 disabled:hover:cursor-auto",
          edit &&
            "border-red-500 bg-red-500 hover:border-red-400 hover:bg-red-400",
        )}
      >
        {edit ? "Finish" : "Edit colors"}
      </Button>
      {!isInitialized ? (
        <p className="mt-6 text-gray-400 italic">Loading saved colors...</p>
      ) : colors.length === 0 ? (
        <p className="mt-6 text-gray-500">No saved colors yet.</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
          {colors.map((color, key) => (
            <div
              key={key}
              style={{ backgroundColor: color }}
              className="relative flex h-24 w-24 items-center justify-center rounded-lg shadow"
            >
              <span className="font-semibold text-white drop-shadow-2xl">
                {color}
              </span>
              <Button
                size="sm"
                className={twMerge(
                  "absolute top-1 right-1 hidden h-6 w-6 items-center justify-center rounded-sm border-red-500 bg-red-500 p-0 font-normal hover:border-red-400 hover:bg-red-400",
                  edit ? "flex" : "",
                )}
                onPress={() => removeColor(color)}
              >
                <TrashIcon />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
