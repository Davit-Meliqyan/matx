import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./App.css";
import NotificationBlock from "./components/NotificationBlock/NotificationBlock";
import useAutoLogout from "./hooks/useAutoLogout";
import Loader from "./components/Loader/Loader";
import NotFound from "./NotFound";

// Pages — ленивые загрузки
const Layout = lazy(() => import("./pages/Layout/Layout"));
const AdministrationLayout = lazy(
  () => import("./pages/Administration/AdministrationLayout")
);
const Welcome = lazy(() => import("./pages/Welcome"));
const Login = lazy(() => import("./pages/Auth/Login"));
const Register = lazy(() => import("./pages/Auth/Register"));
const Recovery = lazy(() => import("./pages/Auth/Recovery"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail/VerifyEmail"));

const CompanyLayout = lazy(
  () => import("./pages/Administration/Company/CompanyLayout")
);

// User
const UserAdd = lazy(() => import("./pages/Administration/User/UserAdd"));
const UserEdit = lazy(() => import("./pages/Administration/User/UserEdit"));

// Roles
const RolesAdd = lazy(() => import("./pages/Administration/Roles/RolesAdd"));
const RolesEdit = lazy(() => import("./pages/Administration/Roles/RolesEdit"));

function App() {
  const isAuthenticated = true;
  useAutoLogout();

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Публичные маршруты */}
          {!isAuthenticated && (
            <>
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<Register />} />
              <Route path="/recovery" element={<Recovery />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
            </>
          )}

          {/* Приватные маршруты */}
          <Route
            path="/"
            element={
              isAuthenticated ? <Layout /> : <Navigate to="/sign-in" replace />
            }
          >
            <Route index element={<Welcome />} />

            <Route path="administration">
              {/* Company (только без id) */}
              <Route path="company" element={<CompanyLayout />} />

              {/* Users */}
              <Route path="members" element={<AdministrationLayout />}>
                <Route path="add" element={<UserAdd />} />
                <Route path="edit/:id" element={<UserEdit />} />
              </Route>

              {/* Roles */}
              <Route path="roles" element={<AdministrationLayout />}>
                <Route path="add" element={<RolesAdd />} />
                <Route path="edit/:id" element={<RolesEdit />} />
              </Route>
            </Route>
          </Route>

          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <NotificationBlock />
    </BrowserRouter>
  );
}

export default App;
