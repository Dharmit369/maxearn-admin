import { useEffect, useState } from "react";
import Loader from "@/components/Layouts/Loader";
import AnimatedCard from "@/components/animated-card";
import GroupIcon from "@mui/icons-material/Group";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { BASE_URL } from "@/constants";
import { showAlert } from "@/components/showAlert";
import moment from "moment";
import { useRouter } from "next/router";
import VisibilityIcon from "@mui/icons-material/Visibility";
import StatusModel from "@/components/statusModel";
import ModelDetails from "@/components/ModelDetails";
import ModelDetailsNew from "@/components/ModelDetailsNew";
import auth from "../utils/auth";

const UserWallet = () => {
  const data = {
    affiliate_id: "",
    start_date: "",
    end_date: "",
    status: "",
  };
  const [changeData, setchangeData] = useState(data);
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [userDropdownData, setUserDropdownData] = useState([]);
  const [status, setStatus] = useState("");
  const [statusModelOpen, setStatusModelOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [modelDetails, setModelDetails] = useState(false);
  const [modelData, setModelData] = useState([]);
  const router = useRouter();

  // useEffect(() => {
  //   statusOption();
  // }, []);

  useEffect(() => {
    getWithdrawalRequest();
  }, [changeData]);

  const getWithdrawalRequest = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    console.log(
      `${BASE_URL}/withdraw/?affiliate_id=${changeData?.affiliate_id}&start_date=${changeData?.start_date}&end_date=${changeData?.end_date}&status=${changeData?.status}`
    );
    try {
      const res = await axios.get(
        `${BASE_URL}/withdraw/?affiliate_id=${changeData?.affiliate_id}&start_date=${changeData?.start_date}&end_date=${changeData?.end_date}&status=${changeData?.status}`,
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

  const deleteWithdrawal = async (id) => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const res = await axios.delete(`${BASE_URL}/withdraw/${id}`, {
        maxBodyLength: Infinity,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data, "delete response");
      showAlert(15, res?.data?.message, "success");

      setLoading(false);
    } catch (e) {
      console.error(e, "login error");
    } finally {
      setLoading(false);
    }
  };

  // const statusOption = async () => {
  //   setLoading(true);
  //   const token = localStorage.getItem("token");
  //   console.log(`${BASE_URL}/lead`);
  //   try {
  //     const res = await axios.get(`${BASE_URL}/withdraw/status/dropdown`, {
  //       maxBodyLength: Infinity,
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     console.log(res.data, "data response");
  //     if (res) {
  //       setUserDropdownData(res?.data?.data);
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

  const handleChange = (e) => {
    setchangeData({
      ...changeData,
      [e.target.name]: e.target.value,
    });
  };

  const handleStatus = (id, newStatus) => {
    setStatus(newStatus);
    setSelectedId(id); // Set the selected id
    setStatusModelOpen(true);
  };

  const submitData = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    console.log(`${BASE_URL}/kyc/updateKycStatus/${selectedId}`);
    const _data = {
      status: status,
      note: "withdrow for user",
    };
    try {
      const res = await axios.put(`${BASE_URL}/withdraw/${selectedId}`, _data, {
        maxBodyLength: Infinity,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data, "data response");
      if (res) {
        // router.push("/dashboard/dashboard");
        // setTableData(res?.data?.data);
        setStatusModelOpen(false);
        setLoading(false);
      } else {
        showAlert(15, res?.data?.message, "error");
        setStatusModelOpen(false);
      }
    } catch (error) {
      console.error(error?.response?.data?.message, "login error");
      showAlert(15, error?.response?.data?.message, "error");

      // showAlert(15, error, "error");

      setStatusModelOpen(false);
    } finally {
      setLoading(false);
      setStatusModelOpen(false);
    }
  };

  const handleVisibility = (data: any) => {
    setModelDetails(true);
    setModelData(data);
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
            <h2 className="text-lg  xs:px-5 lg:px-0">
              All withdraw request List
            </h2>
          </div>
          <div className="my-6 flex justify-between xs:flex-col xs:space-y-4 xs:px-5 lg:flex-row lg:gap-3 lg:px-0">
            <input
              id="gridEmail"
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
              id="gridState"
              className="form-select h-10 text-white-dark dark:border-none dark:bg-[#1E1611]"
              name="status"
              onChange={(e) => handleChange(e)}
              value={changeData?.status}
            >
              <option key={"all"} value={"all"}>
                All
              </option>
              {userDropdownData?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {/* 
            <select
              id="gridState"
              className="form-select h-10 text-white-dark dark:border-none dark:bg-[#1E1611]"
            >
              <option>Product</option>
              <option>...</option>
            </select>

            <input
              id="gridEmail"
              type="text"
              placeholder="Lead Id"
              className="form-input dark:border-none dark:bg-[#1E1611]"
            /> */}
          </div>

          <div>
            <div className="table-responsive mb-5  xs:px-5 lg:px-0">
              <table>
                <thead>
                  <tr>
                    <th>Request ID</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>User Name</th>
                    <th>Status Details</th>
                    <th>Status</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData?.map((data, index) => {
                    return (
                      <tr key={data?._id}>
                        <td>
                          <div className="whitespace-nowrap">{index + 1}</div>
                        </td>
                        <td>{moment(data?.date)?.format("DD/MM/YYYY")}</td>
                        <td>{data?.amount + " " + "Rs"}</td>
                        <td>{data?.username}</td>
                        <td>
                          <span
                            className={`badge whitespace-nowrap ${
                              data?.status === "in_review"
                                ? "bg-primary   "
                                : data?.status === "Pending"
                                ? "bg-secondary"
                                : data?.status === "In Progress"
                                ? "bg-success"
                                : data?.status === "Canceled"
                                ? "bg-danger"
                                : "bg-primary"
                            }`}
                          >
                            {data?.status?.toUpperCase()}
                          </span>
                        </td>

                        <td>
                          <span className={`badge whitespace-nowrap `}>
                            {/* {data.status} */}
                            <select
                              id="Type"
                              className="form-select w-32 text-white-dark dark:border-none dark:bg-[#1E1611]"
                              onChange={(e) =>
                                handleStatus(data?._id, e.target.value)
                              }
                              value={status}
                            >
                              <option key={"all"} value={"all"}>
                                Please Select
                              </option>
                              <option key={"Hold"} value={"Hold"}>
                                Hold
                              </option>
                              <option key={"InWallet"} value={"InWallet"}>
                              InWallet
                              </option>
                              {/* {userDropdownData?.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))} */}
                            </select>
                          </span>
                        </td>
                        <td className="text-center">
                          <div className="dropdown">
                            <span
                              className="badge cursor-pointer bg-primary"
                              onClick={() => {
                                router.push(
                                  {
                                    pathname: "/apps/wallet-request-details",
                                    query: {
                                      withdrawalid: data?._id,
                                      username: data?.username,
                                    },
                                  },
                                  "/wallet-request-details"
                                );
                              }}
                            >
                              DETAILS
                            </span>
                            <span
                              className="badge ml-5 cursor-pointer bg-danger"
                              onClick={() => deleteWithdrawal(data?._id)}
                            >
                              REVERT
                            </span>
                            <VisibilityIcon
                              className="ml-5"
                              onClick={() => handleVisibility(data)}
                            />
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
      {statusModelOpen && (
        <StatusModel
          setStatusModelOpen={setStatusModelOpen}
          Data={() => submitData()}
        />
      )}

      {modelDetails && (
        <ModelDetailsNew
          setModelDetails={setModelDetails}
          modelData={modelData}
        />
      )}
    </div>
  );
};

export default auth(UserWallet);
