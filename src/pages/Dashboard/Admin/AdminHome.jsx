import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FaUsers, FaTasks, FaCoins, FaDollarSign, FaCheck } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

const AdminHome = () => {
    const axiosSecure = useAxiosSecure();

    // Fetch admin stats
    const { data: stats = {}, isLoading: statsLoading } = useQuery({
        queryKey: ['adminStats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/api/users/admin-stats');
            return res.data;
        }
    });

    // Fetch pending withdrawals
    const { data: withdrawals = [], isLoading: withdrawalsLoading, refetch } = useQuery({
        queryKey: ['pendingWithdrawals'],
        queryFn: async () => {
            const res = await axiosSecure.get('/api/withdrawals/pending');
            return res.data;
        }
    });

    // Handle approve withdrawal
    const handleApproveWithdrawal = async (withdrawal) => {
        try {
            const res = await axiosSecure.patch(`/api/withdrawals/approve/${withdrawal._id}`, {
                worker_email: withdrawal.worker_email,
                withdrawal_coin: withdrawal.withdrawal_coin
            });

            if (res.data.modifiedCount > 0) {
                toast.success('Withdrawal approved successfully!');
                refetch();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to approve');
        }
    };

    if (statsLoading || withdrawalsLoading) return <LoadingSpinner />;

    const statCards = [
        {
            title: 'Total Workers',
            value: stats.totalWorkers || 0,
            icon: FaUsers,
            color: 'from-blue-500 to-cyan-500',
            bgColor: 'bg-blue-100'
        },
        {
            title: 'Total Buyers',
            value: stats.totalBuyers || 0,
            icon: FaUsers,
            color: 'from-purple-500 to-pink-500',
            bgColor: 'bg-purple-100'
        },
        {
            title: 'Total Coins',
            value: stats.totalCoins || 0,
            icon: FaCoins,
            color: 'from-amber-500 to-orange-500',
            bgColor: 'bg-amber-100'
        },
        {
            title: 'Total Payments',
            value: stats.totalPayments || 0,
            icon: FaDollarSign,
            color: 'from-green-500 to-emerald-500',
            bgColor: 'bg-green-100',
            prefix: '$'
        }
    ];

    return (
        <div className="space-y-8">
            {/* Welcome Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl p-8 text-white"
            >
                <h1 className="text-3xl font-bold mb-2">Admin Dashboard 🛡️</h1>
                <p className="text-red-200">
                    Manage users, tasks, and platform operations
                </p>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-xl shadow-lg p-6"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm mb-1">{stat.title}</p>
                                <h3 className="text-3xl font-bold text-gray-800">
                                    {stat.prefix || ''}{stat.value.toLocaleString()}
                                </h3>
                            </div>
                            <div className={`w-14 h-14 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                                <stat.icon className={`text-2xl bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Withdrawal Requests */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
                <div className="p-6 border-b">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <FaDollarSign className="text-green-500" />
                        Pending Withdrawal Requests ({withdrawals.length})
                    </h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    Worker
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    Coins
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    Amount
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    Payment Method
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    Account
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    Date
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {withdrawals.length > 0 ? (
                                withdrawals.map((withdrawal) => (
                                    <tr key={withdrawal._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-medium text-gray-800">
                                                    {withdrawal.worker_name}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {withdrawal.worker_email}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="flex items-center gap-1 text-amber-600 font-semibold">
                                                <FaCoins className="text-amber-500" />
                                                {withdrawal.withdrawal_coin}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-green-600 font-semibold">
                                                ${withdrawal.withdrawal_amount}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {withdrawal.payment_system}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {withdrawal.account_number}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {new Date(withdrawal.withdraw_date).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleApproveWithdrawal(withdrawal)}
                                                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                                            >
                                                <FaCheck />
                                                Approve
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                                        No pending withdrawal requests.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminHome;