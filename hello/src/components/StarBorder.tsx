import React from "react";

type StarBorderProps<T extends React.ElementType> =
  React.ComponentPropsWithoutRef<T> & {
    as?: T;
    className?: string;
    children?: React.ReactNode;
    color?: string;
    speed?: React.CSSProperties["animationDuration"];
    thickness?: number;
  };

const StarBorder = <T extends React.ElementType = "button">({
  as,
  className = "",
  color = "cyan",
  speed = "6s",
  thickness = 2,
  children,
  ...rest
}: StarBorderProps<T>) => {
  const Component = as || "button";

  return (
    <Component
      className={`relative inline-flex overflow-hidden rounded-full ${className}`}
      style={{
        padding: thickness,
      }}
      {...(rest as any)}
    >
      <span
        className="absolute inset-[-200%] animate-spin"
        style={{
          background: `conic-gradient(from 0deg, transparent 0deg, ${color}, transparent 120deg)`,
          animationDuration: speed,
        }}
      />

      <span className="relative z-10 bg-gradient-to-b from-black to-gray-900 border border-gray-800 rounded-full p-2 text-white">
        {children}
      </span>
    </Component>
  );
};

export default StarBorder;
