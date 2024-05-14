//packages
import React, { CSSProperties } from "react";

//css
import ds from "./MaxWidthLayout.module.css";

//types
interface MaxWidthLayoutPropsType {
  children: React.ReactElement;

  //default value = 1200px
  maxWidth?: CSSProperties["maxWidth"];
}

//React Element
const MaxWidthLayout = ({ children, maxWidth }: MaxWidthLayoutPropsType) => {
  return (
    <div className={ds.main_layout}>
      <div className={ds.sub_layout} style={{ maxHeight: maxWidth }}>
        {children}
      </div>
    </div>
  );
};

export default MaxWidthLayout;
