import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

// import { usePopper } from "react-popper";

const Card = ({title, subTitle}: any) => {
  return (
    <>
      <div className="mb-5 ml-20 flex items-center justify-center">
    <div className="max-w-[30rem] w-[390px] bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light h-[150px] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
        <div className="p-5 flex items-center flex-col sm:flex-row">
            <div className="flex-1 ltr:sm:pl-5 rtl:sm:pr-5 text-center sm:text-left">
                <h5 className="text-[#3b3f5c] text-center text-[30px] font-semibold mb-2 dark:text-white-light mt-5">{title}</h5>
                {/* <p className="mb-2 text-white-dark">Manager</p> */}
                {/* <span className="badge bg-primary rounded-full">4.5</span> */}
                <p className="font-bold text-center text-white-dark mt-4 sm:mt-8 text-[20px]">
                   {subTitle}
                </p>
            </div>
        </div>
    </div>
</div>
    </>
  );
};

export default (Card);
