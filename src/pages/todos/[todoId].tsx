import { Layout } from "app/components/layout";
import { AppResponse } from "app/lib/app-response";
import env from "app/lib/environment";
import EditTodoForm from "modules/todos/components/edit-todo-form";
import { ITodo } from "modules/todos/interfaces";
import { GetServerSideProps, NextPage } from "next";

interface EditPageProps {
  todo: ITodo;
}

const EditPage: NextPage<EditPageProps> = ({ todo }) => {
  if (!todo) {
    return <div className="container">Todo was not found</div>;
  }

  return (
    <Layout title={todo.content.substring(0, 20) + "..."}>
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
