import * as yup from "yup";

const messages = {
  required: "This field is required.",
};

const schema = yup.object().shape({
  providerID: yup.string().required(messages.required),
});

export default schema;
