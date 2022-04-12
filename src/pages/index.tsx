import type { NextPage } from "next";
import { Layout } from "components/layout";
import { NewTodoForm } from "todos/components/new-todo-form";

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="container" style={{ margin: "auto" }}>
        <NewTodoForm />
        Login to manage your todos
      </div>
    </Layout>
  );
};

export default Home;
