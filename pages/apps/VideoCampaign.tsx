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
import axios from "axios";
import { showAlert } from "@/components/showAlert";

interface TableData {
    id: any;
    name: any;
    date: any; // or Date if it's a Date object
    number: any;
    status: 'completed' | 'Pending' | 'In Progress' | 'Canceled'; // or use a string if there are more statuses
}

const VideoCampaign = ({setVideoOpen, rowId}: any) => {
    const data = {
        title: "",
        link: "",
        code: "",
        short_description: ""
    }
  const [videoData, setVideoData] = useState(data);
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  console.log("row",rowId)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    getVideoData();
  },[])

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setVideoData({
        ...videoData,
        [name]: value,
    })
}

const getVideoData = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
        const res = await axios.get(`${BASE_URL}/marketing/video/${rowId}`, {
            maxBodyLength: Infinity,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (res) {
            setTableData(res?.data?.data);
            // setStatusDropdown(res?.data?.data?.status);
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
    console.log("video", videoData)
    try {
      const res = await axios.post(`${BASE_URL}/marketing/video/${rowId}`, videoData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        maxBodyLength: Infinity,
      });
      console.log(res.data, "create response");
      if (res.data) {
        // setModel(false);
        showAlert(15, res.data.message, "success");
        // setBanner({ file: "", url: "" });
        getVideoData();
      } else {
        showAlert(15, res.data.message, "error");
      }
    } catch (e) {
      console.error(e, "banner create error");
      showAlert(15, "An error occurred while submitting data", "error");
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <div>
      <Loader />
    </div>
  ) : (
<div className="m-0 p-0">
                <div className="mb-4 w-full rounded border border-white-light bg-white px-0 shadow-[4px_6px_10px_-3px_#bfc9d4] dark:border-none dark:bg-[#29221C] dark:shadow-custom sm:w-[78.5vw]">
                    <div className="p-8">
                    <div className="mb-6 mt-0 flex justify-between">
                        <h2 className="text-xl font-semibold dark:text-white">
                           Video
                        </h2>
                        <button
                            className="text-gray-500 hover:text-gray-700 dark:text-white"
                            onClick={() => setVideoOpen(false)}
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
                                <label htmlFor="title">Title</label>
                                <input id="title" type="text" placeholder="title" className="form-input dark:bg-[#261C16] dark:border-none" name="title" onChange={handleChange} value={videoData?.title}/>
                            </div>

                            <div>
                                <label htmlFor="link">Link</label>
                                <input id="link" type="text" placeholder="link" className="form-input dark:bg-[#261C16] dark:border-none" name="link" onChange={handleChange} value={videoData?.link}/>
                            </div>

                            <div>
                                <label htmlFor="code" className="block text-black mb-2 dark:text-white">Code</label>
                                <textarea id="code" placeholder="code" className="form-input w-full dark:bg-[#261C16] dark:border-none" name="code" onChange={handleChange} value={videoData?.code}/>
                            </div>

                            <div>
                                <label htmlFor="short_description" className="block text-black mb-2 dark:text-white">Description</label>
                                <textarea id="short_description" placeholder="Description" className="form-input w-full dark:bg-[#261C16] dark:border-none" name="short_description" onChange={handleChange} value={videoData?.short_description}/>
                            </div>
                            <div className="flex justify-end">
                                <button type="submit" className="btn btn-primary w-fit mt-6" onClick={() => submitData()}>
                                    Submit
                                </button>
                            </div>

                            <div className="table-responsive mb-5  xs:px-5 lg:px-0">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Sr</th>
                                        <th>Title</th>
                                        <th>Video</th>
                                        <th>Code</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableData?.map((data: TableData, index) => {
                                        return (
                                            <tr key={data?.id}>
                                                <td>
                                                    <div className="whitespace-nowrap">{index + 1}</div>
                                                </td>
                                                <td>{data?.title}</td>
                                                <td>{data?.link}</td>
                                                <td>{data?.code}</td>
                                                <td>{data?.short_description}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
  );
}

export default auth(VideoCampaign)
