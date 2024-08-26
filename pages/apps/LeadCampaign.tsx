import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { BASE_URL, Images } from "@/constants";
import Link from "next/link";
import Loader from "@/components/Layouts/Loader";
import { ReactSortable } from "react-sortablejs";
import Select from "react-select";
import { Tab } from "@headlessui/react";
import auth from "../utils/auth";
import axios from "axios";
import { showAlert } from "@/components/showAlert";
import moment from "moment";
import TablePagination from "@mui/material/TablePagination";

interface TableData {
  id: any;
  name: any;
  date: any; // or Date if it's a Date object
  number: any;
  status: "completed" | "Pending" | "In Progress" | "Canceled"; // or use a string if there are more statuses
}

const LeadCampaign = ({ setLeadOpen, rowId, campname, campprice }: any) => {
  const data = {
    name: "",
    email: "",
    phone_num: "",
    status: "",
    amount: "",
    note: "",
  };

  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [userDropdownData, setUserDropdownData] = useState([]);
  const [leadEditOpen, setLeadEditOpen] = useState(false);
  const [changeData, setChangeData] = useState(data);
  const [user, setUser] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState([]);
  const [changeStatus, setChangeStatus] = useState("");
  const [linkSharedCount, setLinkSharedCount] = useState(0);
  const [applicationRejectedCount, setApplicationRejectedCount] = useState(0);
  const [paidLead, setPaidLead] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedFile, setSelectedFile] = useState(null); // State for selected file

  const [searchTerm, setSearchTerm] = useState(""); // Search term state

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  console.log("user", user);

  useEffect(() => {
    userOption();
  }, []);

  useEffect(() => {
    getLead();
  }, [rowId, user, startDate, endDate, changeStatus]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadFile = async () => {
    if (!selectedFile) {
      showAlert(15, "Please select a file first", "error");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/lead/uploadData`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    };

    try {
      const response = await axios.request(config);
      showAlert(15, response?.data?.message, "success");
      getLead();
      console.log(JSON.stringify(response.data));
    } catch (error) {
      console.error("Error uploading file:", error);
      showAlert(15, "An error occurred while uploading the file", "error");
    }
  };

  const userOption = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    console.log(`${BASE_URL}/lead`);
    try {
      const res = await axios.get(`${BASE_URL}/lead/drop-down`, {
        maxBodyLength: Infinity,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data, "data response");
      if (res) {
        const _data = res?.data?.data?.user?.map((e: any) => ({
          value: e.affiliate_id,
          label: e.email,
        }));
        setUserDropdownData(_data);
        console.log(
          res?.data?.data?.status,
          "res?.data?.data?.statusres?.data?.data?.statusres?.data?.data?.status"
        );
        setStatus(res?.data?.data?.status);
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

  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const filteredTableData = tableData.filter((item) =>
    item?.lead_id.toString()?.includes(searchTerm)
  );

  const getLead = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    console.log(`${BASE_URL}/lead`);
    try {
      const res = await axios.get(
        `${BASE_URL}/lead/filter?user_id=${user}&start_date=${startDate}&end_date=${endDate}&status=${changeStatus}&campaign_id=${rowId}`,
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
        const applicationRejectedCount = res?.data?.data?.filter(
          (item) => item?.status === "ApplicationRejected"
        ).length;

        setApplicationRejectedCount(applicationRejectedCount);
        const linkSharedCount = res?.data?.data?.filter(
          (item) => item?.status === "LinkShared"
        ).length;
        setLinkSharedCount(linkSharedCount);
        const PaidlinkSharedCount = res?.data?.data?.filter(
          (item) => item?.status === "SaleCompleted"
        ).length;
        const PaidlinkSharedCount2 = res?.data?.data?.filter(
          (item) => item?.status === "PartialSaleCompleted"
        ).length;
        // AllSaleCompleted
        const PaidlinkSharedCount3 = res?.data?.data?.filter(
          (item) => item?.status === "AllSaleCompleted"
        ).length;
        setPaidLead(
          PaidlinkSharedCount + PaidlinkSharedCount2 + PaidlinkSharedCount3
        );
        setLoading(false);
      } else {
        setTableData([]);
        showAlert(15, res?.data?.message, "error");
      }
    } catch (e) {
      console.error(e, "login error");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setChangeData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const updateLead = async (id: any) => {
    console.log(id, "lead_idlead_idlead_idlead_id");
    setLoading(true);
    const token = localStorage.getItem("token");
    const _data = {
      name: changeData?.name,
      email: changeData?.email,
      phone_num: changeData?.phone_num,
      status: changeData?.status,
      note: changeData?.note,
      campaign_id: id,
      pincode: changeData?.pincode,
    };

    if (
      changeData?.status === "SaleCompleted" ||
      changeData?.status === "PartialSaleCompleted" ||
      changeData?.status === "AllSaleCompleted"
    ) {
      _data.amount = parseInt(changeData?.amount);
    }
    console.log(_data, "dadadsssdsasd");

    try {
      const res = await axios.put(
        `${BASE_URL}/lead/${changeData?._id}`,
        _data,
        {
          maxBodyLength: Infinity,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res, "daaaaaaaaaaaaa");
      console.log(res.data, "edit traning response");
      if (res.data) {
        setLoading(false);
        setLeadEditOpen(false);
        showAlert(15, res.data.message, "success");
        getLead();
      } else {
        showAlert(15, res.data.message, "error");
      }
    } catch (e) {
      console.error(e, "edit traning create error");
      showAlert(15, "An error occurred while submitting data", "error");
    } finally {
      setLoading(false);
    }
  };

  const exportTableData = () => {
    const headers = [
      "ID",
      "Lead ID",
      "Campaign Name",
      "Campaign Id",
      "Created By",
      "Date",
      "Email",
      "Phone number",
      "Status",
      "Note",
    ];

    const rows = tableData?.map((data, index) => [
      index + 1,
      data?.lead_id,
      campname,
      data?.campaign_id,
      data?.name,
      data?.created_timestamp,
      data?.email,
      data?.phone_num,
      data?.status,
      data?.note,
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Lead-List.csv");
    document.body.appendChild(link);

    link.click();
  };

  const deleteLead = async (id: any) => {
    setLoading(true);
    const token = localStorage.getItem("token");

    const data = {
      ids: [`${id}`],
    };
    try {
      const res = await axios.delete(`${BASE_URL}/lead/`, {
        data: data, // data should be passed as part of the config object
        maxBodyLength: Infinity,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res, "daaaaaaaaaaaaa");
      console.log(res.data, "edit traning response");
      if (res.data) {
        showAlert(15, res.data.message, "success");
        getLead();
      } else {
        showAlert(15, res.data.message, "error");
      }
    } catch (e) {
      console.error(e, "edit traning create error");
      showAlert(15, "An error occurred while submitting data", "error");
    } finally {
      setLoading(false);
    }
  };

  const editClick = async (data: any) => {
    setLeadEditOpen(true);
    setChangeData(data);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = filteredTableData?.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return loading ? (
    <div>
      <Loader />
    </div>
  ) : (
    <div>
      {leadEditOpen === false && (
        <div className="group relative w-full cursor-pointer items-center overflow-hidden border-none  bg-white ring-1 ring-gray-900/5 dark:bg-[#261C16] dark:ring-gray-700 sm:rounded-lg sm:px-5 ">
          <div className="my-6 flex justify-between">
            <h2 className="text-xl font-semibold dark:text-white">
              {`${campname}` + " " + "(" + `${campprice}` + ")"}
            </h2>
            <h3 className="text-xl font-semibold dark:text-white">Lead List</h3>

            <button
              className="text-gray-500 hover:text-gray-700 dark:text-white"
              onClick={() => {
                setLeadOpen(false);
                setChangeData(data);
              }}
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
          <div className="my-6 flex justify-between xs:flex-col xs:space-y-4 xs:px-5 lg:flex-row lg:gap-3 lg:px-0">
            <div className="w-full">
              <label htmlFor="User" className="mt-4">
                Name
              </label>

              <input
                id="userId"
                type="text"
                placeholder="Created By Name"
                className="m  form-input h-10  dark:border-none dark:bg-[#1E1611]"
                name="affiliate_id"
                onChange={handleSearchChange}
                value={searchTerm}
              />
            </div>
            <div className="w-full">
              <label htmlFor="User" className="mt-">
                Mobile No
              </label>

              <input
                id="userId"
                type="text"
                placeholder="Mobile No"
                className="m  form-input h-10  dark:border-none dark:bg-[#1E1611]"
                name="affiliate_id"
                onChange={handleSearchChange}
                value={searchTerm}
              />
            </div>

            <div className="w-full">
              <label htmlFor="startDate">Start Date</label>
              <input
                id="startDate"
                type="date"
                placeholder="Start Date"
                className="form-input h-10 dark:border-none dark:bg-[#1E1611]"
                onChange={(e) => setStartDate(e.target.value)}
                value={startDate}
              />
            </div>
            <div className="w-full">
              <label htmlFor="endDate">End Date</label>
              <input
                id="endDate"
                type="date"
                placeholder="End Date"
                className="form-input h-10 dark:border-none dark:bg-[#1E1611]"
                onChange={(e) => setEndDate(e.target.value)}
                value={endDate}
              />
            </div>
            <div className="w-full">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                className="form-select h-10 text-white-dark dark:border-none dark:bg-[#1E1611]"
                onChange={(e) => setChangeStatus(e.target.value)}
                value={changeStatus}
              >
                <option key={"all"} value={"all"}>
                  All
                </option>
                {status?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex xs:px-5 lg:px-0 ">
              <button
                type="submit"
                className="btn btn-primary my-6"
                onClick={exportTableData}
              >
                Export
              </button>
            </div>
          </div>

          <div className="my-6 flex flex-col items-start">
            <label
              htmlFor="fileUpload"
              className="text-xl font-semibold dark:text-white"
            >
              Upload Excel File
            </label>
            <input
              type="file"
              id="fileUpload"
              onChange={handleFileChange}
              className="my-3 text-gray-700 dark:text-white"
            />
            <button onClick={uploadFile} className="btn btn-primary my-2">
              Upload File
            </button>
          </div>

          <div>
            <div className="table-responsive mb-5  xs:px-5 lg:px-0">
              <div className="my-4 flex w-full justify-between text-center  xs:flex-col lg:flex-row lg:gap-3">
                <div className="w-full">
                  <label>Total Link Shared:</label>
                  <p>{linkSharedCount}</p>
                </div>
                <div className="w-full">
                  <label>Total Paid Lead:</label>
                  <p>{paidLead}</p>
                </div>
                <div className="w-full">
                  <label>Total Application Rejected:</label>
                  <p>{applicationRejectedCount}</p>
                </div>
              </div>
              <input
                id="userId"
                type="text"
                placeholder="Lead Id"
                className="form-input my-4 mt-4 h-10 w-64 dark:border-none dark:bg-[#1E1611]"
                name="affiliate_id"
                onChange={handleSearchChange}
                value={searchTerm}
              />

              <table>
                <thead>
                  <tr>
                    <th>Sr No</th>
                    <th>Lead ID</th>
                    <th>Created By</th>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Email</th>
                    <th>Phone number</th>
                    <th>Status</th>
                    <th>Note</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData?.map((data: TableData, index) => {
                    return (
                      <tr key={data?.id}>
                        <td>{index + 1}</td>
                        <td>{data?.lead_id}</td>
                        <td>{data?.name}</td>
                        <td>{data?.name}</td>
                        <td>
                          {moment(data?.created_timestamp)?.format(
                            "DD/MM/YYYY"
                          )}
                        </td>
                        <td>
                          <span>{data?.email}</span>
                        </td>
                        <td>
                          <span>{data?.phone_num}</span>
                        </td>
                        <td>
                          <span
                            className={`badge whitespace-nowrap ${
                              data?.status === "PartialSaleCompleted"
                                ? "bg-success"
                                : data?.status === "SaleCompleted"
                                ? "bg-success"
                                : data?.status === "AllSaleCompleted"
                                ? "bg-success"
                                : data?.status === "ApplicationRejected"
                                ? "bg-danger"
                                : "bg-primary"
                            }`}
                          >
                            {data.status}
                          </span>
                        </td>
                        <td>
                          <span>{data?.note || "-"}</span>
                        </td>

                        <td className="text-center">
                          <div className="flex items-center justify-center space-x-4">
                            <img
                              onClick={() => {
                                editClick(data);
                              }}
                              src={Images?.EDIT}
                              alt=""
                              className="h-[25px] w-[25px]"
                            />
                            <img
                              onClick={() => {
                                deleteLead(data?._id);
                              }}
                              src={Images?.DELETE}
                              alt=""
                              className="h-[25px] w-[25px]"
                            />
                            {/* <span
                              className="badge ml-5 cursor-pointer bg-danger"
                              onClick={() => deleteLead(data?._id)}
                            >
                              Delete
                            </span> */}
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
      )}

      {leadEditOpen && (
        <div className="m-0 p-0">
          <div className="mb-4 w-full rounded border border-white-light bg-white px-0 shadow-[4px_6px_10px_-3px_#bfc9d4] dark:border-none dark:bg-[#29221C] dark:shadow-custom sm:w-[78.5vw]">
            <div className="p-8">
              <div className="my-6 flex justify-between">
                <h2 className="text-xl font-semibold dark:text-white">
                  Edit Lead
                </h2>
                <button
                  className="text-gray-500 hover:text-gray-700 dark:text-white"
                  onClick={() => setLeadEditOpen(false)}
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
              <form className="space-y-5">
                <div>
                  <label htmlFor="Name">Name</label>
                  <input
                    id="Name"
                    type="text"
                    placeholder="Name"
                    className="form-input dark:border-none dark:bg-[#261C16]"
                    name="name"
                    onChange={handleChange}
                    value={changeData?.name}
                  />
                </div>

                <div>
                  <label htmlFor="Email">Email</label>
                  <input
                    id="Email"
                    type="email"
                    placeholder="Email"
                    className="form-input dark:border-none dark:bg-[#261C16]"
                    name="email"
                    onChange={handleChange}
                    value={changeData?.email}
                  />
                </div>

                <div>
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    placeholder="Phone Number"
                    className="form-input dark:border-none dark:bg-[#261C16]"
                    name="phone_num"
                    onChange={handleChange}
                    value={changeData?.phone_num}
                  />
                </div>

                <div>
                  <label htmlFor="Status">Status</label>
                  <select
                    id="Status"
                    className="form-select text-white-dark dark:border-none dark:bg-[#261C16]"
                    name="status"
                    onChange={handleChange}
                    value={changeData?.status}
                  >
                    <option key={"all"} value={"all"}>
                      All
                    </option>
                    {status?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {(changeData?.status === "SaleCompleted" ||
                  changeData?.status === "PartialSaleCompleted" ||
                  changeData?.status === "AllSaleCompleted") && (
                  <div>
                    <label htmlFor="amount">Amount</label>
                    <input
                      id="amount"
                      type="tel"
                      placeholder="amount"
                      className="form-input dark:border-none dark:bg-[#261C16]"
                      name="amount"
                      onChange={handleChange}
                      value={changeData?.amount}
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="commnet">Remark</label>
                  <input
                    id="note"
                    placeholder="note"
                    className="form-input dark:border-none dark:bg-[#261C16]"
                    name="note"
                    onChange={handleChange}
                    value={changeData?.note}
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary mt-6 w-fit"
                    onClick={() => updateLead(rowId)}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default auth(LeadCampaign);
