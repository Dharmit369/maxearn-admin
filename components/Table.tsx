import { DataTable } from "mantine-datatable";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import { setPageTitle } from '../../store/themeConfigSlice';

// import { usePopper } from "react-popper";


const Table = ({ header, tableData }: any) => {
  return (
    <div className="table-responsive mb-5 w-full border-main_dark bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] dark:shadow-custom">
      <table className="w-full" align="center">
        <thead >
          <tr>
            <th colSpan={3} className="text-center text-xl  border-none dark:text-white-light text-[#3b3f5c] dark:bg-[#261c16]" >
              {header}
            </th>
          </tr>
          <tr>
            <th className="text-lg dark:bg-[#302924] dark:text-white-light text-[#3b3f5c] text-center">#</th>
            <th className="text-lg dark:bg-[#302924] dark:text-white-light text-[#3b3f5c] text-center">Name</th>
            <th className="text-lg dark:bg-[#302924] dark:text-white-light text-[#3b3f5c] text-center">Mobile No.</th>
          </tr>
        </thead>
        <tbody>
          {tableData?.map((data, index) => {
            return (
              <>
                <tr key={data.id} className="border-0">
                <td className="text-lg text-center">{index + 1}</td>
                <td>
                  <div className="whitespace-nowrap text-lg text-center">{data.username}</div>
                </td>
                <td className="text-lg text-center">{data.mobile}</td>
              </tr >
          </>
        );
      })}
      </tbody>
    </table>
</div >

  );
};

export default Table;
