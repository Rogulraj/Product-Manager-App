// packages
import React, { FC } from "react";

// css
import ds from "./Analytics.module.css";
import PrimaryHeader from "@components/PrimaryHeader/PrimaryHeader";
import CustomHelmet from "@components/CustomHelmet/CustomHelmet";
import MaxWidthLayout from "@components/Layout/MaxWidthLayout/MaxWidthLayout";
import CategoryPieChart from "@components/Charts/CategoryPieChart/CategoryPieChart";
import { useAppSelector } from "@redux/store/store";
import PriceLineChart from "@components/Charts/PriceLineChart/PriceLineChart";

// types
interface AnalyticsPropsType {}

const Analytics: FC<AnalyticsPropsType> = ({}) => {
  /** redux */
  const { productList } = useAppSelector((state) => state.product);

  return (
    <div className={ds.main_layout}>
      <CustomHelmet title="Add Product" />
      <PrimaryHeader />
      <MaxWidthLayout>
        <>
          <div className={ds.chart_card}>
            <h2 className={ds.chart_title}>Category Count Chart</h2>
            <div className={ds.pie_chart}>
              <CategoryPieChart data={productList} />
            </div>
            <p className={ds.chart_summary}>
              This pie chart provides insights into the product composition
              based on categories. By looking at the chart, the user can easily
              identify which categories have more products and which have fewer.
              This can be helpful for understanding product trends and making
              informed decisions.
            </p>
          </div>
          <div className={ds.chart_card}>
            <h2 className={ds.chart_title}>Price & Name Chart</h2>
            <div className={ds.pie_chart}>
              <PriceLineChart data={productList} />
            </div>
            <p className={ds.chart_summary}>
              The line chart allows users to see how product prices fluctuate
              over time. By following the line, users can identify price trends,
              such as increases, decreases, or periods of stability. This can be
              valuable for understanding pricing strategies, tracking product
              value, and making informed decisions.
            </p>
          </div>
        </>
      </MaxWidthLayout>
    </div>
  );
};

export default Analytics;
