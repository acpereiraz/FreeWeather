import FadeInFromTop from "./transitions/FadeInFromTop";
import moment from "moment";
import "moment/locale/pt-br";
import React, { useState } from "react";

function Capitalize(str){
  return str
    .split(' ')
    .map(word => word.replace(/^\w/, c => c.toUpperCase()))
    .join(' ');
}

function Calendar() {
  const [date, setDate] = useState(moment());
  
  moment.locale("pt-br");

  const weeks = [];
  let week = [];
  const startOfMonth = date.clone().startOf("month");
  const endOfMonth = date.clone().endOf("month");
  const startOfWeek = startOfMonth.clone().startOf("week");

  while (startOfWeek.isBefore(endOfMonth)) {
    for (let i = 0; i < 7; i++) {
      const day = startOfWeek.clone().add(i, "day");
      week.push(day);
    }
    weeks.push(week);
    week = [];
    startOfWeek.add(7, "day");
  }

  const prevMonth = () => {
    setDate(date.clone().subtract(1, "month"));
  };

  const nextMonth = () => {
    setDate(date.clone().add(1, "month"));
  };

  return (
        <div className="mx-auto max-w-md text-gray-700 p-2 w-full rounded-xl h-[270px]">
          <div className="flex justify-between items-center mb-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold p-2 rounded-full flex text-center"
              onClick={prevMonth}
            >
              <span className="material-symbols-outlined scale-[120%]">chevron_left</span>
            </button>
            <span className="text-lg font-bold">
              {Capitalize(date.format("MMMM YYYY"))}
            </span>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold p-2 rounded-full flex text-center"
              onClick={nextMonth}
            >
              <span className="material-symbols-outlined scale-[120%]">chevron_right</span>
            </button>
          </div>
          <table className="w-full">
            <thead>
              <tr>
                <th>D</th>
                <th>S</th>
                <th>T</th>
                <th>Q</th>
                <th>Q</th>
                <th>S</th>
                <th>S</th>
              </tr>
            </thead>
            <tbody>
              {weeks.map((week, index) => (
                <tr key={index}>
                  {week.map((day) => (
                    <td
                      key={day.format("D")}
                      className={`calendar-day ${
                        day.month() !== date.month() &&
                        "text-gray-400 opacity-50"
                      }`}
                    >
                      {day.format("D")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  );
}

export default Calendar;