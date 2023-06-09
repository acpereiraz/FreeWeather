import { AiOutlineClose } from "react-icons/ai";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import HandleCookie from "../utils/HandleCookie.js";
import "./styles/Favorites.css";

const Favorites = ({setIsFavoritesModalOpen, setCurrentCoord}) => {

    const [favorites, setFavorites] = useState(null);
    const [load, setLoad] = useState(false);

    function handleFavoritesModalClose(){
        setIsFavoritesModalOpen(false)
    }

    function handleCookieRemove(key){
        HandleCookie(key, null);
        setLoad(!load);
    }

    useEffect(()=>{
        const obj = Cookies.get();
        setFavorites(Object.keys(obj).map(key => {
            if (key === "dark-mode" || key === "code-server-session") {
                return null; // Ignora a chave "dark-mode"
            }
            return{
                [key]: obj[key]
            }
        }).filter(item => item !== null));
    },[load])

    console.log(favorites)

    return(
        <div id="modal-favorites" className="absolute h-screen w-screen transition-all duration-300">
            <div onClick={handleFavoritesModalClose} className="absolute bg-gray-600 dark:bg-midnight dark:opacity-70 opacity-50 w-full h-full transition-all duration-300">
            </div>
            <div className="w-full h-full flex justify-center items-center transition-all duration-300">
                <div id="modal-container" className="bg-white flex flex-col w-[280px] sm:w-[320px] h-fit rounded-2xl border-[1px] border-gray-200 dark:border-minblack overflow-hidden dark:bg-maxblack shadow transition-all duration-300">

                    <div id="modal-container-label" className="flex justify-center text-center items-center py-5 bg-gray-100 dark:bg-midnight"> 
                    <h1 className="font-normal text-[18px] sm:text-[26px] text-gray-600 dark:text-gray-200">Favorites</h1>
                    </div>

                    <div className="grow font-light text-md">
                        {(favorites?.length>0) ? favorites.map((fav, index) => (
                            <div key={index} onClick={() => {setCurrentCoord(Object.values(fav)[0].split(","))}} className="flex items-center justify-between px-6 gap-2 relative py-4 hover:text-purple-500 hover:bg-gray-100 dark:hover:bg-midnight dark:text-gray-300 cursor-pointer transition-all">
                                <div className="flex gap-2">
                                    <h2 className="">{index+1}.</h2>
                                    {Object.keys(fav)[0]}
                                </div>
                                <AiOutlineClose onClick={()=>{handleCookieRemove(Object.keys(fav)[0])}} className="text-red-400 hover:text-red-500 text-[22px] cursor-pointer" title="Remove"></AiOutlineClose>
                            </div>
                        )) : 
                            <div className="py-2 text-gray-400 dark:text-gray-200">
                                Empty.
                            </div>
                        }

                    </div>

                </div>
            </div>
        </div>
    );
}

export default Favorites;