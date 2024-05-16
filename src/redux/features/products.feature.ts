import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const dummyList = [
  {
    key: "prod_2000",
    name: "Luxury Watch",
    description:
      "A timeless piece crafted with meticulous attention to detail.",
    category: "accessories",
    price: 1299.99,
  },
  {
    key: "prod_2001",
    name: "Comfy Couch",
    description: "Sink into relaxation with this plush and supportive sofa.",
    category: "furniture",
    price: 599.99,
  },
  {
    key: "prod_2002",
    name: "Action Adventure Game",
    description:
      "Embark on a thrilling journey filled with danger and excitement.",
    category: "games",
    price: 44.99,
  },
  {
    key: "prod_2003",
    name: "Organic  Bath Salts",
    description:
      "Soothe your body and mind with this luxurious blend of essential oils.",
    category: "beauty",
    price: 24.99,
  },
  {
    key: "prod_2004",
    name: "Mountain Bike",
    description:
      "Explore the great outdoors with this versatile and durable bike.",
    category: "sports",
    price: 899.99,
  },
  {
    key: "prod_1005",
    name: "Wireless Headphones",
    description:
      "Immerse yourself in crystal-clear sound with these noise-canceling headphones.",
    category: "electronics",
    price: 149.99,
  },

  {
    key: "prod_3000",
    name: "Organic  Baby Food",
    description:
      "Made with wholesome ingredients for your little one's delicate palate.",
    category: "baby",
    price: 7.99,
  },
  {
    key: "prod_3001",
    name: "Coffee Table Book on Art History",
    description: "A stunning collection of artwork from throughout the ages.",
    category: "books",
    price: 49.99,
  },
  {
    key: "prod_3002",
    name: "Portable Projector",
    description:
      "Transform any space into a home theater with this compact projector.",
    category: "electronics",
    price: 199.99,
  },
  {
    key: "prod_3003",
    name: "Handcrafted  Jewelry Set",
    description: "Unique pieces that add a touch of elegance to any outfit.",
    category: "accessories",
    price: 99.99,
  },
  {
    key: "prod_3004",
    name: "Memory Foam Pillow",
    description:
      "Wake up refreshed with this supportive and pressure-relieving pillow.",
    category: "bedding",
    price: 39.99,
  },
  {
    key: "prod_3005",
    name: "Robot Vacuum Cleaner",
    description:
      "Effortlessly clean your floors while you relax or tackle other tasks.",
    category: "appliances",
    price: 299.99,
  },
  {
    key: "prod_1006",
    name: "Smartwatch",
    description:
      "Stay connected and monitor your health with this multifunctional watch.",
    category: "electronics",
    price: 249.99,
  },
];

export interface ProductItem {
  key: string;
  name: string;
  description: string;
  category: string;
  price: number;
}

interface ProductSliceState {
  productList: ProductItem[];
}

const initialState: ProductSliceState = {
  productList: dummyList,
};

const ProductSlice = createSlice({
  name: "product",

  initialState,

  reducers: {
    addProduct: (state, action: PayloadAction<ProductItem>) => {
      state.productList.unshift(action.payload);
    },
    updateProduct: (state, action: PayloadAction<ProductItem>) => {
      state.productList = state.productList.map((item) =>
        item.key === action.payload.key ? action.payload : item
      );
    },
    removeProduct: (state, action: PayloadAction<{ productKey: string }>) => {
      state.productList = state.productList.filter(
        (product) => product.key !== action.payload.productKey
      );
    },
  },
});

export const ProductReducer = ProductSlice.reducer;
export const ProductActions = ProductSlice.actions;
