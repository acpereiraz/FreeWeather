import "./styles/PanelLeft.css";


const PanelLeft = ({ isPanelActive }) => {

  const menuItems = [
    {
      name: 'Home',
      icon: 'home'
    },
    {
      name: 'Favorites',
      icon: 'star'
    },
    {
      name: 'Profile',
      icon: 'person'
    },
    {
      name: 'About Us',
      icon: 'info'
    }
  ]

  return (
    <div id="container-panel" className={`mdm:hidden flex flex-col ${ isPanelActive ? 'w-[250px]' : 'w-[90px] short'} h-full min-h-full items-center text-center transition-all`}>
      <div id="container-logo" className={`w-full pb-6 pt-4`}>
        <div id="container-logo-inner" className="  text-2xl font-bold text-transparent flex flex-col text-center items-center justify-center subpixel-antialiased opacity-90 hover:opacity-100 active:opacity-70 transition-all hover:transition-all cursor-pointer bg-gradient-to-bl from-indigo-500 via-purple-500 to-pink-400 bg-clip-text">
          <span id="logo-icon" className={`material-symbols-rounded text-[40px] subpixel-antialiased `}>cloud</span>
          <p id="logo-label" className={`shouldHidden`}>FreeWeather</p>
        </div>
      </div>

      <div id="container-nav" className="align-center w-full">
        <ul className="flex flex-col text-[14px] text-left text-gray-600 dark:text-gray-300 w-full subpixel-antialiased">
          {menuItems.map((item, index)=>(
            <li key={index} className="hover:text-purple-500 hover:bg-gray-100 dark:hover:bg-maxblack w-full py-4 transition-all hover:transition-all cursor-pointer active:text-purple-300">
              <a id="text-cont" className={`flex items-center text-center text-md gap-2`}>
                <span className={`material-symbols-outlined text-md font-light`}>
                  {item.icon}
                </span>
                <p className="shouldHidden">{item.name}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <a target="_blank" href="http://github.com/acpereiraz" className={`shouldHidden absolute bottom-10 mt-[50vh] text-center text-[10px] text-gray-400 font-light subpixel-antialiased`} rel="noreferrer">
        Made with ❤️ by acpereira.
      </a>
    </div>
  );
};

export default PanelLeft;
