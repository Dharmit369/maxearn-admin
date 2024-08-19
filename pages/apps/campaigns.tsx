import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loader from "@/components/Layouts/Loader";
import { ReactSortable } from "react-sortablejs";
import Select from "react-select";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import InfoIcon from "@mui/icons-material/Info";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import DescriptionIcon from "@mui/icons-material/Description";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import VideocamIcon from "@mui/icons-material/Videocam";
import { showAlert } from "@/components/showAlert";
import { BASE_URL } from "@/constants";
import axios from "axios";
import CreateCampaign from "./CreateCampaign";
import LeadCampaign from "./LeadCampaign";
import LocationCampaign from "./LocationCampaign";
import VideoCampaign from "./VideoCampaign";
import { Tooltip } from "@mui/material";
import moment from "moment";
import auth from "../utils/auth";
import StatusModel from "@/components/statusModel";

const Campaigns = () => {
  const data = {
    name: "",
    title: "",
    user_payout: "",
    advertize_payout: "",
    target_link: "",
    category_id: "",
    approval_rate: "",
    joining_fee: "",
    annual_fee: "",
    info: "",
    tagline1: "",
    tagline2: "",
    pincode_proceed: "",
    content: "",
    // goals: "",
    price1: "",
    description1: "",
    price2: "",
    description2: "",
    price3: "",
    description3: "",
    price4: "",
    description4: "",
    interest_rate: "",
    loan_amount: "",
  };
  const [loading, setLoading] = useState(true);
  const [createCampaigns, setCreateCampaigns] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [categoryOptionData, setCategoryOptionData] = useState([]);
  const [campaignData, setCampaignData] = useState(data);
  const [featured_image, setFeatured_image] = useState(null);
  const [offer_image, setOffer_image] = useState(null);
  const [shared_image, setShared_image] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [leadOpen, setLeadOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [rowId, setRowId] = useState();
  const [statusDropdown, setStatusDropdown] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedData, setSelectedData] = useState(null);

  const [statusChange, setStatusChange] = useState("");
  const [goals, setGoals] = useState([{ description: "", price: "" }]);
  const [content, setContent] = useState(``);
  const [shareContent, setShareContent] = useState(``);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const [status, setStatus] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [statusModelOpen, setStatusModelOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsEdit(false);
    setCreateCampaigns(false);
    setCampaignData(data);
    setContent("");
    setShareContent("");
  };

  useEffect(() => {
    getData();
  }, [categoryId, search, statusChange]);

  useEffect(() => {
    // categoryOption();
    getDropdown();
  }, []);

  const getData = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    // console.log(`${BASE_URL}/banner`);
    try {
      const res = await axios.get(
        `${BASE_URL}/marketing/campaign?category_id=${categoryId}&name=${search}&status=${statusChange}`,
        {
          maxBodyLength: Infinity,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //   console.log(res.data, "data response");
      if (res) {
        // router.push("/dashboard/dashboard");
        setTableData(res?.data?.data);

        // setAddCategory(false);
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

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setCampaignData({
      ...campaignData,
      [name]: value,
    });
  };

  const handleStatus = (id, newStatus) => {
    updateStatus({ id: id, status: newStatus });
  };
  function handleMultipleChange(event: any, name: any) {
    if (name === "featured_image") {
      setFeatured_image(event?.target?.files[0]);
    }
    if (name === "offer_image") {
      setOffer_image(event?.target?.files[0]);
    }
    if (name === "shared_image") {
      setShared_image(event?.target?.files[0]);
    }
  }

  const submitData = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      //   console.log(banner);
      const goalsData = [
        {
          description: campaignData?.description1 ?? "",
          price: campaignData?.price1 ?? "",
        },
        {
          description: campaignData?.description2 ?? "",
          price: campaignData?.price2 ?? "",
        },
        {
          description: campaignData?.description3 ?? "",
          price: campaignData?.price3 ?? "",
        },
        {
          description: campaignData?.description4 ?? "",
          price: campaignData?.price4 ?? "",
        },
      ];
      console.log(goalsData, content, shareContent, "ssssss");
      console.log(
        featured_image,
        offer_image,
        shared_image,
        "category_idcategory_idcategory_idcategory_id"
      );
      const formData = new FormData();
      formData.append("name", campaignData?.name);
      formData.append("title", campaignData?.title);
      formData.append("user_payout", campaignData?.user_payout);
      formData.append("advertize_payout", campaignData?.advertize_payout);
      formData.append("target_link", campaignData?.target_link);
      formData.append("category_id", campaignData?.category_id);
      formData.append("approval_rate", campaignData?.approval_rate);
      formData.append("joining_fee", campaignData?.joining_fee);
      formData.append("annual_fee", campaignData?.annual_fee);
      // formData.append("info", campaignData?.info);
      formData.append("tagline1", campaignData?.tagline1);
      formData.append("tagline2", campaignData?.tagline2);
      formData.append("pincode_proceed", campaignData?.pincode_proceed);
      formData.append("content", content);
      formData.append("goals", JSON.stringify(goalsData));
      //   formData.append("price", campaignData?.price);
      //   formData.append("status", campaignData?.status);
      formData.append("featured_image", featured_image);
      formData.append("offer_image", offer_image);
      formData.append("shared_image", shared_image);
      formData.append("offer_description", shareContent);
      formData.append("loan_amount", campaignData?.loan_amount);
      formData.append("interest_rate", campaignData?.interest_rate);

      console.log("formData: ", formData);
      const res = await axios.post(`${BASE_URL}/marketing/campaign`, formData, {
        maxBodyLength: Infinity,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data, "create response");
      if (res.data) {
        setCreateCampaigns(false);
        showAlert(15, res.data.message, "success");
        setCampaignData({
          name: "",
          title: "",
          user_payout: "",
          advertize_payout: "",
          target_link: "",
          category_id: "",
          approval_rate: "",
          joining_fee: "",
          annual_fee: "",
          info: "",
          tagline1: "",
          tagline2: "",
          pincode_proceed: "",
          content: "",
          goals: "",
          status: "",
          interest_rate: "",
          loan_amount: "",
        });
        setFeatured_image(null);
        setShared_image(null);
        setOffer_image(null);
        getData();
      } else {
        showAlert(15, res.data.message, "error");
      }
    } catch (e) {
      console.error(e, "banner create error");
      showAlert(15, "An error occurred while submitting data", "error");
    } finally {
      setLoading(false);
    }

    console.log("submit data ");
  };

  const updateData = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      //   console.log(banner);
      const goalsData = [
        {
          description: campaignData?.description1 ?? "",
          price: campaignData?.price1 ?? "",
        },
        {
          description: campaignData?.description2 ?? "",
          price: campaignData?.price2 ?? "",
        },
        {
          description: campaignData?.description3 ?? "",
          price: campaignData?.price3 ?? "",
        },
        {
          description: campaignData?.description4 ?? "",
          price: campaignData?.price4 ?? "",
        },
      ];
      console.log(goalsData, content, shareContent, "ssssss");
      console.log(
        campaignData?.pincode_proceed,
        "category_idcategory_idcategory_idcategory_id"
      );
      const formData = new FormData();
      formData.append("name", campaignData?.name);
      formData.append("title", campaignData?.title);
      formData.append("user_payout", campaignData?.user_payout);
      formData.append("advertize_payout", campaignData?.advertize_payout);
      formData.append("target_link", campaignData?.target_link);
      formData.append("category_id", campaignData?.category_id);
      formData.append("approval_rate", campaignData?.approval_rate);
      formData.append("joining_fee", campaignData?.joining_fee);
      formData.append("annual_fee", campaignData?.annual_fee);
      formData.append("info", campaignData?.info);
      formData.append("tagline1", campaignData?.tagline1);
      formData.append("tagline2", campaignData?.tagline2);
      formData.append("pincode_proceed", campaignData?.pincode_proceed);
      formData.append("content", content);
      formData.append("goals", JSON.stringify(goalsData));
      //   formData.append("price", campaignData?.price);
      //   formData.append("status", campaignData?.status);
      formData.append(
        "featured_image",
        featured_image ? featured_image : campaignData?.featured_image
      );
      formData.append(
        "offer_image",
        offer_image ? offer_image : campaignData?.offer_image
      );
      formData.append(
        "shared_image",
        shared_image ? shared_image : campaignData?.shared_image
      );
      formData.append("offer_description", shareContent);
      formData.append("loan_amount", campaignData?.loan_amount);
      formData.append("interest_rate", campaignData?.interest_rate);

      console.log("formData: ", formData);
      const res = await axios.put(
        `${BASE_URL}/marketing/campaign/${editId}`,
        formData,
        {
          maxBodyLength: Infinity,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data, "create response");
      if (res.data) {
        setCreateCampaigns(false);
        showAlert(15, res.data.message, "success");
        setCampaignData({
          name: "",
          title: "",
          user_payout: "",
          advertize_payout: "",
          target_link: "",
          category_id: "",
          approval_rate: "",
          joining_fee: "",
          annual_fee: "",
          info: "",
          tagline1: "",
          tagline2: "",
          pincode_proceed: "",
          content: "",
          goals: "",
          status: "",
        });
        setFeatured_image(null);
        setShared_image(null);
        setOffer_image(null);
        getData();
      } else {
        showAlert(15, res.data.message, "error");
      }
    } catch (e) {
      console.error(e, "banner create error");
      showAlert(15, "An error occurred while submitting data", "error");
    } finally {
      setLoading(false);
    }

    console.log("submit data ");
  };

  const deleteData = async (id: any) => {
    const token = localStorage.getItem("token");
    console.log(`${BASE_URL}/marketing/campaign/${id}`);
    try {
      const res = await axios.delete(`${BASE_URL}/marketing/campaign/${id}`, {
        maxBodyLength: Infinity,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data, "delete banner response");
      if (res) {
        setTableData(res?.data?.data);
        setCreateCampaigns(false);
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

  const handleClick = (expression: any, value: any, data: any) => {
    if (expression === "lead") {
      setSelectedData(data);
      setLeadOpen(true);
      setRowId(value);
    }
    if (expression === "video") {
      setVideoOpen(true);
      setRowId(value);
    }
  };

  const getDropdown = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${BASE_URL}/marketing/dropdown/campaign`, {
        maxBodyLength: Infinity,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res) {
        console.log(
          res?.data?.data?.categoryNames,
          "res?.data?.data?.categoryNames"
        );
        setCategoryOptionData(res?.data?.data?.categoryNames);
        setStatusDropdown(res?.data?.data?.status);
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

  const handleDropdown = (text: any, e: any) => {
    if (text === "category") {
      setCategoryId(e.target.value);
    } else {
      setStatusChange(e.target.value);
    }
  };

  const updateStatus = async ({ id, status }) => {
    setLoading(true);
    const token = localStorage.getItem("token");

    const data = {
      status: status,
    };
    try {
      const res = await axios.put(
        `${BASE_URL}/marketing/campaignStatus/${id}`,
        data,
        {
          maxBodyLength: Infinity,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data, "ssssssssssssssssssssssssssssssssssssssssssssss");
      if (res) {
        // setTableData(res?.data?.data);
        setLoading(false);
        showAlert(15, res?.data?.message, "success");
        setStatusModelOpen(false);

        getData();
      } else {
        showAlert(15, res?.data?.message, "error");
        setStatusModelOpen(false);

        getData();
      }
    } catch (e) {
      console.error(e, "login error");
      setStatusModelOpen(false);
    } finally {
      setLoading(false);
      setStatusModelOpen(false);
    }
  };

  const submitStatusData = () => {
    if (selectedId && status) {
      updateStatus({ id: selectedId, status: status });
    }
    setStatusModelOpen(false);
  };

  const handleDetails = (data: any) => {
    setIsEdit(true);
    setCreateCampaigns(true);
    setCampaignData(data);
    setContent(data?.content);
    setShareContent(data?.offer_description);
    setEditId(data?._id);
  };

  console.log("id", campaignData);
  console.log("createCampaigns", createCampaigns);

  return loading ? (
    <div>
      <Loader />
    </div>
  ) : (
    <div>
      {createCampaigns === false &&
        leadOpen === false &&
        locationOpen === false &&
        videoOpen === false && (
          <div className="group relative w-full cursor-pointer items-center overflow-hidden border-none  bg-white ring-1 ring-gray-900/5 dark:bg-[#261C16] dark:ring-gray-700 sm:rounded-lg sm:px-5 ">
            <div className="my-6">
              <h2 className="text-xl font-semibold dark:text-white">
                Campaigns
              </h2>
            </div>
            <div className="my-6 flex justify-between xs:flex-col xs:space-y-4 xs:px-5 lg:flex-row lg:gap-3 lg:px-0">
              <select
                id="categories"
                className="form-select mt-4 h-10 text-white-dark dark:border-none dark:bg-[#1E1611]"
                onChange={(e) => handleDropdown("category", e)}
                value={
                  categoryOptionData?.filter((itm) => itm?.id === categoryId)
                    ?.name
                }
              >
                <option value={""}>All</option>
                {categoryOptionData?.map((itm) => (
                  <option value={itm?.id}>{itm?.name}</option>
                ))}
              </select>

              <select
                id="status"
                className="form-select h-10 text-white-dark dark:border-none dark:bg-[#1E1611]"
                onChange={(e) => handleDropdown("status", e)}
                value={statusChange}
              >
                <option value={""}>All</option>
                {statusDropdown?.map((itm) => (
                  <option value={itm}>{itm}</option>
                ))}
              </select>
            </div>

            <div>
              <div className="table-responsive mb-5  xs:px-5 lg:px-0">
                <table>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>User</th>
                      <th>Campaign Name</th>
                      <th>Created At</th>
                      <th>Status</th>
                      <th>Update Status</th>

                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData?.map((data) => {
                      return (
                        <tr key={data?.id}>
                          <td>
                            {/* <div className="whitespace-nowrap">{data.id}</div> */}
                            <img
                              src={data?.featured_image}
                              alt={data?.featured_image}
                              className="w-13 h-10"
                            />
                          </td>
                          <td>{data?.name}</td>
                          <td>{data?.name}</td>
                          <td>
                            {moment(data?.created_at)?.format("DD/MM/YYYY")}
                          </td>
                          <td>
                            <span
                              className={`badge whitespace-nowrap ${
                                data?.status === "in_review"
                                  ? "bg-primary   "
                                  : data?.status === "Pending"
                                  ? "bg-secondary"
                                  : data?.status === "In Progress"
                                  ? "bg-success"
                                  : data?.status === "Canceled"
                                  ? "bg-danger"
                                  : "bg-primary"
                              }`}
                            >
                              {data?.status?.toUpperCase()}
                            </span>
                          </td>
                          <select
                            id="Type"
                            className="form-select mt-2 w-36 text-white-dark dark:border-none dark:bg-[#261C16]"
                            onChange={(e) =>
                              handleStatus(data?._id, e.target.value)
                            }
                            value={data?.status}
                          >
                            <option value={""}>Please Select</option>
                            <option value={"InReview"}>InReview</option>
                            <option value={"Approved"}>Approved</option>
                            <option value={"Ended"}>Ended</option>
                          </select>
                          <td className="text-center">
                            <div className="flex w-full justify-between">
                              <Tooltip title="Edit" placement="top">
                                <ModeEditIcon
                                  onClick={() => handleDetails(data)}
                                />
                              </Tooltip>
                              <Tooltip title="Delete" placement="top">
                                <DeleteIcon
                                  onClick={() => deleteData(data?._id)}
                                />
                              </Tooltip>
                              <Tooltip title="Lead" placement="top">
                                <PersonIcon
                                  onClick={() =>
                                    handleClick("lead", data?._id, data)
                                  }
                                />
                              </Tooltip>
                              {/* <Tooltip title="offer18 campaign" placement="top">
                                <ExitToAppIcon />
                              </Tooltip> */}
                              <Tooltip title="Pin Code" placement="top">
                                <LocationOnIcon
                                  onClick={() => setLocationOpen(true)}
                                />
                              </Tooltip>
                              <Tooltip title="video" placement="top">
                                <VideocamIcon
                                  onClick={() =>
                                    handleClick("video", data?._id)
                                  }
                                />
                              </Tooltip>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="btn btn-primary my-6 w-fit"
                onClick={() => setCreateCampaigns(true)}
              >
                Create Campaigns
              </button>
            </div>
          </div>
        )}

      {createCampaigns && (
        <CreateCampaign
          createCampaigns={createCampaigns}
          setCreateCampaigns={setCreateCampaigns}
          handleChange={handleChange}
          categoryOptionData={categoryOptionData}
          handleMultipleChange={handleMultipleChange}
          submitData={() => submitData()}
          setGoals={setGoals}
          goals={goals}
          campaignData={campaignData}
          content={content}
          setContent={setContent}
          setShareContent={setShareContent}
          shareContent={shareContent}
          handleClose={handleClose}
          isEdit={isEdit}
          updateData={updateData}
        />
      )}

      {leadOpen && (
        <LeadCampaign
          setLeadOpen={setLeadOpen}
          tableData={tableData}
          rowId={rowId}
          campname={selectedData?.name}
          campprice={selectedData?.title}
        />
      )}

      {locationOpen && (
        <LocationCampaign
          setLocationOpen={setLocationOpen}
          tableData={tableData}
          rowId={rowId}
        />
      )}

      {statusModelOpen && (
        <StatusModel
          setStatusModelOpen={setStatusModelOpen}
          submitData={() => submitStatusData()}
        />
      )}

      {videoOpen && <VideoCampaign setVideoOpen={setVideoOpen} rowId={rowId} />}
    </div>
  );
};

export default auth(Campaigns);
