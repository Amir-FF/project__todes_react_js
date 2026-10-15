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

## Deploy (Cloudflare)

- Build command: `npm run build`
- Output directory: `dist`
- SPA routing (so `/todos` works on refresh):
  - **Pages** → uses `public/_redirects` (delete `wrangler.jsonc`)
  - **Workers** → uses `wrangler.jsonc` (delete `public/_redirects`)

## 🚀 Live Demo

You can view the live version of this project here: [**View Live Site**](https://project-todes-react-js.amir-computer-04-ir.workers.dev/)
