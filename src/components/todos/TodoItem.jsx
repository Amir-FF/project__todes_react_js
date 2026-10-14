import { memo } from "react";
import { Button, Stack } from "react-bootstrap";
import { TODO_ACTIONS } from "../../constants/todos";
import LoadingSpinner from "../common/LoadingSpinner";

const ActionButton = ({ icon, label, busy, disabled, onClick }) =>
  busy ? (
    <LoadingSpinner />
  ) : (
    <Button
      variant="link"
      className="p-0 text-reset"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
    >
      <i className={`bi fs-6 ${icon}`} />
    </Button>
  );

const TodoItem = ({ todo, pendingAction, onToggle, onDelete }) => {
  const { id, title, completed } = todo;
  const isPending = Boolean(pendingAction);

  return (
    <Stack
      direction="horizontal"
      className={`justify-content-between border border-secondary-subtle rounded py-2 px-3 shadow-sm ${
        completed ? "bg-secondary-subtle" : ""
      }`}
    >
      <p
        className={`user-select-none mb-0 ${
          completed ? "text-decoration-line-through" : ""
        }`}
      >
        {title}
      </p>

      <Stack direction="horizontal" gap={3} className="flex-shrink-0">
        <ActionButton
          icon={completed ? "bi-check2-all" : "bi-check2"}
          label="Toggle done"
          busy={pendingAction === TODO_ACTIONS.toggle}
          disabled={isPending}
          onClick={() => onToggle(todo)}
        />

        <ActionButton
          icon="bi-trash-fill"
          label="Delete"
          busy={pendingAction === TODO_ACTIONS.remove}
          disabled={isPending}
          onClick={() => onDelete(id)}
        />
      </Stack>
    </Stack>
  );
};

// memo: toggling/deleting one todo doesn't re-render all the others
export default memo(TodoItem);
