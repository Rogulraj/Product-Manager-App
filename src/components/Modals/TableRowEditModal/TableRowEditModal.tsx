// packages
import React, { FC, FormEvent, useEffect, useState } from "react";
import { Modal, Input } from "antd";
import { EditTwoTone } from "@ant-design/icons";
import { toast } from "sonner";

// css
import ds from "./TableRowEditModal.module.css";

// redux
import { useAppDispatch, useAppSelector } from "@redux/store/store";
import { ProductActions, ProductItem } from "@redux/features/products.feature";

// hooks
import { useCategoryList } from "@hooks/useCategoryList";

// utils
import { YupFormValidator } from "@utils/yupFormValidator";

// constants
import { productYupValidationScheme } from "@constants/productYupValidationSchema";

// components
import FloatingInput from "@components/Elements/FloatingInput/FloatingInput";
import CustomDropDown from "@components/Elements/CustomDropDown/CustomDropDown";

const { TextArea } = Input;

// types
interface TableRowEditModalPropsType {
  productData: ProductItem;
}

const TableRowEditModal: FC<TableRowEditModalPropsType> = ({ productData }) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [data, setData] = useState<ProductItem>({
    name: "",
    category: "",
    price: 0,
    description: "",
    key: "",
  });
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  /** redux */
  const dispatch = useAppDispatch();
  const { productList } = useAppSelector((state) => state.product);

  /** custom hooks */
  const { categoryList } = useCategoryList(productList, [productList]);

  /** handling form and validation */
  const handleForm = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const dataValidation = new YupFormValidator(
        productYupValidationScheme,
        data,
        (errors) => setValidationErrors(errors)
      );
      const validate = await dataValidation.validate();

      if (validate) {
        const productData: ProductItem = {
          key: data.key,
          name: data.name,
          category: data.category,
          price: data.price as number,
          description: data.description,
        };
        dispatch(ProductActions.updateProduct(productData));
        setIsModal(false);
        toast.success("product updated!");
      }
    } catch (error) {
      toast.error("something went wrong!");
    }
  };

  /** useEffect's */
  useEffect(() => {
    setData(productData);
  }, [productData]);

  return (
    <>
      <EditTwoTone size={20} onClick={() => setIsModal(true)} />
      <Modal
        title="Edit Product"
        className={ds.modal_card}
        centered
        open={isModal}
        onOk={handleForm}
        onCancel={() => setIsModal(false)}>
        <form className={ds.form_layout}>
          <FloatingInput
            inputType="text"
            labelText="Name"
            value={data.name}
            onChangeFn={(e) => setData({ ...data, name: e.target.value })}
          />
          <div className={ds.category_card}>
            <h3 className={ds.category_title}>Category</h3>
            <div className={ds.category_drop_down}>
              <CustomDropDown
                mainPlaceHolder="Category"
                subPlaceHolder="New Category"
                options={categoryList}
                selectedValue={data.category}
                setSelectValue={(val) =>
                  setData({ ...data, category: val as string })
                }
              />
            </div>
          </div>
          <FloatingInput
            inputType="number"
            labelText="Price"
            value={data.price}
            onChangeFn={(e) => {
              const val = parseInt(e.target.value);
              if (isNaN(val)) {
                setData({ ...data, price: "" });
              } else {
                setData({ ...data, price: val });
              }
            }}
          />
          <TextArea
            showCount
            maxLength={500}
            placeholder="Product Description..."
            className={ds.text_area}
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
          />
          {validationErrors.length > 0 ? (
            <p className={ds.validation_error_message}>
              ** {validationErrors[0]} **
            </p>
          ) : null}
        </form>
      </Modal>
    </>
  );
};

export default TableRowEditModal;
