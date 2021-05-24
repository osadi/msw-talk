import { useRef } from "react";

export const useConstant = <Value>(init: () => Value) => {
  const ref = useRef<Value | null>(null);

  if (ref.current === null) {
    ref.current = init();
  }

  return ref.current;
};
