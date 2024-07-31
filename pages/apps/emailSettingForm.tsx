import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

// import Dropdown from "@/components/Dropdown";
// import { Fragment } from "react";
// import Image from "next/image";
// import { Images } from "@/constants";
// import Link from "next/link";
import Loader from "@/components/Layouts/Loader";
import auth from "../utils/auth";
// import { ReactSortable } from "react-sortablejs";
// import Select from "react-select";
// import { Tab } from "@headlessui/react";

const EmailSettingForm = () => {
  const data = {
    MailType: "",
    Email: "",
    Name: "",
    SMTPHostman: "",
    SMTPUsername: "",
    SMTPPassword: "",
    SMTPPort: "",
    SMTPCrypto: "",
    UnsubscribedPageTitle: "",
    Testing: "",
    UnsubscribedPageMessage: "",
  };
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
    setChangeData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return loading ? (
    <div>
      <Loader />
    </div>
  ) : (
    <div className="rounded-lg p-10">
      <form className="space-y-6">
        <div>
          <label htmlFor="MailType" className="dark:text-white">
            Mail Type
          </label>
          <select
            id="MailType"
            className="form-select text-white-dark dark:border-none dark:bg-[#261C16]"
            name="MailType"
            onChange={handleChange}
          >
            <option value={"SMTP"}>SMTP</option>
            <option value={"PHP Mailer"}>PHP Mailer</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="Email"
            className="mb-2 block text-black dark:text-white"
          >
            From Email
          </label>
          <input
            id="Email"
            type="text"
            placeholder="Enter Email"
            className="form-input w-full dark:border-none dark:bg-[#261C16]"
            name="Email"
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            htmlFor="Name"
            className="mb-2 block text-black dark:text-white"
          >
            From Name
          </label>
          <input
            id="Name"
            type="text"
            placeholder="Enter Name"
            className="form-input w-full dark:border-none dark:bg-[#261C16]"
            name="Name"
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            htmlFor="SMTPHostman"
            className="mb-2 block text-black dark:text-white"
          >
            SMTP Hostman
          </label>
          <input
            id="SMTPHostman"
            type="text"
            placeholder="Enter SMTP Hostman"
            className="form-input w-full dark:border-none dark:bg-[#261C16]"
            name="SMTPHostman"
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            htmlFor="SMTPUsername"
            className="mb-2 block text-black dark:text-white"
          >
            SMTP Username
          </label>
          <input
            id="SMTPUsername"
            type="text"
            placeholder="Enter SMTP Username"
            className="form-input w-full dark:border-none dark:bg-[#261C16]"
            name="SMTPUsername"
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            htmlFor="SMTPPassword"
            className="mb-2 block text-black dark:text-white"
          >
            SMTP Password
          </label>
          <input
            id="SMTPPassword"
            type="number"
            placeholder="Enter SMTP Password"
            className="form-input w-full dark:border-none dark:bg-[#261C16]"
            name="SMTPPassword"
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            htmlFor="SMTPPort"
            className="mb-2 block text-black dark:text-white"
          >
            SMTP Port
          </label>
          <input
            id="SMTPPort"
            type="text"
            placeholder="Enter SMTP Port"
            className="form-input w-full dark:border-none dark:bg-[#261C16]"
            name="SMTPPort"
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="SMTPCrypto" className="dark:text-white">
            SMTP Crypto
          </label>
          <select
            id="SMTPCrypto"
            className="form-select text-white-dark dark:border-none dark:bg-[#261C16]"
            name="SMTPCrypto"
            onChange={handleChange}
          >
            <option value={""}>--None--</option>
            <option value={"TLS"}>TLS</option>
            <option value={"SSL"}>SSL</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="UnsubscribedPageTitle"
            className="mb-2 block text-black dark:text-white"
          >
            Unsubscribed Page Title
          </label>
          <input
            id="UnsubscribedPageTitle"
            type="text"
            placeholder="Enter Session Timeout"
            className="form-input w-full dark:border-none dark:bg-[#261C16]"
            name="UnsubscribedPageTitle"
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            htmlFor="UnsubscribedPageMessage"
            className="mb-2 block text-black dark:text-white"
          >
            Unsubscribed Page Message
          </label>
          <textarea
            id="UnsubscribedPageMessage"
            placeholder="Enter Session Timeout"
            className="form-input w-full dark:border-none dark:bg-[#261C16]"
            name="UnsubscribedPageMessage"
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            htmlFor="Testing"
            className="mb-2 block text-black dark:text-white"
          >
            Testing
          </label>
          <input
            id="Testing"
            type="text"
            placeholder="Enter Session Timeout"
            className="form-input w-full dark:border-none dark:bg-[#261C16]"
            name="Testing"
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-end">
          <button type="submit" className="btn btn-primary mt-6 w-fit">
            Submit Setting
          </button>
        </div>
      </form>
    </div>
  );
};

export default auth(EmailSettingForm);
