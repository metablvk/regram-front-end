import { ReactNode } from "react";
import Navigation from "components/navigation/navigation.component";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
};

export default Layout;
