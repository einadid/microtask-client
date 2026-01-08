import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { FaClipboardList, FaClock, FaCoins, FaCheckCircle } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

const WorkerHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Fetch worker stats
    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ['workerStats', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/submissions/worker-stats/${user.email}`);
            return res.data;
        }
    });

    // Fetch approved submissions
    const { data: approvedSubmissions = [] } = useQuery({
        queryKey: ['approvedSubmissions', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/submissions/approved/${user.email}`);
            return res.data;
        }
    });

    if (isLoading) return <LoadingSpinner />;

    const statCards = [
        {
            title: 'Total Submissions',
            value: stats.totalSubmissions || 0,
            icon: FaClipboardList,
            color: 'from-blue-500 to-cyan-500',
            bgColor: 'bg-blue-100'
        },
        {
            title: 'Pending Submissions',
            value: stats.pendingSubmissions || 0,
            icon: FaClock,
            color: 'from-yellow-500 to-orange-500',
            bgColor: 'bg-yellow-100'
        },
        {
            title: 'Total Earnings',
            value: stats.totalEarnings || 0,
            icon: FaCoins,
            color: 'from-green-500 to-emerald-500',
            bgColor: 'bg-green-100',
            suffix: ' Coins'
        }
    ];

    return (
        <div className="space-y-8">
            {/* Welcome Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white"
            >
                <h1 className="text-3xl font-bold mb-2">
                    Welcome back, {user?.displayName}! 👋
                </h1>
                <p className="text-indigo-200">
                    Here's your earning summary and recent approved submissions.
                </p>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                                    {stat.value.toLocaleString()}{stat.suffix || ''}
                                </h3>
                            </div>
                            <div className={`w-14 h-14 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                                <stat.icon className={`text-2xl bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Approved Submissions Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
                <div className="p-6 border-b">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <FaCheckCircle className="text-green-500" />
                        Approved Submissions
                    </h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    Task Title
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    Buyer Name
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    Payable Amount
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {approvedSubmissions.length > 0 ? (
                                approvedSubmissions.map((submission) => (
                                    <tr key={submission._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-gray-800">
                                            {submission.task_title}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {submission.buyer_name}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="flex items-center gap-1 text-amber-600 font-semibold">
                                                <FaCoins className="text-amber-500" />
                                                {submission.payable_amount}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                                Approved
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                                        No approved submissions yet. Start completing tasks!
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

export default WorkerHome;