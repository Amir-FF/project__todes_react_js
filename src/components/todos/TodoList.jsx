import TodoItem from "./TodoItem";

const TodoList = ({ todos, pending, onToggle, onDelete }) => (
  <div className="cards-grid">
    {todos.map((todo) => (
      <TodoItem
        key={todo.id}
        todo={todo}
        pendingAction={pending[todo.id]}
        onToggle={onToggle}
        onDelete={onDelete}
      />
    ))}
  </div>
);

export default TodoList;
