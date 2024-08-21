import { useEffect, useState, Fragment } from "react";
import Loader from "@/components/Layouts/Loader";
import React from "react";
import { BASE_URL } from "@/constants";
import axios from "axios";
import { showAlert } from "@/components/showAlert";
import auth from "../utils/auth";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ModelTicketData from "@/components/ModelTicketData";
import StatusModel from "@/components/statusModel";
import { Tab } from "@headlessui/react";
import TablePagination from "@mui/material/TablePagination";

const Resources = () => {
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [replyData, setReplyOpen] = useState(false);
  const [issue, setIssue] = useState("");
  const [reply, setReply] = useState("");
  const [replyId, setReplyId] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [ticketname, setTicketName] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dropdownValue, setDropdownValue] = useState("AllTickets");
  const [requestIdFilter, setRequestIdFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [visibility, setVisibility] = useState(false);
  const [visibilityData, setVisibilityData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [statusModelOpen, setStatusModelOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    getData(dropdownValue);
  }, [dropdownValue]);

  useEffect(() => {
    applyFilters();
  }, [requestIdFilter, statusFilter, tableData]);

  const getData = async (dropdown: any) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    console.log(`${BASE_URL}/ticket/${dropdown}`);
    try {
      const res = await axios.get(`${BASE_URL}/ticket/${dropdown}`, {
        maxBodyLength: Infinity,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data, "data response");
      if (res) {
        // router.push("/dashboard/dashboard");
        setTableData(res?.data?.data);
        // setReply(res?.data?.data?.reply)
        // setModel(false);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const applyFilters = () => {
    let data = tableData;

    if (requestIdFilter) {
      data = data.filter((item) =>
        item?.ticket_id.toLowerCase().includes(requestIdFilter.toLowerCase())
      );
    }

    if (statusFilter !== "All") {
      data = data.filter((item) => item?.status === statusFilter);
    }

    setFilteredData(data);
  };

  const updateStatus = async (id, status, name) => {
    setLoading(true);
    const token = localStorage.getItem("token");

    const data = {
      status: status,
    };
    try {
      const res = await axios.put(
        `${BASE_URL}/ticket/updateTicketStatus/${id}?name=${name}`,
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
        setLoading(false);
        showAlert(15, res?.data?.message, "success");
        getData(dropdownValue);
      } else {
        showAlert(15, res?.data?.message, "error");
        getData(dropdownValue);
      }
    } catch (e) {
      console.error(e, "login error");
    } finally {
      setLoading(false);
    }
  };

  const submitData = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    console.log(`${BASE_URL}/ticket/${replyId}?name=${name}`);
    const _data = {
      reply: reply,
      status: status,
    };
    try {
      const res = await axios.put(
        `${BASE_URL}/ticket/${replyId}?name=${name}`,
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
        setReplyOpen(false);
        setLoading(false);
        setStatusModelOpen(false);
        showAlert(15, res.data.message, "success");
      } else {
        setStatusModelOpen(false);

        showAlert(15, res?.data?.message, "error");
      }
    } catch (e) {
      setStatusModelOpen(false);

      console.error(e, "login error");
    } finally {
      setStatusModelOpen(false);

      setLoading(false);
    }
  };

  const getFilteredTabData = () => {
    if (selectedIndex === 0) {
      return filteredData?.filter((item) => item?.status === "Active");
    } else {
      return filteredData?.filter((item) => item?.status === "DeActive");
    }
  };

  const deleteData = async (id: any, issue: any) => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const res = await axios.delete(`${BASE_URL}/ticket/${id}?name=${issue}`, {
        maxBodyLength: Infinity,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res, "daaaaaaaaaaaaa");
      console.log(res.data, "edit traning response");
      if (res.data) {
        showAlert(15, res.data.message, "success");
        getData(dropdownValue);
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

  const handleDropdownChange = (e) => {
    setDropdownValue(e.target.value);
  };

  const handleRequestIdChange = (e) => {
    setRequestIdFilter(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleVisibility = (data) => {
    setVisibility(true);
    setVisibilityData(data);
  };

  const handleStatus = (id, status, name) => {
    updateStatus(id, status, name);
  };

  const paginatedData = getFilteredTabData().slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return loading ? (
    <div>
      <Loader />
    </div>
  ) : (
    <div>
      {replyData === false && (
        <div className="my-6">
          <h2 className="text-xl font-semibold dark:text-white">Ticket</h2>
        </div>
      )}
      {replyData === false && (
        <div className="mb-6 flex items-center  xs:flex-col xs:space-y-4 xs:px-5 md:space-y-0 lg:flex-row lg:gap-3 lg:px-0">
          <select
            id="filterStatus"
            className="form-select h-10 w-[120px] text-white-dark dark:border-none dark:bg-[#1E1611]"
            name="status"
            onChange={handleDropdownChange}
            value={dropdownValue}
          >
            <option key={"AllTickets"} value={"AllTickets"}>
              AllTickets
            </option>
            <option key={"withdrawalIssue"} value={"withdrawalIssue"}>
              withdrawalIssue
            </option>
            <option value={"leadIssue"}>leadIssue</option>
            <option value={"otherIssue"}>otherIssue</option>
          </select>

          <input
            id="userId"
            type="text"
            placeholder="Ticket ID"
            className="form-input mt-4 h-10 w-32 dark:border-none dark:bg-[#1E1611]"
            onChange={handleRequestIdChange}
            value={requestIdFilter}
          />
        </div>
      )}

      {replyData === false && (
        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <Tab.List className="my-3 flex flex-wrap">
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`${
                    selected ? "bg-primary text-white !outline-none" : ""
                  }
                    -mb-[1px] block rounded p-3.5 py-2 hover:bg-primary hover:text-white ltr:mr-2 rtl:ml-2`}
                >
                  Active
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`${
                    selected ? "bg-primary text-white !outline-none" : ""
                  }
                    -mb-[1px] block rounded p-3.5 py-2 hover:bg-primary hover:text-white ltr:mr-2 rtl:ml-2`}
                >
                  DeActive
                </button>
              )}
            </Tab>
          </Tab.List>

          <Tab.Panels>
            <Tab.Panel>
              <div className="relative overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                  <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th>Ticket ID</th>
                      <th>UserName</th>
                      <th>Mobile No.</th>
                      <th>Ticket Name</th>

                      <th>Title</th>
                      <th>Status</th>

                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData?.map((data) => (
                      <tr key={data?.id}>
                        <td>
                          <div className="whitespace-nowrap">
                            {data?.ticket_id}
                          </div>
                        </td>
                        <td>{data?.lead_name || "-"}</td>
                        <td>{data?.lead_mobileNo || "-"}</td>
                        <td>{data?.ticketName || "-"}</td>
                        <td>{data?.issue || "-"}</td>

                        <td>
                          <select
                            id="Type"
                            className="form-select w-32 text-white-dark dark:border-none dark:bg-[#261C16]"
                            onChange={(e) =>
                              handleStatus(
                                data?._id,
                                e.target.value,
                                data?.ticketName
                              )
                            }
                            value={data?.status}
                          >
                            <option value={"Active"}>Active</option>
                            <option value={"DeActive"}>DeActive</option>
                          </select>
                        </td>
                        <td className="text-center">
                          <div className="dropdown">
                            <VisibilityIcon
                              onClick={() => handleVisibility(data)}
                              className="mr-5"
                            />
                            <span
                              className="badge cursor-pointer bg-secondary"
                              onClick={() => {
                                setReplyOpen(true);
                                setName(data?.ticketName);
                                setReplyId(data?._id);
                                setReply(data?.reply);
                                setStatus(data?.status);
                              }}
                            >
                              REPLAY
                            </span>
                            <span
                              className="badge ml-5 cursor-pointer bg-info"
                              onClick={() => {
                                deleteData(data?._id, data?.ticketName);
                              }}
                            >
                              DELETE
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <TablePagination
                component="div"
                count={getFilteredTabData()?.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Tab.Panel>
            <Tab.Panel>
              <div className="relative overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                  <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th>Ticket ID</th>
                      <th>UserName</th>
                      <th>Mobile No.</th>
                      <th>Ticket Name</th>

                      <th>Title</th>
                      <th>Status</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData?.map((data) => (
                      <tr key={data?.id}>
                        <td>
                          <div className="whitespace-nowrap">
                            {data?.ticket_id}
                          </div>
                        </td>
                        <td>{data?.lead_name || "-"}</td>
                        <td>{data?.lead_mobileNo || "-"}</td>
                        <td>{data?.ticketName || "-"}</td>
                        <td>{data?.issue || "-"}</td>

                        <td>
                          {/* <span
                          className={`badge whitespace-nowrap ${
                            data?.status === "Active"
                              ? "bg-success"
                              : data?.status === "DeActive"
                              ? "bg-danger"
                              : "bg-primary"
                          }`}
                        >
                          {data?.status?.toUpperCase()}
                        </span> */}
                          <select
                            id="Type"
                            className="form-select w-32 text-white-dark dark:border-none dark:bg-[#261C16]"
                            onChange={(e) =>
                              handleStatus(
                                data?._id,
                                e.target.value,
                                data?.ticketName
                              )
                            }
                            value={data?.status}
                          >
                            <option value={"Active"}>Active</option>
                            <option value={"DeActive"}>DeActive</option>
                          </select>
                        </td>
                        <td className="text-center">
                          <div className="dropdown">
                            <VisibilityIcon
                              onClick={() => handleVisibility(data)}
                              className="mr-5"
                            />
                            <span
                              className="badge cursor-pointer bg-secondary"
                              onClick={() => {
                                setReplyOpen(true);
                                setName(data?.ticketName);
                                setReplyId(data?._id);
                                setReply(data?.reply);
                                setStatus(data?.status);
                              }}
                            >
                              REPLAY
                            </span>
                            <span
                              className="badge ml-5 cursor-pointer bg-info"
                              onClick={() => {
                                deleteData(data?._id, data?.ticketName);
                              }}
                            >
                              DELETE
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <TablePagination
                component="div"
                count={getFilteredTabData().length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      )}

      {replyData && (
        <div className="m-0 p-0">
          <div className="mb-4 w-full rounded border border-white-light bg-white px-0 shadow-[4px_6px_10px_-3px_#bfc9d4] dark:border-none dark:bg-[#29221C] dark:shadow-custom sm:w-[78.5vw]">
            <div className="p-8">
              <div className="my-6 flex justify-between">
                <h2 className="text-xl font-semibold dark:text-white">
                  Request
                </h2>
                <button
                  className="text-gray-500 hover:text-gray-700 dark:text-white"
                  onClick={() => setReplyOpen(false)}
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
                <div className="my-6">
                  <h3 className="mb-5 text-xl font-semibold dark:text-white">
                    Problem
                  </h3>
                  <span className=" mt-11 font-normal text-black">{issue}</span>
                </div>
                <div>
                  <label
                    htmlFor="yourAnswer"
                    className="mb-2 block text-black dark:text-white"
                  >
                    Your Answer
                  </label>
                  <textarea
                    id="yourAnswer"
                    placeholder="Your Answer"
                    className="form-input w-full dark:border-none dark:bg-[#261C16]"
                    onChange={(e) => setReply(e.target.value)}
                    value={reply}
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary mt-6 w-fit"
                    onClick={() => submitData()}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {visibility && (
        <ModelTicketData
          setVisibility={setVisibility}
          visibilityData={visibilityData}
        />
      )}
    </div>
  );
};

export default auth(Resources);
