import * as Yup from "yup";

export const productYupValidationScheme = Yup.object({
  name: Yup.string().required("Product Name is missing"),
  category: Yup.string().required("Category is missing"),
  price: Yup.number()
    .min(1, "min price atleast 1")
    .required("Price is missing")
    .typeError("Price is missing"),
  description: Yup.string().required("Description is missing"),
});
