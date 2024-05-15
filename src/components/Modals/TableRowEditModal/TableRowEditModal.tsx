// packages
import React, { FC, useState } from "react";

// css
import ds from "./TableRowEditModal.module.css";
import { Button, Modal, Input } from "antd";
import { EditTwoTone } from "@ant-design/icons";
import { customTheme } from "@constants/customTheme";
import FloatingInput from "@components/Elements/FloatingInput/FloatingInput";

const { TextArea } = Input;

// types
interface TableRowEditModalPropsType {}

const TableRowEditModal: FC<TableRowEditModalPropsType> = ({}) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  return (
    <>
      <EditTwoTone size={20} onClick={() => setIsModal(true)} />
      <Modal
        title="Edit Product"
        className={ds.modal_card}
        centered
        open={isModal}
        onOk={() => setIsModal(false)}
        onCancel={() => setIsModal(false)}>
        <form className={ds.form_layout}>
          <FloatingInput inputType="text" labelText="Name" />
          <FloatingInput inputType="text" labelText="Category" />
          <FloatingInput inputType="number" labelText="Price" />
          <TextArea
            showCount
            maxLength={500}
            placeholder="Product Description..."
            className={ds.text_area}
          />
        </form>
      </Modal>
    </>
  );
};

export default TableRowEditModal;
