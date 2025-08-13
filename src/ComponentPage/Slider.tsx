import { useState, useEffect } from "react";

type sliderProps = {
  onChangeValue: (value: number) => void;
};

function Slider({ onChangeValue }: sliderProps) {
  const steps: number[] = [3, 6, 9, 12, 15, 50];
  const [index, setIndex] = useState<number>(steps.indexOf(15));
  const value: number = steps[index];
  const percent: number = (index / (steps.length - 1)) * 100;

  useEffect(() => {
    if (onChangeValue) onChangeValue(value);
  }, [value, onChangeValue]);

  return (
    <div className="relative w-full max-w-[725px]">
      <input
        type="range"
        min={0}
        max={steps.length - 1}
        value={index}
        step={1}
        onChange={(e) => setIndex(Number(e.target.value))}
        className="relative z-10 w-full appearance-none h-2 rounded-full outline-none
          [&::-webkit-slider-thumb]:appearance-none 
          [&::-webkit-slider-thumb]:h-5 
          [&::-webkit-slider-thumb]:w-5 
          [&::-webkit-slider-thumb]:rounded-full 
          [&::-webkit-slider-thumb]:bg-[#121212] 
          [&::-webkit-slider-thumb]:border-4 
          [&::-webkit-slider-thumb]:border-yellow-400 
          [&::-webkit-slider-thumb]:cursor-pointer
          [&::-moz-range-thumb]:appearance-none 
          [&::-moz-range-thumb]:h-5 
          [&::-moz-range-thumb]:w-5 
          [&::-moz-range-thumb]:rounded-full 
          [&::-moz-range-thumb]:bg-[#121212] 
          [&::-moz-range-thumb]:border-4 
          [&::-moz-range-thumb]:border-yellow-400 
          [&::-moz-range-thumb]:cursor-pointer
        "
        style={{
          background: `linear-gradient(to right, #f97316 0%, #facc15 ${percent}%, #6b7280 ${percent}%, #6b7280 100%)`,
        }}
      />

      <div className="pointer-events-none absolute left-0 top-[calc(100%+6px)] w-full h-5">
        {steps.map((s, i) => {
          const stepPercent = (i / (steps.length - 1)) * 100;
          const isActive = i === index;

          let translateClass = "-translate-x-1/2";
          if (i === 0) translateClass = "translate-x-0";
          else if (i === steps.length - 1) translateClass = "-translate-x-full";

          return (
            <span
              key={s}
              className={`absolute text-xs leading-none transition-colors ${translateClass} ${
                isActive ? "text-white font-semibold" : "text-gray-400"
              }`}
              style={{ left: `${stepPercent}%` }}
            >
              {s}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default Slider;
