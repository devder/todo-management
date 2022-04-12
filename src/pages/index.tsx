import type { NextPage } from "next";
import { Layout } from "components/layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="container" style={{ margin: "auto" }}>
        Login to manage your todos
      </div>
    </Layout>
  );
};

export default Home;
