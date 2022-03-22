import Form from "./Form";
import { useSms } from "../context/SmsContext";
import { useLocation } from "react-router-dom";

function AddOrUpdateSms() {
  const location = useLocation();
  const { selectedSmsProvider } = useSms();

  const isUpdate = location.pathname !== "/add-new";
  return (
    <div>
      <Form selectedSmsProvider={isUpdate ? selectedSmsProvider : null} />
    </div>
  );
}

export default AddOrUpdateSms;
