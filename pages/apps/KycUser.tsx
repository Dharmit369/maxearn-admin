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
import { showAlert } from "@/components/showAlert";
import axios from "axios";

// const tableData = [
//     {
//         affiliate_id: "456",
//         pan_card: "abc",
//         adhar_card_front: "abc",
//         adhar_card_back: "aed",
//     }
// ]

const KycUser = () => {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [statusModelOpen, setStatusModelOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [statusId, setStatusId] = useState("");

  console.log("hiiiii i am from kycUser");

  useEffect(() => {
    getKyc();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleStatus = (e, id) => {
    setStatus(e.target.value);
    setStatusModelOpen(true);
    setStatusId(id);
  };

  const submitData = () => {
    console.log("submitted");
    setStatusModelOpen(false);
  };

  const getKyc = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    console.log(`${BASE_URL}/banner`);
    try {
      const res = await axios.get(`${BASE_URL}/kyc/getKycWithBankDetails`, {
        maxBodyLength: Infinity,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data, "data response");
      if (res) {
        // router.push("/dashboard/dashboard");
        setTableData(res?.data?.data);
        setStatusModelOpen(false);
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
      <div className="table-responsive mb-5 max-h-96">
        <table className="   scrollbar-thin scrollbar-track-[#010314] scrollbar-thumb-[#1a2941]">
          <thead className="sticky top-0 z-50">
            <tr>
              <th>ID</th>
              <th>AFFILIATE ID</th>
              <th>PAN CARD</th>
              <th>AADHAR CARD FRONT</th>
              <th>AADHAR CARD BACK</th>
              <th>CHEQUE BOOK</th>
              <th>PASS BOOK</th>
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
                      {data?.affiliate_id || "-"}
                    </div>
                  </td>
                  <a
                    href={`${data.pan_card}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="PAN Card"
                  >
                    {data.pan_card || "-"}
                  </a>
                  <td>
                    {/* <div className="whitespace-nowrap">{data?.adhar_card_front}</div> */}
                    <a
                      href={`${data.adhar_card_front}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Aadhar Card Front"
                    >
                      {data.adhar_card_front || "-"}
                    </a>
                  </td>
                  <td>
                    {/* <div className="whitespace-nowrap">{data?.adhar_card_back}</div> */}
                    <a
                      href={`${data.adhar_card_back}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Aadhar Card Front"
                    >
                      {data.adhar_card_back || "-"}
                    </a>
                  </td>
                  <td>
                    {/* <div className="whitespace-nowrap">{data?.adhar_card_back}</div> */}
                    <a
                      href={`${data.chequebook}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Aadhar Card Front"
                    >
                      {data.chequebook || "-"}
                    </a>
                  </td>
                  <td>
                    {/* <div className="whitespace-nowrap">{data?.adhar_card_back}</div> */}
                    <a
                      href={`${data.passbook}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Aadhar Card Front"
                    >
                      {data.passbook || "-"}
                    </a>
                  </td>
                  <td>
                    {/* <div className="whitespace-nowrap"> */}
                    <select
                      id="Type"
                      className="form-select w-32 text-white-dark dark:border-none dark:bg-[#261C16]"
                      onChange={(e) => handleStatus(e, data?._id)}
                      value={data?.status}
                    >
                      <option value={""}>Please Select</option>
                      <option value={"Submitted"}>Submitted</option>
                      <option value={"Approved"}>Approved</option>
                      <option value={"Rejected"}>Rejected</option>
                    </select>
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
          submitData={submitData}
          statusId={statusId}
          status={status}
        />
      )}
    </div>
  );
};

export default auth(KycUser);
