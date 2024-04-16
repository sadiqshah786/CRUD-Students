import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Message = (errorMessage) => {
  toast.error(errorMessage);
  <ToastContainer />;
};

export default Message;
