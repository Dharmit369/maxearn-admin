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

const UserStatistics = () => {
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    getData();
  }, [selectedDate]);

  const getData = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get(
        `${BASE_URL}/activity/statstic?date=${selectedDate}`,
        {
          maxBodyLength: Infinity,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data, "data response");

      setTableData(res?.data?.data);
      setLoading(false);
    } catch (e) {
      console.error(e, "Total Lead Data");
    } finally {
      setLoading(false);
    }
  };

  const exportCSV = () => {
    const headers = [
      "Id",
      "Affiliate ID",
      "Affiliate Name",
      "Lead Payment",
      "Referal Payment",
      "Total Memo",
    ];

    const rows = tableData?.map((data, index) => [
      index + 1,
      data?.affiliate_id,
      data?.username,
      data?.lead_payment,
      data?.refral_payment,
      data?.totalmemo,
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "user_statistic.csv");
    document.body.appendChild(link);

    link.click();
  };

  return loading ? (
    <div>
      <Loader />
    </div>
  ) : (
    <div className="group relative w-full cursor-pointer items-center overflow-hidden border-none  bg-white ring-1 ring-gray-900/5 dark:bg-[#261C16] dark:ring-gray-700 sm:rounded-lg sm:px-5 ">
      {/* <div className="my-6">
        <h2 className="text-lg  xs:px-5 lg:px-0">All withdraw request List</h2>
      </div> */}
        <div className="my-6 flex justify-between">
        <h2 className="text-xl font-semibold dark:text-white">
          User Statistics
        </h2>
      </div>
      <div className="x my-6 flex items-center  xs:flex-col xs:px-5 lg:flex-row lg:gap-3 lg:px-0">
        <input
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          id="campaign"
          type="date"
          placeholder="Enter date"
          className="form-input h-10 w-64 dark:border-none dark:bg-[#1E1611]"
        />

        <button
          type="submit"
          className="btn btn-primary my-6 h-9 w-fit"
          onClick={() => getData()}
        >
          Search
        </button>

        <button
          type="submit"
          className="btn btn-primary my-6 h-9 w-fit"
          onClick={exportCSV}
        >
          Export
        </button>
      </div>

      <div>
        <div className="table-responsive mb-5  xs:px-5 lg:px-0">
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Affiliate ID</th>
                <th>Affiliate Name</th>
                <th>Lead Payment</th>
                <th>Referal Payment</th>
                <th>Total Memo</th>
              </tr>
            </thead>
            <tbody>
              {tableData?.map((data, index) => {
                return (
                  <tr key={data?.id}>
                    <td>{index + 1}</td>
                    <td>{data?.affiliate_id}</td>
                    <td>{data?.username}</td>
                    <td>{data?.lead_payment}</td>
                    <td>{data?.refral_payment}</td>
                    <td>{data?.total_amount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default auth(UserStatistics);
