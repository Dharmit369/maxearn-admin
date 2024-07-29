import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Dropdown from "@/components/Dropdown";
import { Fragment } from "react";
import Image from "next/image";
import { Images } from "@/constants";
import Link from "next/link";
import Loader from "@/components/Layouts/Loader";
import { ReactSortable } from "react-sortablejs";
import Select from "react-select";
import { Tab } from "@headlessui/react";

export default function AddTransaction() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return loading ? (
    <div>
      <Loader />
    </div>
  ) : (
    <div className="p-10 rounded-lg">
    <form className="space-y-6">

        <div>
            <label htmlFor="Type" className="dark:text-white">Type</label>
            <select id="Type" className="form-select text-white-dark dark:bg-[#261C16] dark:border-none">
                <option>Admin Transaction</option>
            </select>
        </div>
        <div>
            <label htmlFor="Campaign" className="dark:text-white">Campaign</label>
            <select id="Campaign" className="form-select text-white-dark dark:bg-[#261C16] dark:border-none">
                <option>Select</option>
                <option>...</option>
            </select>
        </div>

        <div>
            <label htmlFor="Amount" className="block text-black mb-2 dark:text-white">Amount</label>
            <input id="Amount" type="text" placeholder="Enter Amount" className="form-input w-full dark:bg-[#261C16] dark:border-none" />
        </div>

        <div>
            <label htmlFor="Comment" className="block text-black mb-2 dark:text-white">Comment</label>
            <input id="Comment" type="text" placeholder="Enter Comment" className="form-input w-full dark:bg-[#261C16] dark:border-none" />
        </div>

        

        <div className="flex justify-end">
            <button type="submit" className="btn btn-primary w-fit mt-6">
                Submit Setting
            </button>
        </div>
    </form>
</div>
  );
}
