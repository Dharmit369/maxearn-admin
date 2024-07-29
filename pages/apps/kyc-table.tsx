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
import Link from "next/link";

const KycTable = ({ tableData, setClose, title }: any) => {

  const data = {
    file: "",
    url: "",
  };
  const [loading, setLoading] = useState(true);
  const [model, setModel] = useState(false);
  const [banner, setBanner] = useState(data);
  const [loader, setLoader] = useState(false);
  const [kycData, setKycData] = useState([]);
  const [files, setFiles] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const router = useRouter();

  console.log("table:", tableData)
  // const { tableData } = router.query;
  // console.log("user", tableData)

  // useEffect(() => {
  //   if (router?.query) {
  //     
  //     setKycData(JSON?.parse(router?.query?.tableData))
  //   }
  // },[])
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // const kycData = tableData?.userData?.map((i) => i)
  // console.log("kycdata",JSON.stringify(kycData))
  return loading ? (
    <div>
      <Loader />
    </div>
  ) : (
    <div>
      <div className="mb-6 flex justify-between">
            <h2 className="text-xl font-semibold dark:text-white">
              {title}
            </h2>
            <button
              className="text-gray-500 hover:text-gray-700 dark:text-white"
              onClick={() => setClose(false)}
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
      <div className="table-responsive mb-5 max-h-96">
        <table className="   scrollbar-thin scrollbar-track-[#010314] scrollbar-thumb-[#1a2941]">
          <thead className="sticky top-0 z-50">
            <tr>
              <th>SR NO.</th>
              <th>AFFILIATE ID</th>
              <th>MOBILE NO.</th>
              <th>EMAIL</th>
              <th>STATE</th>
            </tr>
          </thead>
          <tbody>
            {tableData?.map((data, index) => {
              if (data?.user) {
                return (
                  <tr key={data?.user?._id}>
                    <td>{index + 1}</td>
                    <td>{data?.user?.affiliate_id}</td>
                    <td>{data?.user?.mobile_num}</td>
                    <td>{data?.user?.email}</td>
                    <td>{data?.user?.state}</td>
                  </tr>
                );
              } else {
                return (
                  <tr key={data?._id}>
                    <td>{index + 1}</td>
                    <td>{data?.affiliate_id}</td>
                    <td>{data?.mobile_num}</td>
                    <td>{data?.email}</td>
                    <td>{data?.state}</td>
                  </tr>
                );
              }
            })}

          </tbody>
        </table>


      </div>
      {/* 
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
      )} */}
    </div>
  );
};
export default auth(KycTable);
