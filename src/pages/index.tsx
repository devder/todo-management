import { Typography } from "@mui/material";
import { Layout } from "app/components/layout";
import { Loader } from "app/components/loader";
import { AppResponse } from "app/lib/app-response";
import env from "app/lib/environment";
import { useUser } from "modules/auth/hooks/use-user";
import NewTodoForm from "modules/todos/components/new-todo-form";
import TodoList from "modules/todos/components/todo-list";
import { TodosContext } from "modules/todos/context/todos-context";
import { ITodo } from "modules/todos/interfaces";
import type { GetServerSideProps, NextPage } from "next";
import { useContext, useEffect } from "react";

interface Props {
  initialTodos: ITodo[];
  status?: boolean;
  message?: string;
}

const Home: NextPage<Props> = ({ initialTodos }) => {
  const [user, isLoading] = useUser();
  const { todos, getTodos } = useContext(TodosContext);

  useEffect(() => {
    getTodos(initialTodos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container">
        {user ? (
          <>
            <NewTodoForm />
            <TodoList todos={todos} />
          </>
        ) : (
          <Typography align="center" variant="h4" sx={{ mt: 6 }}>
            Sign in to view all todos
          </Typography>
        )}
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await fetch(`${env.clientUrl}/api/todos/`);
    const { data, message, status } = (await res.json()) as AppResponse<ITodo[]>;

    if (!status) {
      throw new Error(message);
    }
    return { props: { initialTodos: data } };
  } catch (e) {
    return { props: { message: (e as string) || "An unknown error occurred" } };
  }
};

export default Home;
