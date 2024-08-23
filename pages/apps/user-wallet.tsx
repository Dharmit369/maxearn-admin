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
import ModelDetails from "@/components/ModelDetails";
import auth from "../utils/auth";
import TablePagination from "@mui/material/TablePagination";

const UserWallet = () => {
  const data = {
    affiliate_id: "",
    start_date: "",
    end_date: "",
    status: "",
  };

  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [campagin, setCampagin] = useState([]);
  const [statusChange, setStatusChange] = useState("");

  const [changeData, setchangeData] = useState(data);
  const [modelDetails, setModelDetails] = useState(false);
  const [modelData, setModelData] = useState([]);
  const [dataInfo, setDataInfo] = useState([]);
  const [typeData, setTypeData] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    filterData();
  }, [typeData]);

  const filterData = () => {
    if (typeData === "Reffral") {
      const filt = dataInfo?.filter((itm) => itm?.type === "Reffral");
      if (filt) {
        setTableData(filt);
      }
    } else {
      if (typeData === "all") {
        const filt = dataInfo;
        if (filt) {
          setTableData(filt);
        }
      } else {
        const filt = dataInfo?.filter((itm) => itm?.type === "Lead");
        if (filt) {
          setTableData(filt);
        }
      }
    }
  };

  useEffect(() => {
    getWallet();
  }, [changeData, statusChange]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    // console.log(`${BASE_URL}/banner`);
    try {
      const res = await axios.get(`${BASE_URL}/marketing/campaign`, {
        maxBodyLength: Infinity,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //   console.log(res.data, "data response");
      if (res) {
        // router.push("/dashboard/dashboard");
        console.log(res?.data?.data, "asasasas");
        setCampagin(res?.data?.data);

        // setAddCategory(false);
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

  const handleDropdown = (text: any, e: any) => {
    setStatusChange(e.target.value);
  };

  const handleVisibility = (data: any) => {
    setModelDetails(true);
    setModelData(data);
  };

  const getWallet = async () => {
    // setLoading(true);
    const token = localStorage.getItem("token");
    console.log(`${BASE_URL}/withdraw`);
    try {
      const res = await axios.get(
        `${BASE_URL}/wallet/?affiliate_id=${changeData?.affiliate_id}&start_date=${changeData?.start_date}&end_date=${changeData?.end_date}&status=${changeData?.status}&campaign_id=${statusChange}`,
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
        setDataInfo(res?.data?.data);
        // setLoading(false);
      } else {
        showAlert(15, res?.data?.message, "error");
      }
    } catch (e) {
      console.error(e, "login error");
    } finally {
      // setLoading(false);
    }
  };

  const deleteData = async (id: any) => {
    const token = localStorage.getItem("token");
    console.log(`${BASE_URL}/marketing/campaign/${id}`);
    try {
      const res = await axios.delete(`${BASE_URL}/wallet/${id}`, {
        maxBodyLength: Infinity,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data, "delete banner response");
      if (res) {
        setTableData(res?.data?.data);
        // setCreateCampaigns(false);
        showAlert(15, res.data.message, "success");
        getWallet();
      } else {
        showAlert(15, res?.data?.message, "error");
      }
    } catch (e) {
      console.error(e, "delete banner error");
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
      "User Name",
      "Mobile No",
      "Date",
      "Payment Type",
      "Amount",
      "Paid For",
      "Amount Status",
    ];

    const rows = tableData?.map((data) => [
      data?.lead_id,
      data?.user_name,
      data?.user_phone,
      moment(data?.date)?.format("DD/MM/YYYY"),
      data?.type,
      data?.amount,
      data?.type === "Reffral"
        ? "-"
        : `${data?.campaign_name} [${data?.advertize_payout} INR]`,
      data?.status,
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = tableData?.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

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
              placeholder="affiliate id"
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
              id="campgain"
              className="form-select h-10 text-white-dark dark:border-none dark:bg-[#1E1611]"
              onChange={(e) => handleDropdown("status", e)}
              value={statusChange}
            >
              <option value={""}>{"All"}</option>
              {campagin?.map((itm) => (
                <option value={itm?._id}>{itm?.name}</option>
              ))}
            </select>
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

            <select
              id="filterStatus"
              className="form-select h-10 text-white-dark dark:border-none dark:bg-[#1E1611]"
              name="type"
              onChange={(e) => setTypeData(e.target.value)}
              value={typeData}
            >
              <option key={"all"} value={"all"}>
                All
              </option>
              <option value={"Reffral"}>Reffral</option>
              <option value={"Lead"}>Lead</option>
            </select>
          </div>

          <div className="flex flex-row items-center xs:px-5 lg:px-0">
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
                    <th>Lead Name</th>
                    <th>User Name</th>
                    <th>Mobile No</th>
                    <th>Date</th>
                    {/* <th>Campaign</th> */}
                    <th>Payment Type</th>
                    <th>Amount</th>
                    {/* <th>Type</th> */}
                    <th>Paid For</th>
                    <th>Amount Status</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData?.map((data, index) => {
                    return (
                      <tr key={data?._id}>
                        <td>{data?.lead_id}</td>
                        <td>{data?.lead_name}</td>
                        <td>{data?.user_name}</td>
                        <td>{data?.user_phone}</td>

                        <td>
                          <div className="whitespace-nowrap">
                            {moment(data?.date)?.format("DD/MM/YYYY")}
                          </div>
                        </td>
                        {/* <td>{data.campaign_name}</td> */}
                        <td>{data.type}</td>

                        <td>{data.amount}</td>
                        {/* <td>{data.type}</td> */}
                        <td>
                          <div className=" pt-4">
                            <p className="font-medium text-gray-700">
                              <p className="font-medium text-gray-700">
                                {data?.type === "Reffral"
                                  ? "-"
                                  : `${data?.campaign_name} [${data?.advertize_payout} INR]`}
                              </p>
                            </p>
                          </div>
                          <div className="mt-4">
                            <p className="text-sm font-semibold text-gray-500">
                              {data?.type === "Lead" && "Lead Info"}
                            </p>
                            <p className="mt-2 text-gray-700">
                              {data?.type === "Lead" && "Phone:"}{" "}
                              <span className="font-medium">
                                {data?.type === "Lead" && `${data?.lead_phone}`}
                              </span>
                            </p>
                            <p className="mt-1 text-gray-700">
                              {data?.type === "Lead" && "Email:"}{" "}
                              <span className="font-medium">
                                {data?.type === "Lead" && `${data?.lead_email}`}
                              </span>
                            </p>
                          </div>
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
                          <div className="flex items-center justify-center space-x-4">
                            {/* <DeleteIcon onClick={() => deleteData(data?._id)} /> */}
                            <img
                              onClick={() => deleteData(data?._id)}
                              src={Images?.DELETE}
                              alt=""
                              className="h-[25px] w-[25px]"
                            />
                            <img
                              onClick={() => handleVisibility(data)}
                              src={Images?.INFO}
                              alt=""
                              className="h-[25px] w-[25px]"
                            />
                            {/* <VisibilityIcon
                              onClick={() => handleVisibility(data)}
                            /> */}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={tableData?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>
          </div>
        </div>
      </div>

      {modelDetails && (
        <ModelDetails setModelDetails={setModelDetails} modelData={modelData} />
      )}
    </div>
  );
};

export default auth(UserWallet);
