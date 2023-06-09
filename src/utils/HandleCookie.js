import Cookies from "js-cookie";

const HandleCookie = (forecast, coord) =>{
    if (Cookies.get(forecast.city) || !coord){
        Cookies.remove(forecast.city?forecast.city:forecast, { sameSite:'strict' })
        return false
    }
    Cookies.set(forecast.city, coord, { sameSite:'strict' })
    console.log('this is returning true: '+Cookies.get(forecast.city))
    return true
}

export default HandleCookie;