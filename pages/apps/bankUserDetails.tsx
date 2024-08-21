import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Fragment } from "react";
import Image from "next/image";
import { BASE_URL, Images } from "@/constants";
import Link from "next/link";
import Loader from "@/components/Layouts/Loader";
import { ReactSortable } from "react-sortablejs";
import Select from "react-select";
import { Tab } from "@headlessui/react";
import auth from "../utils/auth";
import StatusModel from "@/components/statusModel";
import axios from "axios";
import { showAlert } from "@/components/showAlert";
import TablePagination from "@mui/material/TablePagination";
import { CSVLink } from "react-csv";

const BankUserDetails = () => {
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [statusModelOpen, setStatusModelOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [csvData, setCsvData] = useState([]);

  useEffect(() => {
    getBankDetails();
  }, []);

  const getBankDetails = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${BASE_URL}/bank-details`, {
        maxBodyLength: Infinity,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res) {
        setTableData(res?.data?.data);
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

  const updateStatus = async (id, status) => {
    setLoading(true);
    const token = localStorage.getItem("token");

    const data = {
      status: status,
    };
    try {
      const res = await axios.put(
        `${BASE_URL}/bank-details/updateBankStatus/${id}`,
        data,
        {
          maxBodyLength: Infinity,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res) {
        setLoading(false);
        showAlert(15, res?.data?.message, "success");
        getBankDetails();
      } else {
        showAlert(15, res?.data?.message, "error");
        getBankDetails();
      }
    } catch (e) {
      console.error(e, "login error");
    } finally {
      setLoading(false);
    }
  };

  const handleStatus = (id, newStatus) => {
    updateStatus(id, newStatus);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const renderTableData = (dataToShow) => {
    const paginatedData = dataToShow?.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );

    const converttoCsv = (data) => {
      return data?.map((item) => ({
        ID: item?._id,
        USERNAME: item?.username,
        MOBILE: item?.mobile_num || "-",
        AFFILIATE_ID: item?.affiliate_id || "-",
        BANK_NAME: item?.bank_name || "-",
        ACCOUNT_NUMBER: item?.account_number || "-",
        ACCOUNT_NAME: item?.account_name || "-",
        IFSC: item?.ifsc || "-",
        CHECKBOOK: item?.chequebook || "-",
        PASSBOOK: item?.passbook || "-",
        STATUS: item?.status || "-",
      }));
    };

    return (
      <div className="table-responsive no-scrollbar mb-5 max-h-96 ">
        <table className="w-full table-auto">
          <thead className="sticky top-0">
            <tr>
              <th>ID</th>
              <th>USER NAME</th>
              <th>MOBILE NO</th>
              <th>AFFILIATE ID</th>
              <th>BANK NAME</th>
              <th>ACCOUNT NUMBER</th>
              <th>ACCOUNT NAME</th>
              <th>IFSC</th>
              <th>CHECKBOOK</th>
              <th>PASSBOOK</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData?.map((data, index) => (
              <tr key={data?._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="whitespace-nowrap">{data?.username}</div>
                </td>
                <td>
                  <div className="whitespace-nowrap">{data?.mobile_num}</div>
                </td>
                <td>
                  <div className="whitespace-nowrap">{data?.affiliate_id}</div>
                </td>
                <td>{data.bank_name}</td>
                <td>{data?.account_number}</td>
                <td>{data?.account_name}</td>
                <td>{data?.ifsc}</td>
                <td>
                  <a
                    href={`${data?.chequebook}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Chequebook"
                  >
                    {data?.chequebook}
                  </a>
                </td>
                <td>
                  <a
                    href={`${data?.passbook}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Passbook"
                  >
                    {data?.passbook}
                  </a>
                </td>
                <td>
                  <select
                    id="Type"
                    className="form-select w-32 text-white-dark dark:border-none dark:bg-[#261C16]"
                    onChange={(e) => handleStatus(data?._id, e.target.value)}
                    value={data?.status}
                  >
                    <option value={""}>Please Select</option>
                    <option value={"Submitted"}>Submitted</option>
                    <option value={"Approved"}>Approved</option>
                    <option value={"Rejected"}>Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={dataToShow.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    );
  };

  const handleTabChange = (index) => {
    let filteredData = tableData;
    if (index === 1) {
      filteredData = tableData?.filter((data) => data?.status === "Submitted");
    } else if (index === 2) {
      filteredData = tableData?.filter((data) => data?.status === "Approved");
    }
    setCsvData(converttoCsv(filteredData));
  };

  return loading ? (
    <div>
      <Loader />
    </div>
  ) : (
    <div>
      <div className="mb-6 flex justify-between">
        <div className="my-6">
          <h2 className="text-xl font-semibold dark:text-white">
            Bank Details
          </h2>
        </div>
      </div>
      <Tab.Group onChange={handleTabChange}>
        <Tab.List className="mt-5 flex flex-wrap">
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={`${
                  selected
                    ? "bg-primary text-white !outline-none dark:bg-[#FE6C00]"
                    : ""
                }
                -mb-[1px] ml-5 block rounded p-3.5 py-2 hover:bg-primary hover:text-white dark:hover:bg-[#FE6C00]`}
              >
                All ({tableData?.length})
              </button>
            )}
          </Tab>

          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={`${
                  selected
                    ? "bg-primary text-white !outline-none dark:bg-[#FE6C00]"
                    : ""
                }
                -mb-[1px] ml-5 block rounded p-3.5 py-2 hover:bg-primary hover:text-white dark:hover:bg-[#FE6C00]`}
              >
                Submitted (
                {
                  tableData?.filter((data) => data?.status === "Submitted")
                    ?.length
                }
                )
              </button>
            )}
          </Tab>

          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={`${
                  selected
                    ? "bg-primary text-white !outline-none dark:bg-[#FE6C00]"
                    : ""
                }
                -mb-[1px] ml-5 block rounded p-3.5 py-2 hover:bg-primary hover:text-white dark:hover:bg-[#FE6C00]`}
              >
                Approved (
                {
                  tableData?.filter((data) => data?.status === "Approved")
                    ?.length
                }
                )
              </button>
            )}
          </Tab>
        </Tab.List>

        <Tab.Panels className="mt-2">
          <Tab.Panel>{renderTableData(tableData)}</Tab.Panel>
          <Tab.Panel>
            {renderTableData(
              tableData?.filter((data) => data?.status === "Submitted")
            )}
          </Tab.Panel>
          <Tab.Panel>
            {renderTableData(
              tableData?.filter((data) => data?.status === "Approved")
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      {/* <div className="float-right">
        <CSVLink
          data={csvData}
          filename="bank_user_details.csv"
          className="btn btn-primary"
        >
          Export as CSV
        </CSVLink>
      </div> */}
      {statusModelOpen && (
        <StatusModel
          setStatusModelOpen={setStatusModelOpen}
          submitData={() => submitData()}
        />
      )}
    </div>
  );
};

export default auth(BankUserDetails);
