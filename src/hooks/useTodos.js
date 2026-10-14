import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  ALL_TODOS,
  DEFAULT_USER_ID,
  TODO_ACTIONS,
} from "../constants/todos";
import * as todoService from "../services/todoService";

const getNextId = (todos) =>
  todos.reduce((maxId, todo) => Math.max(maxId, todo.id), 0) + 1;

const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [limit, setLimit] = useState(ALL_TODOS);
  const [status, setStatus] = useState({ loading: true, error: null });
  // { [todoId]: "toggle" | "remove" } → which todos have a request in flight
  const [pending, setPending] = useState({});

  // Load todos on mount and whenever the limit changes.
  // The previous request is aborted so a slow response can't overwrite a newer one.
  useEffect(() => {
    const controller = new AbortController();

    const loadTodos = async () => {
      setStatus({ loading: true, error: null });

      try {
        setTodos(await todoService.getTodos(limit, controller.signal));
        setStatus({ loading: false, error: null });
      } catch (error) {
        if (error.name === "AbortError") return;
        setStatus({ loading: false, error: error.message });
      }
    };

    loadTodos();

    return () => controller.abort();
  }, [limit]);

  // Throws on failure so the form can show its own inline error.
  const addTodo = async (title) => {
    const todo = {
      id: getNextId(todos),
      userId: DEFAULT_USER_ID,
      title,
      completed: false,
    };

    await todoService.createTodo(todo);
    setTodos((previous) => [todo, ...previous]);
    toast.success("Todo added");
  };

  const runTodoAction = useCallback(async (id, action, task, errorMessage) => {
    setPending((previous) => ({ ...previous, [id]: action }));

    try {
      await task();
    } catch (error) {
      toast.error(`${errorMessage}: ${error.message}`);
    } finally {
      setPending((previous) => {
        const next = { ...previous };
        delete next[id];
        return next;
      });
    }
  }, []);

  const toggleTodo = useCallback(
    (todo) =>
      runTodoAction(
        todo.id,
        TODO_ACTIONS.toggle,
        async () => {
          const updated = await todoService.updateTodo(todo.id, {
            completed: !todo.completed,
          });

          setTodos((previous) =>
            previous.map((item) =>
              item.id === todo.id
                ? { ...item, completed: updated.completed }
                : item,
            ),
          );
          toast.success("Todo updated");
        },
        "Failed to update todo",
      ),
    [runTodoAction],
  );

  const deleteTodo = useCallback(
    (id) =>
      runTodoAction(
        id,
        TODO_ACTIONS.remove,
        async () => {
          await todoService.deleteTodo(id);

          setTodos((previous) => previous.filter((item) => item.id !== id));
          toast.warn("Todo deleted");
        },
        "Failed to delete todo",
      ),
    [runTodoAction],
  );

  return {
    todos,
    limit,
    status,
    pending,
    setLimit,
    addTodo,
    toggleTodo,
    deleteTodo,
  };
};

export default useTodos;
