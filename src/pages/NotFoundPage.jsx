import { Link } from "react-router";
import PageTitle from "../components/common/PageTitle";
import { ROUTES } from "../constants/routes";

const NotFoundPage = () => (
  <>
    <PageTitle>Not Found: error 404</PageTitle>
    <Link to={ROUTES.home}>Back to Home</Link>
  </>
);

export default NotFoundPage;
