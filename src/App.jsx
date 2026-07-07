import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import CategoryPage from "./pages/CategoryPage";

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <CategoryPage />
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;