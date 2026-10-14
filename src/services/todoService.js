import { API_ENDPOINTS } from "../constants/api";
import { ALL_TODOS } from "../constants/todos";

const JSON_HEADERS = { "Content-Type": "application/json; charset=UTF-8" };

const request = async (url, { method = "GET", body, signal } = {}) => {
  const response = await fetch(url, {
    method,
    signal,
    headers: body ? JSON_HEADERS : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  return response.json();
};

export const getTodos = (limit = ALL_TODOS, signal) => {
  const query = limit === ALL_TODOS ? "" : `?_limit=${limit}`;

  return request(`${API_ENDPOINTS.todos}${query}`, { signal });
};

export const createTodo = (todo) =>
  request(API_ENDPOINTS.todos, { method: "POST", body: todo });

export const updateTodo = (id, changes) =>
  request(`${API_ENDPOINTS.todos}/${id}`, { method: "PATCH", body: changes });

export const deleteTodo = (id) =>
  request(`${API_ENDPOINTS.todos}/${id}`, { method: "DELETE" });
