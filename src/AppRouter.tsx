import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import "./styles/index.scss";
import EmployeePage from "./pages/EmployeePage.tsx";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employee" element={<EmployeePage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
