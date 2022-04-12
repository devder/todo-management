import type { GetServerSideProps, NextPage } from "next";
import { Layout } from "app/components/layout";
import { NewTodoForm } from "todos/components/new-todo-form";
import { ITodo } from "todos/interfaces";
import { AppResponse } from "app/lib/app-response";

interface Props {
  todos: ITodo[];
  status: boolean;
  message: string;
}

const Home: NextPage<Props> = ({ todos }) => {
  console.log("todos >>>", todos);

  return (
    <Layout>
      <div className="container" style={{ margin: "auto" }}>
        <NewTodoForm />
        Login to manage your todos
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await fetch("http://localhost:3001/api/todos/");
    const { data, message, status } = (await res.json()) as AppResponse<ITodo[]>;

    return { props: { todos: data, message, status } };
  } catch (error) {
    return { props: { message: "An unknown error occurred" } };
  }
};

export default Home;
