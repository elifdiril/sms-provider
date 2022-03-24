import { createContext, useState, useContext, useEffect } from "react";
import queryString from "query-string";

const SmsContext = createContext();

export const SmsProvider = ({ children }) => {
  const [smsProvider, setSmsProvider] = useState([]);
  const [token, setToken] = useState(
    JSON.parse(sessionStorage.getItem("token"))
  );
  const [selectedSmsProviderId, setSelectedSmsProviderId] = useState();
  const [selectedSmsProvider, setSelectedSmsProvider] = useState({});

  useEffect(() => {
    const tokenRequestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: queryString.stringify({
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
        setToken(JSON.stringify(data));
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (token || sessionStorage.getItem("token")) {
      let _token = token || JSON.parse(sessionStorage.getItem("token"));
      if(typeof _token === 'string'){
        _token = JSON.parse(_token);
      }
      const getSmsRequestOptions = {
        method: "GET",
        headers: { Authorization: `Bearer ${_token.access_token}` },
      };

      fetch(
        "http://c4f2.acsight.com:7770/api/system/sms-provider-list",
        getSmsRequestOptions
      )
        .then((response) => response.json())
        .then((res) => {
          setSmsProvider(res.data.partnerProviders);
        })
        .catch(console.error);
    }
  }, [token]);

  useEffect(() => {
    setSelectedSmsProvider(
      smsProvider.find((item) => item.id == selectedSmsProviderId)
    );
  }, [selectedSmsProviderId]);

  const addSms = (smsObj) => {
    const addSmsRequestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JSON.parse(token).access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        partnerID: process.env.REACT_APP_PARTNER_ID,
        ...smsObj,
      }),
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
      headers: {
        Authorization: `Bearer ${JSON.parse(token).access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: selectedSmsProviderId,
        partnerID: process.env.REACT_APP_PARTNER_ID,
        status: true,
        ...smsObj,
      }),
    };

    fetch(
      "http://c4f2.acsight.com:7770/api/system/update-partner-sms-provider",
      updateSmsRequestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data + "guncellendi");
      })
      .catch(console.error);
  };

  const values = {
    smsProvider,
    setSmsProvider,
    selectedSmsProviderId,
    selectedSmsProvider,
    setSelectedSmsProviderId,
    addSms,
    updateSms,
    token
  };

  return <SmsContext.Provider value={values}>{children}</SmsContext.Provider>;
};

export const useSms = () => useContext(SmsContext);
