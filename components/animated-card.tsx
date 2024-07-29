import React from "react";
import CountUp from 'react-countup';

interface AnimatedCardProps {
  children: React.ReactNode;
  title?: string;
  value?: string;
  onPress?: () => void;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  title,
  value,
  onPress,
}) => {
  return (
    <button
      className="relative flex flex-col justify-center py-4 "
      onClick={onPress}
    >
      <div className="group relative w-full cursor-pointer justify-center overflow-hidden border-none bg-white px-6 pb-6 pt-6 shadow-xl ring-1 ring-gray-900/5 transition-all duration-700 hover:-translate-y-1 hover:shadow-2xl dark:bg-[#261C16] dark:ring-gray-700 xs:flex sm:rounded-lg sm:px-10">
        <span className="absolute left-5 top-10 z-0 h-12 w-12 rounded-full from-main_dark to-stone-600 transition-all duration-700 group-hover:scale-[10] group-hover:bg-[#FFC96F] dark:group-hover:bg-gradient-to-r"></span>
        <div className="relative z-10 mx-auto max-w-md">
          <div className="flex items-center space-x-4">
            <span
              className="w-13 ml-[-20px] mt-[-7px] flex h-12 place-items-center items-center justify-center rounded-full bg-[#FFC96F] transition-all duration-700 group-hover:bg-[#FFC96F] dark:bg-orange-500 dark:group-hover:bg-orange-400"
              style={{ aspectRatio: "1" }}
            >
              {children}
            </span>
            <div className=" space-y-2 text-base leading-7 text-gray-600 transition-all duration-700 group-hover:text-white/90 dark:text-gray-300 dark:group-hover:text-white py-4">
              <p>{title}</p>
              {/* <p className="font-semibold">{value}</p> */}
              <p> <CountUp start={0} end={value} duration={7} className="text-gray-600 dark:text-gray-300 group-hover:text-white text-xl sm:text-2xl text-center"></CountUp>
              </p>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-orange-600 from-main_dark to-stone-600 opacity-0 transition-opacity duration-700 group-hover:opacity-100 dark:bg-gradient-to-r"></div>
      </div>
    </button>
  );
};

export default AnimatedCard;
