import { useState, useRef, useEffect } from "react";
import DefaultCalendar from "./DefaultCalendar";
import InputBirthday from "./InputBirthday";

function Calendar() {
  const [isFocused, setIsFocused] = useState(false);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleMouseDownOnCalendar = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    setIsFocused(false);

    setTimeout(() => {
      inputRef.current?.blur();
    }, 0);
  };
  useEffect(() => {
    console.log("Selected date:", selectedDate);
  }, [selectedDate]);

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
  };
  return (
    <div className="flex justify-center items-center">
      <div className="w-[1219px]  ">
        <div className="flex items-center pl-40 bg-[#181818] h-[283px] rounded-tl-[50px] rounded-tr-[50px] mt-2.5 mb-2.5">
          <h2 className="text-white font-bold text-8xl ">Calendar</h2>
        </div>
        <div className="min-h-[900px] bg-[#181818] flex flex-col  items-center p-32">
          <div className="relative">
            <InputBirthday
              onFocus={() => setIsFocused(true)}
              value={formatDate(selectedDate)}
              inputRef={inputRef}
            />
            {isFocused && (
              <div
                className="absolute top-[60px] left-[178px] z-50"
                onMouseDown={handleMouseDownOnCalendar}
              >
                <DefaultCalendar
                  initialDate={selectedDate}
                  onSelectDate={handleSelectDate}
                  onCancel={() => setIsFocused(false)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
