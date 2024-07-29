import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loader from "@/components/Layouts/Loader";
const Index = () => {
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    setTimeout(() => {
      if (token) {
        router.push("/dashboard/dashboard");
      } else {
        setLoading(false);
        router.push("/apps/login");
      }
    }, 2000);
  });

  return loading ? (
    <div>
      <Loader />
    </div>
  ) : (
    <>
      <div>
        <h1>starter page</h1>
      </div>
    </>
  );
};

export default Index;
