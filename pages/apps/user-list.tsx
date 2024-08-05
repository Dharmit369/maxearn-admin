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
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import InfoIcon from "@mui/icons-material/Info";
import LockIcon from "@mui/icons-material/Lock";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ModelPaymentDetails from "@/components/ModelPaymentDetails";
import AnimatedCard from "@/components/animated-card";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import GroupIcon from "@mui/icons-material/Group";
import axios from "axios";
import { showAlert } from "@/components/showAlert";
import { Tab } from "@headlessui/react";
import IdentityDetail from "@/pages/apps/IdentityDetail";
import User from "@/pages/apps/user-userList";
import BankDetails from "@/pages/apps/BankDetails";
import AddTransaction from "@/pages/apps/AddTransaction";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import auth from "../utils/auth";

const UserList = () => {
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [status, setStatus] = useState(false);
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState("");
  const [infoData, setInfoData] = useState([]);

  const handleEdit = (data: any) => {
    setEdit(true);
    setEditId(data);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    getUserList();
  }, [status, name, userId, mobileNo, email]);

  const getUserList = async () => {
    // setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get(
        `${BASE_URL}/user?status=${status}&email=${email}&name=${name}&user_id=${userId}&mobile_num=${mobileNo}`,
        {
          maxBodyLength: Infinity,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data, "data response");

      setTableData(res?.data?.data);
      //   setLoading(false);
    } catch (e) {
      console.error(e, "Total Lead Data");
    } finally {
      //   setLoading(false);
    }
  };

  const deleteData = async (id: any) => {
    console.log(id, "asssssssssss");
    const token = localStorage.getItem("token");
    console.log(`${BASE_URL}/banner/${id}`);
    try {
      const res = await axios.delete(`${BASE_URL}/user/${id}`, {
        maxBodyLength: Infinity,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data, "delete banner response");
      if (res) {
        setTableData(res?.data?.data);
        showAlert(15, res.data.message, "success");
        getUserList();
      } else {
        showAlert(15, res?.data?.message, "error");
      }
    } catch (e) {
      console.error(e, "delete banner error");
    } finally {
      setLoading(false);
    }
  };

  const lockData = async (datas: any) => {
    // console.log(id, "asssssssssss");
    const token = localStorage.getItem("token");
    console.log("iddddd:", datas?._id);
    // console.log(`${BASE_URL}/banner/${id}`);
    const data = {
      username: datas.username,
      birth_date: datas.birth_date,
      state: datas.state,
      pincode: datas.pincode,
      socialMediaAccount: datas.socialMediaAccount,
      password: datas.password,
      referralActive: `${datas.referralActive}`,
      isBlocked: "true",
    };
    try {
      const res = await axios.put(`${BASE_URL}/user/${datas?._id}`, data, {
        maxBodyLength: Infinity,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data, "delete banner response");
      if (res) {
        // setTableData(res?.data?.data);
        showAlert(15, res.data.message, "success");
        getUserList();
      } else {
        showAlert(15, res?.data?.message, "error");
      }
    } catch (e) {
      console.error(e, "delete banner error");
    } finally {
      setLoading(false);
    }
  };

  const handleIcon = (data: any) => {
    setInfoData(data)
    setModal(true)
  }

  console.log("edit", edit);

  return loading ? (
    <div>
      <Loader />
    </div>
  ) : (
    <div>
     
      {edit === false && (
        <div className="relative w-full cursor-pointer items-center overflow-hidden border-none  bg-white ring-1 ring-gray-900/5 dark:bg-[#261C16] dark:ring-gray-700 sm:rounded-lg sm:px-5 ">
           <div className="my-6">
              <h2 className="text-xl font-semibold dark:text-white">
                User List
              </h2>
            </div>
          <div className="flex justify-between xs:flex-col xs:space-y-4 xs:px-5 lg:flex-row lg:gap-3 lg:px-0">
            <input
              id="userId"
              type="text"
              placeholder="Name"
              className="form-input mt-4 h-10 dark:border-none dark:bg-[#1E1611]"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />

            <input
              id="userId"
              type="text"
              placeholder="User Id"
              className="form-input mt-4 h-10 dark:border-none dark:bg-[#1E1611]"
              onChange={(e) => setUserId(e.target.value)}
              value={userId}
            />

            <input
              id="mobileNo"
              type="number"
              placeholder="Mobile No."
              className="form-input h-10 dark:border-none dark:bg-[#1E1611]"
              onChange={(e) => setMobileNo(e.target.value)}
              value={mobileNo}
            />

            <input
              id="mobileNo"
              type="text"
              placeholder="Email"
              className="form-input h-10 dark:border-none dark:bg-[#1E1611]"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            <select
              id="product"
              className="form-select h-10 text-white-dark dark:border-none dark:bg-[#1E1611]"
              onChange={(e) => setStatus(e.target.value)}
              value={status}
            >
              <option value={"true"}>True</option>
              <option value={"false"}>False</option>
            </select>
          </div>

          <div className="my-6">
            <div className="table-responsive mb-5 xs:px-5 lg:px-0">
              <table>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Mobile No.</th>
                    <th>Reffered By</th>
                    <th>Status</th>
                    <th>Referral Active</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData?.map((data) => {
                    return (
                      <tr key={data.id}>
                        <td>
                          <div
                            style={{
                              width: "50px",
                              height: "50px",
                              overflow: "hidden",
                              borderRadius: "50%",
                              position: "relative",
                            }}
                          >
                            <img
                              src={data?.profile_picture}
                              alt={data?.profile_picture}
                            />
                          </div>
                        </td>
                        <td>
                          <div className="whitespace-nowrap">
                            {data?.username || "-"}
                          </div>
                        </td>
                        <td>{data?.mobile_num || "-"}</td>
                        <td>{data?.reference_user || "-"}</td>

                        <td>
                          <span
                            className={`badge whitespace-nowrap ${data?.isBlocked === false
                                ? "bg-danger"
                                : "bg-primary"
                              }`}
                          >
                            {data?.isBlocked.toString() || "-"}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`badge whitespace-nowrap ${data?.referralActive === false
                                ? "bg-danger"
                                : "bg-primary"
                              }`}
                          >
                            {data?.referralActive.toString() || "-"}
                          </span>
                        </td>
                        <td className="text-center">
                          <div className="flex w-full justify-between">
                            <ModeEditIcon onClick={() => handleEdit(data)} />
                            <InfoIcon onClick={() => handleIcon(data)} />
                            <DeleteIcon onClick={() => deleteData(data?._id)} />
                            <LockIcon onClick={() => lockData(data)} />
                            {/* <ExitToAppIcon /> */}
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

      {modal && <ModelPaymentDetails modal={modal} setModal={setModal} infoData={infoData}/>}

      {edit && (
        <div className="m-0 p-0">
          <div className="mb-4 w-full rounded border border-white-light bg-white px-0 shadow-[4px_6px_10px_-3px_#bfc9d4] dark:border-none dark:bg-[#29221C] dark:shadow-custom sm:w-[78.5vw]">
            <div className="mx-5 my-6 flex justify-between">
              <h2 className="text-xl font-semibold dark:text-white">
                Add User
              </h2>
              <button
                className="text-gray-500 hover:text-gray-700 dark:text-white"
                onClick={() => setEdit(false)}
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
            <Tab.Group>
              <Tab.List className="mt-5 flex flex-wrap dark:mt-5">
                <Tab as={Fragment}>
                  {({ selected }: any) => (
                    <button
                      className={`${selected
                          ? "bg-primary text-white !outline-none dark:bg-[#FE6C00]"
                          : ""
                        }
        -mb-[1px] ml-5 block rounded p-3.5 py-2 hover:bg-primary hover:text-white dark:hover:bg-[#FE6C00]`}
                    >
                      User
                    </button>
                  )}
                </Tab>
              </Tab.List>

              <Tab.Panels>
                <Tab.Panel>
                  <User
                    setEdit={setEdit}
                    getUserList={getUserList}
                    editId={editId}
                    model={false}
                    
                  />
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>

            <div className="flex justify-between px-4 py-7 xs:flex-col lg:flex-row "></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default auth(UserList);
