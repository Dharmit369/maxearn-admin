import { useState } from "react";

const Model = ({
  setModel,
  banner,
  setBanner,
  submitData,
  files,
  setFiles,
  uploadedFiles,
  modalname,
  setTitle,
  title,
  isTraining = false,
  isbanner = true,
  setDesc,
  desc,
  statusname,
}: any) => {
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setBanner({
      ...banner,
      [name]: value,
    });
    console.log("banner", banner);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescChange = (event) => {
    setDesc(event.target.value);
  };

  function handleMultipleChange(event: any) {
    setFiles(event?.target?.files[0]);
  }

  console.log(banner, "asnajnsjansjansjansnjasn");
  return (
    <div>
      <div className="fixed inset-0 z-50 bg-black opacity-50"></div>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="w-96 rounded-lg bg-white p-8 shadow-lg dark:bg-[#29221C]">
          <div className="mb-6 flex justify-between">
            <h2 className="text-xl font-semibold dark:text-white">
              {modalname}
            </h2>
            <button
              className="text-gray-500 hover:text-gray-700 dark:text-white"
              onClick={() => setModel(false)}
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
            {isbanner && (
              <div className="mb-6">
                <label
                  htmlFor="videoTitle"
                  className="block text-base font-medium text-gray-700 dark:text-white"
                >
                  File
                </label>
                <input type="file" onChange={handleMultipleChange} />
              </div>
            )}
            {isTraining && (
              <div className="mb-6">
                <label
                  htmlFor="relatedContent"
                  className="block text-base font-medium text-gray-700 dark:text-white"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="relatedContent"
                  name="Title"
                  className="mt-2 block w-full rounded-md border border-gray-300 p-3 dark:border-none dark:bg-[#261C16]"
                  onChange={handleTitleChange}
                  value={title}
                />
              </div>
            )}
            {isTraining && (
              <div className="mb-6">
                <label
                  htmlFor="relatedContent"
                  className="block text-base font-medium text-gray-700 dark:text-white"
                >
                  Desc
                </label>
                <input
                  type="text"
                  id="relatedContent"
                  name="Title"
                  className="mt-2 block w-full rounded-md border border-gray-300 p-3 dark:border-none dark:bg-[#261C16]"
                  onChange={handleDescChange}
                  value={desc}
                />
              </div>
            )}
            <div className="mb-6">
              <label
                htmlFor="relatedContent"
                className="block text-base font-medium text-gray-700 dark:text-white"
              >
                {statusname ? statusname : "URL"}
              </label>
              <input
                type="text"
                id="relatedContent"
                name="url"
                className="mt-2 block w-full rounded-md border border-gray-300 p-3 dark:border-none dark:bg-[#261C16]"
                onChange={handleChange}
                value={banner?.url}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              className="rounded bg-blue-500 px-6 py-3 text-white hover:bg-blue-600"
              onClick={submitData}
            >
              Save
            </button>
            <button
              className="ml-4 rounded bg-gray-200 px-6 py-3 text-gray-700 hover:bg-gray-300"
              onClick={() => setModel(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Model;
