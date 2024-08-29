import { useEffect, useState } from "react";
import Loader from "@/components/Layouts/Loader";
import React from "react";
import { BASE_URL } from "@/constants";
import axios from "axios";
import { showAlert } from "@/components/showAlert";
import moment from "moment";
import auth from "../utils/auth";
import TablePagination from "@mui/material/TablePagination";

const Tds = () => {
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [replyData, setReplyOpen] = useState(false);
  const [issue, setIssue] = useState("");
  const [reply, setReply] = useState("");
  const [replyId, setReplyId] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    filterData();
  }, [fromDate, toDate, tableData]);

  const filterData = () => {
    if (!fromDate && !toDate) {
      setFilteredData(tableData);
      return;
    }
    const filtered = tableData.filter((data) => {
      const date = moment(data.date, "YYYY-MM-DD");
      const from = fromDate ? moment(fromDate, "YYYY-MM-DD") : null;
      const to = toDate ? moment(toDate, "YYYY-MM-DD") : null;
      if (from && to) {
        return date.isBetween(from, to, null, "[]");
      } else if (from) {
        return date.isSameOrAfter(from);
      } else if (to) {
        return date.isSameOrBefore(to);
      }
      return true;
    });
    setFilteredData(filtered);
  };

  const getData = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    console.log(`${BASE_URL}/tds`);
    try {
      const res = await axios.get(`${BASE_URL}/tds`, {
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
        showAlert(15, res.data.message, "success");
      } else {
        showAlert(15, res?.data?.message, "error");
      }
    } catch (e) {
      console.error(e, "login error");
    } finally {
      setLoading(false);
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
        getData();
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

  const exportCSV = () => {
    const headers = ["Sr No", "DATE", "PAN NO", "SECTION", "TDS", "TDS AMOUNT"];

    const rows = filteredData?.map((data, index) => [
      index + 1,
      data?.date,
      data?.pan_card_number,
      "194C",
      data?.amount,
      data?.withdraw_amount,
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "tds.csv");
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

  const paginatedData = filteredData?.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return loading ? (
    <div>
      <Loader />
    </div>
  ) : (
    <div>
      <div className="my-6">
        <h2 className="text-xl font-semibold dark:text-white">TDS</h2>
      </div>
      <div className="mb-6 flex flex-col items-center   lg:flex-row lg:gap-3">
        <div className="flex w-64 flex-col ">
          <label htmlFor="from_date" className="mb-1">
            From Date
          </label>
          <input
            id="from_date"
            type="date"
            placeholder="from Date"
            className="form-input mt-1 h-10 w-64 dark:border-none dark:bg-[#1E1611]"
            name="from_date"
            onChange={(e) => setFromDate(e.target.value)}
            value={fromDate}
          />
        </div>
        <div className="mt-4 flex w-64 flex-col lg:mt-0 ">
          <label htmlFor="to_date" className="mb-1">
            To Date
          </label>
          <input
            id="to_date"
            type="date"
            placeholder="to date"
            className="form-input mt-1 h-10 w-64 dark:border-none dark:bg-[#1E1611]"
            name="to_date"
            onChange={(e) => setToDate(e.target.value)}
            value={toDate}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary mb-[-4.5vh]  h-9 w-fit"
          onClick={exportCSV}
        >
          Export
        </button>
      </div>

      <div>
        {replyData === false && (
          <div className="table-responsive mb-5 xs:px-5 lg:px-0">
            <table>
              <thead>
                <tr>
                  <th>name</th>
                  <th>mobile No</th>
                  <th>email Id</th>
                  <th>pancard No</th>
                  <th>TDS amount</th>
                  <th>Withdraw amount</th>
                  <th>date</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData?.map((data) => {
                  return (
                    <tr key={data?.id}>
                      <td>{data?.user_name || "-"}</td>
                      <td>{data?.mobile_num || "-"}</td>
                      <td>{data?.email || "-"}</td>
                      <td>{data?.pan_card_number || "-"}</td>
                      <td>{data?.amount || "-"}</td>
                      <td>{data?.withdraw_amount || "-"}</td>
                      <td>{moment(data?.date || "-")?.format("DD/MM/YYYY")}</td>

                      {/* <td className="text-center">
                        <div className="dropdown">
                          <span className="badge bg-secondary cursor-pointer" onClick={() => {
                            setReplyOpen(true);
                            setName(data?.ticketName);
                            setReplyId(data?._id);
                            setReply(data?.reply);
                            setStatus(data?.status);
                          }}>REPLAY</span>
                          <span className="badge bg-info ml-5 cursor-pointer" onClick={() => {
                            deleteData(data?._id, data?.ticketName)
                          }}>DELETE</span>
                        </div>
                      </td> */}
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
        )}
      </div>

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
    </div>
  );
};

export default auth(Tds);
