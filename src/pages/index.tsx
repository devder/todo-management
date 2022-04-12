import { Layout } from "app/components/layout";
import { AppResponse } from "app/lib/app-response";
import env from "app/lib/environment";
import type { GetServerSideProps, NextPage } from "next";
import { useContext, useEffect } from "react";
import { NewTodoForm } from "todos/components/new-todo-form";
import { TodoList } from "todos/components/todo-list";
import { TodosContext } from "todos/context/todos-context";
import { ITodo } from "todos/interfaces";

interface Props {
  initialTodos: ITodo[];
  status?: boolean;
  message?: string;
}

const Home: NextPage<Props> = ({ initialTodos }) => {
  const { todos, getTodos } = useContext(TodosContext);

  useEffect(() => {
    getTodos(initialTodos);
  }, []);

  return (
    <Layout>
      <div className="container" style={{ margin: "auto" }}>
        <NewTodoForm />
        <TodoList todos={todos} />
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await fetch(`${env.clientUrl}/api/todos/`, { method: "PUT" });
    const { data, message, status } = (await res.json()) as AppResponse<ITodo[]>;

    return { props: { initialTodos: data, message, status } };
  } catch (error) {
    return { props: { message: "An unknown error occurred" } };
  }
};

export default Home;
