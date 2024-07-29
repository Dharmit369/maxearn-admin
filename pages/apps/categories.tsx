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
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { showAlert } from "@/components/showAlert";
import axios from "axios";
import auth from "../utils/auth";

const Categories = () => {

    const _data = {
        name: "",
        sub_title: "",
        parent_category: ""
    }
    const [loading, setLoading] = useState(true);
    const [addCategory, setAddCategory] = useState(false);
    const [categoryData, setCategoryData] = useState(_data);
    const [file, setFile] = useState("");
    const [tableData, setTableData] = useState([]);
    const [edit, setEdit] = useState(false);
    const [editId, setEditId] = useState("");
    // const [editData, setEditData] = useState();
    const [deleteId, setDeleteId] = useState("");

    const handleChange = (e: any) => {
        const { name, value } = e.target;

        setCategoryData({
            ...categoryData,
            [name]: value
        })
    }

    const handleFileChange = (event: any) => {
        setFile(event?.target?.files[0]);
    }

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const submitData = async () => {
        
        setLoading(true);
        const token = localStorage.getItem("token");

        if (!token) {
            showAlert(15, "No token found, please log in", "error");
            setLoading(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append("name", categoryData?.name);
            formData.append("sub_title", categoryData?.sub_title);
            formData.append("parent_category", categoryData?.parent_category);
            formData.append("file", file);

            const response = await axios.post(`${BASE_URL}/marketing/category`, formData, {
                maxBodyLength: Infinity,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data) {
                setAddCategory(false);
                getData();
                showAlert(15, response.data.message, "success");
            } else {
                showAlert(15, "Unexpected error, please try again", "error");
            }
        } catch (error) {
            console.error("Error submitting data:", error);
            showAlert(15, "An error occurred while submitting data", "error");
        } finally {
            setLoading(false);
        }
    };

    console.log("edit",file)

    const getData = async () => {
        
        setLoading(true);
        const token = localStorage.getItem("token");
        // console.log(`${BASE_URL}/banner`);
        try {
            const res = await axios.get(`${BASE_URL}/marketing/category`, {
                maxBodyLength: Infinity,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            //   console.log(res.data, "data response");
            if (res) {
                
                // router.push("/dashboard/dashboard");
                setTableData(res?.data?.data);
                setAddCategory(false);
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

    const deleteData = async (id: any) => {
        
        console.log(id, "asssssssssss");
        const token = localStorage.getItem("token");
        console.log(`${BASE_URL}/marketing/category/${id}`);
        try {
          const res = await axios.delete(`${BASE_URL}/marketing/category/${id}`, {
            maxBodyLength: Infinity,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(res.data, "delete banner response");
          if (res) {
            setTableData(res?.data?.data);
            setAddCategory(false);
            setCategoryData({
                name: "",
                sub_title: "",
                parent_category: ""
            });
            setFile("");
            showAlert(15, res.data.message, "success");
            getData();
          } else {
            showAlert(15, res?.data?.message, "error");
          }
        } catch (e) {
          console.error(e, "delete banner error");
        } finally {
          setLoading(false);
        }
      };

 
      const editData = async (id: any) => {
        
        setLoading(true);
        const token = localStorage.getItem("token");
        console.log(`${BASE_URL}/marketing/category/${id}`)
        if (!token) {
            showAlert(15, "No token found, please log in", "error");
            setLoading(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append("name", categoryData?.name);
            formData.append("sub_title", categoryData?.sub_title);
            formData.append("parent_category", categoryData?.parent_category);
            formData.append("file", file);

            const response = await axios.put(`${BASE_URL}/marketing/category/${id}`, formData, {
                maxBodyLength: Infinity,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data) {
                setAddCategory(false);
                getData();
                setCategoryData({
                    name: "",
                    sub_title: "",
                    parent_category: ""
                })
                setFile("")
                setEdit(false);
                showAlert(15, response.data.message, "success");
            } else {
                showAlert(15, "Unexpected error, please try again", "error");
            }
        } catch (error) {
            console.error("Error submitting data:", error);
            showAlert(15, "An error occurred while submitting data", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setEdit(false);
        setAddCategory(false);
        setCategoryData(_data);
    }
      

    return loading ? (
        <div>
            <Loader />
        </div>
    ) : (
        <div>
            {addCategory === false && <div>
                <div className="table-responsive mb-5">
                    <table>
                        <thead>
                            <tr>
                                <th>SR NO.</th>
                                <th>Name</th>
                                <th>Icon</th>
                                <th>Sub Title</th>
                                <th>Parent</th>
                                {/* <th>Date</th> */}
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData?.map((data, index) => {
                                return (
                                    <tr key={data?._id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <div className="whitespace-nowrap">{data?.name}</div>
                                        </td>

                                        <td>
                                            <div
                                                className="whitespace-nowrap"
                                            >
                                                {data?.icon}
                                            </div>
                                        </td>
                                        <td>{data?.sub_title}</td>
                                        <td>{data?.parent_category}</td>
                                        {/* <td>{data.date}</td> */}
                                        <td className="p-3 border-b border-[#ebedf2] dark:border-[#191e3a] text-center">
                                            <ModeEditIcon onClick={() => {
                                                setEditId(data?._id), setEdit(true), setAddCategory(true), setCategoryData(data)
                                            }} />
                                            {/* </ModeEditIcon> */}
                                            <DeleteIcon onClick={() => deleteData(data?._id)}/>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    <div className="flex justify-end">
                        <button type="submit" className="btn btn-primary w-fit mt-6" onClick={() => setAddCategory(true)}>
                            Create Category
                        </button>
                    </div>
                </div>

                {/* {model && <Model model={model} setModel={setModel}/>} */}
            </div>}

            {addCategory && <div>
                <div className="mb-4 w-full rounded border border-white-light bg-white px-0 shadow-[4px_6px_10px_-3px_#bfc9d4] dark:border-none dark:bg-[#29221C] dark:shadow-custom sm:w-[78.5vw]">
                    <div className="p-10">
                        <form className="space-y-6">

                            <div className="flex justify-between mb-6">
                                <h2 className="text-xl font-semibold dark:text-white">{edit ? "Edit Category" : "Add Category"}</h2>

                                <button className="text-gray-500 hover:text-gray-700 dark:text-white" onClick={() => handleClose()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div>
                                <label htmlFor="CategoryName" className="block text-black mb-2 dark:text-white">Category Name</label>
                                <input id="CategoryName" type="text" placeholder="Enter Category Name" className="form-input w-full dark:bg-[#261C16] dark:border-none" name="name" value={categoryData?.name} onChange={handleChange} />
                            </div>

                            <div>
                                <label htmlFor="Icon" className="block text-black mb-2 dark:text-white">Icon</label>
                                <input id="Icon" type="file" placeholder="Enter Icon" className="form-input w-full dark:bg-[#261C16] dark:border-none" name="file" onChange={handleFileChange} />
                            </div>

                            <div>
                                <label htmlFor="Subtitle" className="block text-black mb-2 dark:text-white">Sub Title</label>
                                <input id="Subtitle" type="text" placeholder="Enter Sub Title" className="form-input w-full dark:bg-[#261C16] dark:border-none" name="sub_title" value={categoryData?.sub_title} onChange={handleChange} />

                            </div>

                            <div>
                                <label htmlFor="ParentCategory" className="dark:text-white">Parent Category</label>
                                <select id="ParentCategory" className="form-select text-white-dark dark:bg-[#261C16] dark:border-none" name="parent_category" value={categoryData?.parent_category} onChange={handleChange}>
                                    <option value={""}>select parent category</option>
                                    <option value={"DEMAT ACCOUNT"}>DEMAT ACCOUNT</option>
                                    <option value={"SAVING ACCOUNT"}>SAVING ACCOUNT</option>
                                    <option value={"EMI CARD"}>EMI CARD</option>
                                    <option value={"PERSONAL LOAN"}>PERSONAL LOAN</option>
                                    <option value={"CREDIT CARD"}>CREDIT CARD</option>
                                </select>
                            </div>

                            <div className="flex justify-end">
                                <button type="submit" className="btn btn-primary w-fit mt-6" onClick={edit ?() => editData(editId) : () => submitData()}>
                                    Add Category
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>}
        </div>
    );
}

export default auth(Categories);
