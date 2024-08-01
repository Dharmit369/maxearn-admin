import { DataTable } from "mantine-datatable";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import { setPageTitle } from '../../store/themeConfigSlice';

// import { usePopper } from "react-popper";

const Table = ({ header, tableData }: any) => {
  return (
    <div className="table-responsive mb-5 w-full border-main_dark bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] dark:shadow-custom">
      <table className="w-full" align="center">
        <thead>
          <tr></tr>
          <tr>
            <th className="text-center text-lg text-[#3b3f5c] dark:bg-[#302924] dark:text-white-light">
              #
            </th>
            <th className="text-center text-lg text-[#3b3f5c] dark:bg-[#302924] dark:text-white-light">
              NAME
            </th>
            <th className="text-center text-lg text-[#3b3f5c] dark:bg-[#302924] dark:text-white-light">
              MOBILE NO.
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData?.map((data, index) => {
            return (
              <>
                <tr key={data.id} className="border-0">
                  <td className="text-center text-lg">{index + 1}</td>
                  <td>
                    <div className="whitespace-nowrap text-center text-lg">
                      {data.username}
                    </div>
                  </td>
                  <td className="text-center text-lg">{data.mobile}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
