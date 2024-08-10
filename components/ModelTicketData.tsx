

const ModelTicketData = ({setVisibility, visibilityData} : any) => {
    return (
        <div>
            <div className="fixed inset-0 z-50 bg-black opacity-50"></div>
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="w-96 rounded-lg bg-white p-8 shadow-lg dark:bg-[#29221C]">
                    <div className="mb-6 flex justify-between">
                        <h2 className="text-xl font-semibold dark:text-white">Information</h2>
                        <button
                            className="text-gray-500 hover:text-gray-700 dark:text-white"
                            onClick={() => setVisibility(false)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="mb-6 flex justify-between">
                        <h2 className="text-xl font-semibold dark:text-white">{visibilityData?.ticketName || "-"}</h2>
                        <span
                          className={`badge whitespace-nowrap ${
                            visibilityData?.status === "Active"
                              ? "bg-success"
                              : visibilityData?.status === "DeActive"
                              ? "bg-danger"
                              : "bg-primary"
                          }`}
                        >
                          {visibilityData?.status?.toUpperCase()}
                        </span>
                    </div>
                    <div>
                        <div className="mb-6 flex">
                            <div className="font-bold w-1/2">Issue:</div>
                            <div className="w-2/3">{visibilityData?.issue}</div>
                        </div>
                        <div className="mb-6 flex">
                            <div className="font-bold w-1/2">Reply:</div>
                            <div className="w-2/3">{visibilityData?.reply}</div>
                        </div>
                      
                    </div>
                    {/* <div className="flex justify-end">
                        <button className="rounded bg-blue-500 px-6 py-3 text-white hover:bg-blue-600">
                            Save
                        </button>
                        <button
                            className="ml-4 rounded bg-gray-200 px-6 py-3 text-gray-700 hover:bg-gray-300"
                            onClick={() => setModelDetails(false)}
                        >
                            Cancel
                        </button>
                    </div> */}
                </div>
            </div>
        </div>


    );
}

export default ModelTicketData