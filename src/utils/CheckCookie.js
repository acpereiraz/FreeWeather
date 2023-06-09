import Cookies from "js-cookie";

const CheckCookie = (forecast) => {
    return Cookies.get(forecast) && true;
}

export default CheckCookie;