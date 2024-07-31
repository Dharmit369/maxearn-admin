import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loader from "@/components/Layouts/Loader";
import auth from "../utils/auth";

const UserDashboard = () => {
  const data = {
    topAffiliate: "",
  };

  const [loading, setLoading] = useState(true);
  const [changeData, setChangeData] = useState(data);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setChangeData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return loading ? (
    <div>
      <Loader />
    </div>
  ) : (
    <div className="rounded-lg p-10">
      <form className="space-y-6">
        <div>
          <label htmlFor="topAffiliate" className="dark:text-white">
            TOP AFFILIATE
          </label>
          <select
            id="topAffiliate"
            className="form-select text-white-dark dark:border-none dark:bg-[#261C16]"
            name="topAffiliate"
            onChange={handleChange}
          >
            <option value={"Disable"}>Disable</option>
            <option value={"Enable"}>Enable</option>
          </select>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="btn btn-primary mt-6 w-fit">
            Submit Setting
          </button>
        </div>
      </form>
    </div>
  );
};

export default auth(UserDashboard);
