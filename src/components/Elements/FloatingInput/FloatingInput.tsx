// packages
import React, { ChangeEvent, FC, RefObject } from "react";

// css
import ds from "./FloatingInput.module.css";

// types
export interface FloatingInputPropsType {
  labelText: string;
  inputType: "number" | "text" | "date";
  elementRef?: RefObject<HTMLInputElement>;
  value?: string | number;
  onChangeFn?: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDownFn?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const FloatingInput: FC<FloatingInputPropsType> = ({
  inputType,
  labelText,
  elementRef,
  value,
  onChangeFn,
  onKeyDownFn,
}) => {
  /** methods */
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChangeFn) {
      onChangeFn(event);
    }
  };

  return (
    <div className={ds.floating_input_card}>
      <input
        type={inputType}
        className={ds.floating_input}
        placeholder=""
        ref={elementRef}
        value={value}
        onChange={handleChange}
        onKeyDown={onKeyDownFn && onKeyDownFn}
      />
      <label className={ds.floating_label}>{labelText}</label>
    </div>
  );
};

export default FloatingInput;
