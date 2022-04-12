import type { GetServerSideProps, NextPage } from "next";
import { Layout } from "app/components/layout";
import { NewTodoForm } from "todos/components/new-todo-form";
import { ITodo } from "todos/interfaces";
import { AppResponse } from "app/lib/app-response";
import { TodoList } from "todos/components/todo-list";
import env from "app/lib/environment";

interface Props {
  todos: ITodo[];
  status: boolean;
  message: string;
}

const Home: NextPage<Props> = ({ todos }) => {
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

    return { props: { todos: data, message, status } };
  } catch (error) {
    return { props: { message: "An unknown error occurred" } };
  }
};

export default Home;
