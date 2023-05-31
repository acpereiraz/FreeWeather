import { useState } from "react";
import Label from "./Label.jsx";
import Icon from "./Icon.jsx";
import AreaChart from "./AreaChart.jsx";
import FormatDate from "../utils/FormatDate.js";
import {FormatHour as TimeNow} from "../utils/FormatHour.js";
import WeatherTable from "./WeatherTable.jsx";
import "./styles/CardList.css";

function CardList({ city, fullData, isDark}) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [dayIndex, setDayIndex] = useState(0);
  const data = fullData[dayIndex]

  const handleClick = () => {
    !showCalendar ? setShowCalendar(true) : setShowCalendar(false);
  };

  function Capitalize(str) {
    return str
      .split(' ')
      .map(word => word.replace(/^\w/, c => c.toUpperCase()))
      .join(' ');
  }

  const forecast = {
    'city': city.name,
    'feels_like': parseInt(data[0].main.feels_like),
    'date': FormatDate(data[0].dt_txt),
    'condition': Capitalize(data[0].weather[0].description),
    'icon': data[0].weather[0].icon,
    'windspeed': data[0].wind.speed,
    'humidity': data[0].main.humidity,
    'temp': parseInt(data[0].main.temp), //Not feels_like
    'clouds': data[0].clouds.all,
    'timeNow': (dayIndex==0)?TimeNow():data[0].dt_txt.split(" ")[1].replace(":00", "")
  }

  const arrDays = ["Today", "Tomorrow", forecast.date[1]]

  return (
    <div className="max-h-full h-full grow subpixel-antialiased sm:m-2 md:my-5 md:m-0 lg:my-6 lg:mr-4 xl:my-6 xl:mr-4">
      <div id="container" className="flex flex-col grow h-full mt-4 max-h-[100vh] overflow-x-clip
                                      sm:mt-4 sm:mb-6 sm:gap-4 md:mt-[0px] lg:flex lg:flex-row">
        <div id="container-one" className="flex flex-col grow bg-white dark:bg-maxblack transition-all duration-300 dark:transition-all dark:duration-300 shadow-lg p-4 gap-6
                                            sm:rounded-[40px] xl:gap-x-12 xl:p-8 xl:gap-y-8">
          <div id="container-label" className="flex flex-row flex-wrap content-center justify-between w-full mt-1 px-2 text-gray-700 sm:px-4">
            <div className="flex flex-col text-start w-fit grow">
              <h2 className={`font-bold text-gray-600 dark:text-gray-300`}>{dayIndex<2?arrDays[dayIndex]:arrDays[2]}</h2>
              <h1 className="font-light text-[28px] sm:text-[40px] max-w-[150px] sm:max-w-[250px] lg:max-w-full lg:w-full text-gray-600 dark:text-gray-200 truncate overflow-hidden text-ellipsis">{forecast.city}{forecast.state&&`, ${forecast.state}`}</h1>
              <p className="text-gray-400">{forecast.date[0]}</p>
            </div>
            <div className="flex flex-col items-end">
              <h2 className={`text-gray-400 dark:text-gray-500`}>{forecast.timeNow}</h2>
              <div className="flex text-end justify-end items-center gap-4 max-h-[60px]">
                <div id="icon" className="-translate-y-[0.4em] h-[65px] w-[65px] sm:h-[70x] sm:w-[70px] lg:h-[70px] lg:w-[70px] lg:mr-2 sm:scale-[100%]">
                  <Icon icon={`${forecast.icon}`}></Icon>
                </div>
                <h1 className="text-[35px] dark:text-gray-200 sm:text-[40px] lg:text-[48px] text-gray-600 dark:text-gray-200 transition-all duration-500 font-medium">{forecast.feels_like}°</h1>
              </div>
              <p className="text-gray-400 dark:text-gray-300 font-light whitespace-break-spaces max-w-[90px] lg:max-w-fit text-end">{forecast.condition}</p>
            </div>
          </div>

          <div id="container-daybox" className="flex flex-col text-start w-full gap-6 mt-2 sm:px-6">
            <h3 id="container-title" className="text-gray-700 dark:text-gray-200  text-[18px] sm:px-6 px-2">
              Average temperature
            </h3>

            <div className="px-2">
              <AreaChart isDark={isDark} data={data} />
            </div>

            <div className="flex justify-evenly w-full col-span-2">
              <Label icon="air" text={`${forecast.windspeed} km/h`} color="purple" />
              <Label icon="water_drop" text={`${forecast.humidity}%`} color="purple" />
              <Label icon="thermostat" text={`${forecast.temp}°C`} color="purple" />
              <Label icon="cloud" text={`${forecast.clouds}%`} color="purple" />
            </div>
          </div>
        </div>
        <div id="container-two" className="p-[22px] flex bg-white shadow-lg dark:bg-maxblack transition-all duration-300 dark:transition-all dark:duration-300 grow p-4
                                            sm:rounded-[40px] md:basis-[35%] md:transition-all lg:basis-2/5 xl:basis-[40%] xl:px-10 xl:pb-8 xl:pt-12 ">

          <div className="overflow-x-auto overflow-y-scroll h-[650px] sm:h-[550] md:h-[600] md:h-[720px] w-full items-center">
            <WeatherTable data={fullData} dayIndex={dayIndex} />
          </div>

        </div>

        <div 
          onClick={() => {setDayIndex((dayIndex<fullData.length-1)?dayIndex+1:0)}}
          id="button-next" 
          className="fixed justify-end w-[120px] h-14 bg-purple-600 dark:bg-minblack rounded-full bottom-6 right-6
                      flex items-center text-white overflow-hidden gap-4 pr-2 transition-all lg:w-14
                        shadow-md shadow-purple-600 border border-1 border-purple-700 dark:border-maxblack duration-300
                          lg:hover:w-[120px] active:scale-[90%]">
          <div id="button-next-overlay" className="absolute w-full h-full cursor-pointer"></div>
          <p id="button-next-text" className="ml-[100%] text-white dark:text-gray-300 font-medium">Next</p>
          <span className="material-symbols-outlined text-[35px] text-white dark:text-gray-300">chevron_right</span>
        </div>

      </div>
    </div>
  );
}

export default CardList;
