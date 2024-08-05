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
import moment from "moment";

const TransactionsReport = () => {
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    getData();
  }, [fromDate, toDate]);

  const getData = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get(`${BASE_URL}/activity/commission`, {
        maxBodyLength: Infinity,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data, "data response");
      let filteredData = res?.data?.data;
      if (fromDate && toDate) {
        filteredData = filteredData.filter((data) =>
          moment(data.date).isBetween(
            moment(fromDate),
            moment(toDate),
            null,
            "[]"
          )
        );
      }

      setTableData(filteredData);

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
      "Username",
      "Commission",
      "Type",
      "Comment",
      "Date",
    ];

    const rows = tableData?.map((data, index) => [
      index + 1,
      data?.affiliate_id,
      data?.user_name,
      data?.commission_amount,
      data?.type,
      data?.comment,
      data?.date,
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "user-statistic.csv");
    document.body.appendChild(link);

    link.click();
  };

  return loading ? (
    <div>
      <Loader />
    </div>
  ) : (
    <div className="group relative w-full cursor-pointer items-center overflow-hidden border-none  bg-white ring-1 ring-gray-900/5 dark:bg-[#261C16] dark:ring-gray-700 sm:rounded-lg sm:px-5 ">
      <div className="my-6 flex justify-between">
        <h2 className="text-xl font-semibold dark:text-white">
          All Transactions
        </h2>
      </div>

      <div className="x my-6 flex items-center  xs:flex-col xs:px-5 lg:flex-row lg:gap-3 lg:px-0">
        <input
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          id="fromDate"
          type="date"
          placeholder="From date"
          className="form-input h-10 w-64 dark:border-none dark:bg-[#1E1611]"
        />

        <input
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          id="toDate"
          type="date"
          placeholder="To date"
          className="form-input h-10 w-64 dark:border-none dark:bg-[#1E1611]"
        />

        <button
          type="submit"
          className="btn btn-primary my-6 h-9 w-fit"
          onClick={getData}
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
                <th>Id</th>
                <th>Affiliate ID</th>
                <th>Username</th>
                <th>Commission</th>
                {/* <th>From</th> */}
                <th>Type</th>
                {/* <th>Order Total</th> */}
                {/* <th>Payment Method</th> */}
                <th>Comment</th>
                {/* <th>Status</th> */}
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {tableData?.map((data, index) => {
                return (
                  <tr key={data?.id}>
                    <td>{index + 1}</td>
                    <td>{data?.affiliate_id}</td>
                    <td>{data?.user_name}</td>
                    <td>{data?.commission_amount}</td>
                    <td>{data?.type}</td>
                    <td>{data?.comment}</td>
                    <td>{moment(data?.date).format("DD/MM/YYYY")}</td>
                    {/* <td>{data?.price}</td> */}
                    {/* <td>{data?.price}</td> */}

                    {/* <td>{data?.date}</td> */}
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

export default auth(TransactionsReport);
