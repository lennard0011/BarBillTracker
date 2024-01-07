import Header from '../Header/Header';
import Title from '../Title/Title';

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      {/* Add footer or other common elements here if needed */}
    </div>
  );
};

export default Layout;
