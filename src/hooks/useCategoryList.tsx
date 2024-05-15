import { extractCategory } from "@helper/extractCategory";
import { ProductItem } from "@redux/features/products.feature";
import { useMemo } from "react";

export const useCategoryList = (
  productList: ProductItem[],
  dependencyArray: React.DependencyList
): { categoryList: string[] } => {
  const categoryList: string[] = useMemo(
    () => extractCategory(productList),
    dependencyArray
  );
  return { categoryList };
};
