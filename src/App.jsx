import { useEffect, useState } from "react";
import CardList from "./components/CardList.jsx";
import ApiCaller from "./utils/ApiCaller.js";
import GetDays from "./utils/GetDays.js";
import NavTopBar from "./components/NavTopBar.jsx";
import PanelLeft from "./components/PanelLeft.jsx";
import { isMobile } from "react-device-detect";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [city, setCity] = useState();
  const [currentCoord, setCurrentCoord] = useState(["-23.54", "-46.63"]) //São Paulo as default latitude and longitude

  useEffect(() => {
    (navigator.geolocation) && (
      navigator.geolocation.getCurrentPosition(
        position => {
          setCurrentCoord([position.coords.latitude, position.coords.longitude]);
        },
        error => {
          console.error('Error:', error.message);
        }
      )
    )
  }, [])

  useEffect(() => {
    async function fetchData() {
      const response = await ApiCaller(`https://api.openweathermap.org/data/2.5/forecast?lat=${currentCoord[0]}&lon=${currentCoord[1]}&lang=en_us&appid=b2f1f764226d2c56c81042951ce99ea7&units=metric`);
      const days = await GetDays(response.list);
      setCity(response.city)
      setData(days);
      setIsLoading(false);
    }
    fetchData();
  }, [isLoading, currentCoord]);

  const [isPanelActive, setIsPanelActive] = useState(true);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    isMobile && setIsPanelActive(false);
  }, []);

  if (isLoading) {
    return (
      <div className={`App ${isDark ? 'dark' : ''}`}>
        <div className="cursor-progress text-2xl flex flex-col h-screen justify-center text-center font-bold text-gray-700 dark:text-gray-200 transition-all duration-300">
          Loading...
        </div>
      </div>
    );
  }

  return (
    // Main div
    <div className={`App${isDark ? ' dark' : ''}`}>
      <div className="bg-[#f3f4f6] dark:bg-[#1f2022] flex flex-row overflow-x-clip subpixel-antialiased h-[100vh] w-[100vw] min-h-[100vh] max-h-[100vh] transition-all duration-300">
        {/* Start */}
        <div id="container-start">
          <PanelLeft isPanelActive={isPanelActive} />
        </div>

      {/* Middle */}
        <div id="container-mid" className="flex flex-col grow w-full">
          <NavTopBar
            isPanelActive={isPanelActive}
            setIsPanelActive={setIsPanelActive}
            isDark={isDark}
            setIsDark={setIsDark}
            setCurrentCoord={setCurrentCoord}
          />
          <CardList city={city} fullData={data} isDark={isDark} />
        </div>
      </div>
    </div>
  );
}

export default App;
