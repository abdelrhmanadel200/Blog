import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isServicesOpen, setServicesOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleServicesMenu = () => {
    setServicesOpen(!isServicesOpen);
  };

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href="/" passHref>
          <div className="flex items-center space-x-2 cursor-pointer">
            <Image
              src="/images/action.png" // Replace with your logo path
              alt="Blog Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <h1 className="text-2xl font-semibold">My Blog</h1>
          </div>
        </Link>

        <button
          className="block lg:hidden p-2"
          onClick={toggleMobileMenu}
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            )}
          </svg>
        </button>

        <ul
          className={`lg:flex lg:items-center lg:space-x-6 absolute lg:relative inset-0 lg:inset-auto bg-gray-800 lg:bg-transparent lg:p-0 p-4 transition-transform transform ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } lg:translate-x-0`}
        >
          <li>
            <Link href="/" passHref>
              <div className="block py-2 px-4 hover:bg-gray-700 rounded cursor-pointer">Home</div>
            </Link>
          </li>
          <li>
            <Link href="/about" passHref>
              <div className="block py-2 px-4 hover:bg-gray-700 rounded cursor-pointer">About</div>
            </Link>
          </li>
          <li className="relative">
            <button
              className="block py-2 px-4 hover:bg-gray-700 rounded w-full text-left flex items-center justify-between"
              aria-haspopup="true"
              aria-expanded={isServicesOpen}
              onClick={toggleServicesMenu}
            >
              Services
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <ul
              className={`absolute bg-gray-800 shadow-lg mt-2 w-48 rounded transition-opacity duration-300 ${
                isServicesOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
              }`}
            >
              <li>
                <Link href="/services/service1" passHref>
                  <div className="block py-2 px-4 hover:bg-gray-700 cursor-pointer">Service 1</div>
                </Link>
              </li>
              <li>
                <Link href="/services/service2" passHref>
                  <div className="block py-2 px-4 hover:bg-gray-700 cursor-pointer">Service 2</div>
                </Link>
              </li>
              <li>
                <Link href="/services/service3" passHref>
                  <div className="block py-2 px-4 hover:bg-gray-700 cursor-pointer">Service 3</div>
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
