import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import DetailsPage from "./pages/DetailsPage";

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <DetailsPage />
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;