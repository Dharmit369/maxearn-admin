import { useEffect, useState } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import Loader from "@/components/Layouts/Loader";
import React from "react";
import Model from "@/components/Model";
import { BASE_URL } from "@/constants";
import axios from "axios";
import { showAlert } from "@/components/showAlert";
import auth from "../utils/auth";
import TablePagination from "@mui/material/TablePagination";

const Traning = () => {
  const [loading, setLoading] = useState(true);
  const [model, setModel] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [files, setFiles] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const data = {
    file: "",
    url: "",
  };
  const [traning, setTraning] = useState(data);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    getTraning();
  }, []);

  const submitData = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    let data = new FormData();
    data.append("file", files);
    data.append("title", title);
    data.append("description", desc);
    data.append("url", traning?.url);

    try {
      const res = await axios.post(`${BASE_URL}/training`, data, {
        maxBodyLength: Infinity,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res, "daaaaaaaaaaaaa");
      console.log(res.data, "traning response");
      if (res.data) {
        setModel(false);
        showAlert(15, res.data.message, "success");
        setTraning({ file: "", url: "" });
        setTitle("");
        setDesc("");
        getTraning();
      } else {
        showAlert(15, res.data.message, "error");
      }
    } catch (e) {
      console.error(e, "traning create error");
      showAlert(15, "An error occurred while submitting data", "error");
    } finally {
      setLoading(false);
    }
  };

  const EditTrainingData = async (id: any) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    let data = {
      title: title,
      description: desc,
      url: traning?.url,
    };

    try {
      const res = await axios.put(`${BASE_URL}/training/${id}`, data, {
        maxBodyLength: Infinity,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res, "daaaaaaaaaaaaa");
      console.log(res.data, "edit traning response");
      if (res.data) {
        setModel(false);
        showAlert(15, res.data.message, "success");
        setEdit(false);
        setTraning({ file: "", url: "" });
        setTitle("");
        setDesc("");
        getTraning();
      } else {
        showAlert(15, res.data.message, "error");
      }
    } catch (e) {
      console.error(e, "edit traning create error");
      showAlert(15, "An error occurred while submitting data", "error");
    } finally {
      setLoading(false);
    }
  };

  const deleteTraining = async (id: any) => {
    console.log(id, "asssssssssss");
    const token = localStorage.getItem("token");
    try {
      const res = await axios.delete(`${BASE_URL}/training/${id}`, {
        maxBodyLength: Infinity,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data, "delete deleteTraining response");
      if (res) {
        setTableData(res?.data?.data);
        setModel(false);
        showAlert(15, res.data.message, "success");
        getTraning();
      } else {
        showAlert(15, res?.data?.message, "error");
      }
    } catch (e) {
      console.error(e, "deleteTraining  error");
    } finally {
      setLoading(false);
    }
  };

  const getTraning = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    console.log(`${BASE_URL}/banner`);
    try {
      const res = await axios.get(`${BASE_URL}/training`, {
        maxBodyLength: Infinity,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data, "traning response");
      if (res) {
        setTableData(res?.data?.data);
        setModel(false);
        setLoading(false);
      } else {
        showAlert(15, res?.data?.message, "error");
      }
    } catch (e) {
      console.error(e, "traning error");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (training) => {
    setEditId(training?._id);
    setEdit(true);
    setModel(true);
    setTitle(training?.title);
    setDesc(training?.description);
    setTraning({ file: training?.file, url: training?.url });
    setUploadedFiles([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = tableData?.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return loading ? (
    <div>
      <Loader />
    </div>
  ) : (
    <div>
      <div className="my-6">
        <h2 className="text-xl font-semibold dark:text-white">Training</h2>
      </div>
      <div className="table-responsive mb-5">
        <table>
          <thead>
            <tr>
              <th>SR NO.</th>
              <th>TITLE</th>
              <th>FILE</th>
              <th>DESC</th>
              <th className="text-center">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData?.map((data, index) => {
              return (
                <tr key={data?._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="whitespace-nowrap">{data?.title}</div>
                  </td>
                  <td>
                    <a
                      className="whitespace-nowrap"
                      href={data?.url}
                      target="_blank"
                    >
                      {data?.url}
                    </a>
                  </td>
                  <td>
                    <div className="whitespace-nowrap">{data?.description}</div>
                  </td>
                  <td className="border-b border-[#ebedf2] p-3 text-center dark:border-[#191e3a] md:space-x-4">
                    <ModeEditIcon
                      onClick={() => {
                        handleEditClick(data);
                      }}
                    />
                    <DeleteIcon onClick={() => deleteTraining(data?._id)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={tableData?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        <div className="flex justify-end">
          <button
            type="submit"
            className="btn btn-primary mt-6 w-fit"
            onClick={() => setModel(true)}
          >
            Add Training
          </button>
        </div>
      </div>

      {model && (
        <Model
          modalname={edit === true ? "Edit Training" : "Add Training"}
          model={model}
          setModel={setModel}
          banner={traning}
          setBanner={setTraning}
          submitData={
            edit === true ? () => EditTrainingData(editId) : () => submitData()
          }
          setTitle={setTitle}
          title={title}
          isTraining={true}
          // isbanner={false}
          setDesc={setDesc}
          desc={desc}
          files={files}
          setFiles={setFiles}
          uploadedFiles={uploadedFiles}
          setUploadedFiles={uploadedFiles}
        />
      )}
    </div>
  );
};

export default auth(Traning);
