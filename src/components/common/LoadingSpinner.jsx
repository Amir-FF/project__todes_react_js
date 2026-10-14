import { Spinner } from "react-bootstrap";

const LoadingSpinner = () => (
  <Spinner className="spinner-border-sm" animation="border" role="status">
    <span className="visually-hidden">Loading...</span>
  </Spinner>
);

export default LoadingSpinner;
