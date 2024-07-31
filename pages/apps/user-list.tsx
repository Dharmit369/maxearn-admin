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
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import InfoIcon from '@mui/icons-material/Info';
import LockIcon from '@mui/icons-material/Lock';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ModelPaymentDetails from "@/components/ModelPaymentDetails";
import AnimatedCard from "@/components/animated-card";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import GroupIcon from '@mui/icons-material/Group';
import axios from "axios";
import { showAlert } from "@/components/showAlert";
import { Tab } from "@headlessui/react";
import IdentityDetail from '@/pages/apps/IdentityDetail';
import User from '@/pages/apps/user-userList';
import BankDetails from '@/pages/apps/BankDetails';
import AddTransaction from '@/pages/apps/AddTransaction';
import LockOpenIcon from '@mui/icons-material/LockOpen';

export default function UserList() {
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [edit, setEdit] = useState(false);
    const [status, setStatus] = useState(false);
    const [name, setName] = useState("");
    const [userId, setUserId] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [email, setEmail] = useState("");
    const [editId, setEditId] = useState("");

    const handleEdit = (data: any) => {
        
        setEdit(true);
        setEditId(data)
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        getUserList();
    }, [status, name, userId, mobileNo, email])

    const getUserList = async () => {
        setLoading(true);
        const token = localStorage.getItem("token");
        
        try {
            const res = await axios.get(`${BASE_URL}/user?status=${status}&email=${email}&name=${name}&user_id=${userId}&mobile_num=${mobileNo}`, {
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

    const deleteData = async (id: any) => {
        console.log(id, "asssssssssss");
        const token = localStorage.getItem("token");
        console.log(`${BASE_URL}/banner/${id}`);
        try {
            const res = await axios.delete(`${BASE_URL}/user/${id}`, {
                maxBodyLength: Infinity,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res.data, "delete banner response");
            if (res) {
                setTableData(res?.data?.data);
                showAlert(15, res.data.message, "success");
                getUserList();
            } else {
                showAlert(15, res?.data?.message, "error");
            }
        } catch (e) {
            console.error(e, "delete banner error");
        } finally {
            setLoading(false);
        }
    };

    const lockData = async (datas: any) => {
        
        // console.log(id, "asssssssssss");
        const token = localStorage.getItem("token");
        console.log("iddddd:",datas?._id)
        // console.log(`${BASE_URL}/banner/${id}`);
        const data = {
            username :datas.username,
            birth_date :datas.birth_date,
            state :datas.state,
            pincode :datas.pincode,
            socialMediaAccount :datas.socialMediaAccount,
            password :datas.password,
            referralActive : `${datas.referralActive}`,
            isBlocked: "true"
        }
        try {
            const res = await axios.put(`${BASE_URL}/user/${datas?._id}`, data, {
                maxBodyLength: Infinity,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res.data, "delete banner response");
            if (res) {
                // setTableData(res?.data?.data);
                showAlert(15, res.data.message, "success");
                getUserList();
            } else {
                showAlert(15, res?.data?.message, "error");
            }
        } catch (e) {
            console.error(e, "delete banner error");
        } finally {
            setLoading(false);
        }
    };

    console.log("edit", edit)


    return loading ? (
        <div>
            <Loader />
        </div>
    ) : (
        <div>

            {edit === false && <div className="relative cursor-pointer overflow-hidden bg-white dark:bg-[#261C16] border-none  ring-1 ring-gray-900/5 dark:ring-gray-700 w-full items-center sm:rounded-lg sm:px-5 ">

                <div className="xs:px-5 lg:px-0 lg:gap-3 flex lg:flex-row xs:flex-col xs:space-y-4 justify-between">

                    <input id="userId" type="text" placeholder="Name" className="form-input h-10 mt-4 dark:bg-[#1E1611] dark:border-none" onChange={(e) => setName(e.target.value)} value={name}/>

                    <input id="userId" type="text" placeholder="User Id" className="form-input h-10 mt-4 dark:bg-[#1E1611] dark:border-none" onChange={(e) => setUserId(e.target.value)} value={userId}/>

                    <input id="mobileNo" type="number" placeholder="Mobile No." className="form-input h-10 dark:bg-[#1E1611] dark:border-none" onChange={(e) => setMobileNo(e.target.value)} value={mobileNo}/>

                    <input id="mobileNo" type="text" placeholder="Email" className="form-input h-10 dark:bg-[#1E1611] dark:border-none" onChange={(e) => setEmail(e.target.value)} value={email}/>


                    <select id="product" className="form-select text-white-dark h-10 dark:bg-[#1E1611] dark:border-none" onChange={(e) => setStatus(e.target.value)} value={status}>
                        <option value={"true"}>True</option>
                        <option value={"false"}>False</option>
                    </select>
                </div>


                {/* <div>
                    <div className="px-1 py-7 flex lg:flex-row xs:flex-col justify-between w-full gap-3">

                            <AnimatedCard title={"All Users"} value={"250000"}>
                                <GroupIcon className="text-white" />
                            </AnimatedCard>
                        
                            <AnimatedCard title={"KYC Submitted"} value={"250000"}>
                                <GroupIcon className="text-white" />
                            </AnimatedCard>
                      
                            <AnimatedCard title={"KYC Complete"} value={"2500"}>
                                <GroupIcon className="text-white" />
                            </AnimatedCard>
                        
                            <AnimatedCard title={"Pending User"} value={"25000000"}>
                                <GroupIcon className="text-white" />
                            </AnimatedCard>
                        
                            <AnimatedCard title={"KYC Rejected"} value={"250000"}>
                                <GroupIcon className="text-white" />
                            </AnimatedCard>
                       
                    </div>
                </div> */}

                <div className="my-6">

                    <div className="table-responsive mb-5 xs:px-5 lg:px-0">
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        <input type="checkbox" className="form-checkbox" />
                                    </th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Mobile No.</th>
                                    <th>Reffered By</th>
                                    <th>Status</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData?.map((data) => {
                                    return (
                                        <tr key={data.id}>
                                            <td>
                                                <input type="checkbox" className="form-checkbox" />
                                            </td>
                                            <td> <div style={{ width: "50px", height: "50px", overflow: "hidden", borderRadius: "50%", position: "relative" }}>

                                                <img src={data?.profile_picture} alt={data?.profile_picture} />
                                            </div></td>
                                            <td>
                                                <div className="whitespace-nowrap">{data?.username}</div>
                                            </td>
                                            <td>{data?.mobile_num}</td>
                                            <td>{data?.reference_user}</td>

                                            <td>
                                                <span
                                                    className={`badge whitespace-nowrap ${ data?.isBlocked === false
                                                                    ? 'bg-danger'
                                                                    : 'bg-primary'
                                                        }`}
                                                >
                                                    {data?.isBlocked.toString()}
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <div className="flex justify-between w-full">
                                                    <ModeEditIcon onClick={() => handleEdit(data)} />
                                                    <InfoIcon onClick={() => setModal(true)} />
                                                    <DeleteIcon onClick={() => deleteData(data?._id)} />
                                                    <LockIcon onClick={() => lockData(data)}/>
                                                    {/* <ExitToAppIcon /> */}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            }

            {modal && <ModelPaymentDetails modal={modal} setModal={setModal} />}

            {edit &&
                  <div className="m-0 p-0">
                  <div className="mb-4 w-full rounded border border-white-light bg-white px-0 shadow-[4px_6px_10px_-3px_#bfc9d4] dark:border-none dark:bg-[#29221C] dark:shadow-custom sm:w-[78.5vw]">
                  <div className="my-6 flex justify-between mx-5">
                    <h2 className="text-xl font-semibold dark:text-white">
                        Add User
                    </h2>
                    <button
                        className="text-gray-500 hover:text-gray-700 dark:text-white"
                        onClick={() => setEdit(false)}
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
                  <Tab.Group>
                             <Tab.List className="mt-5 flex flex-wrap dark:mt-5">
                                <Tab as={Fragment}>
                                     {({ selected }: any) => (
                                        <button
                                            className={`${selected
                                                ? "bg-primary text-white !outline-none dark:bg-[#FE6C00]"
                                                : ""
                                                }
        -mb-[1px] ml-5 block rounded p-3.5 py-2 hover:bg-primary hover:text-white dark:hover:bg-[#FE6C00]`}
                                        >
                                            User
                                        </button>
                                    )}
                                </Tab>
                                {/* <Tab as={Fragment}>
                                    {({ selected }: any) => (
                                        <button
                                            className={`${selected
                                                ? "bg-primary text-white !outline-none dark:bg-[#FE6C00]"
                                                : ""
                                                }
        -mb-[1px] ml-5 block rounded p-3.5 py-2 hover:bg-primary hover:text-white dark:hover:bg-[#FE6C00]`}
                                        >
                                            Identity Detail
                                        </button>
                                    )}
                                </Tab>
                                <Tab as={Fragment}>
                                    {({ selected }: any) => (
                                        <button
                                            className={`${selected
                                                ? "bg-primary text-white !outline-none dark:bg-[#FE6C00]"
                                                : ""
                                                }
        -mb-[1px] ml-5 block rounded p-3.5 py-2 hover:bg-primary hover:text-white dark:hover:bg-[#FE6C00]`}
                                        >
                                            Bank Detail
                                        </button>
                                    )}
                                </Tab>
                                <Tab as={Fragment}>
                                    {({ selected }: any) => (
                                        <button
                                            className={`${selected
                                                ? "bg-primary text-white !outline-none dark:bg-[#FE6C00]"
                                                : ""
                                                }
        -mb-[1px] ml-5 block rounded p-3.5 py-2 hover:bg-primary hover:text-white dark:hover:bg-[#FE6C00]`}
                                        >
                                            Add Transaction
                                        </button>
                                    )}
                                </Tab> */}
                            </Tab.List>

                            <Tab.Panels>
                                <Tab.Panel>
                                    <User setEdit={setEdit} getUserList={getUserList} editId={editId}/>
                                </Tab.Panel>

                                {/* <Tab.Panel>
                                    <IdentityDetail />
                                </Tab.Panel>

                                <Tab.Panel>
                                    <BankDetails />
                                </Tab.Panel>

                                <Tab.Panel>
                                    <AddTransaction />
                                </Tab.Panel> */}
                            </Tab.Panels>
                        </Tab.Group>
            
                    <div className="flex justify-between px-4 py-7 xs:flex-col lg:flex-row "></div>
                  </div>
                </div>
            }
        </div>
    );
}


// {edit &&
//     <div>
       
//                 <div className="flex justify-between mb-6">
//                     <h2 className="text-xl font-semibold dark:text-white">User Payment Details</h2>
//                     <button className="text-gray-500 hover:text-gray-700 dark:text-white" onClick={() => setModal(false)}>
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
//                         </svg>
//                     </button>
//                 </div>
//                 <div>
//                     <div className="mb-4 w-full rounded border border-white-light bg-white px-0 shadow-[4px_6px_10px_-3px_#bfc9d4] dark:border-none dark:bg-[#29221C] dark:shadow-custom sm:w-[40vw] ">
//                         <Tab.Group>
//                             <Tab.List className="mt-5 flex flex-wrap dark:mt-5">
//                                 <Tab as={Fragment}>
//                                     {({ selected }: any) => (
//                                         <button
//                                             className={`${selected
//                                                 ? "bg-primary text-white !outline-none dark:bg-[#FE6C00]"
//                                                 : ""
//                                                 }
//         -mb-[1px] ml-5 block rounded p-3.5 py-2 hover:bg-primary hover:text-white dark:hover:bg-[#FE6C00]`}
//                                         >
//                                             User
//                                         </button>
//                                     )}
//                                 </Tab>
//                                 <Tab as={Fragment}>
//                                     {({ selected }: any) => (
//                                         <button
//                                             className={`${selected
//                                                 ? "bg-primary text-white !outline-none dark:bg-[#FE6C00]"
//                                                 : ""
//                                                 }
//         -mb-[1px] ml-5 block rounded p-3.5 py-2 hover:bg-primary hover:text-white dark:hover:bg-[#FE6C00]`}
//                                         >
//                                             Identity Detail
//                                         </button>
//                                     )}
//                                 </Tab>
//                                 <Tab as={Fragment}>
//                                     {({ selected }: any) => (
//                                         <button
//                                             className={`${selected
//                                                 ? "bg-primary text-white !outline-none dark:bg-[#FE6C00]"
//                                                 : ""
//                                                 }
//         -mb-[1px] ml-5 block rounded p-3.5 py-2 hover:bg-primary hover:text-white dark:hover:bg-[#FE6C00]`}
//                                         >
//                                             Bank Detail
//                                         </button>
//                                     )}
//                                 </Tab>
//                                 <Tab as={Fragment}>
//                                     {({ selected }: any) => (
//                                         <button
//                                             className={`${selected
//                                                 ? "bg-primary text-white !outline-none dark:bg-[#FE6C00]"
//                                                 : ""
//                                                 }
//         -mb-[1px] ml-5 block rounded p-3.5 py-2 hover:bg-primary hover:text-white dark:hover:bg-[#FE6C00]`}
//                                         >
//                                             Add Transaction
//                                         </button>
//                                     )}
//                                 </Tab>
//                             </Tab.List>

//                             <Tab.Panels>
//                                 <Tab.Panel>
//                                     <User />
//                                 </Tab.Panel>

//                                 <Tab.Panel>
//                                     <IdentityDetail />
//                                 </Tab.Panel>

//                                 <Tab.Panel>
//                                     <BankDetails />
//                                 </Tab.Panel>

//                                 <Tab.Panel>
//                                     <AddTransaction />
//                                 </Tab.Panel>
//                             </Tab.Panels>
//                         </Tab.Group>
//                     </div>

//                 </div>
//                 {/* <div className="flex justify-end">
//             <button className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600">Save</button>
//             <button className="ml-4 px-6 py-3 bg-gray-200 text-gray-700 rounded hover:bg-gray-300" onClick={() => setModal(false)}>Cancel</button>
//         </div> */}
//             </div>
// }
