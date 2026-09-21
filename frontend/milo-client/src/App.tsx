import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SubscriptionPage from "./pages/subscriptions/SubscriptionPage";
import SubscriptionCreatePage from "./pages/subscriptions/SubscriptionCreatePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
          <Route path="/subscription/create" element={<SubscriptionCreatePage />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
