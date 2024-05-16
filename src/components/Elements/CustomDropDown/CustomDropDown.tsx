// packages
import React, { CSSProperties, FC, useEffect, useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Input, Select, Space } from "antd";
import type { InputRef } from "antd";
import { toast } from "sonner";

// css
import ds from "./CustomDropDown.module.css";

// types
interface CustomDropDownPropsType {
  mainPlaceHolder: string;
  subPlaceHolder: string;
  options: string[];
  selectedValue: string | number;
  setSelectValue: (val: string | number) => void;
  selectStyle?: CSSProperties;
}

const CustomDropDown: FC<CustomDropDownPropsType> = ({
  mainPlaceHolder,
  options,
  subPlaceHolder,
  selectedValue,
  setSelectValue,
  selectStyle,
}) => {
  const [items, setItems] = useState<string[]>([]);
  const [name, setName] = useState<string>("");
  const inputRef = useRef<InputRef>(null);

  /** setting up the options from props */
  useEffect(() => {
    setItems(options);
  }, [options]);

  /** handling new item value change */
  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  /** adding new item to the given items or options */
  const addItem = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();

    if (name) {
      setItems([...items, name]);
      setName("");
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    } else {
      toast.warning("please enter value before adding it.");
    }
  };
  return (
    <Select
      style={selectStyle}
      placeholder={mainPlaceHolder}
      value={selectedValue !== "" ? selectedValue : null}
      onChange={setSelectValue}
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: "8px 0" }} />
          <Space style={{ padding: "0 8px 4px" }}>
            <Input
              placeholder={subPlaceHolder}
              ref={inputRef}
              value={name}
              onChange={onNameChange}
              onKeyDown={(e) => e.stopPropagation()}
            />
            <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
              Add item
            </Button>
          </Space>
        </>
      )}
      options={items.map((item) => ({ label: item, value: item }))}
    />
  );
};

export default CustomDropDown;
