import { useEffect, useRef, useState } from "react";
import "./styles/NavTopBar.css"
import ApiCaller from "../utils/ApiCaller.js";
import Wait from "./Wait.jsx";
import { LuPanelLeftOpen, LuPanelLeftClose } from "react-icons/lu";
import Cookies from "js-cookie";

const NavTopBar = ({ isPanelActive, setIsPanelActive, isDark, setIsDark, setCurrentCoord, scrollOffset }) => {

  const [cityArr, setCityArr] = useState([]);
  const [searchArg, setSearchArg] = useState("Sao Paulo")
  const [isLoading, setIsLoading] = useState(true);
  const inputRef = useRef(null);
  const APIKEY = import.meta.env.VITE_API_KEY;

  function handleClick() {
    setIsPanelActive(!isPanelActive);
  }

  function handleDarkModeSwitch() {
    Cookies.set("dark-mode", !isDark);
    setIsDark(!isDark);
  }

  useEffect(()=>{
    setIsLoading(true)
    setTimeout(500)
    ApiCaller(`https://api.openweathermap.org/geo/1.0/direct?q=${searchArg}&limit=5&appid=${APIKEY}`)
    .then((response) => {
      setCityArr(response);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }, [searchArg]);

  function handleChange() {
    (inputRef.current.value.length>3) && setSearchArg(inputRef.current.value);
  }

  useEffect(()=>{
    setIsPanelActive(false);
  },[scrollOffset])

  const icons = ['home', 'star', 'person', 'info'];

  return (
    <div id="nav-top" className={`${scrollOffset&&"smm:absolute smm:shadow smm:bg-opacity-60 smm:dark:bg-opacity-60 smm:backdrop-blur-2xl smm:dark:backdrop-blur-3xl"} 
                                    bg-gray-100 dark:bg-minblack p-3 sm:py-4 sm:px-6 w-full transition-all duration-300`}>
      
      <div id="container" className="flex justify-between items-center gap-2 sm:gap-4">
        
        <div className="flex gap-2">
            <div 
              id="container-logo-inner" 
              onClick={handleClick} 
              className="h-[40px] text-2xl font-bold text-transparent items-center justify-center md:hidden
                              subpixel-antialiased opacity-90 hover:opacity-100 active:opacity-70 transition-all
                                hover:transition-all cursor-pointer bg-gradient-to-bl from-indigo-500 text-center 
                                  via-purple-500 to-pink-400 bg-clip-text ">
              <span id="logo-icon" className={`material-symbols-rounded text-[40px] subpixel-antialiased `}>cloud</span>
              <div className={`${isPanelActive ? '' : 'hidden'} bg-white z-99 drop-shadow-md dark:bg-minblack transition-all 
                              duration-300 absolute min-h-fit rounded-3xl flex flex-col text-purple-500`}>
                {icons.map((icon, index)=>(
                  <button key={index} className="p-2 rounded-full h-fit hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-maxblack 
                                                  dark:active:bg-midnight md:hidden flex items-center text-center transition-all duration-300">
                    <span className={`material-symbols-outlined text-md font-light`}>
                      {icon}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="relative h-max">
              <button
                id="panel-button"
                onClick={handleClick}
                className="shadow-sm rounded-lg p-2 subpixel-antialiased transition-all duration-300 bg-white dark:bg-maxblack
                            text-purple-400 active:bg-purple-600 active:text-white hover:text-white hover:bg-purple-400
                              dark:hover:text-purple-300 dark:hover:bg-midnight focus:text-white focus:bg-purple-400 mdm:hidden"
              >
                {isPanelActive?<LuPanelLeftClose size={24} />:<LuPanelLeftOpen size={24} />}
              </button>
            </div>

        </div>

        <div className="inline-block relative">
          <input
            id="search-input"
            list="suggestions"
            ref={inputRef}
            onChange={handleChange}
            className={`${scrollOffset&&"bg-opacity-60 bg-gray-100 dark:bg-opacity-60"} bg-white dark:bg-maxblack shadow-sm content-center
                          outline outline-1 outline-gray-50 dark:outline-minblack dark:focus:outline-purple-600 max-w-[400px] h-[40px]
                            rounded-[100px] text-gray-600 text-md p-4 focus:outline-purple-300 hover:outline-gray-300 active:outline-purple-400
                              transition-all focus:transition-all active:transition-all dark:transition-all duration-300 dark:duration-300
                                dark:hover:outline-[#3b3b3b] min-w-[180px] w-[40vw] sm:min-w-[250px] sm:w-[50vw]`}
            placeholder="São Paulo, SP"
          ></input>

            <div id="search-suggestion" className="absolute z-10 w-full h-fit">
              <ul
                className={`${scrollOffset&&"shadow bg-opacity-60 dark:bg-opacity-60"} backdrop-blur-2xl dark:backdrop-blur-3xl h-full bg-white 
                              dark:bg-minblack dark:text-gray-300 text-gray-700 overflow-hidden shadow w-full rounded-xl duration-300 mt-4
                                md:opacity-70 md:dark:opacity-80 md:dark:hover:opacity-100 md:hover:opacity-100 text-start transition-all`}
              >
                <Wait isLoading={isLoading} isDark={false} text="Searching...">
                  {(cityArr?.map((city, index)=> (
                    <li
                      key={index}
                      onClick={()=> {setCurrentCoord([city.lat, city.lon])}}
                      className=" px-4 py-2 text-gray-600 dark:text-gray-300 text-sm subpixel-antialiased hover:bg-purple-300 duration-200
                                    hover:text-white dark:hover:bg-purple-600 cursor-pointer dark:active:bg-purple-800 transition-all"
                    >
                      {city.name}, <span className="overflow-hidden whitespace-nowrap">{city.state}</span>
                    </li>
                  )))}
                </Wait>
              </ul>
            </div>
        </div>

        <div id="dark-mode-switch-button" className="relative w-[60px] h-8 inline-flex content-center items-center cursor-pointer">
          <div
            className="absolute w-full h-full rounded-[50px] dark:bg-gradient-to-r dark:from-indigo-600 
                            dark:via-purple-500 dark:to-pink-500 bg-gradient-to-l from-yellow-400 
                                to-orange-400 drop-shadow-sm opacity-90 transition-all duration-300"
          ></div>
          <div
            className="bg-white drop-shadow-md w-[28px] h-[28px] absolute flex text-center content-center
                                items-center justify-center rounded-full translate-x-[2px] 
                                dark:translate-x-[108%] transition-all duration-300"
          >
            <div
              className={`material-symbols-outlined text-yellow-500 transition-all duration-300 
                                        dark:text-gray-800 w-full h-full absolute
                                            translate-y-[2px]`}
            >
              {isDark ? "sleep" : "light_mode"}
            </div>
          </div>

          <button
            onClick={handleDarkModeSwitch}
            className="absolute w-full h-full z-10"
          ></button>
        </div>
      </div>
    </div>
  );
};

export default NavTopBar;
