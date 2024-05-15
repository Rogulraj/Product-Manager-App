// packages
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { Toaster } from "sonner";

//redux
import reduxStore from "@redux/store/store";

// components
import RotatingLinesLoader from "@components/Loaders/RotatingLine/RotatingLines";
import CustomErrorBoundary from "@components/CustomErrorBoundary/CustomErrorBoundary";
import { ConfigProvider } from "antd";

// types
type AppProviderProps = {
  children: React.ReactNode;
};

const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense
      fallback={<RotatingLinesLoader strokeWidth="3" width="50" />}>
      <ErrorBoundary FallbackComponent={() => <CustomErrorBoundary />}>
        <HelmetProvider>
          <Provider store={reduxStore}>
            <Toaster
              position="top-center"
              richColors
              duration={3000}
              theme="light"
            />
            <ConfigProvider
              theme={{
                token: {
                  fontFamily: "Nunito",
                },
              }}>
              {children}
            </ConfigProvider>
          </Provider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};

export default AppProvider;
