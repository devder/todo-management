import type { GetServerSideProps, NextPage } from "next";
import { Layout } from "app/components/layout";
import { NewTodoForm } from "todos/components/new-todo-form";
import { ITodo, TodoActionType } from "todos/interfaces";
import { AppResponse } from "app/lib/app-response";
import { TodoList } from "todos/components/todo-list";
import env from "app/lib/environment";
import { useContext, useEffect } from "react";
import { TodosContext } from "todos/context/todos-context";

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
    const res = await fetch(`${env.clientUrl}/api/todos/`);
    const { data, message, status } = (await res.json()) as AppResponse<ITodo[]>;

    return { props: { initialTodos: data, message, status } };
  } catch (error) {
    return { props: { message: "An unknown error occurred" } };
  }
};

export default Home;
