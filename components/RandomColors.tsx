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
  const [limit, setLimit] = React.useState(10);
  const [alreadyExistsError, setAlreadyExistsError] = React.useState<
    string | null
  >(null);

  const { addColor, colors } = useColorContext();

  const fetchColors = async () => {
    if (!token) {
      setError("Token is not found.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `https://bootcamp2025.depster.me/api/colors?limit=${limit}`,
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

  const handleAddColor = (color: string) => {
    if (colors.includes(color)) {
      setAlreadyExistsError(`Color ${color} already exists in your palette.`);
      setTimeout(() => {
        setAlreadyExistsError(null);
      }, 3000);
      return;
    }
    addColor(color);
  };

  React.useEffect(() => {
    fetchColors();
  }, []);

  return (
    <div className="mb-4 flex flex-col items-center rounded-2xl bg-white p-4 md:p-10">
      <h1 className="mt-4 text-center text-3xl font-bold md:mt-0">
        Random colors
      </h1>

      <div className="relative my-10 flex w-full justify-center gap-2 sm:gap-4">
        <input
          type="number"
          min={1}
          max={10}
          value={limit}
          onChange={(e) =>
            setLimit(Math.max(1, Math.min(10, Number(e.target.value))))
          }
          className="active:orange-400 w-24 rounded-md border border-orange-400 px-2 py-1 text-center text-sm shadow-sm focus:border-orange-400 focus:outline-none"
        />
        <Button
          size="sm"
          onPress={fetchColors}
          disabled={loading}
          className="w-37 disabled:border-gray-300 disabled:bg-gray-300 disabled:hover:cursor-auto"
        >
          {loading ? "Loading" : "Get new colors"}
        </Button>
        {alreadyExistsError && (
          <div className="absolute bottom-[-36px] text-center text-xs text-orange-400 sm:text-sm lg:bottom-[-30px] lg:text-base">
            {alreadyExistsError}
          </div>
        )}
      </div>

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
              onPress={() => handleAddColor(color)}
            >
              Save
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
