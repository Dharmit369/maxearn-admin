import { useEffect, useState } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import Loader from "@/components/Layouts/Loader";
import React from "react";
import Model from "@/components/Model";
import axios from "axios";
import { BASE_URL } from "@/constants";
import { showAlert } from "@/components/showAlert";
import { useRouter } from "next/router";
import auth from "../utils/auth";

const Banner = () => {
  const data = {
    file: "",
    url: "",
  };
  const [loading, setLoading] = useState(true);
  const [model, setModel] = useState(false);
  const [banner, setBanner] = useState(data);
  const [loader, setLoader] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [files, setFiles] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState("");

  console.log("bannerdata", banner?.url);

  useEffect(() => {
    getBanner();
  }, []);

  console.log(files)

  const submitData = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      console.log(banner);
      const formData = new FormData();
      formData.append("file", files);
      formData.append("url", banner?.url);
      
      console.log("formData: ", formData);
      const res = await axios.post(`${BASE_URL}/banner`, formData, {
        maxBodyLength: Infinity,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data, "create response");
      if (res.data) {
        setModel(false);
        showAlert(15, res.data.message, "success");
        setBanner({ file: "", url: "" });
        getBanner();
      } else {
        showAlert(15, res.data.message, "error");
      }
    } catch (e) {
      console.error(e, "banner create error");
      showAlert(15, "An error occurred while submitting data", "error");
    } finally {
      setLoading(false);
    }
  };

  const EditBanner = async (id: any) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      console.log(banner);
      const formData = new FormData();
      formData.append("file", files);
      formData.append("url", banner?.url);

      console.log("formData: ", formData);
      const res = await axios.put(`${BASE_URL}/banner/${id}`, formData, {
        maxBodyLength: Infinity,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data, "edit banner response");
      if (res.data) {
        setEdit(false);
        setModel(false);
        showAlert(15, res.data.message, "success");
        setBanner({ file: "", url: "" });
        getBanner();
      } else {
        showAlert(15, res.data.message, "error");
      }
    } catch (e) {
      console.error(e, "edit banner error");
      showAlert(15, "An error occurred while submitting data", "error");
    } finally {
      setLoading(false);
    }
  };
  
  const getBanner = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    console.log(`${BASE_URL}/banner`);
    try {
      const res = await axios.get(`${BASE_URL}/banner`, {
        maxBodyLength: Infinity,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data, "data response");
      if (res) {
        // router.push("/dashboard/dashboard");
        setTableData(res?.data?.data);
        setModel(false);
        setLoading(false);
      } else {
        showAlert(15, res?.data?.message, "error");
      }
    } catch (e) {
      console.error(e, "login error");
    } finally {
      setLoading(false);
    }
  };

  const deleteBanner = async (id: any) => {
    console.log(id, "asssssssssss");
    const token = localStorage.getItem("token");
    console.log(`${BASE_URL}/banner/${id}`);
    try {
      const res = await axios.delete(`${BASE_URL}/banner/${id}`, {
        maxBodyLength: Infinity,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data, "delete banner response");
      if (res) {
        setTableData(res?.data?.data);
        setModel(false);
        showAlert(15, res.data.message, "success");
        getBanner();
      } else {
        showAlert(15, res?.data?.message, "error");
      }
    } catch (e) {
      console.error(e, "delete banner error");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (banner:any) => {
    setEditId(banner?._id);
    setEdit(true);
    setModel(true);
    setBanner({ file: banner?.file, url: banner?.url });
    setFiles(null);
    setUploadedFiles([]);
  };

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
      <div className="table-responsive mb-5">
        <table>
          <thead>
            <tr>
              <th>SR NO.</th>
              <th>IMAGE</th>
              <th>URL</th>
              {/* <th>Sales</th> */}
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {tableData?.map((data, index) => {
              return (
                <tr key={data?._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="whitespace-nowrap">{data?.image}</div>
                  </td>
                  <td>
                    <div className="whitespace-nowrap">{data?.url}</div>
                  </td>
                  <td className="border-b border-[#ebedf2] p-3 text-center dark:border-[#191e3a] md:space-x-4">
                    <ModeEditIcon
                      onClick={() => {
                        handleEditClick(data);
                      }}
                    />
                    <DeleteIcon onClick={() => deleteBanner(data?._id)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="flex justify-end">
          <button
            type="submit"
            className="btn btn-primary mt-6 w-fit"
            onClick={() => setModel(true)}
          >
            Add Banner
          </button>
        </div>
      </div>

      {model && (
        <Model
          modalname={edit === true ? "Edit Banner" : "Add Banner"}
          model={model}
          setModel={setModel}
          banner={banner}
          setBanner={setBanner}
          submitData={
            edit === true ? () => EditBanner(editId) : () => submitData()
          }
          files={files}
          setFiles={setFiles}
          uploadedFiles={uploadedFiles}
          setUploadedFiles={uploadedFiles}
        />
      )}
    </div>
  );
};
export default auth(Banner);
