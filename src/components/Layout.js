import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => (
  <>
    <Navbar />
    <main className="p-4 bg-teal-200 text-black min-h-screen">{children}</main> {/* Teal background with black text */}
    <Footer />
  </>
);

export default Layout;
