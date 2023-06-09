// React imports
import PropTypes from 'prop-types';
// Styling imports
import "./styles/Label.css";

function Label(props) {

  Label.propTypes = {
    icon: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }

  return (
    <div id="a" className="relative flex flex-col justify-center text-center items-center gap-2 subpixel-antialiased transition-all duration-300">
      <div id="b" className={`bg-gray-100 dark:bg-minblack hover:bg-gradient-to-bl hover:from-indigo-500 hover:via-purple-500 
                                hover:to-pink-400 transition-all w-[65px] h-[65px] cursor-pointer duration-300
                                    rounded-xl grid content-center text-sm hover:text-white text-purple-400`}>
        <span className={`material-symbols-outlined scale-[140%]`}>{props.icon}</span>
      </div>
      <div id="c" className="absolute w-[65px] h-[65px] blur-lg bg-gradient-to-bl from-indigo-500 
                              via-purple-500 to-pink-400 opacity-50">                   
      </div>
      <p className={`text-gray-600 dark:text-gray-400 text-[12px]`}>{props.text}</p>
    </div>
  );
}

export default Label;
