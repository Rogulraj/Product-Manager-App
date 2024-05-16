// packages
import React, { FC } from "react";
import FloatingInput, {
  FloatingInputPropsType,
} from "@components/Elements/FloatingInput/FloatingInput";
import { Button } from "antd";

import { ButtonType } from "antd/es/button/buttonHelpers";

// css
import ds from "./FloatInputWithBtnCard.module.css";

// types
interface FloatInputWithBtnCardPropsType extends FloatingInputPropsType {
  btnTitle: string;
  btnHtmlType: HTMLButtonElement["type"];
  btnType: ButtonType;
  onClickBtnFn?: () => void;
}

const FloatInputWithBtnCard: FC<FloatInputWithBtnCardPropsType> = ({
  inputType,
  labelText,
  elementRef,
  onChangeFn,
  value,
  btnTitle,
  btnType,
  btnHtmlType,
  onClickBtnFn,
}) => {
  return (
    <>
      <div className={ds.input_card}>
        <FloatingInput
          inputType={inputType}
          labelText={labelText}
          elementRef={elementRef}
          onChangeFn={onChangeFn}
          value={value}
        />
      </div>
      <div className={ds.btn_card}>
        <Button htmlType={btnHtmlType} type={btnType} onClick={onClickBtnFn}>
          {btnTitle}
        </Button>
      </div>
    </>
  );
};

export default FloatInputWithBtnCard;
