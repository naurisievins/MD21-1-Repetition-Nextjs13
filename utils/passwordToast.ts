import { toast } from "react-toastify";
import authorized from "./authorized";

const passwordToast = () => {
  if (authorized()) {
    toast.success("Parole pieņemta!");
    return true;
  } else {
    toast.error("Nepareiza parole!");
    return false;
  }
};

export default passwordToast;
