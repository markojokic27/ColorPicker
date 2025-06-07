"use client";

// External packages
import {
  Button as AriaButton,
  ButtonProps as AriaButtonProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

export type ButtonOwnProps = {
  variant?: "solid" | "outline";
  size?: "sm" | "md";
  isVisuallyDisabled?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
};

export const Button: React.FC<
  React.ComponentPropsWithoutRef<"button"> & AriaButtonProps & ButtonOwnProps
> = ({
  variant = "solid",
  size = "md",
  iconLeft,
  iconRight,
  className,
  children,
  ...rest
}) => (
  <AriaButton
    {...rest}
    isDisabled={rest.disabled}
    className={twMerge(
      `${iconLeft || iconRight ? "flex items-center gap-2" : ""}`,
      "rounded-lg border border-black bg-transparent leading-none transition-colors duration-300 outline-none hover:cursor-pointer hover:border-gray-500 hover:bg-transparent focus:outline-none active:scale-[0.98]",
      variant === "solid" &&
        "border-orange-400 bg-orange-400 text-white hover:border-orange-300 hover:bg-orange-300",
      variant === "outline" && "hover:border-gray-500 hover:text-gray-500",
      size === "sm" && "text-2xs px-4 py-2.5 leading-none",
      size === "md" && "px-6 py-4 text-lg leading-none font-semibold",
      className,
    )}
  >
    {Boolean(iconLeft) && iconLeft}
    {children}
    {Boolean(iconRight) && iconRight}
  </AriaButton>
);
