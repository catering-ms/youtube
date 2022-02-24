import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children,  quantity}) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
