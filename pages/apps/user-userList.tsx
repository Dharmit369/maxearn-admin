import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Dropdown from "@/components/Dropdown";
import { Fragment } from "react";
import Image from "next/image";
import { BASE_URL, Images } from "@/constants";
import Link from "next/link";
import Loader from "@/components/Layouts/Loader";
import { ReactSortable } from "react-sortablejs";
import Select from "react-select";
import { Tab } from "@headlessui/react";
import { showAlert } from "@/components/showAlert";
import axios from "axios";

export default function User({
  setEdit,
  getUserList,
  editId,
  model,
  infoData,
}: any) {
  const [loading, setLoading] = useState(true);
  const data = {
    username: "",
    birth_date: "",
    state: "",
    pincode: "",
    socialMediaAccount: "",
    password: "",
    isBlocked: "",
    referralActive: "",
    commission: 0, // Changed to number
  };
  const [userData, setUserData] = useState(editId ?? data);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: name === "commission" ? Number(value) : value,
    });
  };

  const submitData = async () => {
    debugger;
    setLoading(true);
    const token = localStorage.getItem("token");
    console.log(userData, "userDatauserDatauserData");

    try {
      const formData = new FormData();
      formData.append("username", userData.username ?? "");
      formData.append("birth_date", userData.birth_date ?? "");
      formData.append("state", userData.state ?? "");
      formData.append("pincode", userData.pincode ?? "");
      formData.append("socialMediaAccount", userData.socialMediaAccount ?? "");
      formData.append("password", userData.password ?? "");
      formData.append("isBlocked", userData.isBlocked ?? "");
      formData.append("referralActive", userData.referralActive ?? "");
      formData.append("commission", userData.commission ?? "");

      const res = await axios.put(`${BASE_URL}/user/${editId?._id}`, formData, {
        maxBodyLength: Infinity,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data, "data response");
      if (res) {
        getUserList();
        setEdit(false);
        showAlert(15, res?.data?.message, "success");
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
      <div className="rounded-lg p-10 ">
        <form className="space-y-6">
          <div>
            <label
              htmlFor="websiteName"
              className="mb-2 block text-black dark:text-white"
            >
              Name
            </label>
            <input
              id="Name"
              type="text"
              placeholder="Enter Name"
              className="form-input w-full dark:border-none dark:bg-[#261C16]"
              name="username"
              onChange={(e) => handleChange(e)}
              value={infoData ? infoData?.username : userData?.username}
              disabled={model}
            />
          </div>
          <div>
            <label
              htmlFor="websiteName"
              className="mb-2 block text-black dark:text-white"
            >
              Birth Date
            </label>
            <input
              id="Name"
              type="date"
              placeholder="Birth Date"
              className="form-input w-full dark:border-none dark:bg-[#261C16]"
              name="birth_date"
              onChange={(e) => handleChange(e)}
              value={infoData ? infoData?.birth_date : userData?.birth_date}
              disabled={model}
            />
          </div>
          <div>
            <label
              htmlFor="websiteName"
              className="mb-2 block text-black dark:text-white"
            >
              State
            </label>
            <input
              id="Name"
              type="text"
              placeholder="State"
              className="form-input w-full dark:border-none dark:bg-[#261C16]"
              name="state"
              onChange={(e) => handleChange(e)}
              value={infoData ? infoData?.state : userData?.state}
              disabled={model}
            />
          </div>
          <div>
            <label
              htmlFor="websiteName"
              className="mb-2 block text-black dark:text-white"
            >
              pincode
            </label>
            <input
              id="Name"
              type="text"
              placeholder="pincode"
              className="form-input w-full dark:border-none dark:bg-[#261C16]"
              name="pincode"
              onChange={(e) => handleChange(e)}
              value={infoData ? infoData?.pincode : userData?.pincode}
              disabled={model}
            />
          </div>
          <div>
            <label
              htmlFor="websiteName"
              className="mb-2 block text-black dark:text-white"
            >
              socialMediaAccount
            </label>
            <input
              id="Name"
              type="text"
              placeholder="socialMediaAccount"
              className="form-input w-full dark:border-none dark:bg-[#261C16]"
              name="socialMediaAccount"
              onChange={(e) => handleChange(e)}
              value={
                infoData
                  ? infoData?.socialMediaAccount
                  : userData?.socialMediaAccount
              }
              disabled={model}
            />
          </div>
          <div>
            <label
              htmlFor="websiteName"
              className="mb-2 block text-black dark:text-white"
            >
              password
            </label>
            <input
              id="Name"
              type="text"
              placeholder="password"
              className="form-input w-full dark:border-none dark:bg-[#261C16]"
              name="password"
              onChange={(e) => handleChange(e)}
              value={infoData ? infoData.password : userData?.password}
              disabled={model}
            />
          </div>
          <div>
            <label
              htmlFor="websiteName"
              className="mb-2 block text-black dark:text-white"
            >
              isBlocked
            </label>
            <input
              id="Name"
              type="text"
              placeholder="isBlocked"
              className="form-input w-full dark:border-none dark:bg-[#261C16]"
              name="isBlocked"
              onChange={(e) => handleChange(e)}
              value={infoData ? infoData?.isBlocked : userData?.isBlocked}
              disabled={model}
            />
          </div>
          <div>
            <label
              htmlFor="websiteName"
              className="mb-2 block text-black dark:text-white"
            >
              referralActive
            </label>
            <input
              id="Name"
              type="text"
              placeholder="referralActive"
              className="form-input w-full dark:border-none dark:bg-[#261C16]"
              name="referralActive"
              onChange={(e) => handleChange(e)}
              value={
                infoData ? infoData?.referralActive : userData?.referralActive
              }
              disabled={model}
            />
          </div>
          <div>
            <label
              htmlFor="commission"
              className="mb-2 block text-black dark:text-white"
            >
              commission
            </label>
            <input
              id="commission"
              type="text"
              placeholder="commission(%)"
              className="form-input w-full dark:border-none dark:bg-[#261C16]"
              name="commission"
              onChange={(e) => handleChange(e)}
              value={
                infoData ? infoData?.commission : userData?.commission || ""
              }
              disabled={model}
            />
          </div>

          {/* <div>
                    <label htmlFor="registration" className="block text-black mb-2 dark:text-white">Last </label>
                    <input id="LastName" type="text" placeholder="Enter Last Name" className="form-input w-full dark:bg-[#261C16] dark:border-none" />
                </div> */}

          {/* <div>
                    <label htmlFor="approval" className="block text-black mb-2 dark:text-white">Approval for Registration</label>
                    <input id="Number" type="text" placeholder="Enter Mobile No" className="form-input w-full dark:bg-[#261C16] dark:border-none" />
                </div> */}

          {/* <div>
                    <label htmlFor="timezone" className="block text-black mb-2 dark:text-white">Time Zone</label>
                    <input id="timezone" type="text" placeholder="Enter Time Zone" className="form-input w-full dark:bg-[#261C16] dark:border-none" />
                </div> */}

          {/* <div>
                    <label htmlFor="gridState" className="dark:text-white">Under Affiliate</label>
                    <select id="gridState" className="form-select text-white-dark dark:bg-[#261C16] dark:border-none my-6">
                        <option>None</option>
                        <option>...</option>
                    </select>

                    <select id="gridState" className="form-select text-white-dark dark:bg-[#261C16] dark:border-none space-y-6">
                        <option>None</option>
                        <option>...</option>
                    </select>
                </div> */}

          {/* <div>
                    <label htmlFor="sessionTimeout" className="block text-black mb-2 dark:text-white">Groups</label>
                    <input id="sessionTimeout" type="number" placeholder="Assign User Groups" className="form-input w-full dark:bg-[#261C16] dark:border-none" />
                </div> */}

          {/* <div>
                    <label htmlFor="gridState" className="dark:text-white">Status</label>
                    <select id="gridState" className="form-select text-white-dark dark:bg-[#261C16] dark:border-none">
                        <option>Selected</option>
                        <option>Submitted</option>
                        <option>approve</option>
                        <option>reject</option>
                    </select>
                </div> */}

          {/* <div>
                    <label htmlFor="sessionTimeout" className="block text-black mb-2 dark:text-white">Message</label>
                    <textarea id="sessionTimeout" placeholder="Enter Message" className="form-input w-full dark:bg-[#261C16] dark:border-none" />
                </div> */}

          {model === false && (
            <div className="flex justify-end">
              <button
                type="submit"
                className="btn btn-primary mt-6 w-fit"
                onClick={() => submitData()}
              >
                Submit Setting
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
