import { useEffect, useState } from "react";
import Loader from "@/components/Layouts/Loader";
import AnimatedCard from "@/components/animated-card";
import GroupIcon from "@mui/icons-material/Group";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { BASE_URL } from "@/constants";
import { showAlert } from "@/components/showAlert";
import moment from "moment";
import { useRouter } from "next/router";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import auth from "../utils/auth";

const WalletRequestDetails = () => {
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [withdrawal, setWithdrawal] = useState({});

  const router = useRouter();
  const { withdrawalid, username } = router?.query;

  useEffect(() => {
    getWithdrawalRequest();
  }, [withdrawalid]);

  const getWithdrawalRequest = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    console.log(`${BASE_URL}/withdraw/details/${withdrawalid},'saaaaaaaaaaa`);
    try {
      const res = await axios.get(
        `${BASE_URL}/withdraw/details/${withdrawalid}`,
        {
          maxBodyLength: Infinity,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data, "data response");
      setWithdrawal(res?.data?.data);

      if (res) {
        setLoading(false);
      } else {
        showAlert(15, res?.data?.message, "error");
      }
    } catch (e) {
      console.error(e, "login error");
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <div>
      <Loader />
    </div>
  ) : (
    <div>
      {/* <div className="w-full  rounded border border-white-light bg-white  shadow-[4px_6px_10px_-3px_#bfc9d4] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"> */}
      <div className="w-full border-b border-gray-600 px-4  py-4 shadow">
        <h1 className="text-xl">Withdraw Requests Details</h1>
      </div>
      <div className="mx-6 flex justify-between">
        {/* <div className="mt-4 w-full max-w-[19rem] rounded border border-white-light bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
            <div className="space-y-2 px-6 py-7">
              <h5 className="mb-4 text-xl font-semibold text-[#3b3f5c] dark:text-white-light">
                Request Details
              </h5>
              <div className="flex flex-row items-center  ">
                <text>Name</text>
                <text>Vijay Baiga</text>
              </div>
              <div className="flex flex-row items-center ">
                <text>Email</text>
                <text>vb1936683@gmail.com</text>
              </div>
              <div className="flex flex-row items-center ">
                <text>Total</text>
                <text>Rs1,500.00</text>
              </div>
              <div className="flex flex-row items-center ">
                <text>Payment Method</text>
                <text>bank_transfer</text>
              </div>
            </div>
          </div> */}

        <div className="mb-5 mr-6 flex w-full flex-wrap justify-center">
          <div className="relative mt-8 w-full rounded-md border border-gray-500/20 p-6 pt-12 shadow-[rgb(31_45_61_/_10%)_0px_2px_10px_1px] dark:shadow-[0_2px_11px_0_rgb(6_8_24_/_39%)]">
            <div className="absolute -top-7 mx-auto mb-5 flex h-14 w-16 items-center justify-center rounded-md bg-[#FFC96F] text-white-light ltr:left-6 rtl:right-6">
              {/* <svg>...</svg> */}
              <AccountBalanceIcon />
            </div>
            <div>
              <h1 className="mb-8 text-center text-[1.5rem] font-bold">
                REQUESTED DETAILS
              </h1>
            </div>
            <div className="grid grid-cols-2 items-center gap-x-6 gap-y-4">
              <div className="text-[1.1rem] font-bold text-dark dark:text-white-light">
                Name:
              </div>
              <div className="text-[1.1rem] font-medium text-[#4B5563]">
                {username}
              </div>
              <div className="text-[1.1rem] font-bold text-dark dark:text-white-light">
                Email:
              </div>
              <div className="text-[1.1rem] font-medium text-[#4B5563]">
                vb@gmail.com
              </div>
              <div className="text-[1.1rem] font-bold text-dark dark:text-white-light">
                Total:
              </div>
              <div className="text-[1.1rem] font-medium text-[#4B5563]">
                {withdrawal?.amount}
              </div>
              <div className="text-[1.1rem] font-bold text-dark dark:text-white-light">
                Payment Method:
              </div>
              <div className="text-[1.1rem] font-medium text-[#4B5563]">
                banktransfer
              </div>
              <div className="text-[1.1rem] font-bold text-dark dark:text-white-light">
                Payment Status:
              </div>
              <div className="text-[1.1rem] font-medium text-[#4B5563]">
                {withdrawal?.status}
              </div>
            </div>
          </div>
          <span className="absolute left-5 top-10 z-0 h-12 w-12 rounded-full from-main_dark to-stone-600 transition-all duration-700 group-hover:scale-[10] group-hover:bg-[#FFC96F] dark:group-hover:bg-gradient-to-r"></span>
          <div className="absolute inset-0 bg-[#FFA62F] from-main_dark to-stone-600 opacity-0 transition-opacity duration-700 group-hover:opacity-100 dark:bg-gradient-to-r"></div>
        </div>

        <div className="mb-5 mr-6 flex w-full flex-wrap justify-center">
          <div className="relative mt-8 w-full rounded-md border border-gray-500/20 p-6 pt-12 shadow-[rgb(31_45_61_/_10%)_0px_2px_10px_1px] dark:shadow-[0_2px_11px_0_rgb(6_8_24_/_39%)]">
            <div className="absolute -top-7 mx-auto mb-5 flex h-14 w-16 items-center justify-center rounded-md bg-[#FFC96F] text-white-light ltr:left-6 rtl:right-6">
              {/* <svg>...</svg> */}
              <AccountBalanceIcon />
            </div>
            <div>
              <h1 className="mb-8 text-center text-[1.5rem] font-bold">
                SUBMITTED DETAILS
              </h1>
            </div>
            <div className="grid grid-cols-2 items-center gap-x-6 gap-y-4">
              <div className="text-[1.1rem] font-bold text-dark dark:text-white-light">
                Your Name:{" "}
              </div>
              <div className="text-[1.1rem] font-medium text-[#4B5563]">
                {username}
              </div>
              <div className="text-[1.1rem] font-bold text-dark dark:text-white-light">
                Bank Name:{" "}
              </div>
              <div className="text-[1.1rem] font-medium text-[#4B5563]">
                {withdrawal?.bank_name}
              </div>
              <div className="text-[1.1rem] font-bold text-dark dark:text-white-light">
                Account Number:{" "}
              </div>
              <div className="text-[1.1rem] font-medium text-[#4B5563]">
                {withdrawal?.account_number}
              </div>
              <div className="text-[1.1rem] font-bold text-dark dark:text-white-light">
                IFSC Code:{" "}
              </div>
              <div className="text-[1.1rem] font-medium text-[#4B5563]">
                {withdrawal?.ifsc}
              </div>
              <div className="text-[1.1rem] font-bold text-dark dark:text-white-light">
                Enter YOur Upi Id Code:{" "}
              </div>
              <div className="text-[1.1rem] font-medium text-[#4B5563]">
                Bank Transfer
              </div>
            </div>
          </div>
        </div>

        {/* <div className="mb-5 flex w-full flex-wrap justify-center"> */}
        {/* <div className="relative mt-8 w-full rounded-md border border-gray-500/20 p-6 pt-12 shadow-[rgb(31_45_61_/_10%)_0px_2px_10px_1px]  dark:shadow-[0_2px_11px_0_rgb(6_8_24_/_39%)]"> */}
        {/* <div className="absolute -top-7 mx-auto mb-5 flex h-14 w-16 items-center justify-center rounded-md bg-primary text-white-light ltr:left-6 rtl:right-6"> */}
        {/* <svg>...</svg> */}
        {/* <AccountBalanceIcon /> */}
        {/* </div> */}
        {/* <div> */}
        {/* <h1 className="mb-3 text-center text-[1.2rem]"> */}
        {/* Status History */}
        {/* </h1> */}
        {/* </div> */}
        {/* <div className="flex items-center"> */}
        {/* <div className="table-responsive mb-5 w-full border-main_dark bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] dark:shadow-custom"> */}
        {/* <table className="w-full"> */}
        {/* <thead> */}
        {/* <tr> */}
        {/* <th className="text-[1.1rem] text-[#3b3f5c] dark:bg-[#302924] dark:text-white-light"> */}
        {/* Status */}
        {/* </th> */}
        {/* <th class/Name="text-[1.1rem] text-[#3b3f5c] dark:bg-[#302924] dark:text-white-light"> */}
        {/* // Comment */}
        {/* // </th> */}
        {/* </tr> */}
        {/* </thead> */}
        {/* <tbody> */}
        {/* {tableData?.map((data, index) => { */}
        {/* return ( */}
        {/* <> */}
        {/* <tr key={data.id} className="border-0"> */}
        {/* <td> */}
        {/* <div className="whitespace-nowrap text-[1.1rem]"> */}
        {/* {data.status} */}
        {/* </div> */}
        {/* </td> */}
        {/* <td className="text-[1.1rem]">{data.Comment}</td> */}
        {/* </tr> */}
        {/* </> */}
        {/* ); */}
        {/* })} */}
        {/* </tbody> */}
        {/* </table> */}
        {/* </div> */}
        {/* </div> */}
        {/* </div> */}
        {/* </div> */}
      </div>
    </div>
    // </div>
  );
};

export default auth(WalletRequestDetails);
