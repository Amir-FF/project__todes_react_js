import { BrowserRouter, Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import { ROUTES } from "./constants/routes";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import TodosPage from "./pages/TodosPage";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={ROUTES.home} element={<HomePage />} />
        <Route path={ROUTES.todos} element={<TodosPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>

    <ToastContainer position="top-center" closeOnClick={false} draggable />
  </BrowserRouter>
);

export default App;
