import { Layout } from "app/components/layout";
import { AppResponse } from "app/lib/app-response";
import { GetServerSideProps, NextPage } from "next";
import env from "app/lib/environment";
import EditTodoForm from "todos/components/edit-todo-form";
import { ITodo } from "todos/interfaces";

interface EditPageProps {
  todo: ITodo;
}

const EditPage: NextPage<EditPageProps> = ({ todo }) => {
  if (!todo) {
  }

  return (
    <Layout>
      <div className="container">
        <EditTodoForm todo={todo} />
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  try {
    const { todoId } = context.query;

    const res = await fetch(`${env.clientUrl}/api/todos/${todoId}`);
    const { data } = (await res.json()) as AppResponse<ITodo>;

    return { props: { todo: data } };
  } catch (error) {
    return { props: { message: "An unknown error occurred" } };
  }
};

export default EditPage;
