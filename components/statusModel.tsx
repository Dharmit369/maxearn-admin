import { BASE_URL } from "@/constants";
import auth from "@/pages/utils/auth";
import axios from "axios";
import { useEffect, useState } from "react";
import { showAlert } from "./showAlert";
import Loader from "./Layouts/Loader";

const statusModel = ({ setStatusModelOpen, Data, statusId, status }: any) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const submitData = async () => {
    console.log(statusId, "sasnajsnajnsajnsajnsajnsajnsjnasjn");
    setLoading(true);
    const token = localStorage.getItem("token");
    console.log(`${BASE_URL}/kyc/updateKycStatus/${statusId}`);
    const _data = {
      status: status,
    };
    try {
      const res = await axios.put(
        `${BASE_URL}/kyc/updateKycStatus/${statusId}`,
        _data,
        {
          maxBodyLength: Infinity,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data, "data response");
      if (res) {
        // router.push("/dashboard/dashboard");
        // setTableData(res?.data?.data);
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
      <div className="fixed inset-0 z-50 bg-black opacity-50"></div>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="w-96 rounded-lg bg-white p-8 shadow-lg dark:bg-[#29221C]">
          <div className="mb-6 flex justify-between">
            <h2 className="text-xl font-semibold dark:text-white">
              Confirmation
            </h2>
            <button
              className="text-gray-500 hover:text-gray-700 dark:text-white"
              onClick={() => setStatusModelOpen(false)}
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
          <div>
            <h2 className="text-xl font-semibold dark:text-white">
              Are you sure?
            </h2>
          </div>
          <div className="mt-8 flex justify-end">
            <button
              className="rounded bg-blue-500 px-6 py-3 text-white hover:bg-blue-600"
              onClick={Data ? Data : () => submitData()}
            >
              Save
            </button>
            <button
              className="ml-4 rounded bg-gray-200 px-6 py-3 text-gray-700 hover:bg-gray-300"
              onClick={() => setStatusModelOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default statusModel;
