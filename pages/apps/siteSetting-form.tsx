import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

// import Dropdown from "@/components/Dropdown";
// import { Fragment } from "react";
// import Image from "next/image";
// import { Images } from "@/constants";
// import Link from "next/link";
import Loader from "@/components/Layouts/Loader";
import { Approval } from "@mui/icons-material";
// import { ReactSortable } from "react-sortablejs";
// import Select from "react-select";
// import { Tab } from "@headlessui/react";

export default function SiteSettingForm() {
    const data = {
        websiteName: "",
        registration: "",
        approvalRegistration: "",
        timeZone: "",
        notificationEmail: "",
        sessionTimeout: "",
        websiteLogo1: "",
        websiteLogo2: ""
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
        <div className="p-10 rounded-lg">
            <form className="space-y-6">
                <div>
                    <label htmlFor="websiteName" className="block text-black mb-2 dark:text-white">Website Name</label>
                    <input id="websiteName" type="text" placeholder="Enter Website Name" className="form-input w-full dark:bg-[#261C16] dark:border-none" name="websiteName" onChange={handleChange}/>
                </div>

                <div>
                    <label htmlFor="registration" className="block text-black mb-2 dark:text-white">Registration</label>
                    <input id="registration" type="text" placeholder="Enter Registration" className="form-input w-full dark:bg-[#261C16] dark:border-none" name="registration" onChange={handleChange}/>
                </div>

                <div>
                    <label htmlFor="approval" className="block text-black mb-2 dark:text-white">Approval for Registration</label>
                    <input id="approval" type="text" placeholder="Enter Approval" className="form-input w-full dark:bg-[#261C16] dark:border-none" name="approvalRegistration" onChange={handleChange}/>
                </div>

                <div>
                    <label htmlFor="timezone" className="block text-black mb-2 dark:text-white">Time Zone</label>
                    <input id="timezone" type="text" placeholder="Enter Time Zone" className="form-input w-full dark:bg-[#261C16] dark:border-none" name="timeZone" onChange={handleChange}/>
                </div>

                <div>
                    <label htmlFor="notificationEmail" className="block text-black mb-2 dark:text-white">Notification Email</label>
                    <input id="notificationEmail" type="email" placeholder="Enter Notification Email" className="form-input w-full dark:bg-[#261C16] dark:border-none" name="notificationEmail" onChange={handleChange}/>
                </div>

                <div>
                    <label htmlFor="sessionTimeout" className="block text-black mb-2 dark:text-white">Session Timeout Timing (in seconds) default_timeout_is_1800_seconds</label>
                    <input id="sessionTimeout" type="number" placeholder="Enter Session Timeout" className="form-input w-full dark:bg-[#261C16] dark:border-none" name="sessionTimeout" onChange={handleChange}/>
                </div>

                <div>
                    <label htmlFor="sessionTimeout" className="block text-black mb-2 dark:text-white">Website Logo</label>
                    <div className="flex justify-between xs:flex-col sm:flex-row">
                        <input id="websiteLogo1" type="file" placeholder="Enter website Logo" className="form-input w-fit dark:bg-[#261C16] dark:border-none" name="websiteLogo1" onChange={handleChange}/>
                        <input id="websiteLogo2" type="file" placeholder="Enter website Logo" className="form-input w-fit dark:bg-[#261C16] dark:border-none" name="websiteLogo2" onChange={handleChange}/>
                    </div>
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
