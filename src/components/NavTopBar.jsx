import { useEffect, useRef, useState } from "react";
import "./styles/NavTopBar.css"
import ApiCaller from "../utils/ApiCaller.js";

const NavTopBar = ({ isPanelActive, setIsPanelActive, isDark, setIsDark, setCurrentCoord }) => {

  const [cityArr, setCityArr] = useState([]);
  const [searchArg, setSearchArg] = useState("Sao Paulo")
  const [isLoading, setIsLoading] = useState(true);
  const inputRef = useRef(null);

  function handleClick() {
    setIsPanelActive(!isPanelActive);
  }

  function handleDarkModeSwitch() {
    setIsDark(!isDark);
  }

  useEffect(()=>{
    setIsLoading(true)
    ApiCaller(`https://api.openweathermap.org/geo/1.0/direct?q=${searchArg}&limit=5&appid=ef1a7385a0d8ab7a40365905e852e964`)
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

  return (
    <div className="mt-4 w-full px-4 sm:px-6">
      
      <div className={`${isPanelActive ? 'hidden ' : ''}bg-white opacity-80 hover:opacity-100 z-99 drop-shadow-md dark:bg-minblack transition-all duration-300 absolute top-[62px] p-1 left-8 min-h-fit rounded-3xl flex gap-2 text-purple-500`}>
        <button className="p-2 rounded-full h-fit hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-maxblack dark:active:bg-midnight md:hidden flex items-center text-center transition-all duration-300">
          <span className={`material-symbols-outlined text-md font-light`}>
            home
          </span>
        </button>

        <button className="p-2 rounded-full h-fit hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-maxblack dark:active:bg-midnight md:hidden flex items-center text-center transition-all duration-300">
          <span className={`material-symbols-outlined text-md font-light`}>
            star
          </span>
        </button>
        <button className="p-2 rounded-full h-fit hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-maxblack dark:active:bg-midnight md:hidden flex items-center text-center transition-all duration-300">
          <span className={`material-symbols-outlined text-md font-light`}>
            person
          </span>
        </button>
        <button className="p-2 rounded-full h-fit hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-maxblack dark:active:bg-midnight md:hidden flex items-center text-center transition-all duration-300">
          <span className={`material-symbols-outlined text-md font-light`}>
            info
          </span>
        </button>
      </div>
      
      <div id="container" className="flex justify-between items-center gap-2 sm:gap-4">
        
        <div className="flex gap-2">
            <div id="container-logo-inner" className="text-2xl font-bold text-transparent flex flex-col text-center 
                              subpixel-antialiased opacity-90 hover:opacity-100 active:opacity-70 transition-all
                                hover:transition-all cursor-pointer bg-gradient-to-bl from-indigo-500 
                                  via-purple-500 to-pink-400 bg-clip-text items-center justify-center md:hidden">
              <span id="logo-icon" className={`material-symbols-rounded text-[40px] subpixel-antialiased `}>cloud</span>
            </div>
          
          <button
            id="panel-button"
            onClick={handleClick}
            className=" material-symbols-outlined text-1xl rounded-[100%] border-0 px-2 py-2 text-purple-500 hover:text-white 
                        active:bg-purple-600 active:text-white active:transition-all subpixel-antialiased hover:transition-all
                        transition-all active:duration-300 duration-300 scale-[110%] hover:bg-purple-500 
              
                        md:p-[6px] md:border-2 md:border-purple-500 md:active:border-purple-600"
          >
            menu
          </button>
        </div>

        <div className="inline-block relative">
          <input
            id="search-input"
            list="suggestions"
            ref={inputRef}
            onChange={handleChange}
            className=" bg-gray-50 dark:bg-maxblack shadow-sm content-center
                                    outline outline-1 outline-gray-50 dark:outline-minblack dark:focus:outline-purple-600 max-w-[400px] h-[40px]
                                        rounded-[100px] text-gray-600 text-md p-4 focus:outline-purple-400 
                                            hover:outline-gray-200 active:outline-purple-400 transition-all 
                                                focus:transition-all active:transition-all dark:transition-all duration-300 
                                                    dark:duration-300 dark:hover:outline-[#3b3b3b] min-w-[160px] w-[40vw] sm:min-w-[250px] sm:w-[50vw]"
            placeholder="São Paulo, SP"
          ></input>

            <div id="search-suggestion" className="absolute z-10 w-full ">
              <ul
                className=" bg-white dark:bg-maxblack dark:text-gray-300 text-gray-700 overflow-hidden shadow w-full rounded-xl 
                                                mt-2 opacity-70 dark:opacity-80 dark:hover:opacity-100 hover:opacity-100 transition-all hover:transition-all 
                                                    text-start transition-all dark:transition-all duration-300 dark:duration-300"
              >
                {isLoading? <div className="h-[188px] w-full flex justify-center items-center">Searching...</div> :
                (cityArr?.map((city, index)=> (
                  <li
                    key={index}
                    onClick={()=> {setCurrentCoord([city.lat, city.lon])}}
                    className=" px-4 py-2 text-gray-600 dark:text-gray-300 text-sm subpixel-antialiased hover:bg-purple-300 
                                                      hover:text-white dark:hover:bg-purple-600 cursor-pointer"
                  >
                    {city.name}, <span className="overflow-hidden whitespace-nowrap">{city.state}</span>
                  </li>
                )))}
              </ul>
            </div>
        </div>

        <div className="relative w-[60px] h-8 inline-flex content-center items-center cursor-pointer">
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
