import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import MainLayout from "./components/Layout/MainLayout";
import AuthLayout from "./components/Layout/AuthLayout";
import ProtectedRoute from "./components/Layout/ProtectedRoute";
import CustomMoonLoader from "./components/loaders/CustomMoonLoader";
import NotFoundPage from "./components/errors/NotFoundPage";

import MastersRoutes from "./routes/MastersRoutes";
import TransactionRoutes from "./routes/TransactionRoutes";
import {Login} from "../../Login"

const Home = lazy(() => import("./pages/home/Home"));

function App() {
  return (
    <Suspense fallback={<CustomMoonLoader />}>
      <Routes>
        {/* Auth */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Main */}
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home-page"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          {/* Master & Transaction Routes */}
          {MastersRoutes()}
          {TransactionRoutes()}

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
