import { useEffect, useState, Fragment } from "react";
import { Tab } from "@headlessui/react";
import axios from "axios";
import Loader from "@/components/Layouts/Loader";
import StatusModel from "@/components/statusModel";
import { showAlert } from "@/components/showAlert";
import auth from "../utils/auth";
import { BASE_URL } from "@/constants";
import KycTable from "./kyc-table";
import CustomModal from "@/components/CustomModal";
import ReactPaginate from "react-paginate";
import { CSVLink } from "react-csv";
import TablePagination from "@mui/material/TablePagination";

const KycUser = () => {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [statusModelOpen, setStatusModelOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [statusId, setStatusId] = useState("");
  const [pendingKycData, setPendingKycData] = useState([]);
  const [submittedKycData, setSubmittedKycData] = useState([]);
  const [approveKycData, setApproveKycData] = useState([]);
  const [rejectedKycData, setRejectedKycData] = useState([]);
  const [kycCompletedOpen, setKycCompletedOpen] = useState(true);
  const [kycSubmittedOpen, setKycSubmittedOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedStatusId, setSelectedStatusId] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const openModal = () => setStatusModelOpen(true);
  const closeModal = () => setStatusModelOpen(false);
  const handleConfirm = () => {
    // Handle the confirmation action here
    console.log("Confirmed");
    closeModal();
  };
  useEffect(() => {
    getKycData();
  }, []);

  const getKycData = async () => {
    await Promise.all([
      getKyc(),
      getPendingKycData(),
      getsubmittedKycData(),
      getApprovedKycData(),
      getRejectedKycData(),
    ]);
    setLoading(false);
  };

  // const handleStatus = (e, id) => {
  //   setStatus(e.target.value);
  //   setStatusModelOpen(true);
  //   setStatusId(id);
  // };

  const getKyc = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${BASE_URL}/kyc/getKycWithBankDetails`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTableData(res?.data?.data);
    } catch (e) {
      console.error(e);
      // showAlert(15, e.message, "error");
    }
  };

  const getsubmittedKycData = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${BASE_URL}/admin/KYCDataCount/Submitted`, {
        maxBodyLength: Infinity,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data, "data response");

      setSubmittedKycData(res?.data?.data);

      setLoading(false);
    } catch (e) {
      console.error(e, "reject kyc error");
    } finally {
      setLoading(false);
    }
  };

  const getPendingKycData = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${BASE_URL}/admin/pendingKYCData`, {
        maxBodyLength: Infinity,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data, "data response");

      setPendingKycData(res?.data?.data);
      setLoading(false);
    } catch (e) {
      console.error(e, "peding kyc error");
    } finally {
      setLoading(false);
    }
  };
  const getApprovedKycData = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${BASE_URL}/admin/KYCDataCount/Approved`, {
        maxBodyLength: Infinity,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data, "data response");

      setApproveKycData(res?.data?.data);
      setLoading(false);
    } catch (e) {
      console.error(e, "Approved kyc error");
    } finally {
      setLoading(false);
    }
  };

  const getRejectedKycData = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${BASE_URL}/admin/KYCDataCount/Rejected`, {
        maxBodyLength: Infinity,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data, "data response");

      setRejectedKycData(res?.data?.data);

      setLoading(false);
    } catch (e) {
      console.error(e, "reject kyc error");
    } finally {
      setLoading(false);
    }
  };

  const submitData = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    const data = {
      status: selectedStatus,
      message: modalMessage,
    };

    try {
      const res = await axios.put(
        `${BASE_URL}/kyc/updateKycStatus/${selectedStatusId}`,
        data,
        {
          maxBodyLength: Infinity,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data, "data response");
      if (res) {
        setLoading(false);
        showAlert(15, res?.data?.message, "success");
        getKyc(),
          getPendingKycData(),
          getsubmittedKycData(),
          getApprovedKycData(),
          getRejectedKycData(),
          setStatusModelOpen(false);
      } else {
        showAlert(15, res?.data?.message, "error");
        setStatusModelOpen(false);
        setLoading(false);
      }
    } catch (e) {
      console.error(e, "API error");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleStatus = (e, statusId) => {
    const status = e.target.value;
    setSelectedStatus(status);
    setSelectedStatusId(statusId);
    setStatusModelOpen(true);
  };

  const convertTableDataToCSV = (data) => {
    return data.map((item) => ({
      ID: item?._id,
      UserName: item?.username,
      AffiliateID: item?.affiliate_id || "-",
      PANCard: item?.pan_card || "-",
      AadharCardFront: item?.adhar_card_front || "-",
      AadharCardBack: item?.adhar_card_back || "-",
      ChequeBook: item?.chequebook || "-",
      PassBook: item?.passbook || "-",
      Status: item?.status || "-",
    }));
  };

  const convertPendingKycDataToCSV = (data) => {
    return data?.map((item) => ({
      ID: item?._id,
      UserName: item?.username,
      AffiliateID: item?.affiliate_id || "-",
      PANCard: item?.pan_card || "-",
      AadharCardFront: item?.adhar_card_front || "-",
      AadharCardBack: item?.adhar_card_back || "-",
      ChequeBook: item?.chequebook || "-",
      PassBook: item?.passbook || "-",
      Status: item?.status || "-",
    }));
  };

  const convertSubmittedKycDataToCSV = (data) => {
    return data?.flatMap((user) =>
      user?.kycData.map((item) => ({
        ID: item?._id,
        UserName: user?.user?.username,
        AffiliateID: user?.user?.affiliate_id || "-",
        PANCard: item?.pan_card || "-",
        AadharCardFront: item?.adhar_card_front || "-",
        AadharCardBack: item?.adhar_card_back || "-",
        ChequeBook: item?.chequebook || "-",
        PassBook: item?.passbook || "-",
        Status: item?.status || "-",
      }))
    );
  };

  const exportTableData = () => {
    const headers = [
      "ID",
      "USER NAME",
      "AFFILIATE ID",
      "PAN CARD",
      "AADHAR CARD FRONT",
      "AADHAR CARD BACK",
      "CHEQUE BOOK",
      "PASS BOOK",
      "STATUS",
    ];

    const rows =
      approveKycData?.userData?.flatMap((user, userIndex) =>
        user?.user?.kycData?.map((data) => [
          userIndex + 1,
          user?.user?.username || "-",
          user?.user?.affiliate_id || "-",
          data?.pan_card || "-",
          data?.adhar_card_front || "-",
          data?.adhar_card_back || "-",
          data?.chequebook || "-",
          data?.passbook || "-",
          data?.status || "-",
        ])
      ) || [];

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [
        headers.join(","),
        ...rows.map((row) => row.map((item) => `"${item}"`).join(",")),
      ].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Lead-List.csv");
    document.body.appendChild(link);

    link.click();
  };

  const exportSubmitTableData = () => {
    const headers = [
      "ID",
      "USER NAME",
      "AFFILIATE ID",
      "PAN CARD",
      "AADHAR CARD FRONT",
      "AADHAR CARD BACK",
      "CHEQUE BOOK",
      "PASS BOOK",
      "STATUS",
    ];

    const rows =
      submittedKycData?.userData?.flatMap((user, userIndex) =>
        user?.user?.kycData?.map((data) => [
          userIndex + 1,
          user?.user?.username || "-",
          user?.user?.affiliate_id || "-",
          data?.pan_card || "-",
          data?.adhar_card_front || "-",
          data?.adhar_card_back || "-",
          data?.chequebook || "-",
          data?.passbook || "-",
          data?.status || "-",
        ])
      ) || [];

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [
        headers.join(","),
        ...rows.map((row) => row.map((item) => `"${item}"`).join(",")),
      ].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Lead-List.csv");
    document.body.appendChild(link);

    link.click();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const AllpaginatedData = tableData?.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  const SubmitedpaginatedData = submittedKycData?.userData?.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const PendingpaginatedData = pendingKycData?.userData?.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  const ApprovedpagintedData = approveKycData?.userData?.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return loading ? (
    <div>
      <Loader />
    </div>
  ) : (
    <div className="m-0 p-0">
      <div className="mb-4 w-full rounded border border-white-light bg-white px-0 shadow-[4px_6px_10px_-3px_#bfc9d4] dark:border-none dark:bg-[#29221C] dark:shadow-custom sm:w-[78.5vw]">
        <Tab.Group>
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
                  All ({tableData.length})
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
                  Pending User (
                  {pendingKycData?.userData?.length
                    ? pendingKycData?.userData?.length
                    : 0}
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
                  Submitted KYC (
                  {submittedKycData?.userData?.length
                    ? submittedKycData?.userData?.length
                    : 0}
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
                  Approved KYC (
                  {approveKycData?.userData?.length
                    ? approveKycData?.userData?.length
                    : 0}
                  )
                </button>
              )}
            </Tab>
            {/* <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`${
                    selected
                      ? "bg-primary text-white !outline-none dark:bg-[#FE6C00]"
                      : ""
                  }
                -mb-[1px] ml-5 block rounded p-3.5 py-2 hover:bg-primary hover:text-white dark:hover:bg-[#FE6C00]`}
                >
                  Rejected KYC (
                  {rejectedKycData?.userData?.length
                    ? rejectedKycData?.userData?.length
                    : 0}
                  )
                </button>
              )}
            </Tab> */}
          </Tab.List>

          <Tab.Panels>
            <Tab.Panel>
              <div className="mb-5 mr-10 mt-5 flex justify-end">
                <CSVLink
                  data={convertTableDataToCSV(tableData)}
                  filename={"all-data.csv"}
                  className="btn btn-primary"
                >
                  Export All Data
                </CSVLink>
              </div>
              <div className="table-responsive mb-5 mt-5 max-h-96">
                <table className="   scrollbar-thin scrollbar-track-[#010314] scrollbar-thumb-[#1a2941]">
                  <thead className="sticky top-0 bg-blue-100 ">
                    <tr>
                      <th>ID</th>
                      <th>User Name</th>
                      <th>AFFILIATE ID</th>
                      <th>PAN CARD</th>
                      <th>AADHAR CARD FRONT</th>
                      <th>AADHAR CARD BACK</th>
                      <th>CHEQUE BOOK</th>
                      <th>PASS BOOK</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {AllpaginatedData?.map((data, index) => {
                      return (
                        <tr key={data?._id}>
                          <td>{index + 1}</td>
                          <td>{data?.username}</td>
                          <td>
                            <div className="whitespace-nowrap">
                              {data?.affiliate_id || "-"}
                            </div>
                          </td>
                          <td>
                            <a
                              href={`${data?.pan_card}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="PAN Card"
                            >
                              {data?.pan_card ? (
                                <img
                                  src={data?.pan_card}
                                  alt="PAN Card"
                                  className="h-16 w-16 object-contain"
                                />
                              ) : (
                                "-"
                              )}
                            </a>
                          </td>
                          <td>
                            <a
                              href={`${data?.adhar_card_front}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="Aadhar Card Front"
                            >
                              {data?.adhar_card_front ? (
                                <img
                                  src={data?.adhar_card_front}
                                  alt="Aadhar Card Front"
                                  className="h-16 w-16 object-contain"
                                />
                              ) : (
                                "-"
                              )}
                            </a>
                          </td>
                          <td>
                            <a
                              href={`${data?.adhar_card_back}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="Aadhar Card Back"
                            >
                              {data?.adhar_card_back ? (
                                <img
                                  src={data?.adhar_card_back}
                                  alt="Aadhar Card Back"
                                  className="h-16 w-16 object-contain"
                                />
                              ) : (
                                "-"
                              )}
                            </a>
                          </td>
                          <td>
                            <a
                              href={`${data?.chequebook}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="Aadhar Card Back"
                            >
                              {data?.chequebook ? (
                                <img
                                  src={data?.chequebook}
                                  alt="Aadhar Card Back"
                                  className="h-16 w-16 object-contain"
                                />
                              ) : (
                                "-"
                              )}
                            </a>
                          </td>
                          <td>
                            <a
                              href={`${data?.passbook}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="Pass Book"
                            >
                              {data?.passbook ? (
                                <img
                                  src={data?.passbook}
                                  alt="passbook"
                                  className="h-16 w-16 object-contain"
                                />
                              ) : (
                                "-"
                              )}
                            </a>
                          </td>
                          <td>
                            {/* <div className="whitespace-nowrap"> */}
                            <select
                              id="Type"
                              className="form-select w-32 text-white-dark dark:border-none dark:bg-[#261C16]"
                              onChange={(e) => handleStatus(e, data?._id)}
                              value={data?.status}
                            >
                              <option value={""}>Please Select</option>
                              <option value={"Submitted"}>Submitted</option>
                              <option value={"Approved"}>Approved</option>
                              <option value={"Rejected"}>Rejected</option>
                            </select>
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
              </div>
            </Tab.Panel>
            <Tab.Panel>
              {/* <KycTable KycData={pendingKycData} handleStatus={handleStatus} /> */}
              <div className="mb-5 mr-10 mt-5 flex justify-end">
                <CSVLink
                  data={convertPendingKycDataToCSV(
                    pendingKycData?.userData || []
                  )}
                  filename={"pending-kyc-data.csv"}
                  className="btn btn-primary"
                >
                  Export Pending KYC
                </CSVLink>
              </div>
              <div className="table-responsive mb-5  mt-5 max-h-96">
                <table className="scrollbar-thin scrollbar-track-[#010314] scrollbar-thumb-[#1a2941] w-full">
                  <thead className="sticky top-0 bg-blue-100 ">
                    <tr>
                      <th>ID</th>
                      <th>User Name</th>

                      <th>AFFILIATE ID</th>
                      <th>PAN CARD</th>
                      <th>AADHAR CARD FRONT</th>
                      <th>AADHAR CARD BACK</th>
                      <th>CHEQUE BOOK</th>
                      <th>PASS BOOK</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PendingpaginatedData?.map((data, userIndex) => (
                      <tr key={data?._id}>
                        <td>{userIndex + 1}</td>
                        <td>{data?.username}</td>
                        <td>
                          <div className="whitespace-nowrap">
                            {data?.affiliate_id || "-"}
                          </div>
                        </td>
                        <td>
                          <a
                            href={`${data?.pan_card}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="PAN Card"
                          >
                            {data?.pan_card ? (
                              <img
                                src={data?.pan_card}
                                alt="PAN Card"
                                className="h-16 w-16 object-contain"
                              />
                            ) : (
                              "-"
                            )}
                          </a>
                        </td>
                        <td>
                          <a
                            href={`${data?.adhar_card_front}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Aadhar Card Front"
                          >
                            {data?.adhar_card_front ? (
                              <img
                                src={data?.adhar_card_front}
                                alt="Aadhar Card Front"
                                className="h-16 w-16 object-contain"
                              />
                            ) : (
                              "-"
                            )}
                          </a>
                        </td>
                        <td>
                          <a
                            href={`${data?.adhar_card_back}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Aadhar Card Back"
                          >
                            {data?.adhar_card_back ? (
                              <img
                                src={data?.adhar_card_back}
                                alt="Aadhar Card Back"
                                className="h-16 w-16 object-contain"
                              />
                            ) : (
                              "-"
                            )}
                          </a>
                        </td>
                        <td>
                          <a
                            href={`${data?.chequebook}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Aadhar Card Back"
                          >
                            {data?.chequebook ? (
                              <img
                                src={data?.chequebook}
                                alt="Aadhar Card Back"
                                className="h-16 w-16 object-contain"
                              />
                            ) : (
                              "-"
                            )}
                          </a>
                        </td>
                        <td>
                          <a
                            href={`${data?.passbook}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Pass Book"
                          >
                            {data?.passbook ? (
                              <img
                                src={data?.passbook}
                                alt="passbook"
                                className="h-16 w-16 object-contain"
                              />
                            ) : (
                              "-"
                            )}
                          </a>
                        </td>
                        <td>
                          <select
                            id="Type"
                            className="form-select w-32 text-white-dark dark:border-none dark:bg-[#261C16]"
                            onChange={(e) => handleStatus(e, data?._id)}
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
                  count={pendingKycData?.userData?.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="mb-5 mr-10 mt-5 flex justify-end">
                <div className="mb-5 mr-10 mt-5 flex justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary my-6"
                    onClick={exportSubmitTableData}
                  >
                    Export
                  </button>
                </div>
              </div>
              <div className="table-responsive mb-5  mt-5 max-h-96">
                <table className="scrollbar-thin scrollbar-track-[#010314] scrollbar-thumb-[#1a2941] w-full">
                  <thead className="sticky top-0 bg-blue-100 ">
                    <tr>
                      <th>ID</th>
                      <th>User Name</th>
                      <th>AFFILIATE ID</th>
                      <th>PAN CARD</th>
                      <th>AADHAR CARD FRONT</th>
                      <th>AADHAR CARD BACK</th>
                      <th>CHEQUE BOOK</th>
                      <th>PASS BOOK</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SubmitedpaginatedData?.map((user, userIndex) =>
                      user?.user?.kycData?.map((data, index) => (
                        <tr key={data?._id}>
                          <td>{userIndex + 1}</td>
                          <td>{user?.user?.username}</td>
                          <td>
                            <div className="whitespace-nowrap">
                              {user?.user?.affiliate_id || "-"}
                            </div>
                          </td>
                          <td>
                            <a
                              href={`${data?.pan_card}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="PAN Card"
                            >
                              {data?.pan_card ? (
                                <img
                                  src={data?.pan_card}
                                  alt="PAN Card"
                                  className="h-16 w-16 object-contain"
                                />
                              ) : (
                                "-"
                              )}
                            </a>
                          </td>
                          <td>
                            <a
                              href={`${data?.adhar_card_front}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="Aadhar Card Front"
                            >
                              {data?.adhar_card_front ? (
                                <img
                                  src={data?.adhar_card_front}
                                  alt="Aadhar Card Front"
                                  className="h-16 w-16 object-contain"
                                />
                              ) : (
                                "-"
                              )}
                            </a>
                          </td>
                          <td>
                            <a
                              href={`${data?.adhar_card_back}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="Aadhar Card Back"
                            >
                              {data?.adhar_card_back ? (
                                <img
                                  src={data?.adhar_card_back}
                                  alt="Aadhar Card Back"
                                  className="h-16 w-16 object-contain"
                                />
                              ) : (
                                "-"
                              )}
                            </a>
                          </td>
                          <td>
                            <a
                              href={`${data?.chequebook}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="Aadhar Card Back"
                            >
                              {data?.chequebook ? (
                                <img
                                  src={data?.chequebook}
                                  alt="Aadhar Card Back"
                                  className="h-16 w-16 object-contain"
                                />
                              ) : (
                                "-"
                              )}
                            </a>
                          </td>
                          <td>
                            <a
                              href={`${data?.passbook}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="Pass Book"
                            >
                              {data?.passbook ? (
                                <img
                                  src={data?.passbook}
                                  alt="passbook"
                                  className="h-16 w-16 object-contain"
                                />
                              ) : (
                                "-"
                              )}
                            </a>
                          </td>
                          <td>
                            <select
                              id="Type"
                              className="form-select w-32 text-white-dark dark:border-none dark:bg-[#261C16]"
                              onChange={(e) => handleStatus(e, data?._id)}
                              value={data?.status}
                            >
                              <option value={""}>Please Select</option>
                              <option value={"Submitted"}>Submitted</option>
                              <option value={"Approved"}>Approved</option>
                              <option value={"Rejected"}>Rejected</option>
                            </select>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={submittedKycData?.userData?.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="mb-5 mr-10 mt-5 flex justify-end">
                <button
                  type="submit"
                  className="btn btn-primary my-6"
                  onClick={exportTableData}
                >
                  Export
                </button>
              </div>
              <div className="table-responsive mb-5  mt-5 max-h-96">
                <table className="scrollbar-thin scrollbar-track-[#010314] scrollbar-thumb-[#1a2941] w-full">
                  <thead className="sticky top-0 bg-blue-100 ">
                    <tr>
                      <th>ID</th>
                      <th>USER NAME</th>
                      <th>AFFILIATE ID</th>
                      <th>PAN CARD</th>
                      <th>AADHAR CARD FRONT</th>
                      <th>AADHAR CARD BACK</th>
                      <th>CHEQUE BOOK</th>
                      <th>PASS BOOK</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ApprovedpagintedData?.map((user, userIndex) =>
                      user?.user?.kycData?.map((data, index) => (
                        <tr key={data?._id}>
                          <td>{userIndex + 1}</td>
                          <td>{user?.user?.username}</td>

                          <td>
                            <div className="whitespace-nowrap">
                              {user?.user?.affiliate_id || "-"}
                            </div>
                          </td>
                          <td>
                            <a
                              href={`${data?.pan_card}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="PAN Card"
                            >
                              {data?.pan_card ? (
                                <img
                                  src={data?.pan_card}
                                  alt="PAN Card"
                                  className="h-16 w-16 object-contain"
                                />
                              ) : (
                                "-"
                              )}
                            </a>
                          </td>
                          <td>
                            <a
                              href={`${data?.adhar_card_front}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="Aadhar Card Front"
                            >
                              {data?.adhar_card_front ? (
                                <img
                                  src={data?.adhar_card_front}
                                  alt="Aadhar Card Front"
                                  className="h-16 w-16 object-contain"
                                />
                              ) : (
                                "-"
                              )}
                            </a>
                          </td>
                          <td>
                            <a
                              href={`${data?.adhar_card_back}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="Aadhar Card Back"
                            >
                              {data?.adhar_card_back ? (
                                <img
                                  src={data?.adhar_card_back}
                                  alt="Aadhar Card Back"
                                  className="h-16 w-16 object-contain"
                                />
                              ) : (
                                "-"
                              )}
                            </a>
                          </td>
                          <td>
                            <a
                              href={`${data?.chequebook}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="Aadhar Card Back"
                            >
                              {data?.chequebook ? (
                                <img
                                  src={data?.chequebook}
                                  alt="Aadhar Card Back"
                                  className="h-16 w-16 object-contain"
                                />
                              ) : (
                                "-"
                              )}
                            </a>
                          </td>
                          <td>
                            <a
                              href={`${data?.passbook}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="Pass Book"
                            >
                              {data?.passbook ? (
                                <img
                                  src={data?.passbook}
                                  alt="passbook"
                                  className="h-16 w-16 object-contain"
                                />
                              ) : (
                                "-"
                              )}
                            </a>
                          </td>
                          <td>
                            <select
                              id="Type"
                              className="form-select w-32 text-white-dark dark:border-none dark:bg-[#261C16]"
                              onChange={(e) => handleStatus(e, data?._id)}
                              value={data?.status}
                            >
                              <option value={""}>Please Select</option>
                              <option value={"Submitted"}>Submitted</option>
                              <option value={"Approved"}>Approved</option>
                              <option value={"Rejected"}>Rejected</option>
                            </select>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={approveKycData?.userData?.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>

        <div className="flex justify-between px-4 py-7 xs:flex-col lg:flex-row "></div>
      </div>

      {statusModelOpen && (
        <CustomModal
          isOpen={statusModelOpen}
          onClose={() => setStatusModelOpen(false)}
          onConfirm={submitData} // Trigger API call on confirm
        >
          <input
            type="text"
            placeholder="Enter your message"
            value={modalMessage}
            className="px-6 py-3"
            onChange={(e) => setModalMessage(e.target.value)} // Update message state
          />
        </CustomModal>
      )}
    </div>
  );
};

export default auth(KycUser);
