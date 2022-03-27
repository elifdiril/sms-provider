import { useFormik } from "formik";
import validationSchema from "../helper/validations";
import Error from "./Error";
import { useSms } from "../context/SmsContext";
import "../styles/Form.css";
import { useNavigate } from "react-router-dom";
import { ProviderEnum } from "../enums/ProviderEnum";

function Form({ selectedSmsProvider }) {
  const { addSms, updateSms, setSelectedSmsProviderId } = useSms();
  const navigate = useNavigate();
  const enumValueArray = Object.values(ProviderEnum);

  const { values, handleSubmit, handleChange, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        providerID: selectedSmsProvider?.providerID || undefined,
        baseURL: selectedSmsProvider?.baseURL || "",
        fromName: selectedSmsProvider?.fromName || "",
        username: selectedSmsProvider?.username || "",
        password: selectedSmsProvider?.password || "",
        vendorCode: selectedSmsProvider?.vendorCode || "",
        apiKey: selectedSmsProvider?.apiKey || "",
        secretKey: selectedSmsProvider?.secretKey || "",
        accountSID: selectedSmsProvider?.accountSID || "",
        authToken: selectedSmsProvider?.authToken || "",
      },
      onSubmit: (values) => {
        if (!!selectedSmsProvider) {
          updateSms(values);
        } else {
          addSms(values);
        }
        setTimeout(() => navigate("/"), 600);
      },
      validationSchema,
    });

  const onCancelHandle = () => {
    setSelectedSmsProviderId(null);
    navigate("/");
  };

  return (
    <form className="form" onSubmit={handleSubmit} autoComplete="off">
      <div>
        <div className="inputs">
          <select
            name="providerID"
            onChange={handleChange}
            value={values.providerID}
          >
            <option defaultValue>Select Provider</option>
            {enumValueArray.map((item, id) => (
              <option value={id + 1} key={id}>
                {item}
              </option>
            ))}
          </select>
          {errors.providerID && touched.providerID && (
            <Error message={errors.providerID} />
          )}

          <input
            placeholder="Base URL"
            value={values.baseURL}
            name="baseURL"
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <input
            placeholder="From Name"
            value={values.fromName}
            name="fromName"
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <input
            placeholder="Username"
            value={values.username}
            name="username"
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <input
            placeholder="Password"
            value={values.password}
            name="password"
            type="password"
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <input
            placeholder="Vendor Code"
            value={values.vendorCode}
            name="vendorCode"
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <input
            placeholder="Api Key"
            value={values.apiKey}
            name="apiKey"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <input
            placeholder="Secret Key"
            value={values.secretKey}
            name="secretKey"
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <input
            placeholder="Account SID"
            value={values.accountSID}
            name="accountSID"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <input
            placeholder="Auth Token"
            value={values.authToken}
            name="authToken"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div className="formButtons">
          <button type="button" onClick={onCancelHandle}>
            Cancel
          </button>
          <button type="submit">Submit</button>
        </div>
      </div>
    </form>
  );
}

export default Form;
