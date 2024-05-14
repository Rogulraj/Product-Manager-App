// packages
import React, { FC } from "react";

// css
import ds from "./MainHeader.module.css";
import { Header } from "antd/es/layout/layout";
import { Menu } from "antd";

// types
interface MainHeaderPropsType {}

const items = new Array(15).fill(null).map((_, index) => ({
  key: index + 1,
  label: `nav ${index + 1}`,
}));

const MainHeader: FC<MainHeaderPropsType> = ({}) => {
  return (
    <Header style={{ display: "flex", alignItems: "center" }}>
      <div className="demo-logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        items={items}
        style={{ flex: 1, minWidth: 0 }}
      />
    </Header>
  );
};

export default MainHeader;
