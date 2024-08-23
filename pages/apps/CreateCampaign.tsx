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

  console.log("createCampaigns2", createCampaigns);
  // useEffect(() => {
  //     const timer = setTimeout(() => {
  //         setLoading(false);
  //     }, 500);

  //     return () => clearTimeout(timer);
  // }, []);

  const handleBlur = (newContent) => {
    setShareContent(typeof newContent === "string" ? newContent : "");
  };
  const handleContentBlur = (newContent) => {
    setContent(typeof newContent === "string" ? newContent : "");
  };

  console.log("options", categoryOptionData);

  const handleGoalChange = (index, e) => {
    const { name, value } = e.target;
    const newGoals = [...goals];
    newGoals[index] = { ...newGoals[index], [name]: value };
    setGoals(newGoals);
  };
  const addGoal = () => {
    setGoals([...goals, { description: "", price: "" }]);
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
                id="FeaturedImage"
                type="file"
                placeholder="Upload Featured Image"
                className="form-input w-full dark:border-none dark:bg-[#1E1611]"
                name="offer_image"
                onChange={(event) =>
                  handleMultipleChange(event, "featured_image")
                }
              />
            </div>
          </div>

          {/* <div>
                <label htmlFor="OfferDescription">Offer Description</label>
                <input id="OfferDescription" type="text" placeholder="Offer Description" className="form-input dark:bg-[#261C16] dark:border-none" />
            </div> */}

          <div>
            <label htmlFor="OfferImage">Featured Image</label>
            {/* <input
              id="OfferImage"
              type="file"
              placeholder="Offer Image"
              className="form-input dark:border-none dark:bg-[#1E1611]"
              name="offer_image"
              onChange={(event) => handleMultipleChange(event, "offer_image")}
              // value={campaignData?.offer_image || ""}
            /> */}

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
                onChange={(event) => handleMultipleChange(event, "offer_image")}
                // value={campaignData?.offer_image || ""}
              />
            </div>
          </div>

          {/* <div>
                <label htmlFor="VideoLink">Video Link</label>
                <input id="VideoLink" type="text" placeholder="Video Link" className="form-input dark:bg-[#261C16] dark:border-none" />
            </div> */}

          <div>
            <label htmlFor="ApprovalRate">Approval Rate</label>
            {/* <input
              id="ApprovalRate"
              type="text"
              placeholder="Approval Rate"
              className="form-input dark:border-none dark:bg-[#1E1611]"
              name="approval_rate"
              onChange={(e) => handleChange(e)}
              value={campaignData?.approval_rate}
            /> */}
            <select
              id="ApprovalRate"
              className="form-select text-white-dark dark:border-none dark:bg-[#1E1611]"
              name="approval_rate"
              onChange={(e) => handleChange(e)}
              value={campaignData?.approval_rate}
            >
              <option value={""}>Please Select</option>
              <option value={"low"}>low</option>
              <option value={"medium"}>medium</option>
              <option value={"excellent"}>excellent</option>
            </select>
          </div>

          <div>
            <label htmlFor="JoiningFee">Joining Fee</label>
            <input
              id="JoiningFee"
              type="number"
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
              type="number"
              placeholder="Annual Fee"
              className="form-input dark:border-none dark:bg-[#1E1611]"
              name="annual_fee"
              onChange={(e) => handleChange(e)}
              value={campaignData?.annual_fee || ""}
            />
          </div>

          {/* <div>
            <label htmlFor="Info">Info</label>
            <input
              id="Info"
              type="text"
              placeholder="Info"
              className="form-input dark:border-none dark:bg-[#1E1611]"
              name="info"
              onChange={(e) => handleChange(e)}
              value={campaignData?.info || ""}
            />
          </div> */}

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

          {/* <div>
                <label htmlFor="SharedDiscription">Shared Discription</label>
                <input id="SharedDiscription" type="text" placeholder="Shared Discription" className="form-input dark:bg-[#261C16] dark:border-none" />
            </div> */}

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
                // value={campaignData?.shared_image || ""}
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

          {/* <div>
            <label htmlFor="Content">Content</label>
            <input
              id="Content"
              type="text"
              placeholder="Content"
              className="form-input dark:border-none dark:bg-[#1E1611]"
              name="content"
              onChange={(e) => handleChange(e)}
              value={campaignData?.content}
            />
          </div> */}
          {/* <div>
                <label htmlFor="Description">Description</label>
                <input id="Description" type="text" placeholder="Description" className="form-input dark:bg-[#1E1611] dark:border-none" name="description" onChange={(e) => handleChange(e)} />
            </div>  */}

          {/* <div>
            <label htmlFor="goals">Goal</label>

            <div className="flex gap-3">
              <input
                // id={`description-${index}`}
                type="text"
                placeholder="description 1"
                className="form-input my-5 dark:border-none dark:bg-[#1E1611]"
                name="description1"
                value={campaignData?.description1 || ""}
                onChange={(e) => handleChange(e)}
              />
              <input
                // id={`price-${index}`}
                type="text"
                placeholder="price 1"
                className="form-input my-5 dark:border-none dark:bg-[#1E1611]"
                name="price1"
                value={campaignData?.price1 || ""}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="flex gap-3">
              <input
                // id={`description-${index}`}
                type="text"
                placeholder="description 2"
                className="form-input my-5 dark:border-none dark:bg-[#1E1611]"
                name="description2"
                value={campaignData?.description2 || ""}
                onChange={(e) => handleChange(e)}
              />
              <input
                // id={`price-${index}`}
                type="text"
                placeholder="price 2"
                className="form-input my-5 dark:border-none dark:bg-[#1E1611]"
                name="price2"
                value={campaignData?.price2 || ""}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="flex gap-3">
              <input
                // id={`description-${index}`}
                type="text"
                placeholder="description 3"
                className="form-input my-5 dark:border-none dark:bg-[#1E1611]"
                name="description3"
                value={campaignData?.description3 || " "}
                onChange={(e) => handleChange(e)}
              />
              <input
                // id={`price-${index}`}
                type="text"
                placeholder="price 3"
                className="form-input my-5 dark:border-none dark:bg-[#1E1611]"
                name="price3"
                value={campaignData?.price3 || " "}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="flex gap-3">
              <input
                // id={`description-${index}`}
                type="text"
                placeholder="description 4"
                className="form-input my-5 dark:border-none dark:bg-[#1E1611]"
                name="description4"
                value={campaignData?.description4 || " "}
                onChange={(e) => handleChange(e)}
              />
              <input
                // id={`price-${index}`}
                type="text"
                placeholder="price 4"
                className="form-input my-5 dark:border-none dark:bg-[#1E1611]"
                name="price4"
                value={campaignData?.price4 || " "}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div> */}
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

          {/* <div>
            <label htmlFor="Status">Status</label>
            <select
              id="Type"
              className="form-select w-44 text-white-dark dark:border-none dark:bg-[#261C16]"
              onChange={(e) => handleChange(e, campaignData?._id)}
              value={campaignData?.status}
            >
              <option value={""}>Please Select</option>
              <option value={"InReview"}>InReview</option>
              <option value={"Approved"}>Approved</option>
              <option value={"Ended"}>Ended</option>
            </select>
          </div> */}

          <div>
            <label htmlFor="LoanAmount">Loan Amount</label>
            <input
              id="LoanAmount"
              type="number"
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
              type="number"
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
