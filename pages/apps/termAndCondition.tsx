import { useEffect, useState } from "react";
import Loader from "@/components/Layouts/Loader";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { showAlert } from "@/components/showAlert";
import { BASE_URL } from "@/constants";
import axios from "axios";
import Swal from "sweetalert2";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function TermAndCondition() {
  const [loading, setLoading] = useState(true);
  const [termsAndCondition, setTermsAndCondition] = useState(true);
  const [value, setValue] = useState(``);
  const [pageTitle, setPageTitle] = useState(false);

  useEffect(() => {
    getTermsAndCondition();
  },[]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const submitData = async () => {
    // setLoader(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/admin/addTermsAndCondition`,
        { value },
        {
          headers: {
            "Content-Type": "application/json",
          },
          maxBodyLength: Infinity,
        }
      );
      console.log(res.data, "login response");
      localStorage?.setItem("token", res?.data?.data?.token);
      // router.push("/dashboard/dashboard");
      const toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
      });
      toast.fire({
        icon: "success",
        title: "You have Login Successfuly",
        padding: "10px 20px",
      });
      // setLoader(false);
    } catch (e: any) {
      showAlert(15, e?.response?.data?.message);
      console.error(e?.response?.data?.message, "login fail");
    } finally {
      // setLoader(false);
    }
  };

  const getTermsAndCondition = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${BASE_URL}/admin/getTermsAndCondition`, {
        maxBodyLength: Infinity,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data, "data response");

      setValue(res?.data?.data[0]?.
        description);
        setPageTitle(res?.data?.data[0]?.
        pageTitle);
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
    <div className="rounded-lg p-10">
      <form className="space-y-6">
        <div>
          <label
            htmlFor="sessionTimeout"
            className="mb-2 block text-black dark:text-white"
          >
            Page Title
          </label>
          <input
            id="sessionTimeout"
            type="text"
            placeholder="Page Title"
            className="form-input w-full dark:border-none dark:bg-[#261C16]"
            onChange={(e) => setPageTitle(e.target.value)}
            value={pageTitle}
          />
        </div>

        <div>
          <ReactQuill theme="snow" value={value} onChange={setValue} />

          <div className="flex justify-end">
            <button type="submit" className="btn btn-primary w-fit mt-6" onClick={() => submitData()}>
              Submit Setting
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
