import React, { useRef } from "react";

export const useRenders = (name: string) => {
  const renders = useRef(0);

  console.log(`component ${name} renders: ${renders.current++}`);
};
