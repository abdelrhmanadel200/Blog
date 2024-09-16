import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => (
  <>
    <Navbar />
    <main className="p-4 bg-gray-100 min-h-screen">{children}</main>
    <Footer />
  </>
);

export default Layout;
