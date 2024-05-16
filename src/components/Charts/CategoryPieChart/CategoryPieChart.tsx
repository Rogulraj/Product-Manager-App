import { ProductItem } from "@redux/features/products.feature";
import randomColor from "randomcolor";
import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: ProductItem[];
}

const CategoryPieChart: React.FC<Props> = ({ data }) => {
  // Extracting category counts from the data
  const categoryCounts: { [key: string]: number } = data.reduce(
    (acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  // Formatting data for the pie chart
  const pieChartData = Object.keys(categoryCounts)
    .map((category) => ({
      name: category,
      value: categoryCounts[category],
    }))
    .reverse();

  // Define colors for each category (you can customize the color scheme)
  const COLORS = pieChartData.map((item) => {
    return randomColor({
      luminosity: "light",
      format: "rgba",
      alpha: 0.8,
    });
  });

  return (
    <ResponsiveContainer height={"100%"} width={"100%"}>
      <PieChart width={400} height={300}>
        <Pie
          data={pieChartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value">
          {pieChartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CategoryPieChart;
