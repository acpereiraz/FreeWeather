// React imports
import { useEffect, useState, useRef, useCallback } from "react";
import { isMobile } from "react-device-detect";
import Cookies from "js-cookie";
// App local imports
import ApiCaller from "./utils/ApiCaller.js";
import Favorites from "./components/Favorites.jsx"
import GetDays from "./utils/GetDays.js";
import MainContent from "./components/MainContent.jsx";
import NavTopBar from "./components/NavTopBar.jsx";
import PanelLeft from "./components/PanelLeft.jsx";
import Wait from "./components/Wait.jsx";

function App() {

  /**
   * @returns {boolean} Check if the cookie for dark-mode exists, value returned will later be set as default value for isDark state below.
   * It is used to retrieve the last mode setted by user
   */
  const getCookie = () => {
    try{
      return(JSON.parse(Cookies.get("dark-mode")));
    }catch{
      return false;
    }
  }

  /**
   * TODO: Reduce the usage of states: Check if some states are really useful if not just remove it.
   */
  const Cookie = getCookie(); //Get dark-mode boolean string from cookies and convert it to boolean type
  const [isDark, setIsDark] = useState(Cookie); //Pass Cookie value as default state for isDark, remembering the last setted mode
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [city, setCity] = useState();
  const [currentCoord, setCurrentCoord] = useState(["-23.54", "-46.63"]) //São Paulo as default latitude and longitude
  const [scrollOffset, setScrollOffset] = useState(0);
  const [isPanelActive, setIsPanelActive] = useState(true);
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false);
  const scrollRef = useRef(null);
  const APIKEY = import.meta.env.VITE_API_KEY;

/** Block of useEffect hooks */

  /**
   * Executed at the beginning to ask user for geolocation permission, if accepted it will get the latitude and longitude and store on currentCoord,
   * rendering again the interface and retrieving new data from the api.
   */
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

  /**
   * Api data fetcher, it is executed everytime a currentCoord is updated, so if a new coordinate is set through search or geolocation,
   * it will rerender and fetch data from the current coordinate.
   */
  useEffect(() => {
    async function fetchData(APIKEY) {
      try{
        const response = await ApiCaller(`https://api.openweathermap.org/data/2.5/forecast?lat=${currentCoord[0]}&lon=${currentCoord[1]}&lang=en_us&appid=${APIKEY}&units=metric`);
        const days = await GetDays(response.list);
        setCity(response.city)
        setData(days);
        setIsLoading(false);
      }catch(error){
        console.error("Error: ", error)
      }
    }
    fetchData(APIKEY);
  }, [currentCoord, APIKEY]);

  /**
   * Close left panel if detects that user is browsing from a mobile device.
   */
  useEffect(() => {
    isMobile && setIsPanelActive(false);
  }, []);


/** Block of handle functions */

  /**
  * handleScroll: It is a handle function to detect scrolling action, if true it sets the scroll offset on state variable scrollOffset.
  */
  const handleScroll = () => {
    scrollRef.current && setScrollOffset(scrollRef.current.scrollTop)
  }

  /**
   * Callback functions: Improve performance by avoiding a new function instantiation at every render.
   */
  const handleDarkModeChange = useCallback((isDark) => {
    setIsDark(isDark);
  }, [setIsDark]);

  const handlePanelActiveChange = useCallback((isActive) => {
    setIsPanelActive(isActive);
  }, [setIsPanelActive]);
  
  const handleCurrentCoordChange = useCallback((coord) => {
    setCurrentCoord(coord);
  }, [setCurrentCoord]);

  const handleFavoritesModalChange = useCallback((isOpen)=>{
    setIsFavoritesModalOpen(isOpen);
  }, [setIsFavoritesModalOpen]);


  return(
      <div className={`App ${isDark ? 'dark' : ''}`}>
        {/* Favorite modal */}
        {isFavoritesModalOpen&& <Favorites setIsFavoritesModalOpen={handleFavoritesModalChange} setCurrentCoord={handleCurrentCoordChange} />}
        {/* Wait block */}
        <Wait isLoading={isLoading} isDark={isDark} text="Loading...">
          <div ref={scrollRef} onScroll={handleScroll} className="bg-[#f3f4f6] dark:bg-[#1f2022] flex flex-row overflow-x-clip overflow-y-auto lg:overflow-y-clip subpixel-antialiased h-[100vh] w-[100vw] min-h-[100vh] max-h-[100vh] transition-all duration-300">
            {/* Right menu panel */}
            <div id="container-start">
              <PanelLeft isPanelActive={isPanelActive} setIsFavoritesModalOpen={handleFavoritesModalChange} />
            </div>

            {/* Main content */}
            <div id="container-mid" className="flex flex-col grow w-full">
              <NavTopBar
                isPanelActive={isPanelActive}
                setIsPanelActive={handlePanelActiveChange}
                isDark={isDark}
                setIsDark={handleDarkModeChange}
                setCurrentCoord={handleCurrentCoordChange}
                scrollOffset={scrollOffset}
                setIsFavoritesModalOpen={handleFavoritesModalChange}
              />
              <MainContent city={city} fullData={data} isDark={isDark} currentCoord={currentCoord} />
            </div>
          </div>
        </Wait>
      </div>
   );
}

export default App;
