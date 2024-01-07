import Layout from "../components/Layout/Layout";
import UserTable from "../components/UserTable/UserTable";

const UserPage = () => {
  return (
    <Layout>
    <div>
      <h1>User Page</h1>
      <UserTable />
    </div>
    </Layout>
  );
};

export default UserPage;