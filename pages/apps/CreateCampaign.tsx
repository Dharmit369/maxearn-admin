import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef, useMemo } from "react";

import Dropdown from "@/components/Dropdown";
import { Fragment } from "react";
import Image from "next/image";
import { Images } from "@/constants";
import Link from "next/link";
import Loader from "@/components/Layouts/Loader";
import { ReactSortable } from "react-sortablejs";
import Select from "react-select";
import { Tab } from "@headlessui/react";
import auth from "../utils/auth";
// import 'suneditor/dist/css/suneditor.min.css';
// import "suneditor/dist/css/suneditor.min.css";

import "react-quill/dist/quill.snow.css";

import dynamic from "next/dynamic";

// const SunEditor = dynamic(() => import("suneditor-react"), {
//   ssr: false,
// });
const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
  loading: () => <p>Loading Editor...</p>,
});
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const CreateCampaigns = ({
  createCampaigns,
  handleChange,
  categoryOptionData,
  handleMultipleChange,
  submitData,
  goals,
  setGoals,
  campaignData,
  shareContent,
  setShareContent,
  content,
  setContent,
  handleClose,
  isEdit,
  updateData,
  ImageData,
}: any) => {
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(``);
  const [contents, setContents] = useState("");
  const editor = useRef(null);

  const config = {
    readonly: false,
    height: 400,
  };

  useEffect(() => {
    if (campaignData?.goals) {
      setGoals(campaignData?.goals);
    }
  }, [campaignData, setGoals]);

  console.log("createCampaigns2", createCampaigns);

  const handleBlur = (newContent) => {
    setShareContent(typeof newContent === "string" ? newContent : "");
  };
  const handleContentBlur = (newContent) => {
    setContent(typeof newContent === "string" ? newContent : "");
  };

  console.log("optionscampaignDatacampaignData", campaignData);

  const handleGoalChange = (index, e) => {
    const { name, value } = e.target;
    const updatedGoals = [...goals];
    updatedGoals[index] = { ...updatedGoals[index], [name]: value };
    setGoals(updatedGoals);
  };

  const addGoal = () => {
    setGoals((prevGoals) => [...prevGoals, { description: "", price: "" }]);
  };
  const handleDeleteGoal = (index) => {
    console.log("Before deleting:", goals);
    const updatedGoals = goals.filter((_, goalIndex) => goalIndex !== index);
    setGoals(updatedGoals);
    console.log("After deleting:", updatedGoals);
  };

  return (
    <div className="group relative w-full cursor-pointer items-center overflow-hidden border-none  bg-white ring-1 ring-gray-900/5 dark:bg-[#261C16] dark:ring-gray-700 sm:rounded-lg sm:px-5 ">
      <div className="p-8">
        <form className="space-y-5">
          <div className="mb-6 flex justify-between">
            <h2 className="text-xl font-semibold dark:text-white">
              {isEdit ? "Edit Campaign" : "Add Campaign"}
            </h2>
            <button
              className="text-gray-500 hover:text-gray-700 dark:text-white"
              onClick={() => handleClose()}
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

          <div>
            <label htmlFor="Name">Name</label>
            <input
              id="Name"
              type="text"
              placeholder="Name"
              className="form-input dark:border-none dark:bg-[#1E1611]"
              name="name"
              onChange={(e) => handleChange(e)}
              value={campaignData?.name || ""}
            />
          </div>

          <div>
            <label htmlFor="Title">Campaign Payout</label>
            <input
              id="Title"
              type="text"
              placeholder="Title"
              className="form-input dark:border-none dark:bg-[#1E1611]"
              name="title"
              onChange={(e) => handleChange(e)}
              value={campaignData?.title || ""}
            />
          </div>

          <div>
            <label htmlFor="UserPayout">User Payout</label>
            <input
              id="UserPayout"
              type="number"
              placeholder="UserPayout"
              className="form-input dark:border-none dark:bg-[#1E1611]"
              name="user_payout"
              onChange={(e) => handleChange(e)}
              value={campaignData?.user_payout || ""}
            />
          </div>

          <div>
            <label htmlFor="AdvertizePayout">Advertize Payout</label>
            <input
              id="AdvertizePayout"
              type="number"
              placeholder="Advertize Payout"
              className="form-input dark:border-none dark:bg-[#1E1611]"
              name="advertize_payout"
              onChange={(e) => handleChange(e)}
              value={campaignData?.advertize_payout || ""}
            />
          </div>

          <div>
            <label htmlFor="TargetLink">Target Link</label>
            <input
              id="TargetLink"
              type="text"
              placeholder="Target Link"
              className="form-input dark:border-none dark:bg-[#1E1611]"
              name="target_link"
              onChange={(e) => handleChange(e)}
              value={campaignData?.target_link || ""}
            />
          </div>

          <div>
            <label htmlFor="Categories">Categories</label>
            <select
              id="Categories"
              className="form-select text-white-dark dark:border-none dark:bg-[#1E1611]"
              name="category_id"
              onChange={(e) => handleChange(e)}
              value={
                campaignData?.category_id
                  ? campaignData?.category_id?._id
                  : campaignData?.category_id || ""
              }
            >
              <option value={""}>Please Select</option>
              {categoryOptionData?.map((itm) => (
                <option value={itm?.id}>{itm?.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="sessionTimeout"
              className="mb-2 block text-black dark:text-white"
            >
              Offer Image
            </label>
            <div className="flex justify-between xs:flex-col sm:flex-row">
              {isEdit && campaignData?.offer_image && (
                <div className="mb-2">
                  <img
                    src={campaignData.offer_image}
                    alt="offer_image"
                    className="h-32 w-32 object-cover"
                  />
                </div>
              )}
              <input
                id="OfferImage"
                type="file"
                placeholder="Upload Featured Image"
                className="form-input w-full dark:border-none dark:bg-[#1E1611]"
                name="offer_image"
                onChange={(event) => handleMultipleChange(event, "offer_image")}
              />
            </div>
          </div>

          <div>
            <label htmlFor="OfferImage">Campaign Image</label>

            <div className="flex justify-between xs:flex-col sm:flex-row">
              {isEdit && campaignData?.featured_image && (
                <div className="mb-2">
                  <img
                    src={campaignData.featured_image}
                    alt="offer_image"
                    className="h-32 w-32 object-cover"
                  />
                </div>
              )}
              <input
                id="featureImage"
                type="file"
                placeholder="feature Image"
                className="form-input dark:border-none dark:bg-[#1E1611]"
                name="offer_image"
                onChange={(event) =>
                  handleMultipleChange(event, "featured_image")
                }
              />
            </div>
          </div>

          <div>
            <label htmlFor="ApprovalRate">Approval Rate</label>

            <select
              id="ApprovalRate"
              className="form-select text-white-dark dark:border-none dark:bg-[#1E1611]"
              name="approval_rate"
              onChange={(e) => handleChange(e)}
              value={campaignData?.approval_rate}
            >
              <option value="">Please Select</option>
              <option value={"low"}>low</option>
              <option value={"medium"}>medium</option>
              <option value={"excellent"}>excellent</option>
            </select>
          </div>

          <div>
            <label htmlFor="JoiningFee">Joining Fee</label>
            <input
              id="JoiningFee"
              // type="number"
              placeholder="Joining Fee"
              className="form-input dark:border-none dark:bg-[#1E1611]"
              name="joining_fee"
              onChange={(e) => handleChange(e)}
              value={campaignData?.joining_fee || ""}
            />
          </div>

          <div>
            <label htmlFor="AnnualFee">Annual Fee</label>
            <input
              id="AnnualFee"
              // type="number"
              placeholder="Annual Fee"
              className="form-input dark:border-none dark:bg-[#1E1611]"
              name="annual_fee"
              onChange={(e) => handleChange(e)}
              value={campaignData?.annual_fee || ""}
            />
          </div>

          <div>
            <label htmlFor="TagLine1">TagLine 1</label>
            <input
              id="TagLine1"
              type="text"
              placeholder="TagLine 1"
              className="form-input dark:border-none dark:bg-[#1E1611]"
              name="tagline1"
              onChange={(e) => handleChange(e)}
              value={campaignData?.tagline1 || ""}
            />
          </div>

          <div>
            <label htmlFor="TagLine2">TagLine 2</label>
            <input
              id="TagLine2"
              type="text"
              placeholder="TagLine 2"
              className="form-input dark:border-none dark:bg-[#1E1611]"
              name="tagline2"
              onChange={(e) => handleChange(e)}
              value={campaignData?.tagline2 || ""}
            />
          </div>

          <div>
            <label htmlFor="SharedImage">Shared Image</label>
            <div className="flex justify-between xs:flex-col sm:flex-row">
              {isEdit && campaignData?.shared_image && (
                <div className="mb-2">
                  <img
                    src={campaignData.shared_image}
                    alt="Offer Image"
                    className="h-32 w-32 object-cover"
                  />
                </div>
              )}
              <input
                id="SharedImage"
                type="file"
                placeholder="Shared Image"
                className="form-input dark:border-none dark:bg-[#1E1611]"
                name="shared_image"
                onChange={(event) =>
                  handleMultipleChange(event, "shared_image")
                }
              />
            </div>
          </div>

          <div>
            <label htmlFor="PincodeProceed">Pincode Proceed</label>
            <select
              id="PincodeProceed"
              className="form-select text-white-dark dark:border-none dark:bg-[#1E1611]"
              name="pincode_proceed"
              onChange={(e) => handleChange(e)}
              value={campaignData?.pincode_proceed || ""}
            >
              <option value={""}>Please Select</option>
              <option value={"true"}>true</option>
              <option value={"false"}>false</option>
            </select>
          </div>

          <div>
            <label htmlFor="goals">Goals</label>
            {goals?.map((goal, index) => (
              <div key={index} className="my-5 flex gap-3">
                <input
                  type="text"
                  placeholder={`Description ${index + 1}`}
                  className="form-input dark:border-none dark:bg-[#1E1611]"
                  name="description"
                  value={goal?.description || ""}
                  onChange={(e) => handleGoalChange(index, e)}
                />
                <input
                  type="text"
                  placeholder={`Price ${index + 1}`}
                  className="form-input dark:border-none dark:bg-[#1E1611]"
                  name="price"
                  value={goal?.price || ""}
                  onChange={(e) => handleGoalChange(index, e)}
                />
                <button
                  type="button"
                  className="text-red-500"
                  onClick={() => handleDeleteGoal(index)}
                >
                  Delete
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addGoal}
              className="mt-2 rounded bg-blue-500 px-4 py-2 text-white"
            >
              Add Goal
            </button>
          </div>

          <div>
            <label htmlFor="LoanAmount">Loan Amount</label>
            <input
              id="LoanAmount"
              // type="number"
              placeholder="Loan Amount"
              className="form-input dark:border-none dark:bg-[#afacaa]"
              name="loan_amount"
              onChange={(e) => handleChange(e)}
              value={campaignData?.loan_amount || ""}
            />
          </div>

          <div>
            <label htmlFor="InterestRate">Interest Rate</label>
            <input
              id="InterestRate"
              // type="number"
              placeholder="Interest Rate"
              className="form-input dark:border-none dark:bg-[#1E1611]"
              name="interest_rate"
              onChange={(e) => handleChange(e)}
              value={campaignData?.interest_rate || ""}
            />
          </div>

          <div>
            <label htmlFor="Content">Share Content</label>
            <JoditEditor
              ref={editor}
              value={content}
              config={config}
              onBlur={handleContentBlur}
              onChange={(newContent) => {}}
            />
          </div>
          <div>
            <label htmlFor="Share content">Offer Description</label>

            <JoditEditor
              ref={editor}
              value={shareContent}
              config={config}
              onBlur={handleBlur}
              onChange={(newContent) => {}}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="btn btn-primary mt-6 w-fit"
              onClick={isEdit ? () => updateData() : () => submitData()}
            >
              {isEdit ? "Edit Campaign" : "Save Campaign"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default auth(CreateCampaigns);
