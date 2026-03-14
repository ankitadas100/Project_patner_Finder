import { toast } from "react-toastify";

export const handleSuccess = (msg) => {
  toast.success(msg, {
    position: "top-center",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    style: {
      background: "linear-gradient(135deg, #FF7A00, #ff8f1f)",
      color: "#ffffff",
      fontWeight: "600",
      borderRadius: "12px",
      padding: "14px 18px",
      border: "1px solid rgba(255,255,255,.07)",
      boxShadow: "0 6px 18px rgba(0,0,0,0.4)",
      fontSize: "15px",
    }
  });
};

export const handleError = (msg) => {
  toast.error(msg, {
    position: "top-center",
    autoClose: 2800,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    style: {
      background: "rgba(0,0,0,0.85)",
      color: "#ff8f1f",
      fontWeight: "600",
      borderRadius: "12px",
      padding: "14px 18px",
      border: "1px solid #FF7A00",
      boxShadow: "0 6px 18px rgba(0,0,0,0.5)",
      fontSize: "15px",
    }
  });
};