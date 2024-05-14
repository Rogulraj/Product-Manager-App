// packages
import React, { FC } from "react";

// css
import ds from "./CustomErrorBoundary.module.css";

// types
interface CustomErrorBoundaryPropsType {}

const CustomErrorBoundary: FC<CustomErrorBoundaryPropsType> = ({}) => {
  return (
    <div className={ds.main_layout}>
      <h1 className={ds.error_text}>Oops! Something Went Wrong!</h1>
    </div>
  );
};

export default CustomErrorBoundary;
