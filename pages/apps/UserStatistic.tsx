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

// const tableData = [
//     {
//         id: 1,
//         name: 'John Doe',
//         email: 'johndoe@yahoo.com',
//         date: '10/08/2020',
//         sale: 120,
//         status: 'Complete',
//         register: '5 min ago',
//         number: "+91 4563768976",
//         price: "Rs-900"

//     },
//     {
//         id: 2,
//         name: 'Shaun Park',
//         email: 'shaunpark@gmail.com',
//         date: '11/08/2020',
//         sale: 400,
//         status: 'Pending',
//         register: '11 min ago',
//         number: "+91 4563768976",
//         price: "Rs-900"
//     },
//     {
//         id: 3,
//         name: 'Alma Clarke',
//         email: 'alma@gmail.com',
//         date: '12/02/2020',
//         sale: 310,
//         status: 'In Progress',
//         register: '1 hour ago',
//         number: "+91 4563768976",
//         price: "Rs-900"
//     },
//     {
//         id: 4,
//         name: 'Vincent Carpenter',
//         email: 'vincent@gmail.com',
//         date: '13/08/2020',
//         sale: 100,
//         status: 'Canceled',
//         register: '1 day ago',
//         number: "+91 4563768976",
//           price: "Rs-900"
//     },
//     {
//         id: 1,
//         name: 'John Doe',
//         email: 'johndoe@yahoo.com',
//         date: '10/08/2020',
//         sale: 120,
//         status: 'Complete',
//         register: '5 min ago',
//         number: "+91 4563768976",
//         price: "Rs-900"
//     },
//     {
//         id: 2,
//         name: 'Shaun Park',
//         email: 'shaunpark@gmail.com',
//         date: '11/08/2020',
//         sale: 400,
//         status: 'Pending',
//         register: '11 min ago',
//         number: "+91 4563768976",
//         price: "Rs-900"
//     },
//     {
//         id: 3,
//         name: 'Alma Clarke',
//         email: 'alma@gmail.com',
//         date: '12/02/2020',
//         sale: 310,
//         status: 'In Progress',
//         register: '1 hour ago',
//         number: "+91 4563768976",
//         price: "Rs-900"
//     },
//     {
//         id: 4,
//         name: 'Vincent Carpenter',
//         email: 'vincent@gmail.com',
//         date: '13/08/2020',
//         sale: 100,
//         status: 'Canceled',
//         register: '1 day ago',
//         number: "+91 4563768976",
//         price: "Rs-900"
//     },

// ];

const UserStatistics = () => {
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    getData()
  },[])

  const getData = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get(`${BASE_URL}/activity/statstic`, {
        maxBodyLength: Infinity,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data, "data response");

      setTableData(res?.data?.data);
      setLoading(false);
    } catch (e) {
      console.error(e, "Total Lead Data");
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <div>
      <Loader />
    </div>
  ) : (
 <div className="group relative cursor-pointer overflow-hidden bg-white dark:bg-[#261C16] border-none  ring-1 ring-gray-900/5 dark:ring-gray-700 w-full items-center sm:rounded-lg sm:px-5 ">
        {/* <div className="my-6">
    <h2 className="text-lg  xs:px-5 lg:px-0">All withdraw request List</h2>
  </div> */}
        <div className="xs:px-5 lg:px-0 lg:gap-3 flex lg:flex-row xs:flex-col xs:space-y-4 justify-between my-6">

            <select id="categories" className="form-select text-white-dark h-10 dark:bg-[#1E1611] dark:border-none mt-4">
                <option value={""}>All</option>
                {/* {categoryOptionData?.map((itm) => (
                    <option value={itm?.id} >{itm?.name}</option>
                ))} */}
            </select>

            <input id="campaign" type="date" placeholder="Enter Campaign name" className="form-input h-10 dark:bg-[#1E1611] dark:border-none" />

            <button type="submit" className="btn btn-primary w-fit my-6 h-9" >
                Search
            </button>

            <button type="submit" className="btn btn-primary w-fit my-6 h-9" >
               Export
            </button>

        </div>

        <div>

            <div className="table-responsive mb-5  xs:px-5 lg:px-0">
                <table>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Affiliate ID</th>
                            <th>Affiliate Name</th>
                            <th>Lead Payment</th>
                            <th>Referal Payment</th>
                            <th>Total Memo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData?.map((data, index) => {
                            return (
                                <tr key={data?.id}>
                                    <td>{index + 1}</td>
                                    <td>{data?.affiliate_id}</td>
                                    <td>{data?.username}</td>
                                    <td>{data?.lead_payment}</td>
                                    <td>{data?.refral_payment}</td>
                                    <td>{data?.totalmemo}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
}

export default auth(UserStatistics);