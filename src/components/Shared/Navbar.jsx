import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaCoins } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import useUserData from '../../hooks/useUserData';
import NotificationDropdown from './NotificationDropdown';

const Navbar = () => {
    const { user, logOut } = useAuth();
    const { userData } = useUserData();
    const [isOpen, setIsOpen] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    const handleLogout = async () => {
        await logOut();
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">M</span>
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            MicroTask
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-6">
                        {user ? (
                            <>
                                <NavLink
                                    to="/dashboard"
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'text-indigo-600 font-semibold'
                                            : 'text-gray-700 hover:text-indigo-600 transition'
                                    }
                                >
                                    Dashboard
                                </NavLink>

                                {/* Available Coins */}
                                <div className="flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-full">
                                    <FaCoins className="text-amber-500" />
                                    <span className="font-semibold text-amber-700">
                                        {userData?.coin || 0}
                                    </span>
                                </div>

                                {/* Notification Dropdown */}
                                <NotificationDropdown />

                                {/* Profile Dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={() => setShowProfile(!showProfile)}
                                        className="flex items-center gap-2"
                                    >
                                        <img
                                            src={user?.photoURL || 'https://i.ibb.co/default.png'}
                                            alt="Profile"
                                            className="w-10 h-10 rounded-full border-2 border-indigo-500 object-cover"
                                        />
                                    </button>

                                    {/* Profile Dropdown Menu */}
                                    {showProfile && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border z-50">
                                            <div className="p-4 border-b">
                                                <p className="font-semibold text-gray-800">
                                                    {user?.displayName}
                                                </p>
                                                <p className="text-sm text-gray-500 capitalize">
                                                    {userData?.role}
                                                </p>
                                            </div>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Join as Developer */}
                                <a
                                    href="https://github.com/your-username/microtask-client"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
                                >
                                    Join as Developer
                                </a>
                            </>
                        ) : (
                            <>
                                <NavLink to="/login" className="text-gray-700 hover:text-indigo-600 transition">Login</NavLink>
                                <NavLink to="/register" className="text-gray-700 hover:text-indigo-600 transition">Register</NavLink>
                                <a href="https://github.com/your-username/microtask-client" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition">Join as Developer</a>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-700">
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden py-4 border-t">
                        <div className="flex flex-col gap-4">
                            {user ? (
                                <>
                                    <Link to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
                                    <div className="flex items-center gap-2 text-amber-600">
                                        <FaCoins />
                                        <span>{userData?.coin || 0} Coins</span>
                                    </div>
                                    <button onClick={handleLogout} className="text-left text-red-600">Logout</button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
                                    <Link to="/register" onClick={() => setIsOpen(false)}>Register</Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;