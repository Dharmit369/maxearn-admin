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
import moment from "moment";


const TransactionsReport = () => {
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
      const res = await axios.get(`${BASE_URL}/activity/commission`, {
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
      <div className="my-6 flex justify-between">
        <h2 className="text-xl font-semibold dark:text-white">
          All Transactions
        </h2>
      </div>

      <div>

        <div className="table-responsive mb-5  xs:px-5 lg:px-0">
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Affiliate ID</th>
                <th>Username</th>
                <th>Commission</th>
                {/* <th>From</th> */}
                <th>Type</th>
                {/* <th>Order Total</th> */}
                {/* <th>Payment Method</th> */}
                <th>Comment</th>
                {/* <th>Status</th> */}
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {tableData?.map((data, index) => {
                return (
                  <tr key={data?.id}>
                    <td>{index + 1}</td>
                    <td>{data?.affiliate_id}</td>
                    <td>{data?.user_name}</td>
                    <td>{data?.commission_amount}</td>
                    <td>{data?.type}</td>
                    <td>{data?.comment}</td>
                    <td>{moment(data?.date).format("DD/MM/YYYY")}</td>
                    {/* <td>{data?.price}</td> */}
                    {/* <td>{data?.price}</td> */}
                    
                    {/* <td>{data?.date}</td> */}
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

export default auth(TransactionsReport);