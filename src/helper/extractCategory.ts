import { ProductItem } from "@redux/features/products.feature";

export const extractCategory = (productList: ProductItem[]): string[] => {
  const categoryList: string[] = [];

  productList.forEach((item) => {
    if (!categoryList.includes(item.category)) {
      categoryList.push(item.category);
    }
  });

  return categoryList;
};
