import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import path from "path";

export default defineConfig(({ mode }) => {
  // Load environment variables based on build mode
  dotenv.config({ path: `.env.${mode}` });

  // Rest of your Vite configuration
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@assets": path.resolve(__dirname, "./src/assets"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@services": path.resolve(__dirname, "./src/services"),
        "@providers": path.resolve(__dirname, "./src/providers"),
        "@models": path.resolve(__dirname, "./src/models"),
        "@routes": path.resolve(__dirname, "./src/routes"),
        "@pages": path.resolve(__dirname, "./src/pages"),
        "@constants": path.resolve(__dirname, "./src/constants"),
        "@utils": path.resolve(__dirname, "./src/utils"),
        "@interfaces": path.resolve(__dirname, "./src/interfaces"),
        "@helper": path.resolve(__dirname, "./src/helper"),
        "@config": path.resolve(__dirname, "./src/config"),
        "@redux": path.resolve(__dirname, "./src/redux"),
        "@hooks": path.resolve(__dirname, "./src/hooks"),
      },
    },
    // ... other configurations (e.g., server options)
  };
});
