import Swal from "sweetalert2";

export const showAlert = async (type: number, success: string, logo: string) => {
    if (type === 15) {
      const toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
      });
      toast.fire({
        icon: logo,
        title: success,
        padding: "10px 20px",
      });
    }
  };