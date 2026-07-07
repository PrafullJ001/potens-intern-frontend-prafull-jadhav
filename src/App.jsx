import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AppRoutes />
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;