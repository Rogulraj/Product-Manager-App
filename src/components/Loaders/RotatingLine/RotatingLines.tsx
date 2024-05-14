// packages
import React, { FC } from "react";
import { RotatingLines } from "react-loader-spinner";

// css
import ds from "./RotatingLines.module.css";

// types
interface RotatingLinesLoaderPropsType {
  width?: string;
  strokeColor?: string;
  strokeWidth?: string;
  animationDuration?: string;
}

// react component
const RotatingLinesLoader: FC<RotatingLinesLoaderPropsType> = ({
  width = "30",
  animationDuration = "0.75",
  strokeColor = "#3651d9",
  strokeWidth = "3",
}) => {
  return (
    <div className={ds.loader_main}>
      <RotatingLines
        visible={true}
        width={width}
        strokeColor={strokeColor}
        strokeWidth={strokeWidth}
        animationDuration={animationDuration}
      />
    </div>
  );
};

export default RotatingLinesLoader;
