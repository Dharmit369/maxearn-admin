import { useEffect, useState } from "react";
import Loader from "@/components/Layouts/Loader";
import React from "react";
import { BASE_URL } from "@/constants";
import axios from "axios";
import { showAlert } from "@/components/showAlert";

export default function Resources() {
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [replyData, setReplyOpen] = useState(false);
  const [issue, setIssue] = useState("");
  const [reply, setReply] = useState("");
  const [replyId, setReplyId] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    console.log(`${BASE_URL}/ticket/leadIssue`);
    try {
      const res = await axios.get(`${BASE_URL}/ticket/leadIssue`, {
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
  }

  const submitData = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    console.log(`${BASE_URL}/ticket/${replyId}?name=${name}`);
    const _data = {
      reply: reply,
      status: status
    }
    try {
      const res = await axios.put(`${BASE_URL}/ticket/${replyId}?name=${name}`, _data, {
        maxBodyLength: Infinity,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
}


  return loading ? (
    <div>
      <Loader />
    </div>
  ) : (
    <div>
      <div>
        {replyData === false &&
          <div className="table-responsive mb-5">
            <table>
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>UserName</th>
                  <th>Mobile No.</th>
                  <th>Title</th>
                  <th>Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {tableData?.map((data) => {
                  return (
                    <tr key={data?.id}>
                      <td>
                        <div className="whitespace-nowrap">{data?.ticket_id}</div>
                      </td>
                      <td>{data?.lead_name}</td>
                      <td>{data?.lead_mobileNo}</td>
                      <td>{data?.issue}</td>
                      <td>
                        <span
                          className={`badge whitespace-nowrap ${data?.status === 'Active'
                            ? 'bg-success'
                            : data?.status === 'DeActive'
                              ? 'bg-danger'
                              : 'bg-primary'
                            }`}
                        >
                          {data?.status?.toUpperCase()}
                        </span>
                      </td>
                      <td className="text-center">
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
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>}
      </div>

      {replyData &&

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
                  <h3 className="text-xl font-semibold dark:text-white mb-5">
                    Problem
                  </h3>
                  <span className=" text-black font-normal mt-11">{issue}</span>
                </div>
                <div>
                  <label htmlFor="yourAnswer" className="block text-black mb-2 dark:text-white">Your Answer</label>
                  <textarea id="yourAnswer" placeholder="Your Answer" className="form-input w-full dark:bg-[#261C16] dark:border-none" onChange={(e) => setReply(e.target.value)} value={reply} />
                </div>

                <div className="flex justify-end">
                  <button type="submit" className="btn btn-primary w-fit mt-6" onClick={() => submitData()}>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      }
    </div>
  );
}
