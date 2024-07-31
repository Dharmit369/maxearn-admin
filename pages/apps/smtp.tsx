import { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { Fragment } from "react";
import Loader from "@/components/Layouts/Loader";
import React from "react";
import SiteSettingForm from "./siteSetting-form";
import EmailSettingForm from "./emailSettingForm";
import TermAndCondition from "./termAndCondition";
import UserDashboard from "./userDashboard";
import auth from "../utils/auth";

const Reports = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return loading ? (
    <div>
      <Loader />
    </div>
  ) : (
    <div className="m-0 p-0">
      <div className="mb-4 w-full rounded border border-white-light bg-white px-0 shadow-[4px_6px_10px_-3px_#bfc9d4] dark:border-none dark:bg-[#29221C] dark:shadow-custom sm:w-[78.5vw]">
        <Tab.Group>
          <Tab.List className="mt-5 flex flex-wrap">
            {/* <Tab as={Fragment}>
              {({ selected }: any) => (
                <button
                  className={`${
                    selected
                      ? "bg-primary text-white !outline-none dark:bg-[#FE6C00]"
                      : ""
                  }
                -mb-[1px] ml-5 block rounded p-3.5 py-2 hover:bg-primary hover:text-white dark:hover:bg-[#FE6C00]`}
                >
                  Site Setting
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }: any) => (
                <button
                  className={`${
                    selected
                      ? "bg-primary text-white !outline-none dark:bg-[#FE6C00]"
                      : ""
                  }
                -mb-[1px] ml-5 block rounded p-3.5 py-2 hover:bg-primary hover:text-white dark:hover:bg-[#FE6C00]`}
                >
                  Email Setting
                </button>
              )}
            </Tab> */}
            <Tab as={Fragment}>
              {({ selected }: any) => (
                <button
                  className={`${
                    selected
                      ? "bg-primary text-white !outline-none dark:bg-[#FE6C00]"
                      : ""
                  }
                -mb-[1px] ml-5 block rounded p-3.5 py-2 hover:bg-primary hover:text-white dark:hover:bg-[#FE6C00]`}
                >
                  Terms And Condition
                </button>
              )}
            </Tab>
            {/* <Tab as={Fragment}>
              {({ selected }: any) => (
                <button
                  className={`${
                    selected
                      ? "bg-primary text-white !outline-none dark:bg-[#FE6C00]"
                      : ""
                  }
                -mb-[1px] ml-5 block rounded p-3.5 py-2 hover:bg-primary hover:text-white dark:hover:bg-[#FE6C00]`}
                >
                  User Dashboard
                </button>
              )}F
            </Tab> */}
          </Tab.List>

          <Tab.Panels>
            {/* <Tab.Panel>
              <SiteSettingForm />
            </Tab.Panel> */}

            {/* <Tab.Panel>
              <EmailSettingForm />
            </Tab.Panel> */}

            <Tab.Panel>
              <TermAndCondition />
            </Tab.Panel>

            {/* <Tab.Panel>
              <UserDashboard />
            </Tab.Panel> */}
          </Tab.Panels>
        </Tab.Group>

        <div className="flex justify-between px-4 py-7 xs:flex-col lg:flex-row "></div>
      </div>
    </div>
  );
};

export default auth(Reports);
