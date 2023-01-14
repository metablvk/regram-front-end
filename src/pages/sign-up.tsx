import Layout from "components/layout/layout.component";
import { NextPage } from "next";
import SignUpForm from "components/sign-up-form/sign-up-form.component";

const SignUp: NextPage = () => {
  return (
    <>
      <Layout>
        <SignUpForm />
      </Layout>
    </>
  );
};

export default SignUp;
