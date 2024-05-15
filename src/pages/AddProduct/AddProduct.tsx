// packages
import React, { FC, FormEvent, useCallback, useMemo, useState } from "react";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";

// css
import ds from "./AddProduct.module.css";
import CustomHelmet from "@components/CustomHelmet/CustomHelmet";
import PrimaryHeader from "@components/PrimaryHeader/PrimaryHeader";
import MaxWidthLayout from "@components/Layout/MaxWidthLayout/MaxWidthLayout";
import FloatingInput from "@components/Elements/FloatingInput/FloatingInput";
import { IoIosArrowRoundBack } from "react-icons/io";

import { Steps } from "antd";
import FloatInputWithBtnCard from "@components/Cards/FloatInputWithBtnCard/FloatInputWithBtnCard";
import { YupFormValidator } from "@utils/yupFormValidator";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@redux/store/store";
import { ProductActions, ProductItem } from "@redux/features/products.feature";

const yupValidationScheme = Yup.object({
  name: Yup.string().required("Enter Name"),
  category: Yup.string().required("Enter Category"),
  price: Yup.number().min(1, "min price atleast 1").required("Enter Price"),
  description: Yup.string().required("Enter Description"),
});

// types
interface AddProductPropsType {}

interface AddProductMultiFormData {
  name: string;
  category: string;
  price: number | string;
  description: string;
}

export type FormIndexHandlerActionType = "INCREMENT" | "DECREMENT";

const AddProduct: FC<AddProductPropsType> = ({}) => {
  const [currentFormIndex, setCurrentFormIndex] = useState<number>(0);
  const [multiFormData, setMultiFormData] = useState<AddProductMultiFormData>({
    name: "",
    category: "",
    price: "",
    description: "",
  });
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // redux
  const dispatch = useAppDispatch();
  const { productList } = useAppSelector((state) => state.product);

  const currentFormIndexHandler = useCallback(
    (action: FormIndexHandlerActionType) => {
      switch (action) {
        case "INCREMENT":
          if (currentFormIndex < 3) {
            setCurrentFormIndex((prev) => prev + 1);
          }
          break;
        case "DECREMENT":
          if (currentFormIndex > 0) {
            setCurrentFormIndex((prev) => prev - 1);
          }
          break;
        default:
          null;
      }
    },
    [currentFormIndex]
  );

  const findCurrentForm = useMemo(() => {
    switch (currentFormIndex) {
      case 0:
        return (
          <div className={ds.name_card}>
            <FloatInputWithBtnCard
              inputType="text"
              labelText="Name"
              btnType="primary"
              btnTitle="Next"
              btnHtmlType="button"
              onClickBtnFn={() => currentFormIndexHandler("INCREMENT")}
              onChangeFn={(e) =>
                setMultiFormData({ ...multiFormData, name: e.target.value })
              }
              value={multiFormData.name}
            />
          </div>
        );
      case 1:
        return (
          <div className={ds.name_card}>
            <FloatInputWithBtnCard
              inputType="text"
              labelText="Category"
              btnType="primary"
              btnTitle="Next"
              btnHtmlType="button"
              onClickBtnFn={() => currentFormIndexHandler("INCREMENT")}
              onChangeFn={(e) =>
                setMultiFormData({ ...multiFormData, category: e.target.value })
              }
              value={multiFormData.category}
            />
          </div>
        );

      case 2:
        return (
          <div className={ds.name_card}>
            <FloatInputWithBtnCard
              inputType="number"
              labelText="Price"
              btnType="primary"
              btnTitle="Next"
              btnHtmlType="button"
              onClickBtnFn={() => currentFormIndexHandler("INCREMENT")}
              onChangeFn={(e) => {
                const val = parseInt(e.target.value);
                if (isNaN(val)) {
                  setMultiFormData({ ...multiFormData, price: "" });
                } else {
                  setMultiFormData({ ...multiFormData, price: val });
                }
              }}
              value={multiFormData.price}
            />
          </div>
        );
      case 3:
        return (
          <div className={ds.name_card}>
            <FloatInputWithBtnCard
              inputType="text"
              labelText="Description"
              btnType="primary"
              btnTitle="Add Product"
              btnHtmlType="submit"
              onClickBtnFn={() => currentFormIndexHandler("INCREMENT")}
              onChangeFn={(e) =>
                setMultiFormData({
                  ...multiFormData,
                  description: e.target.value,
                })
              }
              value={multiFormData.description}
            />
          </div>
        );

      default:
        return null;
    }
  }, [currentFormIndex, multiFormData]);

  const handleForm = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const multiFormValidation = new YupFormValidator(
        yupValidationScheme,
        multiFormData,
        (errors) => setValidationErrors(errors)
      );
      const validate = await multiFormValidation.validate();
      if (validate) {
        const productData: ProductItem = {
          key: uuidv4(),
          name: multiFormData.name,
          category: multiFormData.category,
          price: multiFormData.price as number,
          description: multiFormData.description,
        };
        dispatch(ProductActions.addProduct(productData));
        toast.success("product added!");
      }
    } catch (error) {
      toast.error("something went wrong!");
    }
  };

  return (
    <div className={ds.main_layout}>
      <CustomHelmet title="Add Product" />
      <PrimaryHeader />
      <MaxWidthLayout>
        <div className={ds.sub_layout}>
          <div className={ds.form_container}>
            <Steps
              className={ds.steps_style}
              direction="horizontal"
              current={currentFormIndex}
              items={[
                {
                  title: "Product Name",
                },
                {
                  title: "Category",
                },
                {
                  title: "Price",
                },
                {
                  title: "Description",
                },
              ]}
            />

            <form onSubmit={handleForm} className={ds.form_card}>
              <div className={ds.input_wrapper}>
                <div
                  className={ds.back_btn_card}
                  style={{ display: currentFormIndex > 0 ? "flex" : "none" }}
                  onClick={() => currentFormIndexHandler("DECREMENT")}>
                  <IoIosArrowRoundBack size={30} />
                  <p className={ds.go_back_text}>Back</p>
                </div>
                {findCurrentForm}
              </div>
            </form>
          </div>
        </div>
      </MaxWidthLayout>
    </div>
  );
};

export default AddProduct;
