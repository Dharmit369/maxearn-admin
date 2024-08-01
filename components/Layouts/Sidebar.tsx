import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import AnimateHeight from "react-animate-height";
import { IRootState } from "../../store";
import { Images } from "@/constants";
import Link from "next/link";
import PerfectScrollbar from "react-perfect-scrollbar";
import { toggleSidebar } from "../../store/themeConfigSlice";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import "react-perfect-scrollbar/dist/css/styles.css";

const Sidebar = () => {
  const router = useRouter();
  const [currentMenu, setCurrentMenu] = useState<string>("");
  const [errorSubMenu, setErrorSubMenu] = useState(false);
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const semidark = useSelector(
    (state: IRootState) => state.themeConfig.semidark
  );
  const toggleMenu = (value: string) => {
    setCurrentMenu((oldValue) => {
      return oldValue === value ? "" : value;
    });
  };

  useEffect(() => {
    const selector = document.querySelector(
      '.sidebar ul a[href="' + window.location.pathname + '"]'
    );
    if (selector) {
      selector.classList.add("active");
      const ul: any = selector.closest("ul.sub-menu");
      if (ul) {
        let ele: any =
          ul?.closest("li.menu")?.querySelectorAll(".nav-link") || [];
        if (ele.length) {
          ele = ele[0];
          setTimeout(() => {
            ele.click();
          });
        }
      }
    }
  }, []);

  useEffect(() => {
    setActiveRoute();
    if (window.innerWidth < 1024 && themeConfig.sidebar) {
      dispatch(toggleSidebar());
    }
  }, [router.pathname]);

  const setActiveRoute = () => {
    let allLinks = document.querySelectorAll(".sidebar ul a.active");
    for (let i = 0; i < allLinks.length; i++) {
      const element = allLinks[i];
      element?.classList.remove("active");
    }
    const selector = document.querySelector(
      '.sidebar ul a[href="' + window.location.pathname + '"]'
    );
    selector?.classList.add("active");
  };

  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <div className={semidark ? "dark" : ""}>
      <nav
        className={`sidebar shadow-[5px_0_25px_0_rgba(94,92,154,0.1)]- fixed bottom-0 top-0 z-50 h-full min-h-screen w-[260px] transition-all duration-300 ${
          semidark ? "text-white-dark" : ""
        }`}
      >
        <div className="h-full bg-[#FF4400] dark:bg-[#29221d] ">
          <div className="flex items-center justify-between px-4 py-3">
            <Link
              href="/"
              className="main-logo  flex w-full  shrink-0 items-center justify-center self-center"
            >
              {themeConfig.theme === "light" ? (
                <img
                  className="inline h-[160px] w-[150px] py-4 lg:mb-[-34px] ltr:-ml-1 ltr:-mt-7 rtl:-mr-1"
                  src={Images.MAX_EARN_LOGO}
                  alt="logo"
                />
              ) : (
                <img
                  className="inline h-[150px] w-[150px] py-4 lg:mb-[-34px] ltr:-ml-1 ltr:-mt-7 rtl:-mr-1"
                  src={Images.MAX_EARN_LOGO}
                  alt="logo"
                />
              )}

              {/* <img
                className="ml-[5px] h-[35px] w-[165px] flex-none"
                src={Images.MAXEARNLOGO}
                alt="logo"
              />
              <span className="align-middle text-2xl font-semibold ltr:ml-1.5 rtl:mr-1.5 dark:text-white-light lg:inline">
                {t("")}
              </span> */}
            </Link>

            {/* <button
              type="button"
              className="collapse-icon flex h-8 w-8 items-center rounded-full transition duration-300 hover:bg-gray-500/10 rtl:rotate-180 dark:text-white-light dark:hover:bg-dark-light/10"
              onClick={() => dispatch(toggleSidebar())}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                 stroke="white"
                className="h-6 w-6 text-[white]"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button> */}
          </div>
          <PerfectScrollbar className="relative h-[calc(100vh-80px)]">
            <ul className="relative space-y-0.5 p-4 py-0 font-semibold">
              <li className="nav-item">
                <ul>
                  <li className="nav-item">
                    <Link href="/dashboard/dashboard" className="group">
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="white"
                          className="h-6 w-6 dark:stroke-white"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                          />
                        </svg>

                        <span className="text-white dark:text-[#fff] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">
                          {t("DASHBOARD")}
                        </span>
                      </div>
                    </Link>
                  </li>
                  {/* <li className="nav-item">
                    <Link href="/apps/my-team" className="group">
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                           stroke="white"
                          className="h-6 w-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                          />
                        </svg>

                        <span className="text-black dark:text-[#fff] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">
                          {t("ADD ONS")}
                        </span>
                      </div>
                    </Link>
                  </li> */}
                  <li className="nav-item">
                    <Link href="/apps/smtp" className="group">
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="white"
                          className="h-6 w-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>

                        <span className="text-white dark:text-[#fff] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">
                          {t("SMTP")}
                        </span>
                      </div>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/apps/ticket" className="group">
                      <div className="flex items-center">
                        {/* <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="white"
                          className="h-6 w-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg> */}
                        <img
                          src={Images?.TICKET}
                          alt=""
                          className="h-[20px] w-[20px] brightness-[1.2] contrast-[1.1] hue-rotate-[190deg] invert-[1] saturate-[5] sepia-[1] filter"
                        />
                        <span className="text-white dark:text-[#fff] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">
                          {t("TICKET")}
                        </span>
                      </div>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/apps/training" className="group">
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="white"
                          className="h-6 w-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                          />
                        </svg>

                        <span className="text-white dark:text-[#fff] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">
                          {t("Training")}
                        </span>
                      </div>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/apps/banner" className="group">
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="white"
                          className="h-6 w-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                          />
                        </svg>

                        <span className="text-white dark:text-[#fff] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">
                          {t("Banner")}
                        </span>
                      </div>
                    </Link>
                  </li>
                  {/* <li className="nav-item">
                    <Link href="/apps/send-notification" className="group">
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                           stroke="white"
                          className="h-6 w-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                          />
                        </svg>

                        <span className="text-white dark:text-[#fff] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">
                          {t("Send Notification")}
                        </span>
                      </div>
                    </Link>
                  </li> */}
                  <li className="nav-item">
                    <a
                      href="#"
                      className="group"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleMenu("wallet");
                      }}
                    >
                      <div className="flex items-center">
                        {/* <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="white"
                          className="h-6 w-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                          />
                        </svg> */}
                        <img
                          src={Images?.WALLET}
                          alt=""
                          className="h-[20px] w-[20px] brightness-[1.2] contrast-[1.1] hue-rotate-[190deg] invert-[1] saturate-[5] sepia-[1] filter"
                        />
                        <span className="text-white dark:text-[#fff] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">
                          {t("Wallet")}
                        </span>
                      </div>
                    </a>
                    <AnimateHeight
                      duration={300}
                      height={currentMenu === "wallet" ? "auto" : 0}
                    >
                      <ul className="sub-menu p-0 pt-0">
                        <li className="nav-item">
                          <Link href="/apps/user-wallet" className="group">
                            <div className="flex w-full items-center">
                              <span className="w-full text-white dark:text-[#fff] dark:group-hover:text-white-dark">
                                {t("User Wallet")}
                              </span>
                            </div>
                          </Link>
                        </li>

                        <li className="nav-item ">
                          <Link
                            href="/apps/withdraw-requests"
                            className="group"
                          >
                            <div className="flex w-full items-center">
                              <span className="text-white dark:text-[#fff] dark:group-hover:text-white-dark ltr:pl-0 rtl:pr-0">
                                {t("Withdraw Requests")}
                              </span>
                            </div>
                          </Link>
                        </li>

                        <li className="nav-item ">
                          <Link href="/apps/settings" className="group">
                            <div className="flex w-full items-center">
                              <span className="text-white dark:text-[#fff] dark:group-hover:text-white-dark ltr:pl-0 rtl:pr-0">
                                {t("Settings")}
                              </span>
                            </div>
                          </Link>
                        </li>

                        <li className="nav-item ">
                          <Link href="/apps/Tds" className="group">
                            <div className="flex w-full items-center">
                              <span className="text-white dark:text-[#fff] dark:group-hover:text-white-dark ltr:pl-0 rtl:pr-0">
                                {t("Tds")}
                              </span>
                            </div>
                          </Link>
                        </li>

                        <li className="nav-item ">
                          <Link href="/apps/commission" className="group">
                            <div className="flex w-full items-center">
                              <span className="text-white dark:text-[#fff] dark:group-hover:text-white-dark ltr:pl-0 rtl:pr-0">
                                {t("Commission")}
                              </span>
                            </div>
                          </Link>
                        </li>
                      </ul>
                    </AnimateHeight>
                  </li>
                  <li className="nav-item">
                    <a
                      href="#"
                      className="group"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleMenu("User");
                      }}
                    >
                      <div className="flex items-center">
                        {/* <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="white"
                          className="h-6 w-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                          />
                        </svg> */}
                        <img
                          src={Images?.USERS}
                          alt=""
                          className="h-[20px] w-[20px] brightness-[1.2] contrast-[1.1] hue-rotate-[190deg] invert-[1] saturate-[5] sepia-[1] filter"
                        />
                        <span className="text-white dark:text-[#fff] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">
                          {t("User")}
                        </span>
                      </div>
                    </a>
                    <AnimateHeight
                      duration={300}
                      height={currentMenu === "User" ? "auto" : 0}
                    >
                      <ul className="sub-menu p-0 pt-0">
                        <li className="nav-item">
                          <Link href="/apps/user-list" className="group">
                            <div className="flex w-full items-center">
                              <span className="w-full text-white dark:text-[#fff] dark:group-hover:text-white-dark">
                                {t("User List")}
                              </span>
                            </div>
                          </Link>
                        </li>

                        <li className="nav-item">
                          <Link href="/apps/KycUser" className="group">
                            <div className="flex w-full items-center">
                              <span className="w-full text-white dark:text-[#fff] dark:group-hover:text-white-dark">
                                {t("KYC")}
                              </span>
                            </div>
                          </Link>
                        </li>

                        <li className="nav-item">
                          <Link href="/apps/bankUserDetails" className="group">
                            <div className="flex w-full items-center">
                              <span className="w-full text-white dark:text-[#fff] dark:group-hover:text-white-dark">
                                {t("Bank Details")}
                              </span>
                            </div>
                          </Link>
                        </li>
                        {/* 
                        <li className="nav-item ">
                          <Link href="/apps/withdraw-requests" className="group">
                            <div className="flex items-center w-full">

                              <span className="text-black dark:text-[#fff] dark:group-hover:text-white-dark ltr:pl-0 rtl:pr-0">
                                {t("Withdraw Requests")}
                              </span>
                            </div>
                          </Link>
                        </li> */}
                      </ul>
                    </AnimateHeight>
                  </li>

                  <li className="nav-item">
                    <a
                      href="#"
                      className="group"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleMenu("Marketing");
                      }}
                    >
                      <div className="flex items-center">
                        {/* <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="white"
                          className="h-6 w-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                          />
                        </svg> */}
                        <img
                          src={Images?.MARKETING}
                          alt=""
                          className="h-[20px] w-[20px] brightness-[1.2] contrast-[1.1] hue-rotate-[190deg] invert-[1] saturate-[5] sepia-[1] filter"
                        />
                        <span className="text-white dark:text-[#fff] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">
                          {t("Marketing")}
                        </span>
                      </div>
                    </a>
                    <AnimateHeight
                      duration={300}
                      height={currentMenu === "Marketing" ? "auto" : 0}
                    >
                      <ul className="sub-menu p-0 pt-0">
                        <li className="nav-item">
                          <Link href="/apps/campaigns" className="group">
                            <div className="flex w-full items-center">
                              <span className="w-full text-white dark:text-[#fff] dark:group-hover:text-white-dark">
                                {t("Campaigns")}
                              </span>
                            </div>
                          </Link>
                        </li>

                        <li className="nav-item ">
                          <Link href="/apps/categories" className="group">
                            <div className="flex w-full items-center">
                              <span className="text-white dark:text-[#fff] dark:group-hover:text-white-dark ltr:pl-0 rtl:pr-0">
                                {t("Categories")}
                              </span>
                            </div>
                          </Link>
                        </li>
                      </ul>
                    </AnimateHeight>
                  </li>

                  <li className="nav-item">
                    <a
                      href="#"
                      className="group"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleMenu("Activity");
                      }}
                    >
                      <div className="flex items-center">
                        {/* <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="white"
                          className="h-6 w-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                          />
                        </svg> */}
                        <img
                          src={Images?.ACTIVITY}
                          alt=""
                          className="h-[20px] w-[20px] brightness-[1.2] contrast-[1.1] hue-rotate-[190deg] invert-[1] saturate-[5] sepia-[1] filter"
                        />
                        ''{" "}
                        <span className="text-white dark:text-[#fff] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">
                          {t("Activity")}
                        </span>
                      </div>
                    </a>
                    <AnimateHeight
                      duration={300}
                      height={currentMenu === "Activity" ? "auto" : 0}
                    >
                      <ul className="sub-menu p-0 pt-0">
                        <li className="nav-item">
                          <Link href="/apps/UserStatistic" className="group">
                            <div className="flex w-full items-center">
                              <span className="w-full text-white dark:text-[#fff] dark:group-hover:text-white-dark">
                                {t("Users Statistics")}
                              </span>
                            </div>
                          </Link>
                        </li>

                        <li className="nav-item">
                          <Link
                            href="/apps/TransactionsReport"
                            className="group"
                          >
                            <div className="flex w-full items-center">
                              <span className="w-full text-white dark:text-[#fff] dark:group-hover:text-white-dark">
                                {t("Transactions Report")}
                              </span>
                            </div>
                          </Link>
                        </li>
                      </ul>
                    </AnimateHeight>
                  </li>
                </ul>
              </li>
            </ul>
          </PerfectScrollbar>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
