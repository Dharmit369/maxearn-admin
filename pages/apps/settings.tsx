import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loader from "@/components/Layouts/Loader";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { BASE_URL } from "@/constants";
import axios from "axios";
import { showAlert } from "@/components/showAlert";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function Settings() {
    const data = {
        _id: "",
        default_action_status: "",
        default_external_order_status: "",
        minimum_withdrawal_amount: 0,
        Withdrawal_warning_message: "",
    }
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState("Please withdrawal minimum 250 INR")
    const [changeData, setChangeData] = useState(data);

    useEffect(() => {
        getSettingData();
    },[])

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

    const getSettingData = async () => {
        setLoading(true);
        const token = localStorage.getItem("token");
        console.log(`${BASE_URL}/withdraw/getSetting`);
        try {
          const res = await axios.get(`${BASE_URL}/withdraw/getSetting`, {
            maxBodyLength: Infinity,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(res.data, "data response");
          if (res) {
            // router.push("/dashboard/dashboard");
            setChangeData(res?.data?.data[0]);
            setValue(res?.data?.data[0]?.Withdrawal_warning_message);
            // setReply(res?.data?.data?.reply)
            // setModel(false);
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

      const updateData = async (id: any) => {
        setLoading(true);
        const token = localStorage.getItem("token");
        const _data = {
            default_action_status: changeData?.default_action_status,
            default_external_order_status: changeData?.default_external_order_status,
            minimum_withdrawal_amount: changeData?.minimum_withdrawal_amount,
            Withdrawal_warning_message: changeData?.Withdrawal_warning_message,
        }

        try {
            const res = await axios.put(`${BASE_URL}/withdraw/updateSetting/${id}`, _data, {
                maxBodyLength: Infinity,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res, "daaaaaaaaaaaaa");
            console.log(res.data, "edit traning response");
            if (res.data) {
                // setLeadEditOpen(false);
                showAlert(15, res.data.message, "success");
                getSettingData();
            } else {
                showAlert(15, res.data.message, "error");
            }
        } catch (e) {
            console.error(e, "edit traning create error");
            showAlert(15, "An error occurred while submitting data", "error");
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
            <div className="mb-4 w-full rounded border border-white-light bg-white px-0 shadow-[4px_6px_10px_-3px_#bfc9d4] dark:border-none dark:bg-[#29221C] dark:shadow-custom sm:w-[78.5vw]">
                <div className="p-10">
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="default_action_status" className="dark:text-white">Default Action Status</label>
                            <select id="default_action_status" className="form-select text-white-dark dark:bg-[#261C16] dark:border-none" name="default_action_status" onChange={handleChange} value={changeData?.default_action_status}>
                                <option value={"OnHold"}>On Hold</option>
                                <option value={"InWallet"}>In Wallet</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="default_external_order_status" className="dark:text-white">Default External Order Status</label>
                            <select id="default_external_order_status" className="form-select text-white-dark dark:bg-[#261C16] dark:border-none" onChange={handleChange} name="default_external_order_status" value={changeData?.default_external_order_status}>
                                <option  value={"OnHold"}>On Hold</option>
                                <option  value={"InWallet"}>In Wallet</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="minimum_withdrawal_amount" className="block text-black mb-2 dark:text-white">Minimum Withdraw Amount</label>
                            <input id="minimum_withdrawal_amount" type="number" placeholder="Enter Minimun Withdraw Amount" className="form-input w-full dark:bg-[#261C16] dark:border-none"  onChange={handleChange} name="minimum_withdrawal_amount" value={changeData?.minimum_withdrawal_amount}/>
                        </div>

                        <div>
                            <label htmlFor="Withdrawal_warning_message" className="dark:text-white">Withdraw warning message</label>
                            <ReactQuill theme="snow" value={value} onChange={setValue} id="Withdrawal_warning_message" />
                        </div>

                        <div className="flex justify-end">
                            <button type="submit" className="btn btn-primary w-fit mt-6" onClick={() => updateData(changeData?._id)}>
                                Submit Setting
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
