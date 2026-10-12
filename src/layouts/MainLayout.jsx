import { Container } from "react-bootstrap";
import { Outlet } from "react-router";
import Header from "./Header";

const MainLayout = () => (
  <>
    <Header />
    <Container as="main" fluid className="mt-6 px-4">
      <Outlet />
    </Container>
  </>
);

export default MainLayout;
