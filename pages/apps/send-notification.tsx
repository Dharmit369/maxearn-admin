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

export default function SendNotification() {
    const data = {
        URL: "",
        Type: "",
        User: "",
        Title: "",
        Description: "",
    }
    const [loading, setLoading] = useState(true);
    const [changeData, setChangeData] = useState(data);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setChangeData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }


    return loading ? (
        <div>
            <Loader />
        </div>
    ) : (
        <div>
            <div className="m-0 p-0">
                <div className="mb-4 w-full rounded border border-white-light bg-white px-0 shadow-[4px_6px_10px_-3px_#bfc9d4] dark:border-none dark:bg-[#29221C] dark:shadow-custom sm:w-[78.5vw]">
                    <div className="p-8">
                        <form className="space-y-5">

                            <div>
                                <label htmlFor="URL">URL</label>
                                <input id="URL" type="text" placeholder="URL" className="form-input dark:bg-[#261C16] dark:border-none" name="URL" onChange={handleChange}/>
                            </div>

                            <div>
                                <label htmlFor="Type">Type</label>
                                <select id="Type" className="form-select text-white-dark dark:bg-[#261C16] dark:border-none" name="Type" onChange={handleChange}>
                                    <option value={"User"}>User</option>
                                    <option value={"Wallet"}>Wallet</option>
                                    <option value={"Product"}>Product</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="User">User</label>
                                <select id="User" className="form-select text-white-dark dark:bg-[#261C16] dark:border-none" name="User" onChange={handleChange}>
                                    <option>Select</option>
                                    <option>...</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="Title">Title</label>
                                <input id="Title" type="text" placeholder="Title" className="form-input dark:bg-[#261C16] dark:border-none" name="Title" onChange={handleChange}/>
                            </div>

                            <div>
                                <label htmlFor="Description" className="block text-black mb-2 dark:text-white">Description</label>
                                <textarea id="Description" placeholder="Description" className="form-input w-full dark:bg-[#261C16] dark:border-none" name="Description" onChange={handleChange}/>
                            </div>
                            <div className="flex justify-end">
                                <button type="submit" className="btn btn-primary w-fit mt-6">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
