// packages
import React, { FC, FormEvent, useCallback, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { Button, Steps } from "antd";
import { useNavigate } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";

// css
import ds from "./AddProduct.module.css";

// icons
import { IoIosArrowRoundBack } from "react-icons/io";

// utils
import { YupFormValidator } from "@utils/yupFormValidator";

// redux
import { useAppDispatch, useAppSelector } from "@redux/store/store";
import { ProductActions, ProductItem } from "@redux/features/products.feature";

// constants
import { routePaths } from "@constants/routePaths";
import { productYupValidationScheme } from "@constants/productYupValidationSchema";

// custom hooks
import { useCategoryList } from "@hooks/useCategoryList";

// components
import CustomHelmet from "@components/CustomHelmet/CustomHelmet";
import PrimaryHeader from "@components/PrimaryHeader/PrimaryHeader";
import MaxWidthLayout from "@components/Layout/MaxWidthLayout/MaxWidthLayout";
import CustomDropDown from "@components/Elements/CustomDropDown/CustomDropDown";
import FloatInputWithBtnCard from "@components/Cards/FloatInputWithBtnCard/FloatInputWithBtnCard";

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

  /** redux */
  const dispatch = useAppDispatch();
  const { productList } = useAppSelector((state) => state.product);

  /** custom hooks */
  const { categoryList } = useCategoryList(productList, [productList]);

  /** router-dom */
  const navigate = useNavigate();

  /** current form index setter */
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

  /** based on current form index this fn return form fields component */
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
          <div className={`${ds.name_card} ${ds.drop_down_card}`}>
            <CustomDropDown
              mainPlaceHolder="Category"
              subPlaceHolder="New Category"
              options={categoryList}
              selectedValue={multiFormData.category}
              setSelectValue={(val) =>
                setMultiFormData({ ...multiFormData, category: val as string })
              }
            />
            <div className={ds.btn_card}>
              <Button
                type="primary"
                htmlType="button"
                onClick={() => currentFormIndexHandler("INCREMENT")}>
                Next
              </Button>
            </div>
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
          <div className={ds.description_card}>
            <TextArea
              showCount
              maxLength={500}
              placeholder="Product Description..."
              className={ds.text_area}
              value={multiFormData.description}
              onChange={(e) =>
                setMultiFormData({
                  ...multiFormData,
                  description: e.target.value,
                })
              }
            />
            <div className={ds.btn_card}>
              <Button type="primary" htmlType="submit">
                Add
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  }, [currentFormIndex, multiFormData]);

  /** this fn handling form submit and validation */
  const handleForm = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const multiFormValidation = new YupFormValidator(
        productYupValidationScheme,
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
        navigate(routePaths.home);
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
                {validationErrors.length > 0 ? (
                  <p className={ds.validation_error_message}>
                    ** {validationErrors[0]} **
                  </p>
                ) : null}
              </div>
            </form>
          </div>
        </div>
      </MaxWidthLayout>
    </div>
  );
};

export default AddProduct;
