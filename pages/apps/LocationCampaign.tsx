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

const LocationCampaign = ({setLocationOpen, rowId}:any) => {
    const [loading, setLoading] = useState(true);
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        getPincodeData();
    },[])

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const getPincodeData = async () => {
        setLoading(true);
        const token = localStorage.getItem("token");
        try {
            const res = await axios.get(`${BASE_URL}/marketing/pincode/${rowId}`, {
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


    return loading ? (
        <div>
            <Loader />
        </div>
    ) : (
        <div>
            <div className="group relative cursor-pointer overflow-hidden bg-white dark:bg-[#261C16] border-none  ring-1 ring-gray-900/5 dark:ring-gray-700 w-full items-center sm:rounded-lg sm:px-5 ">

                <div className="my-6 flex justify-between">
                    <h2 className="text-xl font-semibold dark:text-white">
                        Import Pincode
                    </h2>
                    <button
                        className="text-gray-500 hover:text-gray-700 dark:text-white"
                        onClick={() => setLocationOpen(false)}
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
                <div className="xs:px-5 lg:px-0 lg:gap-3 flex lg:flex-row xs:flex-col xs:space-y-4 justify-between my-6">
                    <div className="w-full">
                        <label htmlFor="Import" className="mt-4">Import</label>
                        <input id="Import" type="file" placeholder="Import" className="form-input h-10 dark:bg-[#1E1611] dark:border-none" />
                    </div>
                </div>

                <div className="xs:px-5 lg:px-0 flex ">
                    <button type="submit" className="btn btn-primary my-6 mr-3">
                        Submit
                    </button>
                    <button type="submit" className="btn btn-primary my-6 mr-3">
                        Delete All
                    </button>
                </div>

                <div>

                    <div className="table-responsive mb-5  xs:px-5 lg:px-0">
                        <table>
                            <thead>
                                <tr>
                                    <th>Pin Code</th>
                                    <th>City Name</th>
                                    <th>State Name</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((data: TableData) => {
                                    return (
                                        <tr key={data.id}>
                                            <td>
                                                <div className="whitespace-nowrap">{data.id}</div>
                                            </td>
                                            <td>{data.name}</td>
                                            <td>{data.name}</td>
                                            <td>{data.date}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default auth(LocationCampaign)