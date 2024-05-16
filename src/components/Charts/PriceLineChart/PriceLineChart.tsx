// packages
import React, { FC } from "react";

// css
import ds from "./PriceLineChart.module.css";
import { ProductItem } from "@redux/features/products.feature";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

// types
interface PriceLineChartPropsType {
  data: ProductItem[];
}

const PriceLineChart: FC<PriceLineChartPropsType> = ({ data }) => {
  return (
    <ResponsiveContainer height={"100%"} width={"100%"}>
      <LineChart width={400} height={300} data={data}>
        <XAxis
          dataKey="name"
          tickFormatter={(name) => `${name.slice(0, 10)}...`}
        />
        <YAxis name="Price" />
        <Line type="monotone" dataKey="price" stroke="#ff7300" />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PriceLineChart;
