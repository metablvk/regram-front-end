import Layout from "components/layout/layout.component";
import { NextPage } from "next";
import styles from "./../styles/login.module.css";
import LoginForm from "./../../components/login-form/login-form.component";
const Login: NextPage = () => {
  return (
    <>
      <Layout>
        <LoginForm />
      </Layout>
    </>
  );
};

export default Login;
