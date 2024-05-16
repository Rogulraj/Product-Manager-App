// packages
import React, { FC, useState } from "react";
import { Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { toast } from "sonner";

const { confirm } = Modal;

// css
import ds from "./TableRowDeleteModal.module.css";

// constants
import { customTheme } from "@constants/customTheme";

// redux
import { useAppDispatch } from "@redux/store/store";
import { ProductActions, ProductItem } from "@redux/features/products.feature";

// types
interface TableRowDeleteModalPropsType {
  productData: ProductItem;
}

const TableRowDeleteModal: FC<TableRowDeleteModalPropsType> = ({
  productData,
}) => {
  /** redux */
  const dispatch = useAppDispatch();

  /** confirmation modal */
  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure delete this product?",
      icon: <ExclamationCircleFilled />,
      content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        dispatch(ProductActions.removeProduct({ productKey: productData.key }));
        toast.info(`${productData.name} deleted!`);
      },
      onCancel() {},
    });
  };

  return (
    <>
      <DeleteOutlined
        style={{ color: customTheme.danger }}
        size={20}
        onClick={showDeleteConfirm}
      />
    </>
  );
};

export default TableRowDeleteModal;
