import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import SubscriptionPage from "./pages/subscriptions/SubscriptionPage";
import SubscriptionCreatePage from "./pages/subscriptions/SubscriptionCreatePage";
import SubscriptionUpdatePage from "./pages/subscriptions/SubscriptionUpdatePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import UserLayout from "./layouts/userLayout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<UserLayout />}>
            <Route path="/subscription" element={<SubscriptionPage />} />
            <Route
              path="/subscription/create"
              element={<SubscriptionCreatePage />}
            />
            <Route
              path="/subscription/update/:id"
              element={<SubscriptionUpdatePage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
