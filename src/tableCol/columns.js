import censorPassword from "../helper/censorPassword";
import getProviderName from "../helper/getProviderName";
import getStatusName from "../helper/getStatusName";

export const columns = [
  {
    dataField: "id",
    text: "Product ID",
  },
  {
    dataField: "providerID",
    text: "Provider",
    formatter: (cellContent) => {
      return <>{getProviderName(cellContent)}</>;
    },
  },
  {
    dataField: "partnerID",
    text: "Partner ID",
  },
  {
    dataField: "baseURL",
    text: "Base URL",
  },
  {
    dataField: "fromName",
    text: "From Name",
  },
  {
    dataField: "username",
    text: "Username",
  },
  {
    dataField: "password",
    text: "Password",
    formatter: (cellContent) => {
      return <>{censorPassword(cellContent.length)}</>;
    },
  },
  {
    dataField: "vendorCode",
    text: "Vendor Code",
  },
  {
    dataField: "apiKey",
    text: "Api Key",
  },
  {
    dataField: "secretKey",
    text: "Secret Key",
  },
  {
    dataField: "accountSID",
    text: "Account SID",
  },
  {
    dataField: "authToken",
    text: "Auth Token",
  },
  {
    dataField: "status",
    text: "Status",
    formatter: (status) => {
      return <>{getStatusName(status)}</>;
    },
  },
  {
    dataField: "createdWhen",
    text: "Created When",
  },
  {
    dataField: "updatedWhen",
    text: "Updated When",
  },
  {
    dataField: "createdBy",
    text: "Created By",
  },
  {
    dataField: "updatedBy",
    text: "Updated When",
  },
];
