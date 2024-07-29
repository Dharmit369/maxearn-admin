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
import StatusModel from "@/components/statusModel";
import axios from "axios";
import { showAlert } from "@/components/showAlert";

const BankUserDetails = () => {
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [status, setStatus] = useState("");
  const [statusModelOpen, setStatusModelOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    getBankDetails();
  }, []);

  const getBankDetails = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    console.log(`${BASE_URL}/bank-details`);
    try {
      const res = await axios.get(`${BASE_URL}/bank-details`, {
        maxBodyLength: Infinity,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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

  const updateStatus = async ({ id, status }) => {
    setLoading(true);
    const token = localStorage.getItem("token");

    console.log(
      `${BASE_URL}/bank-details/updateBankStatus/${id}`,
      "urllllllllllllllllll"
    );
    const data = {
      status: status,
    };
    try {
      const res = await axios.put(
        `${BASE_URL}/bank-details/updateBankStatus/${id}`,
        data,
        {
          maxBodyLength: Infinity,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data, "ssssssssssssssssssssssssssssssssssssssssssssss");
      if (res) {
        setTableData(res?.data?.data);
        setLoading(false);
        showAlert(15, res?.data?.message, "success");
        getBankDetails();
      } else {
        showAlert(15, res?.data?.message, "error");
        getBankDetails();
      }
    } catch (e) {
      console.error(e, "login error");
    } finally {
      setLoading(false);
    }
  };

  const handleStatus = (id, newStatus) => {
    setStatus(newStatus);
    setSelectedId(id); // Set the selected id
    setStatusModelOpen(true);
  };

  const submitData = () => {
    if (selectedId && status) {
      updateStatus({ id: selectedId, status: status });
    }
    setStatusModelOpen(false);
  };

  return loading ? (
    <div>
      <Loader />
    </div>
  ) : (
    <div>
      <div className="mb-6 flex justify-between">
        {/* <h2 className="text-xl font-semibold dark:text-white">
        </h2>
        <button
            className="text-gray-500 hover:text-gray-700 dark:text-white"
            // onClick={() => setClose(false)}
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
        </button> */}
      </div>
      <div className="table-responsive no-scrollbar mb-5 max-h-96 ">
        <table className="   scrollbar-thin scrollbar-track-[#010314] scrollbar-thumb-[#1a2941]">
          <thead className="sticky top-0 z-50">
            <tr>
              <th>ID</th>
              <th>AFFILIATE ID</th>
              <th>BANK NAME</th>
              <th>ACCOUNT NUMBER</th>
              <th>ACCOUNT NAME</th>
              <th>IFSC</th>
              <th>CHECKBOOK</th>
              <th>PASSBOOK</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {tableData?.map((data, index) => {
              return (
                <tr key={data?._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="whitespace-nowrap">
                      {data?.affiliate_id}
                    </div>
                  </td>
                  <td>{data.bank_name}</td>
                  <td>{data?.account_number}</td>
                  <td>{data?.account_name}</td>
                  <td>{data?.ifsc}</td>
                  <td>
                    <a
                      href={`${data?.chequebook}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Aadhar Card Front"
                    >
                      {data?.chequebook}
                    </a>
                  </td>
                  <td>
                    <a
                      href={`${data?.passbook}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Aadhar Card Front"
                    >
                      {data?.passbook}
                    </a>
                  </td>
                  <td>
                    <select
                      id="Type"
                      className="form-select w-32 text-white-dark dark:border-none dark:bg-[#261C16]"
                      onChange={(e) => handleStatus(data?._id, e.target.value)}
                      value={data?.status}
                    >
                      <option value={""}>Please Select</option>
                      <option value={"Submitted"}>Submitted</option>
                      <option value={"Approved"}>Approved</option>
                      <option value={"Rejected"}>Rejected</option>
                    </select>
                    {/* </div> */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {statusModelOpen && (
        <StatusModel
          setStatusModelOpen={setStatusModelOpen}
          submitData={() => submitData()}
        />
      )}
    </div>
  );
};

export default auth(BankUserDetails);
