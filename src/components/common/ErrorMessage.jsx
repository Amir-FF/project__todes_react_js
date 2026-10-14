import { Alert } from "react-bootstrap";

const ErrorMessage = ({ message }) => (
  <Alert variant="danger" className="p-3 w-50">
    {message}
  </Alert>
);

export default ErrorMessage;
