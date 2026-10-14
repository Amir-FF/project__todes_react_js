import { Form } from "react-bootstrap";
import { TODO_LIMIT_OPTIONS } from "../../constants/todos";

const TodoLimitSelect = ({ value, onChange }) => (
  <div className="col-md-2 mb-4">
    <Form.Select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="shadow-sm px-3 py-2"
      aria-label="Number of todos to show"
    >
      {TODO_LIMIT_OPTIONS.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </Form.Select>
  </div>
);

export default TodoLimitSelect;
