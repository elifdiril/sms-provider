import { createContext, useState, useContext, useEffect } from "react";
import queryString from "query-string";
import { toast } from "react-toastify";

const SmsContext = createContext();

export const SmsProvider = ({ children }) => {
  const getTokenUrl = "http://c4f2.acsight.com:7710/connect/token";
  const getSmsProviderListUrl =
    "http://c4f2.acsight.com:7770/api/system/sms-provider-list";
  const addSmsProviderUrl =
    "http://c4f2.acsight.com:7770/api/system/add-partner-sms-provider";
  const updateSmsProviderUrl =
    "http://c4f2.acsight.com:7770/api/system/update-partner-sms-provider";
  const changeStatusUrl =
    "http://c4f2.acsight.com:7770/api/system/change-stat-partner-sms-provider/";
  const [smsProvider, setSmsProvider] = useState([]);
  const [token, setToken] = useState(
    JSON.parse(sessionStorage.getItem("token"))
  );
  const [selectedSmsProviderId, setSelectedSmsProviderId] = useState();
  const [selectedSmsProvider, setSelectedSmsProvider] = useState({});
  const [maxId, setMaxId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    //content type has to be application/x-www-form-urlencoded, otherwise it does not work
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
    fetch(getTokenUrl, tokenRequestOptions)
      .then((response) => response.json())
      .then((data) => {
        sessionStorage.setItem("token", JSON.stringify(data));
        setToken(JSON.stringify(data));
      })
      .catch((err) => toast.error("Error: " + err));
  }, []);

  useEffect(() => {
    if (token || sessionStorage.getItem("token")) {
      let _token = token || JSON.parse(sessionStorage.getItem("token"));
      if (typeof _token === "string") {
        _token = JSON.parse(_token);
      }
      const getSmsRequestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${_token.access_token}`,
          "Access-Control-Allow-Headers": "Content-Type",
        },
      };

      fetch(getSmsProviderListUrl, getSmsRequestOptions)
        .then((response) => response.json())
        .then((res) => {
          setSmsProvider(res.data.partnerProviders);
        })
        .catch((err) => toast.error("Error: " + err));
    }
  }, [token]);

  useEffect(() => {
    let max = 0;
    smsProvider.forEach((item) => {
      if (item.id > max) {
        max = item.id;
      }
    });
    setMaxId(max);
  }, [smsProvider]);

  useEffect(() => {
    setSelectedSmsProvider(
      smsProvider.find((item) => item.id === selectedSmsProviderId)
    );
  }, [selectedSmsProviderId, smsProvider]);

  const addSms = (smsObj) => {
    const addSmsRequestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JSON.parse(token).access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        partnerID: process.env.REACT_APP_PARTNER_ID,
        status: true,
        ...smsObj,
      }),
    };

    fetch(addSmsProviderUrl, addSmsRequestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.message !== "Completed successfully") {
          toast.error(res.message);
          return;
        }
        //backend does not return added data, we have to set id manually
        setSmsProvider((prev) => [
          ...prev,
          {
            ...smsObj,
            id: maxId + 1,
            partnerID: process.env.REACT_APP_PARTNER_ID,
            status: true,
          },
        ]);
        toast.success("Added successfully");
      })
      .catch((err) => toast.error("Error: " + err));
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
        status: selectedSmsProvider.status,
        ...smsObj,
      }),
    };

    fetch(updateSmsProviderUrl, updateSmsRequestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.message !== "Completed successfully") {
          toast.error(res.message);
          return;
        }
        setSmsProvider((prev) => {
          return prev.map((item) => {
            return item.id === selectedSmsProviderId
              ? {
                  ...item,
                  id: selectedSmsProviderId,
                  partnerID: process.env.REACT_APP_PARTNER_ID,
                  status: selectedSmsProvider.status,
                  ...smsObj,
                }
              : item;
          });
        });
        toast.success("Updated successfully");
      })
      .catch((err) => toast.error("Error: " + err));
  };

  const changeStatus = () => {
    const changeStatusRequestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JSON.parse(token).access_token}`,
      },
    };

    fetch(
      `${changeStatusUrl}?id=${selectedSmsProviderId}&stat=${!selectedSmsProvider.status}`,
      changeStatusRequestOptions
    )
      .then((response) => response.json())
      .then((res) => {
        if (res.message !== "Completed successfully") {
          toast.error(res.message);
          return;
        }
        setSmsProvider((prev) => {
          return prev.map((item) => {
            return item.id === selectedSmsProviderId
              ? {
                  ...item,
                  id: selectedSmsProviderId,
                  partnerID: process.env.REACT_APP_PARTNER_ID,
                  status: !selectedSmsProvider.status,
                }
              : item;
          });
        });
        toast.success("Status changed successfully");
      })
      .catch((err) => toast.error("Error: " + err));
  };

  const values = {
    smsProvider,
    changeStatus,
    selectedSmsProviderId,
    selectedSmsProvider,
    setSelectedSmsProviderId,
    addSms,
    updateSms,
    currentPage,
    setCurrentPage,
  };

  return <SmsContext.Provider value={values}>{children}</SmsContext.Provider>;
};

export const useSms = () => useContext(SmsContext);
