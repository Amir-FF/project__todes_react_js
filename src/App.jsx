import { BrowserRouter, Route, Routes } from "react-router";
import { ROUTES } from "./constants/routes";
import HomePage from "./pages/HomePage";
import TodosPage from "./pages/TodosPage";
import MainLayout from "./layouts/MainLayout";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path={ROUTES.home} element={<HomePage />} />
            <Route path={ROUTES.todos} element={<TodosPage />} />
            <Route path="*/:id" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
