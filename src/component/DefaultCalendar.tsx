import { useState } from "react";

type DefaultCalendarProps = {
  initialDate: Date | null;
  onSelectDate: (date: Date) => void;
  onCancel: () => void;
};

function DefaultCalendar({
  initialDate,
  onSelectDate,
  onCancel,
}: DefaultCalendarProps) {
  const today = new Date();

  const [viewDate, setViewDate] = useState(
    initialDate
      ? new Date(initialDate.getFullYear(), initialDate.getMonth(), 1)
      : new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);

  const [mode, setMode] = useState<"Calendar" | "Year">("Calendar");

  const handleOk = () => {
    if (selectedDate) {
      setTimeout(() => {
        onSelectDate(selectedDate);
      }, 0);
    }
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const prevMonth = () => {
    if (mode === "Calendar") {
      setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
    } else {
      setViewDate((d) => new Date(d.getFullYear() - 20, d.getMonth(), 1));
    }
  };

  const nextMonth = () => {
    if (mode === "Calendar") {
      setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
    } else {
      setViewDate((d) => new Date(d.getFullYear() + 20, d.getMonth(), 1));
    }
  };

  const daysInMonth = new Date(
    viewDate.getFullYear(),
    viewDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayId = new Date(
    viewDate.getFullYear(),
    viewDate.getMonth(),
    1
  ).getDay();

  const prevMonthDays = new Date(
    viewDate.getFullYear(),
    viewDate.getMonth(),
    0
  ).getDate();

  const cells = Array.from({ length: 42 }, (_, idx) => {
    const dayNum = idx - firstDayId + 1;
    if (dayNum < 1)
      return {
        day: dayNum + prevMonthDays,
        type: "prev",
      };
    if (dayNum > daysInMonth)
      return {
        day: dayNum - daysInMonth,
        type: "next",
      };
    return {
      day: dayNum,
      type: "current",
    };
  });

  const startYear = Math.floor(viewDate.getFullYear() / 20) * 20;
  const years = Array.from({ length: 20 }, (_, i) => startYear + i);

  const isToday = (day: number) =>
    day === today.getDate() &&
    viewDate.getMonth() === today.getMonth() &&
    viewDate.getFullYear() === today.getFullYear();

  const isSelected = (day: number) =>
    selectedDate &&
    day === selectedDate.getDate() &&
    selectedDate.getMonth() === viewDate.getMonth();
  selectedDate?.getFullYear() === viewDate.getFullYear();

  const selectYear = (year: number) => {
    setViewDate(new Date(year, viewDate.getMonth(), 1));
    setMode("Calendar");
  };

  return (
    <div className="w-[320px] m-auto">
      <div
        className="bg-[#181818] rounded-xl shadow-[4px_4px_20px_rgba(0,0,0,0.3)] w-[320px] text-white p-3"
        style={{ boxShadow: "4px 4px 20px 0 rgba(0, 0, 0, 0.3)" }}
      >
        <p className="text-[16px]">Text</p>
        <div className="text-[30px] mb-4 ">
          {monthNames[viewDate.getMonth()].substring(0, 3)},
          {viewDate.getFullYear()}
        </div>
        <div className="flex justify-between mb-3.5 p-2.5 ">
          <button className="" onClick={prevMonth}>
            &lt;
          </button>
          {mode === "Year" ? (
            <div className="text-base">{viewDate.getFullYear()}</div>
          ) : (
            <div
              className="cursor-pointer text-base"
              onClick={() => setMode("Year")}
            >
              {" "}
              {monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}
            </div>
          )}
          <button onClick={nextMonth}>&gt;</button>
        </div>
        <div className="min-h-[260px] transition-all duration-300 ease-in-out">
          {mode === "Year" ? (
            <div className="grid grid-cols-4 text-center text-base text-white mb-[28px] gap-y-5">
              {years.map((y) => (
                <div
                  key={y}
                  className={`  h-[34px] rounded-[2px] flex items-center justify-center  cursor-pointer
          transition-colors duration-300 
          ${
            y === viewDate.getFullYear()
              ? "bg-blue-500 text-white"
              : "hover:bg-white hover:text-black"
          }
          `}
                  onClick={() => selectYear(y)}
                >
                  {y}
                </div>
              ))}
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-7  text-center text-base  text-gray-500 mb-2">
                {weekdays.map((d) => (
                  <div key={d}>{d}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 text-center text-sm text-gray-300 gap-y-1 mb-4">
                {cells.map(({ day, type }, idx) => {
                  const base =
                    "w-7 h-7 mx-auto flex items-center justify-center rounded-full cursor-pointer transition-colors duration-300";
                  let style = "";
                  if (type !== "current") {
                    style = "text-gray-500";
                  } else {
                    const selected = isSelected(day);
                    const today = isToday(day);

                    if (selected) {
                      style = "bg-blue-500 text-white";
                    } else if (!selectedDate && today) {
                      style = "bg-blue-500 text-white";
                    } else if (today) {
                      style = "border border-blue-500 text-white";
                    } else {
                      style = "text-white hover:bg-white hover:text-black";
                    }
                  }

                  return (
                    <div
                      key={idx}
                      className={`${base} ${style}`}
                      onClick={() =>
                        type === "current" &&
                        setSelectedDate(
                          new Date(
                            viewDate.getFullYear(),
                            viewDate.getMonth(),
                            day
                          )
                        )
                      }
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-24 flex-row-reverse  mt-4 text-sm p-3">
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              handleOk();
            }}
            className="hover:text-blue-400 font-semibold"
          >
            OK
          </button>
          <button onClick={onCancel} className="hover:text-gray-400">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
export default DefaultCalendar;
