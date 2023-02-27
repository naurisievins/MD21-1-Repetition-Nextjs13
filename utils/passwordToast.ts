import { toast } from "react-toastify";
import authorized from "./authorized";

const passwordToast = () => {
  if (authorized()) {
    toast.success("Parole pieņemta!");
  } else {
    toast.error("Nepareiza parole!");
  }
};

export default passwordToast;
