import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => (
  <>
    <Navbar />
    <main className="p-4 bg-white text-black min-h-screen">{children}</main> {/* White background with black text */}
    <Footer />
  </>
);

export default Layout;
