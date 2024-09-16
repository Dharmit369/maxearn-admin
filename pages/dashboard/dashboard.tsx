import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import Dropdown from "@/components/Dropdown";
import { Fragment } from "react";
import { IRootState } from "@/store";
import Image from "next/image";
import { BASE_URL, Images } from "@/constants";
import Link from "next/link";
import Loader from "@/components/Layouts/Loader";
import React from "react";
import { ReactSortable } from "react-sortablejs";
import { Select } from "antd";
import { Tab } from "@headlessui/react";
import Card from "@/components/Card";
import Table from "@/components/Table";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import GroupIcon from "@mui/icons-material/Group";
import AnimatedCard from "@/components/animated-card";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import PendingIcon from "@mui/icons-material/Pending";
import DoDisturbAltIcon from "@mui/icons-material/DoDisturbAlt";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import auth from "../utils/auth";
import axios from "axios";
import { useRouter } from "next/router";
import KycTable from "../apps/kyc-table";
// import GroupIcon from '@mui/icons-material/Group';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  // const [swap, setSwap] = useState([...items1]);
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const [approveKycData, setApproveKycData] = useState([]);
  const [submittedKycData, setSubmittedKycData] = useState([]);
  const [pendingKycData, setPendingKycData] = useState([]);
  const [rejectKycData, setRejectedKycData] = useState([]);
  const [totalkyc, setTotalkyc] = useState([]);
  const [totalUserOpen, setTotalUserOpen] = useState(false);
  const [kycSubmittedOpen, setKycSubmittedOpen] = useState(false);
  const [kycCompletedOpen, setKycCompletedOpen] = useState(false);
  const [kycPendingOpen, setKycPendingOpen] = useState(false);
  const [kycRejectedOpen, setKycRejectedOpen] = useState(false);
  const [dailyLeadData, setDailyLeadData] = useState([]);
  const [monthlyLeadData, setMonthlyLeadData] = useState([]);
  const [topAffiliateData, setTopAffiliateData] = useState([]);
  const [weeklyLeadData, setWeeklyLeadData] = useState([]);
  const [totalUsersCountDisplay, setTotalUsersCountDisplay] = useState([]);
  const [paidWalletBalance, setPaidWalletBalance] = useState([]);
  const [requestBalance, setRequestBalance] = useState([]);
  const [requestedHoldBalance, setRequestedHoldBalance] = useState([]);
  const [totalProfit, setTotalProfit] = useState([]);
  const [totalBal, setTotalBal] = useState([]);
  const [dailybalance, setDailybalance] = useState("");

  const router = useRouter();
  console.log("total:", weeklyLeadData);

  useEffect(() => {
    tokenGet();
  }, []);

  const tokenGet = async () => {
    const token = await localStorage.getItem("token");
    console.log("tokennnnnnnnnnnn", token);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    getApprovedKycData();
    getRejectedKycData();
    getPendingKycData();
    getsubmittedKycData();
    gettotalKycData();
    gettotalLeadData();
    getDailyLead();
    getMonthlyLead();
    getAffliateData();
    getWeeklyLead();
    getTotalUsersCountDisplay();
    getPaidWalletBalanceData();
    getRequestedBalanceData();
    getRequestedBalanceData();
    getRequestedHoldBalance();
    getTotalProfit();
    getTotalBal();
    DailyWallet();
  }, []);

  const getApprovedKycData = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${BASE_URL}/admin/KYCDataCount/Approved`, {
        maxBodyLength: Infinity,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data, "data response");

      setApproveKycData(res?.data?.data);
      setLoading(false);
    } catch (e) {
      console.error(e, "Approved kyc error");
    } finally {
      setLoading(false);
    }
  };

  const getRejectedKycData = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${BASE_URL}/admin/KYCDataCount/Rejected`, {
        maxBodyLength: Infinity,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data, "data response");

      setRejectedKycData(res?.data?.data);
      setLoading(false);
    } catch (e) {
      console.error(e, "reject kyc error");
    } finally {
      setLoading(false);
    }
  };

  const getTotalBal = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(
        `${BASE_URL}/admin/getTotalPaidWithdrawRequestData`,
        {
          maxBodyLength: Infinity,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data, "bal data response");

      setTotalBal(res?.data?.data);
      setLoading(false);
    } catch (e) {
      console.error(e, "reject bal error");
    } finally {
      setLoading(false);
    }
  };

  const getsubmittedKycData = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${BASE_URL}/admin/KYCDataCount/Submitted`, {
        maxBodyLength: Infinity,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data, "data response");

      setSubmittedKycData(res?.data?.data);
      setLoading(false);
    } catch (e) {
      console.error(e, "reject kyc error");
    } finally {
      setLoading(false);
    }
  };

  const getPendingKycData = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${BASE_URL}/admin/pendingKYCData`, {
        maxBodyLength: Infinity,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data, "data response");

      setPendingKycData(res?.data?.data);
      setLoading(false);
    } catch (e) {
      console.error(e, "peding kyc error");
    } finally {
      setLoading(false);
    }
  };

  const gettotalKycData = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${BASE_URL}/admin/totalUsersCount`, {
        maxBodyLength: Infinity,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data, "data response");

      setTotalkyc(res?.data?.data);
      setLoading(false);
    } catch (e) {
      console.error(e, "pending kyc error");
    } finally {
      setLoading(false);
    }
  };

  const gettotalLeadData = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get(`${BASE_URL}/admin/totalLeadData`, {
        maxBodyLength: Infinity,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data, "data response");

      setTotalkyc(res?.data?.data);
      setLoading(false);
    } catch (e) {
      console.error(e, "Total Lead Data");
    } finally {
      setLoading(false);
    }
  };

  const getDailyLead = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get(`${BASE_URL}/admin/dailyLeadData`, {
        maxBodyLength: Infinity,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data, "data response");

      setDailyLeadData(res?.data?.data);
      setLoading(false);
    } catch (e) {
      console.error(e, "Total Lead Data");
    } finally {
      setLoading(false);
    }
  };

  const getMonthlyLead = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get(`${BASE_URL}/admin/monthlyLeadData`, {
        maxBodyLength: Infinity,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data, "data response");

      setMonthlyLeadData(res?.data?.data);
      setLoading(false);
    } catch (e) {
      console.error(e, "Total Lead Data");
    } finally {
      setLoading(false);
    }
  };

  const getAffliateData = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get(`${BASE_URL}/admin/topAffiliatePartner`, {
        maxBodyLength: Infinity,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data, "data response");

      setTopAffiliateData(res?.data?.data);
      setLoading(false);
    } catch (e) {
      console.error(e, "Total Lead Data");
    } finally {
      setLoading(false);
    }
  };

  const getWeeklyLead = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${BASE_URL}/admin/weeklyLeadData`, {
        maxBodyLength: Infinity,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data, "data response");

      setWeeklyLeadData(res?.data?.data);
      setLoading(false);
    } catch (e) {
      console.error(e, "Total Lead Data");
    } finally {
      setLoading(false);
    }
  };

  const getTotalUsersCountDisplay = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${BASE_URL}/admin/totalUsersCountDisplay`, {
        maxBodyLength: Infinity,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data, "data response");

      setTotalUsersCountDisplay(res?.data?.data);
      setLoading(false);
    } catch (e) {
      console.error(e, "Total Lead Data");
    } finally {
      setLoading(false);
    }
  };

  const getPaidWalletBalanceData = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${BASE_URL}/admin/paidWalletBalanceData`, {
        maxBodyLength: Infinity,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data, "data response");

      setPaidWalletBalance(res?.data?.data);
      setLoading(false);
    } catch (e) {
      console.error(e, "Total Lead Data");
    } finally {
      setLoading(false);
    }
  };

  const getRequestedBalanceData = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${BASE_URL}/admin/requestedBalanceData`, {
        maxBodyLength: Infinity,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data, "data response");

      setRequestBalance(res?.data?.data);
      setLoading(false);
    } catch (e) {
      console.error(e, "Total Lead Data");
    } finally {
      setLoading(false);
    }
  };

  const getRequestedHoldBalance = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(
        `${BASE_URL}/admin/requestedHoldBalanceData`,
        {
          maxBodyLength: Infinity,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data, "data response");
      setRequestedHoldBalance(res?.data?.data);
      setLoading(false);
    } catch (e) {
      console.error(e, "Total Lead Data");
    } finally {
      setLoading(false);
    }
  };

  const DailyWallet = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(
        `${BASE_URL}/admin/getDailyTotalWalletTransaction`,
        {
          maxBodyLength: Infinity,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data, "data response daily wallet");
      // setRequestedHoldBalance(res?.data?.data);
      setDailybalance(res?.data?.dailyTotal);
      setLoading(false);
    } catch (e) {
      console.error(e, "Total Lead Data");
    } finally {
      setLoading(false);
    }
  };

  const getTotalProfit = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${BASE_URL}/admin/getAdminTotalCommission`, {
        maxBodyLength: Infinity,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data, "data response");
      setTotalProfit(res?.data?.data);
      setLoading(false);
    } catch (e) {
      console.error(e, "Total Lead Data");
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
      {totalUserOpen === false &&
        kycRejectedOpen === false &&
        kycSubmittedOpen === false &&
        kycCompletedOpen === false &&
        kycPendingOpen === false && (
          <div>
            <div className="flex w-full flex-col justify-between">
              {/* <div className="mb-4 w-full rounded border border-white-light bg-white px-0 shadow-[4px_6px_10px_-3px_#bfc9d4] dark:border-none dark:bg-[#29221C] dark:shadow-custom sm:w-[78.5vw]"> */}
              <h5 className="px-4 pt-5 text-2xl font-semibold text-[#3b3f5c] dark:text-white-light">
                TOTAL PROFIT
              </h5>
              <div className="flex w-full justify-between py-7 xs:flex-col lg:flex-row">
                <AnimatedCard
                  title="Daily Earning"
                  value={totalProfit?.dailyCommission?.amount}
                >
                  <ArrowCircleUpIcon className="text-white" />
                </AnimatedCard>

                <AnimatedCard
                  title="Weekly Earning"
                  value={totalProfit?.weeklyCommission?.amount}
                >
                  <ArrowCircleUpIcon className="text-white" />
                </AnimatedCard>

                <AnimatedCard
                  title="Monthly Earning"
                  value={totalProfit?.monthlyCommission?.amount}
                >
                  <ArrowCircleDownIcon className="text-white" />
                </AnimatedCard>

                <AnimatedCard
                  title="Total Earning"
                  value={totalProfit?.totalCommission?.amount}
                >
                  <ArrowCircleDownIcon className="text-white" />
                </AnimatedCard>
                {/* </div> */}
              </div>

              {/* Card Container */}
              {/* <div className="mb-4 w-full rounded border border-white-light bg-white px-0 shadow-[4px_6px_10px_-3px_#bfc9d4] dark:border-none dark:bg-[#29221C] dark:shadow-custom sm:w-[78.5vw]"> */}
              <h5 className="px-4 pt-3 text-2xl font-semibold text-[#3b3f5c] dark:text-white-light">
                TOTAL WITHDRAW BALANCE
              </h5>

              <div className="flex justify-between  py-7 xs:flex-col lg:flex-row">
                <AnimatedCard
                  title={"Total Balance"}
                  value={totalBal?.totalAmount}
                >
                  <GroupIcon className="text-white" />
                </AnimatedCard>

                <AnimatedCard
                  title={"Monthly Balance"}
                  value={totalBal?.weekly?.totalAmount}
                >
                  <GroupIcon className="text-white" />
                </AnimatedCard>

                <AnimatedCard
                  title={"Weekly Balance"}
                  value={totalBal?.monthly?.totalAmount}
                >
                  <GroupIcon className="text-white" />
                </AnimatedCard>

                <AnimatedCard
                  title={"Daily Balance"}
                  value={totalBal?.yearly?.totalAmount}
                >
                  <GroupIcon className="text-white" />
                </AnimatedCard>
              </div>
              {/* </div> */}
            </div>

            {/* <div className="mb-4 w-full rounded border border-white-light bg-white px-0 shadow-[4px_6px_10px_-3px_#bfc9d4] dark:border-none dark:bg-[#29221C] dark:shadow-custom"> */}
            <h5 className="px-4 pt-5 text-2xl font-semibold text-[#3b3f5c] dark:text-white-light">
              USER
            </h5>
            <div className="flex justify-center gap-2 px-6 py-7 xs:flex-col lg:flex-row ">
              <span onClick={() => setTotalUserOpen(true)}>
                <AnimatedCard title={"Total Users"} value={totalkyc?.totalUser}>
                  <GroupIcon className="text-white" />
                </AnimatedCard>
              </span>

              <span onClick={() => setKycSubmittedOpen(true)}>
                <AnimatedCard
                  title={"KYC Submitted"}
                  value={submittedKycData?.totalUser}
                  // onPress={() => router.push({
                  //   pathname: '/apps/kyc-table',
                  //   query: { tableData: JSON.stringify(submittedKycData?.userData) }
                  // },
                  //   '/apps/kyc-table'
                  // )}
                >
                  <GroupIcon className="text-white" />
                </AnimatedCard>
              </span>

              <span onClick={() => setKycCompletedOpen(true)}>
                <AnimatedCard
                  title={"KYC Completed"}
                  value={approveKycData?.totalUser}
                >
                  <TaskAltIcon className="text-white" />
                </AnimatedCard>
              </span>

              <span onClick={() => setKycPendingOpen(true)}>
                <AnimatedCard
                  title={"Pending Users"}
                  value={pendingKycData?.totalUser}
                >
                  <PendingIcon className="text-white" />
                </AnimatedCard>
              </span>

              <span onClick={() => setKycRejectedOpen(true)}>
                <AnimatedCard
                  title={"KYC Rejected"}
                  value={rejectKycData?.totalUser}
                >
                  <DoDisturbAltIcon className="text-white" />
                </AnimatedCard>
              </span>
            </div>
            {/* </div> */}

            {/* <div className="sx:mt-[12px] mb-4 w-full rounded border border-white-light bg-white px-0 shadow-[4px_6px_10px_-3px_#bfc9d4] dark:border-none dark:bg-[#29221C] dark:shadow-custom sm:mt-4"> */}
            <h5 className="px-4 pt-5 text-2xl font-semibold text-[#3b3f5c] dark:text-white-light">
              WALLET
            </h5>
            <div className="flex justify-center gap-2 px-6 py-7 xs:flex-col lg:flex-row">
              <AnimatedCard
                title={"Paid Balance"}
                value={paidWalletBalance?.totalCredit}
              >
                <CurrencyRupeeIcon className="text-white" />
              </AnimatedCard>

              <AnimatedCard
                title={"Daily Wallet Transaction"}
                value={dailybalance}
              >
                <MoneyOffIcon className="text-white" />
              </AnimatedCard>

              <AnimatedCard
                title={"Requested Balance"}
                value={requestBalance?.totalAmount}
              >
                <GroupIcon className="text-white" />
              </AnimatedCard>

              <AnimatedCard
                title={"Hold Balance"}
                value={requestedHoldBalance?.totalAmount}
              >
                <GroupIcon className="text-white" />
              </AnimatedCard>

              <AnimatedCard title={"Cancel Balance"} value={"4859"}>
                <GroupIcon className="text-white" />
              </AnimatedCard>
            </div>
            {/* </div> */}

            <div className="sx:mt-[12px] mb-4 w-full rounded border border-white-light bg-white px-0 shadow-[4px_6px_10px_-3px_#bfc9d4] dark:border-none dark:bg-[#1E1611] dark:shadow-custom sm:mt-4">
              <h5 className="px-4 pt-5 text-2xl font-semibold text-[#3b3f5c] dark:text-white-light">
                LEAD
              </h5>
              <div className="mt-6 flex items-center justify-center xs:mt-3 xs:justify-center sm:justify-between">
                <div className="flex w-full justify-center p-4  xs:flex-col  lg:flex-row lg:space-x-2">
                  <div className="relative flex w-full flex-col justify-center py-4 lg:w-1/2">
                    <div className="group relative h-[150px] w-full cursor-pointer overflow-hidden border-none bg-white px-6 pb-6 pt-6 shadow-xl ring-1 ring-gray-900/5 transition-all duration-700 hover:-translate-y-1 hover:shadow-2xl dark:bg-[#261C16] dark:ring-gray-700 sm:rounded-lg sm:px-10">
                      <span className="absolute left-5 top-10 z-0 h-12 w-12 rounded-full from-main_dark to-stone-600 transition-all duration-700 group-hover:scale-[10] group-hover:bg-sky-500 dark:group-hover:bg-gradient-to-r"></span>
                      <div className="relative z-10 mx-auto max-w-md">
                        <div className="sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-center justify-center">
                            {" "}
                            {/* Centering the title */}
                            <span
                              className="w-13 mt-[-7px] flex h-12 place-items-center items-center justify-center rounded-full bg-[#FFC96F] transition-all duration-700 group-hover:bg-[#FFC96F] dark:bg-orange-500  dark:group-hover:bg-orange-400"
                              style={{ aspectRatio: "1" }}
                            >
                              <GroupIcon className="text-white" />
                            </span>
                            <h2 className="w-full text-center  text-xl font-semibold group-hover:text-white/90">
                              Total Online
                            </h2>{" "}
                            {/* Removed ml-3 */}
                          </div>
                          <div className="mt-4 flex items-center justify-between px-10 sm:mt-0">
                            <div className="text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90 dark:text-gray-300 dark:group-hover:text-white">
                              <div className="font-semibold">Admin</div>
                              <div className="text-center font-semibold">2</div>
                            </div>
                            <div className="text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90 dark:text-gray-300 dark:group-hover:text-white">
                              <div className="font-semibold">Affiliate</div>
                              <div className="text-center font-semibold">5</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Add a div for the overlay */}
                      <div className="absolute inset-0 bg-[#FFA62F] from-main_dark to-stone-600 opacity-0 transition-opacity duration-700 group-hover:opacity-100 dark:bg-gradient-to-r"></div>
                    </div>
                  </div>

                  <div className="relative flex w-full flex-col justify-center py-4 lg:w-1/2">
                    <div className="group relative h-[150px] w-full cursor-pointer overflow-hidden border-none bg-white px-6 pb-6 pt-6 shadow-xl ring-1 ring-gray-900/5 transition-all duration-700 hover:-translate-y-1 hover:shadow-2xl dark:bg-[#261C16] dark:ring-gray-700 sm:rounded-lg sm:px-10">
                      <span className="absolute left-5 top-10 z-0 h-12 w-12 rounded-full from-main_dark to-stone-600 transition-all duration-300 group-hover:scale-[10] group-hover:bg-sky-500 dark:group-hover:bg-gradient-to-r"></span>
                      <div className="relative z-10 mx-auto max-w-md">
                        <div className="sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex">
                            {" "}
                            {/* Centering the title */}
                            <span
                              className="w-13 mt-[-7px] flex h-12 place-items-center items-center justify-center rounded-full bg-[#FFC96F] transition-all duration-300 group-hover:bg-[#FFC96F] dark:bg-orange-500 dark:group-hover:bg-orange-400"
                              style={{ aspectRatio: "1" }}
                            >
                              <GroupIcon className="text-white" />
                            </span>
                            <h2 className="w-full text-center text-xl font-semibold group-hover:text-white/90">
                              Total Users
                            </h2>{" "}
                            {/* Removed ml-3 */}
                          </div>
                          <div className="mt-4 flex justify-between sm:mt-0 lg:px-10">
                            <div className="text-base leading-7 text-gray-600 transition-all duration-700 group-hover:text-white/90 dark:text-gray-300 dark:group-hover:text-white">
                              <div className="font-semibold">Monthly</div>
                              <div className="font-semibold">
                                {monthlyLeadData?.totalLead}
                              </div>
                            </div>
                            <div className="text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90 dark:text-gray-300 dark:group-hover:text-white">
                              <div className="font-semibold">Weekly</div>
                              <div className="font-semibold">
                                {weeklyLeadData?.totalLead}
                              </div>
                            </div>
                            <div className="text-base leading-7 text-gray-600 transition-all duration-700 group-hover:text-white/90 dark:text-gray-300 dark:group-hover:text-white">
                              <div className="font-semibold">Daily</div>
                              <div className="font-semibold">
                                {dailyLeadData?.totalLead}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Overlay to cover the entire card */}
                      <div className="absolute inset-0 bg-[#FFA62F] from-main_dark to-stone-600 opacity-0 transition-opacity duration-700 group-hover:opacity-100 dark:bg-gradient-to-r"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex-col  gap-4 xs:mt-3 sm:flex">
              <h5 className="px-4 pt-5 text-2xl font-semibold text-[#3b3f5c] dark:text-white-light">
                TOP 10 AFFILIATES
              </h5>
              <div className="flex w-full justify-between xs:flex-col xs:space-x-0 xs:space-y-1 sm:space-x-0 lg:flex-row lg:space-x-4 lg:space-y-0">
                <Table tableData={topAffiliateData} />
              </div>
            </div>
          </div>
        )}
      {totalUserOpen && (
        <div>
          {
            <KycTable
              tableData={totalkyc?.userData}
              setClose={setTotalUserOpen}
              title={"Total User Data"}
            />
          }
        </div>
      )}
      {kycSubmittedOpen && (
        <div>
          {
            <KycTable
              tableData={submittedKycData?.userData}
              setClose={setKycSubmittedOpen}
              title={"Submitted KYC Details"}
            />
          }
        </div>
      )}
      {kycCompletedOpen && (
        <div>
          {
            <KycTable
              tableData={approveKycData?.userData}
              setClose={setKycCompletedOpen}
              title={"Approved KYC Details"}
            />
          }
        </div>
      )}
      {kycPendingOpen && (
        <div>
          {
            <KycTable
              tableData={pendingKycData?.userData}
              setClose={setKycPendingOpen}
              title={"Pending KYC Details"}
            />
          }
        </div>
      )}
      {kycRejectedOpen && (
        <div>
          {
            <KycTable
              tableData={rejectKycData?.userData}
              setClose={setKycRejectedOpen}
              title={"Rejected KYC Details"}
            />
          }
        </div>
      )}
    </div>
  );
};
export default auth(Dashboard);
