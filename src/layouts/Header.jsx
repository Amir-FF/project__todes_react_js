import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router";
import { ROUTES } from "../constants/routes";

const NAV_ITEMS = [
  { label: "Home", to: ROUTES.home, end: true },
  { label: "Todes", to: ROUTES.todos },
];

const Header = () => (
  <Navbar expand="lg" className="bg-body-tertiary shadow-sm p-3">
    <Container fluid>
      <Navbar.Brand
        as={Link}
        to={ROUTES.home}
        className="fs-4 fw-bold px-3 text-primary"
      >
        Logo
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="main-navbar-nav" />
      <Navbar.Collapse id="main-navbar-nav">
        <Nav className="me-auto">
          {NAV_ITEMS.map(({ label, to, end }) => (
            <Nav.Link key={to} as={NavLink} to={to} end={end} className="px-3">
              {label}
            </Nav.Link>
          ))}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default Header;
