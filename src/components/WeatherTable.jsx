import { TbTilde } from "react-icons/tb"
import { HiArrowSmRight } from "react-icons/hi";
import FormatDate from "../utils/FormatDate.js";
import { IoIosThermometer, IoIosWater } from "react-icons/io";
import { VscArrowSmallDown, VscArrowSmallUp } from "react-icons/vsc";
import { WiCelsius, WiStrongWind, WiDaySunny, WiNightClear, WiDayCloudy, WiNightCloudy, WiCloudy, WiSprinkle, WiRain, WiDayRain, WiNightRain, WiDayLightning, WiNightLightning, WiDaySnow, WiNightSnow, WiDayFog, WiNightFog } from "react-icons/wi";

const WeatherTable = ({ data }) => {

  const weatherIcons = {
    "01d": <WiDaySunny />,
    "01n": <WiNightClear />,
    "02d": <WiDayCloudy />,
    "02n": <WiNightCloudy />,
    "03d": <WiCloudy />,
    "03n": <WiCloudy />,
    "04d": <WiSprinkle />,
    "04n": <WiSprinkle />,
    "09d": <WiRain />,
    "09n": <WiRain />,
    "10d": <WiDayRain />,
    "10n": <WiNightRain />,
    "11d": <WiDayLightning />,
    "11n": <WiNightLightning />,
    "13d": <WiDaySnow />,
    "13n": <WiNightSnow />,
    "50d": <WiDayFog />,
    "50n": <WiNightFog />,
  }

  const weatherData = []
  data.map((item)=>{
    item.map((subitem)=>{
      weatherData.push(
        {
          icon: weatherIcons[subitem.weather[0].icon],
          condition: subitem.weather[0].description,
          date: subitem.dt_txt.split(" ")[0],
          hour: subitem.dt_txt.split(" ")[1].replace(":00", ""),
          feelsLikeTemperature: parseInt(subitem.main.feels_like),
          highTemperature: parseInt(subitem.main.temp_max),
          lowTemperature: parseInt(subitem.main.temp_min),
          windSpeed: subitem.wind.speed.toFixed(1),
          humidity: subitem.main.humidity,
        })
    })
  })

  return (
    <table className="table-fixed  text-gray-500 w-full">
      <thead>
        <tr>
          <th className="border-b-2 border-gray-300 dark:border-lt2black w-1/8 p-4 lg:p-5 text-gray-700 dark:text-gray-300"></th>
          <th className="border-b-2 border-gray-300 dark:border-lt2black w-1/8 p-2 lg:p-4 text-gray-700 dark:text-gray-300 text-[12px] md:text-[14px] lg:text-[16px]">Date</th>
          <th className="border-b-2 border-gray-300 dark:border-lt2black w-1/8 p-2 lg:p-4 text-gray-700 dark:text-gray-300 text-[12px] md:text-[14px] lg:text-[16px]">Time</th>
          <th className="border-b-2 border-gray-300 dark:border-lt2black w-1/8 p-2 lg:p-4 ">
            <div title="Feels Like" className="flex text-purple-500 dark:text-purple-300 self-center"><IoIosThermometer /><TbTilde /></div>
          </th>
          <th className="border-b-2 border-gray-300 dark:border-lt2black w-1/8 p-2 lg:p-4 ">
            <div title="High Temperature" className="flex text-red-500 dark:text-red-300"><IoIosThermometer /><VscArrowSmallUp /></div>
          </th>
          <th className="border-b-2 border-gray-300 dark:border-lt2black w-1/8 p-2 lg:p-4 text-lg">
            <div title="Low Temperature" className="flex text-blue-500 dark:text-blue-300"><IoIosThermometer /><VscArrowSmallDown /></div>
          </th>
          <th className="border-b-2 border-gray-300 dark:border-lt2black w-1/8 -p-2 sm:p-0 lg:p-4">
            <WiStrongWind title="Wind Speed" className="text-green-500 dark:text-green-300 translate-x-4" />
          </th>
          <th className="border-b-2 border-gray-300 dark:border-lt2black w-1/8 p-4">
            <IoIosWater title="Relative Humidity" className="text-blue-500 dark:text-blue-300" />
          </th>
          <th className="border-b-2 border-gray-300 dark:border-lt2black w-1/8 p-4">
          </th>
        </tr>
      </thead>
      <tbody>
        {weatherData.map((item, index) => (
          <tr key={index} className="whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-midnight">
            <td className="border-b dark:border-ltblack p-2 lg:p-4 text-[24px]" title={`${item.condition}`} >{item.icon}</td>
            <td className="border-b dark:border-ltblack p-1 lg:pl-1 lg:pr-2 text-[12px] md:text-[14px] lg:text-[16px]"><div className="flex">{FormatDate(item.date)[0]}</div></td>
            <td className="border-b dark:border-ltblack p-2 lg:p-4 text-[12px] md:text-[14px] lg:text-[16px]"><div className="flex">{item.hour}</div></td>
            <td className="border-b dark:border-ltblack p-0 translate-x-[10px] lg:translate-x-3 lg:p-4 xl:translate-x-0 bg-[#b000ff10]">
              <div className="flex items-center">{item.feelsLikeTemperature}<WiCelsius className="text-[20px] -translate-x-[3px]" /></div>
            </td>
            <td className="border-b dark:border-ltblack p-0 translate-x-[10px] lg:translate-x-3 lg:p-4 xl:translate-x-0 bg-[#ff00a210]">
              <div className="flex items-center">{item.highTemperature}<WiCelsius className="text-[20px] -translate-x-[3px]" /> </div>
            </td>
            <td className="border-b dark:border-ltblack p-0 translate-x-[10px] lg:translate-x-3 lg:p-4 xl:translate-x-0 bg-[#2040ff10]">
              <div className="flex items-center">{item.lowTemperature}<WiCelsius className="text-[20px] -translate-x-[3px]" /></div>
            </td>
            <td className="border-b dark:border-ltblack p-1 lg:p-4">
              <div className="flex items-end gap-[2px]">{item.windSpeed} <span className="text-[10px]">Km/h</span></div>
            </td>
            <td className="border-b dark:border-ltblack p-4 text-[12px] translate-x-1 lg:text-[16px] lg:translate-x-0"><div className="flex justify-start">{item.humidity}%</div></td>
            <td className="border-b dark:border-ltblack p-4">
              <a href="#" className="">
                <HiArrowSmRight className="text-lg text-purple-500 dark:text-purple-300" />
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WeatherTable;
