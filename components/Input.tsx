"use client";

// External packages
import * as React from "react";
import {
  TextField,
  TextFieldProps,
  Input as AriaInput,
  Label,
  InputProps,
  FieldError,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

export const Input: React.FC<
  React.ComponentPropsWithoutRef<"div"> &
    TextFieldProps & {
      icon?: React.ReactNode;
      label: string;
      size?: "md" | "sm";
      inputProps?: React.ComponentPropsWithoutRef<"input"> &
        InputProps & { validationError?: string };
    }
> = ({ icon, label, size = "md", inputProps = {}, className, ...rest }) => {
  const labelRef = React.useRef<HTMLLabelElement | null>(null);
  const {
    validationError,
    onChange,
    className: inputClassName,
    ...restInputProps
  } = inputProps;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (labelRef.current) {
      labelRef.current.setAttribute(
        "data-label-floating",
        value ? "true" : "false",
      );
    }
    onChange?.(event);
  };

  return (
    <TextField
      {...rest}
      className={twMerge(
        "group w-full text-base text-gray-400",
        size === "sm" && "text-2xs h-12",
        className,
      )}
    >
      <div className="relative outline-none focus:outline-none">
        <Label
          ref={labelRef}
          className={twMerge(
            "peer text-grayscale-400 absolute top-1/2 left-[18px] origin-left -translate-y-1/2 transition-transform data-[label-floating=true]:-translate-y-[22px] data-[label-floating=true]:scale-75",
            size === "sm" && "data-[label-floating=true]:-translate-y-[16px]",
          )}
        >
          {label}
        </Label>
        <AriaInput
          {...restInputProps}
          className={twMerge(
            "border-grayscale-200 hover:border-grayscale-500 focus:border-grayscale-500 active:border-grayscale-500 h-[56px] w-full rounded-lg border-2 px-4 text-gray-900 outline-none group-data-[invalid=true]:border-red-700 peer-data-[label-floating=true]:pt-3",
            size === "sm" && "text-2xs m-0 h-12",
            inputClassName,
          )}
          onChange={handleChange}
        />
        {Boolean(icon) && (
          <div className="absolute top-[18px] right-4 hover:cursor-pointer">
            {icon}
          </div>
        )}
      </div>

      {validationError && (
        <FieldError className="text-2xs absolute mt-1 hidden text-red-500 group-data-[invalid=true]:block">
          {validationError}
        </FieldError>
      )}
    </TextField>
  );
};
