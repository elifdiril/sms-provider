import { useFormik } from "formik";
import validationSchema from "./validations";
import Error from "./Error";
import { useSms } from "../context/SmsContext";
import "../styles/Form.css";
import { useNavigate } from "react-router-dom";

function Form({ selectedSmsProvider }) {
  const { addSms, updateSms } = useSms();
  const navigate = useNavigate();

  const {
    values,
    handleSubmit,
    handleChange,
    setFieldValue,
    handleBlur,
    errors,
    touched,
  } = useFormik({
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
      navigate("/");
    },
    validationSchema,
  });

  const onCancelHandle = () => {
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
            <option value={1}>PostaGuvercini</option>
            <option value={2}>MobilDev</option>
            <option value={3}>JetSMS</option>
            <option value={4}>MailJet</option>
            <option value={5}>Twilio</option>
            <option value={6}>InfoBip</option>
            <option value={7}>Vonage</option>
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
          {errors.baseURL && touched.baseURL && (
            <Error message={errors.baseURL} />
          )}

          <input
            placeholder="From Name"
            value={values.fromName}
            name="fromName"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.fromName && touched.fromName && (
            <Error message={errors.fromName} />
          )}

          <input
            placeholder="Username"
            value={values.username}
            name="username"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.username && touched.username && (
            <Error message={errors.username} />
          )}

          <input
            placeholder="Password"
            value={values.password}
            name="password"
            type="password"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.password && touched.password && (
            <Error message={errors.password} />
          )}

          <input
            placeholder="Vendor Code"
            value={values.vendorCode}
            name="vendorCode"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.vendorCode && touched.vendorCode && (
            <Error message={errors.vendorCode} />
          )}

          <input
            placeholder="Api Key"
            value={values.apiKey}
            name="apiKey"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.apiKey && touched.apiKey && <Error message={errors.apiKey} />}

          <input
            placeholder="Secret Key"
            value={values.secretKey}
            name="secretKey"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.secretKey && touched.secretKey && (
            <Error message={errors.secretKey} />
          )}

          <input
            placeholder="Account SID"
            value={values.accountSID}
            name="accountSID"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.accountSID && touched.accountSID && (
            <Error message={errors.accountSID} />
          )}
          <input
            placeholder="Auth Token"
            value={values.authToken}
            name="authToken"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.authToken && touched.authToken && (
            <Error message={errors.authToken} />
          )}
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
