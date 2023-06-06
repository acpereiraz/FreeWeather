import { useEffect, useState, useRef } from "react";
import MainContent from "./components/MainContent.jsx";
import ApiCaller from "./utils/ApiCaller.js";
import GetDays from "./utils/GetDays.js";
import NavTopBar from "./components/NavTopBar.jsx";
import PanelLeft from "./components/PanelLeft.jsx";
import { isMobile } from "react-device-detect";
import Wait from "./components/Wait.jsx";
import Cookies from "js-cookie";

function App() {

  const getCookie = () => {
    try{
      return(JSON.parse(Cookies.get("dark-mode")));
    }catch{
      return false;
    }
  }

  const Cookie = getCookie(); //Get dark-mode boolean string from cookies and convert it to boolean type
  const [isDark, setIsDark] = useState(Cookie); //Pass Cookie value as default state for isDark, remembering the last setted mode
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [city, setCity] = useState();
  const [currentCoord, setCurrentCoord] = useState(["-23.54", "-46.63"]) //São Paulo as default latitude and longitude
  const [scrollOffset, setScrollOffset] = useState(0);
  const [isPanelActive, setIsPanelActive] = useState(true);
  const scrollRef = useRef(null);
  const APIKEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    (navigator.geolocation) && (
      navigator.geolocation.getCurrentPosition(
        position => {
          setCurrentCoord([position.coords.latitude, position.coords.longitude]);
        },
        error => {
          console.error("Error: ", error.message);
        }
      )
    )
  }, [])

  useEffect(() => {
    async function fetchData(APIKEY) {
      const response = await ApiCaller(`https://api.openweathermap.org/data/2.5/forecast?lat=${currentCoord[0]}&lon=${currentCoord[1]}&lang=en_us&appid=${APIKEY}&units=metric`);
      const days = await GetDays(response.list);
      setCity(response.city)
      setData(days);
      setIsLoading(false);
    }
    try{
      fetchData(APIKEY);
    }catch(error){
      console.error("Error: ", error)
    }
  }, [isLoading, currentCoord, APIKEY]);

  const handleScroll = () => {
    scrollRef.current && setScrollOffset(scrollRef.current.scrollTop)
  }

  useEffect(() => {
    isMobile && setIsPanelActive(false);
  }, []);

  return(
      <div className={`App ${isDark ? 'dark' : ''}`}>
        <Wait isLoading={isLoading} isDark={isDark} text="Loading...">
          <div ref={scrollRef} onScroll={handleScroll} className="bg-[#f3f4f6] dark:bg-[#1f2022] flex flex-row overflow-x-clip overflow-y-auto lg:overflow-y-clip subpixel-antialiased h-[100vh] w-[100vw] min-h-[100vh] max-h-[100vh] transition-all duration-300">
            {/* Right menu panel */}
            <div id="container-start">
              <PanelLeft isPanelActive={isPanelActive} />
            </div>

            {/* Main content */}
            <div id="container-mid" className="flex flex-col grow w-full">
              <NavTopBar
                isPanelActive={isPanelActive}
                setIsPanelActive={setIsPanelActive}
                isDark={isDark}
                setIsDark={setIsDark}
                setCurrentCoord={setCurrentCoord}
                scrollOffset={scrollOffset}
              />
              <MainContent city={city} fullData={data} isDark={isDark} />
            </div>
          </div>
        </Wait>
      </div>
   );
}

export default App;
