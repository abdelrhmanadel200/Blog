import Link from 'next/link';
import { useState } from 'react';
import { FiHome, FiInfo, FiDollarSign, FiUser } from 'react-icons/fi'; // Example icons from react-icons

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="flex items-center justify-between p-4 bg-[#0D9488]">
      <div>
        <img src="images/c186678f7cd589c185fff8baa189e685.png" alt="Logo" className="h-10" />
      </div>
      <nav className="relative flex items-center space-x-8">
        <Link href="/" className="flex items-center text-white hover:text-gray-200 transition duration-200 ml-4">
          <FiHome className="mr-1" /> Home
        </Link>
        <Link href="https://www.gammal.tech/" className="flex items-center text-white hover:text-gray-300 transition duration-200 ml-4">
          <FiInfo className="mr-1" /> About
        </Link>
        <Link href="/pricing" className="flex items-center text-white hover:text-gray-300 transition duration-200 ml-4">
          <FiDollarSign className="mr-1" /> Pricing
        </Link>
        <Link href="/signin" className="flex items-center  ml-4">
          <span 
            className="bg-[#FCE09B] text-black px-4 py-2 flex items-center justify-center hover:bg-yellow-300 transition duration-200 ml-4" 
            style={{ borderRadius: '30px', minWidth: '94px', minHeight: '43px' }}
          >
            <FiUser className="mr-1" /> Sign In
          </span>
        </Link>
      </nav>
    </header>
  );
};


export default Navbar;
