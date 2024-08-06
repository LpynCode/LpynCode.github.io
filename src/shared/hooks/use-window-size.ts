import { useLayoutEffect, useState } from "react";

const useWindowSize = (maxWidth: number) => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const handleSize = () => {
    setWindowSize({
      width: window.innerWidth < maxWidth ? window.innerWidth : maxWidth,
      height: window.innerHeight
    });
  };

  useLayoutEffect(() => {
    handleSize();

    window.addEventListener("resize", handleSize);

    return () => window.removeEventListener("resize", handleSize);
  }, []);

  return windowSize;
};

export default useWindowSize;