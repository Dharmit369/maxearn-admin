import IdentityDetail from '@/pages/apps/IdentityDetail';
import User from '@/pages/apps/user-userList';
import { Tab } from '@headlessui/react';
import { Fragment } from 'react';
import BankDetails from '@/pages/apps/BankDetails';
import AddTransaction from '@/pages/apps/AddTransaction';

const ModelPaymentDetails = ({ setModal }: any) => {
    return (
        <div>
            <div className="fixed inset-0 bg-black opacity-50 z-50 overflow-auto"></div>
            <div className="fixed inset-0 flex items-center justify-center z-50 overflow-auto">
                <div className="bg-white p-8 rounded-lg shadow-lg lg:w-[44.5vw] my-auto xs:w-full dark:bg-[#1E1611]">
                    <div className="flex justify-between mb-6">
                        <h2 className="text-xl font-semibold dark:text-white">User Payment Details</h2>
                        <button className="text-gray-500 hover:text-gray-700 dark:text-white" onClick={() => setModal(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div>
                        <div className="mb-4 w-full rounded border border-white-light bg-white px-0 shadow-[4px_6px_10px_-3px_#bfc9d4] dark:border-none dark:bg-[#29221C] dark:shadow-custom sm:w-[40vw] ">
                            <Tab.Group>
                                <Tab.List className="mt-5 flex flex-wrap dark:mt-5">
                                    <Tab as={Fragment}>
                                        {({ selected }: any) => (
                                            <button
                                                className={`${selected
                                                    ? "bg-primary text-white !outline-none dark:bg-[#FE6C00]"
                                                    : ""
                                                    }
                -mb-[1px] ml-5 block rounded p-3.5 py-2 hover:bg-primary hover:text-white dark:hover:bg-[#FE6C00]`}
                                            >
                                                User
                                            </button>
                                        )}
                                    </Tab>
                                    <Tab as={Fragment}>
                                        {({ selected }: any) => (
                                            <button
                                                className={`${selected
                                                    ? "bg-primary text-white !outline-none dark:bg-[#FE6C00]"
                                                    : ""
                                                    }
                -mb-[1px] ml-5 block rounded p-3.5 py-2 hover:bg-primary hover:text-white dark:hover:bg-[#FE6C00]`}
                                            >
                                                Identity Detail
                                            </button>
                                        )}
                                    </Tab>
                                    <Tab as={Fragment}>
                                        {({ selected }: any) => (
                                            <button
                                                className={`${selected
                                                    ? "bg-primary text-white !outline-none dark:bg-[#FE6C00]"
                                                    : ""
                                                    }
                -mb-[1px] ml-5 block rounded p-3.5 py-2 hover:bg-primary hover:text-white dark:hover:bg-[#FE6C00]`}
                                            >
                                                Bank Detail
                                            </button>
                                        )}
                                    </Tab>
                                    <Tab as={Fragment}>
                                        {({ selected }: any) => (
                                            <button
                                                className={`${selected
                                                    ? "bg-primary text-white !outline-none dark:bg-[#FE6C00]"
                                                    : ""
                                                    }
                -mb-[1px] ml-5 block rounded p-3.5 py-2 hover:bg-primary hover:text-white dark:hover:bg-[#FE6C00]`}
                                            >
                                                Add Transaction
                                            </button>
                                        )}
                                    </Tab>
                                </Tab.List>

                                <Tab.Panels>
                                    <Tab.Panel>
                                        <User />
                                    </Tab.Panel>

                                    <Tab.Panel>
                                        <IdentityDetail />
                                    </Tab.Panel>

                                    <Tab.Panel>
                                        <BankDetails />
                                    </Tab.Panel>

                                    <Tab.Panel>
                                        <AddTransaction />
                                    </Tab.Panel>
                                </Tab.Panels>
                            </Tab.Group>
                        </div>

                    </div>
                    {/* <div className="flex justify-end">
                    <button className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600">Save</button>
                    <button className="ml-4 px-6 py-3 bg-gray-200 text-gray-700 rounded hover:bg-gray-300" onClick={() => setModal(false)}>Cancel</button>
                </div> */}
                </div>
            </div>

        </div>

    )
}

export default ModelPaymentDetails