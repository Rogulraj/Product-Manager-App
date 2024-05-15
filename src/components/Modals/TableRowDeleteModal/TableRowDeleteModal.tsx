// packages
import React, { FC, useState } from "react";

// css
import ds from "./TableRowDeleteModal.module.css";
import { Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { customTheme } from "@constants/customTheme";

const { confirm } = Modal;

// types
interface TableRowDeleteModalPropsType {}

const TableRowDeleteModal: FC<TableRowDeleteModalPropsType> = ({}) => {
  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure delete this product?",
      icon: <ExclamationCircleFilled />,
      content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <>
      <DeleteOutlined
        style={{ color: customTheme.danger }}
        size={20}
        onClick={showDeleteConfirm}
      />
      {/* <Modal
        title="Are you Sure?"
        centered
        open={isModal}
        onOk={() => setIsModal(false)}
        onCancel={() => setIsModal(false)}>
        <form className={ds.form_layout}>delete</form>
      </Modal> */}
    </>
  );
};

export default TableRowDeleteModal;
