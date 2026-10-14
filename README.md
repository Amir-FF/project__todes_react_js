# Todo App

React + esbuild + Bootstrap + SCSS + ESLint

## Scripts

    npm install        # install dependencies
    npm run dev        # dev server with live reload (http://localhost:3000)
    npm run build      # production build → dist/
    npm run build:lint # lint, then production build
    npm run lint       # run ESLint
    npm run lint:fix   # run ESLint and fix what it can

## Project structure

    src/
      components/
        common/   # reusable UI pieces (ErrorMessage, LoadingSpinner, PageTitle)
        todos/    # todo feature components (TodoForm, TodoList, TodoItem, TodoLimitSelect)
      constants/  # api, routes, todo constants
      hooks/      # useTodos (all todo state + actions)
      layouts/    # Header, MainLayout
      pages/      # HomePage, TodosPage, NotFoundPage
      services/   # todoService (fetch wrapper for the API)
      styles/     # main.scss
