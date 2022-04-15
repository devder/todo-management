## How to start the application locally

1. Clone this [repo](https://github.com/devder/todo-management) to your local machine.
2. Navigate to the project directory in your terminal
3. Install dependencies.

```bash
npm install
```

4. Create a `.env.local` file and add `JWT_KEY` with a value of your choice.
5. Start the development server.

```bash
npm run dev
```

## How to start the application with Docker

1. [Install Docker](https://docs.docker.com/get-docker/) on your machine.
2. Build and run the application

```bash
docker compose up
# OR
docker build -t todo-management .
docker run -p 3000:3000 todo-management
```

### View the application
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

# Directory structure

System(directories) is structured using DDD

- Api routes for auth is in src/pages/api/auth
- Front end routes for auth is in src/pages/auth
- Api routes for todos is in src/pages/api/todos
- Front end routes for todos is in src/pages/todos
- Tests, components, contexts, hooks, interfaces, reducers, styles, utilities for auth and todos are in src/modules/auth and src/modules/todos respectively
- App wide styles is in src/styles
- App wide components, contexts and utilities is in src/app

```bash
todo-management
├── Dockerfile
├── docker-compose.yml
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.json
├── jest.config.js
├── next.config.js
├── .gitignore
├── .dockerignore
├── .env.local
├── .env.test.local
├── .eslintrc.json
├── public
│   └── favicon.ico
├── src
│   ├── app
│   │   ├── components
│   │   │   ├── layout.tsx
│   │   │   ├── loader.tsx
│   │   │   └── navbar.tsx
│   │   ├── contexts
│   │   │   └── custom-theme.tsx
│   │   ├── lib
│   │   │   ├── app-response.ts
│   │   │   ├── environment.ts
│   │   │   └── error-code.ts
│   │   └── utils
│   │       ├── db-connect.ts
│   │       └── fetcher.ts
│   ├── modules
│   │   ├── auth
│   │   │   ├── tests
│   │   │   │   └── api
│   │   │   │       ├── get-user.test.ts
│   │   │   │       ├── sing-in.test.ts
│   │   │   │       ├── sign-out.test.ts
│   │   │   │       └── sign-up.test.ts
│   │   │   ├── components
│   │   │   │   ├── account-menu.tsx
│   │   │   │   └── auth-form.tsx
│   │   │   ├── context
│   │   │   │   └── auth-context.tsx
│   │   │   ├── hooks
│   │   │   │   └── use-user.ts
│   │   │   ├── interfaces
│   │   │   │   ├── index.ts
│   │   │   │   └── Iuser.ts
│   │   │   ├── reducers
│   │   │   │   └── auth-reducer.ts
│   │   │   ├── styles
│   │   │   │   └── auth-form.module.scss
│   │   │   └── utils
│   │   │       ├── build-user.ts
│   │   │       ├── cookie-util.ts
│   │   │       ├── password-util.ts
│   │   │       ├── session-util.ts
│   │   │       └── validate-user.ts
│   │   └── todos
│   │       ├── tests
│   │       │   └── api
│   │       │       ├── [todoId].test.ts
│   │       │       ├── delete-todo.test.ts
│   │       │       ├── get-todos.test.ts
│   │       │       └── new-todo.test.ts
│   │       ├── components
│   │       │   ├── edit-todo-form.tsx
│   │       │   ├── new-todo-form.tsx
│   │       │   ├── todo-item.tsx
│   │       │   └── todo-list.tsx
│   │       ├── context
│   │       │   └── todos-context.tsx
│   │       ├── interfaces
│   │       │   └── index.ts
│   │       ├── reducers
│   │       │   └── todo-reducer.ts
│   │       └── styles
│   │           ├── todo-form.module.scss
│   │           └── todo-item.module.scss
│   ├── pages
│   │   ├── api
│   │   │   ├── auth
│   │   │   │   ├── db
│   │   │   │   │   └── auth.json
│   │   │   │   ├── get-user.ts
│   │   │   │   ├── sign-in.ts
│   │   │   │   ├── sign-out.ts
│   │   │   │   └── sign-up.ts
│   │   │   └── todos
│   │   │       ├── db
│   │   │       │   └── todos.json
│   │   │       ├── [todoId].ts
│   │   │       ├── delete-todo.ts
│   │   │       ├── index.ts
│   │   │       └── new-todo.ts
│   │   ├── auth
│   │   │   └── index.tsx
│   │   ├── todos
│   │   │   └── [todoId].tsx
│   │   ├── app.tsx
│   │   └── index.tsx
│   └── styles
│       └── globals.scss
├── .next
└── node_modules
```
