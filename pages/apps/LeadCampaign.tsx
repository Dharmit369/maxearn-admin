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
import auth from "../utils/auth";
import axios from "axios";
import { showAlert } from "@/components/showAlert";
import moment from "moment";

interface TableData {
  id: any;
  name: any;
  date: any; // or Date if it's a Date object
  number: any;
  status: "completed" | "Pending" | "In Progress" | "Canceled"; // or use a string if there are more statuses
}

const LeadCampaign = ({ setLeadOpen, rowId }: any) => {
  const data = {
    name: "",
    email: "",
    phone_num: "",
    status: "",
  };
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [userDropdownData, setUserDropdownData] = useState([]);
  const [leadEditOpen, setLeadEditOpen] = useState(false);
  const [changeData, setChangeData] = useState(data);
  const [user, setUser] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState([]);
  const [changeStatus, setChangeStatus] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  console.log("user", user);

  useEffect(() => {
    userOption();
  }, []);

  useEffect(() => {
    getLead();
  }, [rowId, user, startDate, endDate, changeStatus]);

  const userOption = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    console.log(`${BASE_URL}/lead`);
    try {
      const res = await axios.get(`${BASE_URL}/lead/drop-down`, {
        maxBodyLength: Infinity,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data, "data response");
      if (res) {
        const _data = res?.data?.data?.user?.map((e: any) => ({
          value: e.affiliate_id,
          label: e.email,
        }));
        setUserDropdownData(_data);
        setStatus(res?.data?.data?.status);
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

  const getLead = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    console.log(`${BASE_URL}/lead`);
    try {
      const res = await axios.get(
        `${BASE_URL}/lead/filter?user_id=${user}&start_date=${startDate}&end_date=${endDate}&status=${changeStatus}&campaign_id=${rowId}`,
        {
          maxBodyLength: Infinity,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data, "data response");
      if (res) {
        setTableData(res?.data?.data);
        setLoading(false);
      } else {
        setTableData([]);
        showAlert(15, res?.data?.message, "error");
      }
    } catch (e) {
      console.error(e, "login error");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setChangeData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const updateLead = async (id: any) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const _data = {
      name: changeData?.name,
      email: changeData?.email,
      phone_num: changeData?.phone_num,
      status: changeData?.status,
    };

    try {
      const res = await axios.put(`${BASE_URL}/lead/${id}`, _data, {
        maxBodyLength: Infinity,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res, "daaaaaaaaaaaaa");
      console.log(res.data, "edit traning response");
      if (res.data) {
        setLoading(false);
        setLeadEditOpen(false);
        showAlert(15, res.data.message, "success");
        getLead();
      } else {
        showAlert(15, res.data.message, "error");
      }
    } catch (e) {
      console.error(e, "edit traning create error");
      showAlert(15, "An error occurred while submitting data", "error");
    } finally {
      setLoading(false);
    }
  };

  const exportTableData = () => {
    const headers = [
      "ID",
      "Created By",
      "Name",
      "Date",
      "Email",
      "Phone number",
      "Status",
      "Action",
    ];

    const csvData = tableData?.map((row) => ({
      ID: row?.id,
      "Created By": row?.name,
      Name: row?.name,
      Date: row?.date,
      Email: row?.email,
      "Phone Number": row?.phone_num,
      Status: row?.status,
    }));

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...csvData?.map((row) => row?.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Lead-List.csv");
    document.body.appendChild(link);

    link.click();
  };

  const deleteLead = async (id: any) => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const res = await axios.delete(`${BASE_URL}/lead/${id}`, {
        maxBodyLength: Infinity,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res, "daaaaaaaaaaaaa");
      console.log(res.data, "edit traning response");
      if (res.data) {
        showAlert(15, res.data.message, "success");
        getLead();
      } else {
        showAlert(15, res.data.message, "error");
      }
    } catch (e) {
      console.error(e, "edit traning create error");
      showAlert(15, "An error occurred while submitting data", "error");
    } finally {
      setLoading(false);
    }
  };

  const editClick = async (data: any) => {
    setLeadEditOpen(true);
    setChangeData(data);
  };

  return loading ? (
    <div>
      <Loader />
    </div>
  ) : (
    <div>
      {leadEditOpen === false && (
        <div className="group relative w-full cursor-pointer items-center overflow-hidden border-none  bg-white ring-1 ring-gray-900/5 dark:bg-[#261C16] dark:ring-gray-700 sm:rounded-lg sm:px-5 ">
          <div className="my-6 flex justify-between">
            <h2 className="text-xl font-semibold dark:text-white">Lead List</h2>
            <button
              className="text-gray-500 hover:text-gray-700 dark:text-white"
              onClick={() => {
                setLeadOpen(false);
                setChangeData(data);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="my-6 flex justify-between xs:flex-col xs:space-y-4 xs:px-5 lg:flex-row lg:gap-3 lg:px-0">
            <div className="w-full">
              <label htmlFor="User" className="mt-4">
                User
              </label>
              {/* <input id="User" type="text" placeholder="User" className="form-input h-10 dark:bg-[#1E1611] dark:border-none" /> */}
              <select
                id="User"
                className="form-select h-10 text-white-dark dark:border-none dark:bg-[#1E1611]"
                onChange={(e) => setUser(e.target.value)}
                value={user}
              >
                <option key={"all"} value={"all"}>
                  All
                </option>
                {userDropdownData?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full">
              <label htmlFor="startDate">Start Date</label>
              <input
                id="startDate"
                type="date"
                placeholder="Start Date"
                className="form-input h-10 dark:border-none dark:bg-[#1E1611]"
                onChange={(e) => setStartDate(e.target.value)}
                value={startDate}
              />
            </div>
            <div className="w-full">
              <label htmlFor="endDate">End Date</label>
              <input
                id="endDate"
                type="date"
                placeholder="End Date"
                className="form-input h-10 dark:border-none dark:bg-[#1E1611]"
                onChange={(e) => setEndDate(e.target.value)}
                value={endDate}
              />
            </div>
            <div className="w-full">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                className="form-select h-10 text-white-dark dark:border-none dark:bg-[#1E1611]"
                onChange={(e) => setChangeStatus(e.target.value)}
                value={changeStatus}
              >
                <option key={"all"} value={"all"}>
                  All
                </option>
                {status?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex xs:px-5 lg:px-0 ">
            <button type="submit" className="btn btn-primary my-6 mr-3">
              Delete All
            </button>
            <button
              type="submit"
              className="btn btn-primary my-6"
              onClick={exportTableData}
            >
              Export
            </button>
          </div>

          <div>
            <div className="table-responsive mb-5  xs:px-5 lg:px-0">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Created By</th>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Email</th>
                    <th>Phone number</th>
                    <th>Status</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData?.map((data: TableData, index) => {
                    return (
                      <tr key={data.id}>
                        <td>{index + 1}</td>
                        <td>{data.name}</td>
                        <td>{data.name}</td>
                        <td>
                          {moment(data.created_timestamp).format("DD/MM/YYYY")}
                        </td>
                        <td>
                          <span>{data.email}</span>
                        </td>
                        <td>
                          <span>{data.phone_num}</span>
                        </td>
                        <td>
                          <span
                            className={`badge whitespace-nowrap ${
                              data.status === "completed"
                                ? "bg-primary   "
                                : data.status === "Pending"
                                ? "bg-secondary"
                                : data.status === "In Progress"
                                ? "bg-success"
                                : data.status === "Canceled"
                                ? "bg-danger"
                                : "bg-primary"
                            }`}
                          >
                            {data.status}
                          </span>
                        </td>
                        <td className="text-center">
                          <div className="dropdown">
                            <span
                              className="badge cursor-pointer bg-primary"
                              onClick={() => editClick(data)}
                            >
                              Edit
                            </span>
                            <span
                              className="badge ml-5 cursor-pointer bg-danger"
                              onClick={() => deleteLead(data?._id)}
                            >
                              Delete
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {leadEditOpen && (
        <div className="m-0 p-0">
          <div className="mb-4 w-full rounded border border-white-light bg-white px-0 shadow-[4px_6px_10px_-3px_#bfc9d4] dark:border-none dark:bg-[#29221C] dark:shadow-custom sm:w-[78.5vw]">
            <div className="p-8">
              <div className="my-6 flex justify-between">
                <h2 className="text-xl font-semibold dark:text-white">
                  Edit Lead
                </h2>
                <button
                  className="text-gray-500 hover:text-gray-700 dark:text-white"
                  onClick={() => setLeadEditOpen(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <form className="space-y-5">
                <div>
                  <label htmlFor="Name">Name</label>
                  <input
                    id="Name"
                    type="text"
                    placeholder="Name"
                    className="form-input dark:border-none dark:bg-[#261C16]"
                    name="name"
                    onChange={handleChange}
                    value={changeData?.name}
                  />
                </div>

                <div>
                  <label htmlFor="Email">Email</label>
                  <input
                    id="Email"
                    type="email"
                    placeholder="Email"
                    className="form-input dark:border-none dark:bg-[#261C16]"
                    name="email"
                    onChange={handleChange}
                    value={changeData?.email}
                  />
                </div>

                <div>
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    placeholder="Phone Number"
                    className="form-input dark:border-none dark:bg-[#261C16]"
                    name="phone_num"
                    onChange={handleChange}
                    value={changeData?.phone_num}
                  />
                </div>

                <div>
                  <label htmlFor="Status">Status</label>
                  <select
                    id="Status"
                    className="form-select text-white-dark dark:border-none dark:bg-[#261C16]"
                    name="status"
                    onChange={handleChange}
                    value={changeData?.status}
                  >
                    <option key={"all"} value={"all"}>
                      All
                    </option>
                    {status?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary mt-6 w-fit"
                    onClick={() => updateLead(rowId)}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default auth(LeadCampaign);
