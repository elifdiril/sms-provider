import * as yup from "yup";

const messages = {
  required: "Bu alan zorundur.",
};

const schema = yup.object().shape({
  providerID: yup.string().required(messages.required),
});

export default schema;
