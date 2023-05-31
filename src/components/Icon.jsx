import icon_01d from "./assets/icons/modern/01d.png";
import icon_01n from "./assets/icons/modern/01n.png";
import icon_02d from "./assets/icons/modern/02d.png";
import icon_02n from "./assets/icons/modern/02n.png";
import icon_03d from "./assets/icons/modern/03d.png";
import icon_03n from "./assets/icons/modern/03n.png";
import icon_04d from "./assets/icons/modern/04d.png";
import icon_04n from "./assets/icons/modern/04n.png";
import icon_09d from "./assets/icons/modern/09d.png";
import icon_09n from "./assets/icons/modern/09n.png";
import icon_10d from "./assets/icons/modern/10d.png";
import icon_10n from "./assets/icons/modern/10n.png";
import icon_11d from "./assets/icons/modern/11d.png";
import icon_11n from "./assets/icons/modern/11n.png";
import icon_13d from "./assets/icons/modern/13d.png";
import icon_13n from "./assets/icons/modern/13n.png";
import icon_50d from "./assets/icons/modern/50d.png";
import icon_50n from "./assets/icons/modern/50n.png";

const images = {
  "01d": icon_01d,
  "01n": icon_01n,
  "02d": icon_02d,
  "02n": icon_02n,
  "03d": icon_03d,
  "03n": icon_03n,
  "04d": icon_04d,
  "04n": icon_04n,
  "09d": icon_09d,
  "09n": icon_09n,
  "10d": icon_10d,
  "10n": icon_10n,
  "11d": icon_11d,
  "11n": icon_11n,
  "13d": icon_13d,
  "13n": icon_13n,
  "50d": icon_50d,
  "50n": icon_50n,
};

function Icon({icon}) {

  return (
    <div>
      <img src={images[icon]} className="translate-y-2" />
    </div>
  );
}

export default Icon;
