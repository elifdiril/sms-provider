import React from "react";
import { useSms } from "../context/SmsContext";

function ChangeStatusButton() {
  const { selectedSmsProvider, changeStatus } = useSms();

  return (
    <button onClick={changeStatus} hidden={!selectedSmsProvider}>
      Change Status
    </button>
  );
}

export default ChangeStatusButton;
