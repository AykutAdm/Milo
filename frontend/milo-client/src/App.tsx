import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import SubscriptionPage from "./pages/subscriptions/SubscriptionPage";
import SubscriptionCreatePage from "./pages/subscriptions/SubscriptionCreatePage";
import SubscriptionUpdatePage from "./pages/subscriptions/SubscriptionUpdatePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

import AccountInfoPage from "./pages/accounts/AccountInfoPage";
import UserLayout from "./layouts/UserLayout";
import AccountInfoUpdatePage from "./pages/accounts/AccountInfoUpdatePage";
import AccountInfoCreatePage from "./pages/accounts/AccountInfoCreatePage";

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
            <Route path="/accounts" element={<AccountInfoPage />} />
          <Route path="/accounts/create" element={<AccountInfoCreatePage />} />
          <Route
            path="/accounts/update/:id"
            element={<AccountInfoUpdatePage />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
