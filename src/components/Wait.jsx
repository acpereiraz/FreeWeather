/**
 * This is the Wait component used to show a loading indicator while waiting for the content on children to get ready for render.
 * @component
 *
 * @param {Object} children - Content that should be waited for to be rendered later.
 * @param {boolean} isLoading - Determine if content is still on loading state or not.
 * @param {string} text - Text displayed on loading indicator.
 *
 * @returns {JSX.Element} The Wait component.
 */

// React imports
import React from "react";

function Wait ({children, isLoading, text}) {

    return (
        isLoading ? 
            <div className="cursor-progress flex flex-col h-full min-h-[200px] justify-center items-center font-bold transition-all duration-300">
                <div className="px-3 py-1 lg:px-5 h-fit w-fit text-xs md:text-md lg:text-lg font-medium leading-none text-center text-purple-800 bg-purple-200 rounded-full animate-pulse dark:bg-purple-900 dark:text-purple-200">{text}</div>
            </div>
        :
            <React.Fragment>
                {children}
            </React.Fragment>
    );
}

export default Wait;