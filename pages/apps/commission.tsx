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
import ModeEditIcon from "@mui/icons-material/ModeEdit";

const commission = () => {
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [status, setStatus] = useState("");
  const [statusModelOpen, setStatusModelOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [commissionValue, setCommissionValue] = useState("");
  const [referralActive, setReferralActive] = useState(false);

  useEffect(() => {
    getBankDetails();
  }, []);

  const getBankDetails = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    console.log(`${BASE_URL}/getAdminSetting`);
    try {
      const res = await axios.get(`${BASE_URL}/admin/getAdminSetting`, {
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

  const updateStatus = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    console.log(
      `${BASE_URL}/admin/updateAdminSetting/${selectedId}`,
      "update URL"
    );
    const data = {
      commission: commissionValue,
      referral_active: referralActive,
    };

    try {
      const res = await axios.put(
        `${BASE_URL}/admin/updateAdminSetting/${selectedId}`,
        data,
        {
          maxBodyLength: Infinity,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data, "update response");
      if (res) {
        showAlert(15, res?.data?.message, "success");
        setStatusModelOpen(false);
        getBankDetails();
      } else {
        showAlert(15, res?.data?.message, "error");
        setStatusModelOpen(false);
      }
    } catch (e) {
      console.error(e, "update error");
      setStatusModelOpen(false);
    } finally {
      setLoading(false);
      setStatusModelOpen(false);
    }
  };

  const handleStatus = (id, commission, referralActive) => {
    console.log(id, "selected ID");
    setSelectedId(id);
    setCommissionValue(commission);
    setReferralActive(referralActive);
    setStatusModelOpen(true);
  };

  return loading ? (
    <div>
      <Loader />
    </div>
  ) : (
    <div>
      <h1 className="text-2xl font-semibold">ADMIN SETTING</h1>
      <div className="mb-6 flex justify-between"></div>
      <div className="table-responsive no-scrollbar mb-5 max-h-96 ">
        <table className="   scrollbar-thin scrollbar-track-[#010314] scrollbar-thumb-[#1a2941]">
          <thead className="sticky top-0 z-50">
            <tr>
              <th>NO</th>
              <th>ID</th>
              <th>COMMISSION</th>
              <th>REFERRAL ACTIVE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {tableData?.map((data, index) => {
              return (
                <tr key={data?._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="whitespace-nowrap">{data?._id}</div>
                  </td>
                  <td>{data.commission}</td>
                  <td>{data?.referral_active === false ? "false" : "true"}</td>
                  <td className="border-b border-[#ebedf2] p-3 text-center dark:border-[#191e3a] md:space-x-4">
                    <ModeEditIcon
                      onClick={() =>
                        handleStatus(
                          data?._id,
                          data.commission,
                          data.referral_active
                        )
                      }
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {statusModelOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-md bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold">Edit Commission</h2>
            <label className="mb-2 block">
              Commission:
              <input
                type="number"
                value={commissionValue}
                onChange={(e) => setCommissionValue(e.target.value)}
                className="mt-1 block w-full rounded-md border p-2"
              />
            </label>
            <label className="mb-4 block">
              Referral Active:
              <Select
                options={[
                  { value: true, label: "True" },
                  { value: false, label: "False" },
                ]}
                value={
                  referralActive
                    ? { value: true, label: "True" }
                    : { value: false, label: "False" }
                }
                onChange={(option) => setReferralActive(option?.value)}
                className="mt-1 block w-full"
              />
            </label>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setStatusModelOpen(false)}
                className="rounded-md bg-gray-300 px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={updateStatus}
                className="rounded-md bg-blue-600 px-4 py-2 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default auth(commission);
