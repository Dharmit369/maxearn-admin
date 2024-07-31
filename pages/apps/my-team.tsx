import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Dropdown from "@/components/Dropdown";
import { Fragment } from "react";
import Image from "next/image";
import { Images } from "@/constants";
import Link from "next/link";
import Loader from "@/components/Layouts/Loader";
import { ReactSortable } from "react-sortablejs";
import Select from "react-select";
import { Tab } from "@headlessui/react";

export default function Payout() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return loading ? (
    <div>
      <Loader />
    </div>
  ) : (
    <div>
      <h1 className="text-xl font-bold ">My Team</h1>
    </div>
  );
}
