import { useRouter } from "next/router";
import { useEffect } from "react";

const auth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
          router.push("/apps/login");
        }
      };

      checkAuth();
    }, []);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default auth;
