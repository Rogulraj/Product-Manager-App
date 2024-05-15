// packages
import React, { FC } from "react";

import { ProductOutlined } from "@ant-design/icons";

// css
import ds from "./Home.module.css";
import CustomHelmet from "@components/CustomHelmet/CustomHelmet";
import PrimaryHeader from "@components/PrimaryHeader/PrimaryHeader";
import MaxWidthLayout from "@components/Layout/MaxWidthLayout/MaxWidthLayout";
import ProductTable from "@components/ProductTable/ProductTable";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { routePaths } from "@constants/routePaths";

// types
interface HomePropsType {}

const Home: FC<HomePropsType> = ({}) => {
  const navigate = useNavigate();
  return (
    <div className={ds.main_layout}>
      <CustomHelmet title="Home" />
      <PrimaryHeader />
      <MaxWidthLayout>
        <div className={ds.sub_layout}>
          <h1 className={ds.greeting_text}>Hello Rogul 👋</h1>

          <div className={ds.statistics_card}>
            <div className={ds.statistics_total_products_card}>
              <h3 className={ds.statistics_title}>You Have </h3>
              <div className={ds.status_overview_card}>
                <div className={ds.total_status_card}>
                  <p className={ds.total_status}>{10}</p>
                </div>
              </div>
              <h3 className={ds.statistics_title}>Total Products</h3>
            </div>
            <div className={ds.statistics_category_card}>
              <h3 className={ds.statistics_category_title}>Categories</h3>
              <ul className={ds.product_category_list_card}>
                <li className={ds.product_category_item_card}>
                  <p className={ds.category_text}>Mouse</p>
                </li>
                <li className={ds.product_category_item_card}>
                  <p className={ds.category_text}>Mouse</p>
                </li>
                <li className={ds.product_category_item_card}>
                  <p className={ds.category_text}>Mouse</p>
                </li>
                <li className={ds.product_category_item_card}>
                  <p className={ds.category_text}>Mouse</p>
                </li>
                <li className={ds.product_category_item_card}>
                  <p className={ds.category_text}>Mouse</p>
                </li>{" "}
                <li className={ds.product_category_item_card}>
                  <p className={ds.category_text}>Mouse</p>
                </li>{" "}
                <li className={ds.product_category_item_card}>
                  <p className={ds.category_text}>Mouse</p>
                </li>{" "}
                <li className={ds.product_category_item_card}>
                  <p className={ds.category_text}>Mouse</p>
                </li>
              </ul>
            </div>
          </div>
          <div className={ds.add_product_btn_card}>
            <Button
              type="primary"
              className={ds.add_product_btn}
              onClick={() => navigate(routePaths.addProduct)}>
              Add Product <ProductOutlined />
            </Button>
          </div>
          <div className={ds.product_table_card}>
            <ProductTable />
          </div>
        </div>
      </MaxWidthLayout>
    </div>
  );
};

export default Home;
