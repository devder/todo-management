import { Layout } from "app/components/layout";
import { AppResponse } from "app/lib/app-response";
import env from "app/lib/environment";
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
  const { todos, getTodos } = useContext(TodosContext);

  useEffect(() => {
    getTodos(initialTodos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <div className="container">
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

    if (!status) {
      throw new Error(message);
    }
    return { props: { initialTodos: data } };
  } catch (e) {
    return { props: { message: (e as string) || "An unknown error occurred" } };
  }
};

export default Home;
