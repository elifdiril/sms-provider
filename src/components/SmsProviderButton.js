import React from "react";
import { useSms } from "../context/SmsContext";
import { useNavigate } from "react-router-dom";
import "../styles/SmsProviderButton.css";

function SmsProviderButton({ isUpdate = false }) {
  const { selectedSmsProviderId } = useSms();
  const navigate = useNavigate();

  const onClickHandle = () => {
    if (isUpdate && !!selectedSmsProviderId) {
      navigate("/update/" + selectedSmsProviderId, {
        id: selectedSmsProviderId,
      });
    } else {
      navigate("/add-new");
    }
  };

  return (
    <button
      className="smsProviderButton"
      onClick={onClickHandle}
      disabled={isUpdate && !selectedSmsProviderId ? true : false}
    >
      {isUpdate ? "Update Sms Provider" : "Add New Sms Provider"}
    </button>
  );
}

export default SmsProviderButton;
