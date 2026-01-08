import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaTasks, FaClock, FaMoneyBillWave, FaPlus, FaEye } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

const BuyerHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Fetch buyer stats
    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ['buyerStats', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/tasks/buyer-stats/${user.email}`);
            return res.data;
        }
    });

    // Fetch pending submissions to review
    const { data: pendingSubmissions = [] } = useQuery({
        queryKey: ['pendingSubmissions', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/submissions/pending/${user.email}`);
            return res.data;
        }
    });

    if (isLoading) return <LoadingSpinner />;

    const statCards = [
        {
            title: 'Total Tasks Added',
            value: stats.totalTasks || 0,
            icon: FaTasks,
            color: 'from-blue-500 to-cyan-500',
            bgColor: 'bg-blue-100'
        },
        {
            title: 'Pending Submissions',
            value: stats.pendingWorkers || 0,
            icon: FaClock,
            color: 'from-yellow-500 to-orange-500',
            bgColor: 'bg-yellow-100'
        },
        {
            title: 'Total Payments',
            value: stats.totalPayments || 0,
            icon: FaMoneyBillWave,
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
                    Manage your tasks and review worker submissions.
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

            {/* Quick Actions */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
                <Link
                    to="/dashboard/add-task"
                    className="flex items-center gap-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-xl hover:opacity-90 transition"
                >
                    <FaPlus className="text-3xl" />
                    <div>
                        <h3 className="text-xl font-bold">Add New Task</h3>
                        <p className="text-indigo-200">Create a new task for workers</p>
                    </div>
                </Link>
                <Link
                    to="/dashboard/my-tasks"
                    className="flex items-center gap-4 bg-white border-2 border-indigo-600 text-indigo-600 p-6 rounded-xl hover:bg-indigo-50 transition"
                >
                    <FaEye className="text-3xl" />
                    <div>
                        <h3 className="text-xl font-bold">View My Tasks</h3>
                        <p className="text-gray-500">Manage your existing tasks</p>
                    </div>
                </Link>
            </motion.div>

            {/* Pending Submissions */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
                <div className="p-6 border-b flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <FaClock className="text-yellow-500" />
                        Submissions to Review
                    </h2>
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                        {pendingSubmissions.length} pending
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Worker</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Task</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Amount</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {pendingSubmissions.length > 0 ? (
                                pendingSubmissions.map((submission) => (
                                    <tr key={submission._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-gray-800">{submission.worker_name}</td>
                                        <td className="px-6 py-4 text-gray-600">{submission.task_title}</td>
                                        <td className="px-6 py-4 text-amber-600 font-semibold">{submission.payable_amount} Coins</td>
                                        <td className="px-6 py-4">
                                            <ReviewSubmissionModal submission={submission} />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                                        No pending submissions to review.
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

// Review Submission Modal Component
const ReviewSubmissionModal = ({ submission }) => {
    const axiosSecure = useAxiosSecure();
    const { refetch } = useQuery({
        queryKey: ['buyerStats', submission.buyer_email]
    });
    const { refetch: refetchSubmissions } = useQuery({
        queryKey: ['pendingSubmissions', submission.buyer_email]
    });

    const handleAction = async (status) => {
        try {
            if (status === 'approved') {
                // Update submission status and add coins to worker
                await axiosSecure.patch(`/api/submissions/approve/${submission._id}`);
            } else {
                // Reject submission and increase required_workers
                await axiosSecure.patch(`/api/submissions/reject/${submission._id}`);
            }
            refetch();
            refetchSubmissions();
        } catch (error) {
            console.error('Action failed:', error);
        }
    };

    return (
        <div className="flex gap-2">
            <button
                onClick={() => handleAction('approved')}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition text-sm font-semibold"
            >
                Approve
            </button>
            <button
                onClick={() => handleAction('rejected')}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm font-semibold"
            >
                Reject
            </button>
        </div>
    );
};

export default BuyerHome;