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
import AnimatedCard from "@/components/animated-card";
import GroupIcon from "@mui/icons-material/Group";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { showAlert } from "@/components/showAlert";
import moment from "moment";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function UserWallet() {
  const data = {
    affiliate_id: "",
    start_date: "",
    end_date: "",
    status: "",
  };

  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [changeData, setchangeData] = useState(data);

  useEffect(() => {
    getWallet();
  }, [changeData]);

  const getWallet = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    console.log(`${BASE_URL}/withdraw`);
    try {
      const res = await axios.get(
        `${BASE_URL}/wallet/?affiliate_id=${changeData?.affiliate_id}&start_date=${changeData?.start_date}&end_date=${changeData?.end_date}&status=${changeData?.status}`,
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
        showAlert(15, res?.data?.message, "error");
      }
    } catch (e) {
      console.error(e, "login error");
    } finally {
      setLoading(false);
    }
  };

  // const getWithdrawalRequest = async () => {
  //   setLoading(true);
  //   const token = localStorage.getItem("token");

  //   try {
  //     const res = await axios.get(
  //       `${BASE_URL}/withdraw/?affiliate_id=${changeData?.affiliate_id}&start_date=${changeData?.start_date}&end_date=${changeData?.end_date}&status=${changeData?.status}`,
  //       {
  //         maxBodyLength: Infinity,
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     console.log(res.data, "data response");
  //     if (res) {
  //       setTableData(res?.data?.data);
  //       setLoading(false);
  //     } else {
  //       showAlert(15, res?.data?.message, "error");
  //     }
  //   } catch (e) {
  //     console.error(e, "login error");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleChange = (e: any) => {
    setchangeData({
      ...changeData,
      [e.target.name]: e.target.value,
    });
  };

  const exportCSV = () => {
    const headers = [
      "Lead ID",
      "Date",
      "Amount",
      "Paid For",
      "Amount Status",
      "Status",
    ];

    const rows = tableData?.map((data) => [
      data?.lead_id,
      data?.date,
      data?.amount,
      data?.lead_name,
      data?.status,
      data?.status, // Adjust as per your data structure
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "wallet_transactions.csv");
    document.body.appendChild(link);

    link.click();
  };

  return loading ? (
    <div>
      <Loader />
    </div>
  ) : (
    <div>
      {/* <div className="flex justify-between px-0 py-7 xs:flex-col lg:flex-row lg:gap-3 ">
        <AnimatedCard title="Total Balance" value="12,15,24,527">
          <GroupIcon className="text-white" />
        </AnimatedCard>

        <AnimatedCard title="Total Profit" value="15,24,527">
          <GroupIcon className="text-white" />
        </AnimatedCard>

        <AnimatedCard title="Total Paid" value="12,15,24,527">
          <GroupIcon className="text-white" />
        </AnimatedCard>

        <AnimatedCard title="Total Hold" value="24,527">
          <GroupIcon className="text-white" />
        </AnimatedCard>

        <AnimatedCard title="Withdraw request" value="527">
          <GroupIcon className="text-white" />
        </AnimatedCard>
      </div> */}

      <div>
        <div className="group relative w-full cursor-pointer items-center overflow-hidden border-none  bg-white ring-1 ring-gray-900/5 dark:bg-[#261C16] dark:ring-gray-700 sm:rounded-lg sm:px-5 ">
          <div className="my-6">
            <h2 className="text-lg xs:px-5 lg:px-0">
              Search all Users wallet transactions by
            </h2>
          </div>
          <div className="flex justify-between xs:flex-col xs:space-y-4 xs:px-5 lg:flex-row lg:gap-3 lg:px-0">
            <input
              id="userId"
              type="text"
              placeholder="User Id"
              className="form-input mt-4 h-10 dark:border-none dark:bg-[#1E1611]"
              name="affiliate_id"
              onChange={(e) => handleChange(e)}
              value={changeData?.affiliate_id}
            />

            <input
              id="gridEmail"
              type="date"
              placeholder="User Id"
              className="form-input mt-4 h-10 dark:border-none dark:bg-[#1E1611]"
              name="start_date"
              onChange={(e) => handleChange(e)}
              value={changeData?.start_date}
            />

            <input
              id="gridEmail"
              type="date"
              placeholder="User Id"
              className="form-input mt-4 h-10 dark:border-none dark:bg-[#1E1611]"
              name="end_date"
              onChange={(e) => handleChange(e)}
              value={changeData?.end_date}
            />

            <select
              id="filterStatus"
              className="form-select h-10 text-white-dark dark:border-none dark:bg-[#1E1611]"
              name="status"
              onChange={(e) => handleChange(e)}
              value={changeData?.status}
            >
              <option key={"all"} value={"all"}>
                All
              </option>
              <option>Debit</option>
              <option>Credit</option>
            </select>
          </div>

          <div className="xs:px-5 lg:px-0 ">
            <button
              type="submit"
              className="btn btn-primary my-6"
              onClick={exportCSV}
            >
              Export Transaction
            </button>
          </div>

          <div>
            <div className="table-responsive mb-5 xs:px-5 lg:px-0">
              <table>
                <thead>
                  <tr>
                    <th>Lead ID</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Paid For</th>
                    <th>Amount Status</th>
                    <th>Status</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData?.map((data, index) => {
                    return (
                      <tr key={data?._id}>
                        <td>{data?.lead_id}</td>
                        <td>
                          <div className="whitespace-nowrap">
                            {moment(data?.date)?.format("DD/MM/YYYY")}
                          </div>
                        </td>
                        <td>{data.amount}</td>
                        <td>{data.lead_name}</td>
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
                        <td>
                          <span className={`badge whitespace-nowrap `}>
                            {/* {data.status} */}
                            <select
                              id="Type"
                              className="form-select w-32 text-white-dark dark:border-none dark:bg-[#1E1611]"
                              // onChange={(e) => handleStatus(data?._id, e.target.value)}
                              // value={data?.status}
                            >
                              <option value={""}>Please Select</option>
                              <option value={"Hold"}>On Hold</option>
                              <option value={"InWallet"}>In Wallet</option>
                              <option value={"Requested"}>Requested</option>
                              <option value={"Paid"}>Paid</option>
                              <option value={"NotPaid"}>NotPaid</option>
                            </select>
                          </span>
                        </td>
                        <td className="text-center">
                          <div className="dropdown">
                            <DeleteIcon />
                            <VisibilityIcon />
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
      </div>
    </div>
  );
}
