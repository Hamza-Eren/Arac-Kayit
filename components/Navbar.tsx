
import React from 'react';
import { NavLink } from 'react-router-dom';
import { CarIcon } from './icons/CarIcon';

const Navbar: React.FC = () => {
    const linkStyle = "px-3 py-2 rounded-md text-sm font-medium transition-colors";
    const activeLinkStyle = "bg-gray-900 text-white";
    const inactiveLinkStyle = "text-gray-300 hover:bg-gray-700 hover:text-white";

    return (
        <nav className="bg-gray-800 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0 flex items-center">
                       <CarIcon className="h-8 w-8 text-indigo-400" />
                       <span className="text-white text-xl font-bold ml-3">Servis Kayıt</span>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <NavLink 
                                to="/" 
                                className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : inactiveLinkStyle}`}
                            >
                                Ana Sayfa
                            </NavLink>
                            <NavLink 
                                to="/register"
                                className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : inactiveLinkStyle}`}
                            >
                                Araç Kayıt
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
