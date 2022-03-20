import { createContext, useState, useContext, useEffect } from "react";

const SmsContext = createContext();

export const SmsProvider = ({ children }) => {
  const [sms, setSms] = useState([]);
  const [idCount, setIdCount] = useState(0);
  const [token, setToken] = useState(sessionStorage.getItem("token"));

  useEffect(() => {
    const tokenRequestOptions = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: "password",
        client_id: "ClientIdWithFullAccess",
        client_secret: "fullAccessSecret",
        username: process.env.REACT_APP_USERNAME,
        password: process.env.REACT_APP_PASSWORD,
      }),
    };
    fetch("http://c4f2.acsight.com:7710/connect/token", tokenRequestOptions)
      .then((response) => response.json())
      .then((data) => {
        sessionStorage.setItem("token", JSON.stringify(data));
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const getSmsRequestOptions = {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    };

    if (token) {
      fetch(
        "http://c4f2.acsight.com:7770/api/system/sms-provider-list",
        getSmsRequestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          setSms(data);
        })
        .catch(console.error);
    }
  }, []);

  const addSms = (smsObj) => {
    const newItemId = idCount + 1;
    const addSmsRequestOptions = {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id: newItemId, ...smsObj }),
    };

    fetch(
      "http://c4f2.acsight.com:7770/api/system/add-partner-sms-provider",
      addSmsRequestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        alert(JSON.stringify(data) + "eklendi");
      })
      .catch(console.error);
  };

  const updateSms = (smsObj) => {
    const updateSmsRequestOptions = {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ ...smsObj }),
    };

    fetch(
      "http://c4f2.acsight.com:7770/api/system/update-partner-sms-provider",
      updateSmsRequestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        alert(JSON.stringify(data) + "guncellendi");
      })
      .catch(console.error);
  };

  const values = {
    sms,
    addSms,
    updateSms,
  };

  return <SmsContext.Provider value={values}>{children}</SmsContext.Provider>;
};

export const useSms = () => useContext(SmsContext);
