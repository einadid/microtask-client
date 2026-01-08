import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import {
    FaBars,
    FaTimes,
    FaHome,
    FaTasks,
    FaClipboardList,
    FaMoneyBillWave,
    FaUsers,
    FaPlusCircle,
    FaHistory,
    FaCoins,
    FaBell,
    FaSignOutAlt
} from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import useUserData from '../hooks/useUserData';

const DashboardLayout = () => {
    const { user, logOut } = useAuth();
    const { userData } = useUserData();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = async () => {
        await logOut();
    };

    // Navigation items based on role
    const getNavItems = () => {
        const role = userData?.role;

        if (role === 'admin') {
            return [
                { path: '/dashboard/admin-home', icon: FaHome, label: 'Home' },
                { path: '/dashboard/manage-users', icon: FaUsers, label: 'Manage Users' },
                { path: '/dashboard/manage-tasks', icon: FaTasks, label: 'Manage Tasks' },
            ];
        }

        if (role === 'buyer') {
            return [
                { path: '/dashboard/buyer-home', icon: FaHome, label: 'Home' },
                { path: '/dashboard/add-task', icon: FaPlusCircle, label: 'Add New Tasks' },
                { path: '/dashboard/my-tasks', icon: FaTasks, label: 'My Tasks' },
                { path: '/dashboard/purchase-coin', icon: FaCoins, label: 'Purchase Coin' },
                { path: '/dashboard/payment-history', icon: FaHistory, label: 'Payment History' },
            ];
        }

        // Worker (default)
        return [
            { path: '/dashboard/worker-home', icon: FaHome, label: 'Home' },
            { path: '/dashboard/task-list', icon: FaTasks, label: 'Task List' },
            { path: '/dashboard/my-submissions', icon: FaClipboardList, label: 'My Submissions' },
            { path: '/dashboard/withdrawals', icon: FaMoneyBillWave, label: 'Withdrawals' },
        ];
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Mobile Header */}
            <div className="lg:hidden bg-white shadow-md p-4 flex items-center justify-between">
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <FaBars className="text-2xl text-gray-700" />
                </button>
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">M</span>
                    </div>
                    <span className="font-bold text-xl">MicroTask</span>
                </Link>
                <div className="flex items-center gap-2 bg-amber-100 px-3 py-1 rounded-full">
                    <FaCoins className="text-amber-500" />
                    <span className="font-semibold text-amber-700">{userData?.coin || 0}</span>
                </div>
            </div>

            <div className="flex">
                {/* Sidebar */}
                <aside
                    className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-indigo-800 to-indigo-900 transform ${
                        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
                >
                    {/* Sidebar Header */}
                    <div className="p-6 border-b border-indigo-700">
                        <div className="flex items-center justify-between">
                            <Link to="/" className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                                    <span className="text-indigo-700 font-bold text-xl">M</span>
                                </div>
                                <span className="text-white font-bold text-xl">MicroTask</span>
                            </Link>
                            <button
                                onClick={() => setIsSidebarOpen(false)}
                                className="lg:hidden text-white"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        {/* User Info */}
                        <div className="mt-6 flex items-center gap-3">
                            <img
                                src={user?.photoURL || 'https://i.ibb.co/default.png'}
                                alt="Profile"
                                className="w-12 h-12 rounded-full border-2 border-white object-cover"
                            />
                            <div>
                                <p className="text-white font-semibold">{user?.displayName}</p>
                                <p className="text-indigo-300 text-sm capitalize">{userData?.role}</p>
                            </div>
                        </div>

                        {/* Coins Display */}
                        <div className="mt-4 flex items-center gap-2 bg-indigo-700/50 px-4 py-2 rounded-lg">
                            <FaCoins className="text-amber-400" />
                            <span className="text-white font-semibold">{userData?.coin || 0} Coins</span>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="p-4">
                        <ul className="space-y-2">
                            {getNavItems().map((item) => (
                                <li key={item.path}>
                                    <NavLink
                                        to={item.path}
                                        onClick={() => setIsSidebarOpen(false)}
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                                                isActive
                                                    ? 'bg-white text-indigo-800 font-semibold'
                                                    : 'text-indigo-200 hover:bg-indigo-700/50'
                                            }`
                                        }
                                    >
                                        <item.icon />
                                        <span>{item.label}</span>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>

                        {/* Divider */}
                        <hr className="my-6 border-indigo-700" />

                        {/* Common Links */}
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/"
                                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-indigo-200 hover:bg-indigo-700/50 transition"
                                >
                                    <FaHome />
                                    <span>Back to Home</span>
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-300 hover:bg-red-500/20 transition"
                                >
                                    <FaSignOutAlt />
                                    <span>Logout</span>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </aside>

                {/* Overlay for mobile */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* Main Content */}
                <main className="flex-1 p-4 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;