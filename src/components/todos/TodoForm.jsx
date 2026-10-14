import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import ErrorMessage from "../common/ErrorMessage";
import LoadingSpinner from "../common/LoadingSpinner";

const TodoForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    setSubmitting(true);
    setError(null);

    try {
      await onAdd(trimmedTitle);
      setTitle("");
    } catch (err) {
      setError(`The to-do wasn't created: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className="col-md-8">
        <Form.Group className="d-flex gap-3 mb-3">
          <div className="w-50">
            <Form.Control
              name="title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="px-2 py-2 border-secondary-subtle rounded shadow-sm"
              placeholder="ToDo Title"
              required
            />
          </div>

          <div className="flex-shrink-0">
            <Button
              type="submit"
              variant="primary"
              disabled={submitting}
              className="py-2 px-3 w-100 rounded"
            >
              Create {submitting && <LoadingSpinner />}
            </Button>
          </div>
        </Form.Group>
      </Form>

      {error && <ErrorMessage message={error} />}
    </>
  );
};

export default TodoForm;
