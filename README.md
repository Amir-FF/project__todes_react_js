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

## Deploy (Cloudflare Workers)

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Output directory: `dist`
- SPA routing (so `/todos` works on refresh) is handled by `not_found_handling`
  in `wrangler.jsonc`. Do **not** add a `public/_redirects` catch-all
  (`/* /index.html 200`): Workers rejects it as an infinite loop.
- `name` in `wrangler.jsonc` must match the Worker name in the Cloudflare dashboard.

## 🚀 Live Demo

You can view the live version of this project here: [**View Live Site**](https://project-todes-react-js.amir-computer-04-ir.workers.dev/)
