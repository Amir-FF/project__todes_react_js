import ErrorMessage from "../components/common/ErrorMessage";
import LoadingSpinner from "../components/common/LoadingSpinner";
import PageTitle from "../components/common/PageTitle";
import TodoForm from "../components/todos/TodoForm";
import TodoLimitSelect from "../components/todos/TodoLimitSelect";
import TodoList from "../components/todos/TodoList";
import useTodos from "../hooks/useTodos";

const TodosPage = () => {
  const {
    todos,
    limit,
    status,
    pending,
    setLimit,
    addTodo,
    toggleTodo,
    deleteTodo,
  } = useTodos();

  return (
    <>
      <PageTitle>Create ToDo:</PageTitle>

      <TodoForm onAdd={addTodo} />

      <hr className="my-5" />

      <TodoLimitSelect value={limit} onChange={setLimit} />

      {status.error && <ErrorMessage message={status.error} />}

      {status.loading && (
        <div className="mb-3">
          <LoadingSpinner />
        </div>
      )}

      <TodoList
        todos={todos}
        pending={pending}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
    </>
  );
};

export default TodosPage;
