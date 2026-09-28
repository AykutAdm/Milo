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
import NotificationPage from "./pages/notifications/NotificationPage";
import ReportPage from "./pages/reports/ReportPage";
import ProtectedRoute from "./guards/ProtectedRoute";
import HomePage from "./pages/home/HomePage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import SettingsPage from "./pages/userSettings/SettingsPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<UserLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
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
              <Route
                path="/accounts/create"
                element={<AccountInfoCreatePage />}
              />
              <Route
                path="/accounts/update/:id"
                element={<AccountInfoUpdatePage />}
              />

              <Route path="notifications" element={<NotificationPage />} />
              <Route path="reports" element={<ReportPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
