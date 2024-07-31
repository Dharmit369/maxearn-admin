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
import auth from "../utils/auth";

const IdentityDetail = () => {
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
    <div>
      <div className="rounded-lg p-10">
        <form className="space-y-6">
          <div>
            <label htmlFor="gridState" className="dark:text-white">
              Status
            </label>
            <select
              id="gridState"
              className="form-select text-white-dark dark:border-none dark:bg-[#261C16]"
            >
              <option>Selected</option>
              <option>Submitted</option>
              <option>approve</option>
              <option>reject</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="sessionTimeout"
              className="mb-2 block text-black dark:text-white"
            >
              Message
            </label>
            <textarea
              id="sessionTimeout"
              placeholder="Enter Message"
              className="form-input w-full dark:border-none dark:bg-[#261C16]"
            />
          </div>

          <div className="flex justify-end">
            <button type="submit" className="btn btn-primary mt-6 w-fit">
              Submit Setting
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default auth(IdentityDetail);
