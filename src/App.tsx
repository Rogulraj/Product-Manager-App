import AppProvider from "@providers/index";
import AppRoutes from "./routes";
import { ValidateEnv } from "@utils/envValidator";

ValidateEnv();

function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
