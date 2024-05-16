// packages
import React, { FC, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ProductOutlined } from "@ant-design/icons";
import { Button } from "antd";

// css
import ds from "./Home.module.css";

// redux
import { useAppSelector } from "@redux/store/store";

// constants
import { routePaths } from "@constants/routePaths";

// hooks
import { useCategoryList } from "@hooks/useCategoryList";

// components
import CustomHelmet from "@components/CustomHelmet/CustomHelmet";
import PrimaryHeader from "@components/PrimaryHeader/PrimaryHeader";
import MaxWidthLayout from "@components/Layout/MaxWidthLayout/MaxWidthLayout";
import ProductTable from "@components/ProductTable/ProductTable";

// types
interface HomePropsType {}

const Home: FC<HomePropsType> = ({}) => {
  const navigate = useNavigate();

  // redux
  const { productList } = useAppSelector((state) => state.product);

  // custom hook call
  const { categoryList } = useCategoryList(productList, [productList]);

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
                  <p className={ds.total_status}>{productList.length}</p>
                </div>
              </div>
              <h3 className={ds.statistics_title}>Total Products</h3>
            </div>
            <div className={ds.statistics_category_card}>
              <h3 className={ds.statistics_category_title}>Categories</h3>
              <ul className={ds.product_category_list_card}>
                {categoryList.map((item, index) => (
                  <li className={ds.product_category_item_card} key={index}>
                    <p className={ds.category_text}>{item}</p>
                  </li>
                ))}
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
            <ProductTable
              productList={productList}
              categoryList={categoryList}
            />
          </div>
        </div>
      </MaxWidthLayout>
    </div>
  );
};

export default Home;
