"use client";

// Components
import { Button } from "@/components/Button";

// Context
import { useColorContext } from "@/context/ColorContext";

// External packages
import axios from "axios";
import * as React from "react";

export default function RandomColors({ token }: { token: string | null }) {
  const [randomColors, setRandomColors] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const { addColor } = useColorContext();

  const fetchColors = async () => {
    if (!token) {
      setError("Token is not found.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        "https://bootcamp2025.depster.me/api/colors?limit=10",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setRandomColors(res.data.data);
    } catch (err) {
      setError("Failed to fetch colors");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-4 flex flex-col items-center rounded-2xl bg-white p-4 md:p-10">
      <h1 className="text-center text-3xl font-bold">Random colors</h1>

      <Button
        size="sm"
        onPress={fetchColors}
        disabled={loading}
        className="my-6 w-37 disabled:border-gray-300 disabled:bg-gray-300 disabled:hover:cursor-auto"
      >
        {loading ? "Loading" : "Get new colors"}
      </Button>

      {error && (
        <div className="mt-2 mb-4 font-semibold text-red-600">{error}</div>
      )}

      <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
        {randomColors.map((color, key) => (
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
              onPress={() => addColor(color)}
            >
              Save
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
