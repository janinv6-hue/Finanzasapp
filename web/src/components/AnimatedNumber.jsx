import { useEffect, useRef, useState } from "react";

function AnimatedNumber({ value, duration = 600 }) {
  const [displayValue, setDisplayValue] = useState(value);
  const startValue = useRef(value);
  const startTime = useRef(null);

  useEffect(() => {
    startValue.current = displayValue;
    startTime.current = null;

    const animate = (timestamp) => {
      if (!startTime.current) startTime.current = timestamp;

      const progress = timestamp - startTime.current;
      const percentage = Math.min(progress / duration, 1);

      const eased = 1 - Math.pow(1 - percentage, 3); // easeOutCubic

      const current =
        startValue.current +
        (value - startValue.current) * eased;

      setDisplayValue(current);

      if (percentage < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return (
    <>
      {displayValue.toLocaleString("es-MX", {
        minimumFractionDigits: 2,
      })}
    </>
  );
}

export default AnimatedNumber;