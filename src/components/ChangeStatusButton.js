import React from "react";
import { useSms } from "../context/SmsContext";

function ChangeStatusButton() {
  const { selectedSmsProvider, token, smsProvider, setSmsProvider } = useSms();

  const changeStatusHandle = () => {
    const changeStatusRequestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JSON.parse(token).access_token}`,
      },
    };

    fetch(
      `http://c4f2.acsight.com:7770/api/system/change-stat-partner-sms-provider/?id=${
        selectedSmsProvider.id
      }&stat=${!selectedSmsProvider.status}`,
      changeStatusRequestOptions
    )
      .then((response) => response.json())
      .then((res) => {
        console.log(res.success + " eklendi");
        const index = smsProvider.findIndex(
          (item) => item.id == selectedSmsProvider.id
        );
        smsProvider[index] = {
          ...selectedSmsProvider,
          status: !selectedSmsProvider.status,
        };
        setSmsProvider((prev) => [...prev, ...smsProvider]);
      })
      .catch(console.error);
  };

  return (
    <button onClick={changeStatusHandle} hidden={!selectedSmsProvider}>
      Change Status
    </button>
  );
}

export default ChangeStatusButton;
