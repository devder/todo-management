import { Layout } from "app/components/layout";
import { AppResponse } from "app/lib/app-response";
import env from "app/lib/environment";
import { GetServerSideProps, NextPage } from "next";
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
    const { data, status, message } = (await res.json()) as AppResponse<ITodo>;

    if (!status) {
      throw new Error(message);
    }

    return { props: { todo: data } };
  } catch (e) {
    // return { props: { message: (e as string) || "An unknown error occurred" } };
    return { notFound: true };
  }
};

export default EditPage;
