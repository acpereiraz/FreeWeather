/**
 * This is the main component where it renders all the weather information together.
 * @component
 *
 * @param {Object} city - The city object containing name of the current city.
 * @param {Array} fullData - The array of weather data containing information of multiple days.
 * @param {boolean} isDark - Flag indicator for dark theme mode switch.
 *
 * @returns {JSX.Element} The MainContent component.
 */

// React imports
import { useEffect, useState } from "react";
// App local imports
import AreaChart from "./AreaChart.jsx";
import HandleCookie from "../utils/HandleCookie.js"
import FormatDate from "../utils/FormatDate.js";
import {FormatHour as TimeNow} from "../utils/FormatHour.js";
import Icon from "./Icon.jsx";
import Label from "./Label.jsx";
import WeatherTable from "./WeatherTable.jsx";
// Styling imports
import "./styles/MainContent.css";  
import CheckCookie from "../utils/CheckCookie.js";

/**
 * Capitalizes the first letter of each word in a string.
 * @param {string} str - The input string.
 * @returns {string} The capitalized string.
 */
function Capitalize(str) {
  return str
    .split(' ')
    .map((word) => word.replace(/^\w/, (c) => c.toUpperCase()))
    .join(' ');
}

function MainContent({ city, fullData, isDark, currentCoord }) {
  // State variables
  const [showCalendar, setShowCalendar] = useState(false);
  const [dayIndex, setDayIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(CheckCookie(city.name));

  // Set data as fullData item from current day based on dayIndex
  const data = fullData[dayIndex];

  /**
   * Handles the click event of the button to toggle the calendar. [WIP]
   */
  const handleClick = () => {
    setShowCalendar(!showCalendar);
  };

  // Forecast object
  const forecast = {
    city: city.name,
    feels_like: parseInt(data[0].main.feels_like),
    date: FormatDate(data[0].dt_txt),
    condition: Capitalize(data[0].weather[0].description),
    icon: data[0].weather[0].icon,
    windspeed: data[0].wind.speed,
    humidity: data[0].main.humidity,
    temp: parseInt(data[0].main.temp), // Not feels_like, probably average temperature
    clouds: data[0].clouds.all,
    timeNow: dayIndex === 0 ? TimeNow() : data[0].dt_txt.split(' ')[1].replace(':00', ''),
  };

  //Favorite a city saving it to cookie
  function handleFavoriteSwitch(){
    setIsFavorited(HandleCookie(forecast, currentCoord));
  }

  useEffect(()=>{
    setIsFavorited(CheckCookie(city.name))
  },[forecast])

  // Array of days
  const arrDays = ['Today', 'Tomorrow', forecast.date[1]];

  return (
      <div id="container" className="flex flex-col grow h-full overflow-x-clip subpixel-antialiased sm:m-3 lg:m-5 sm:gap-4 lg:gap-6 lg:flex lg:flex-row ">
        {/* Left container */}
        <div
          id="container-one"
          className="flex flex-col grow bg-white dark:bg-maxblack transition-all duration-300 dark:transition-all dark:duration-300 shadow-lg p-4 gap-6
                                            sm:rounded-[40px] xl:gap-x-12 xl:p-8 xl:gap-y-8"
        >
          {/* Weather details container */}
          <div
            id="container-label"
            className="flex flex-row flex-wrap content-center justify-between w-full px-1 text-gray-700 sm:px-4"
          >
            <div className="flex flex-col text-start w-fit grow">
              <h2 className={`font-bold text-gray-600 dark:text-gray-300`}>
                {dayIndex < 2 ? arrDays[dayIndex] : arrDays[2]}
              </h2>
              <div className="flex gap-2 font-light text-[30px] sm:text-[40px] max-w-[170px] sm:max-w-[250px] lg:max-w-full lg:w-full text-gray-600 items-center dark:text-gray-200">
                <h1 className="truncate overflow-hidden text-ellipsis">
                  {forecast.city}
                </h1>
                <span onClick={handleFavoriteSwitch} className={`material-symbols-rounded transition-all duration-300 ${isFavorited?"text-yellow-400":"text-gray-300 dark:text-lt2black"} cursor-pointer text-[26px] sm:text-[38px]`}>star</span>
              </div>
              <p className="text-gray-400">{forecast.date[0]}</p>
            </div>
            <div className="flex flex-col items-end">
              <h2 className={`text-gray-400 dark:text-gray-500`}>{forecast.timeNow}</h2>
              <div className="flex text-end justify-end items-center gap-4 max-h-[42px] sm:max-h-[60px]">
                <div
                  id="icon"
                  className="-translate-y-[0.5em] h-[55px] w-[55px] sm:h-[70x] sm:w-[70px] lg:h-[70px] lg:w-[70px] lg:mr-2 sm:scale-[100%]"
                >
                  <Icon icon={`${forecast.icon}`} />
                </div>
                <h1 className="text-[30px] dark:text-gray-200 sm:text-[40px] lg:text-[48px] text-gray-600 dark:text-gray-200 transition-all duration-500 font-medium">
                  {forecast.feels_like}°
                </h1>
              </div>
              <p className="text-gray-400 dark:text-gray-300 font-light whitespace-break-spaces max-w-[120px] lg:max-w-fit text-end">
                {forecast.condition}
              </p>
            </div>
          </div>

          {/* Weather chart container*/}
          <div
            id="container-daybox"
            className="flex flex-col text-start w-full gap-6 sm:px-6 grow justify-evenly"
          >
            <h3
              id="container-title"
              className="text-gray-700 dark:text-gray-200  text-[18px] sm:px-6 px-2"
            >
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

        {/* Right container */}
        <div
          id="container-two"
          className="p-[22px] flex bg-white shadow-lg dark:bg-maxblack transition-all duration-300 dark:transition-all dark:duration-300 grow p-4
                                            sm:rounded-[40px] md:basis-[35%] md:transition-all lg:basis-2/5 xl:basis-[40%] xl:px-10 xl:py-8"
        >
          {/* Weather forecasts table */}
          <div className="overflow-x-auto overflow-y-scroll h-[650px] sm:h-[550] md:h-[600] md:h-[720px] w-full items-center">
            <WeatherTable data={fullData} dayIndex={dayIndex} />
          </div>
        </div>

        {/* Next day button */}
        <div
          onClick={() =>
            setDayIndex(dayIndex < fullData.length - 1 ? dayIndex + 1 : 0)
          }
          id="button-next"
          className="fixed justify-end w-[120px] h-14 bg-purple-600 dark:bg-minblack rounded-full bottom-6 right-6
                      flex items-center text-white overflow-hidden gap-4 pr-2 transition-all lg:w-14
                        shadow-md shadow-purple-600 border border-1 border-purple-700 dark:border-maxblack duration-300
                          lg:hover:w-[120px] active:scale-[90%]"
        >
          <div id="button-next-overlay" className="absolute w-full h-full cursor-pointer"></div>
          <p id="button-next-text" className="ml-[100%] text-white dark:text-gray-300 font-medium">
            Next
          </p>
          <span className="material-symbols-outlined text-[35px] text-white dark:text-gray-300">
            chevron_right
          </span>
        </div>
      </div>
  );
}

export default MainContent;
