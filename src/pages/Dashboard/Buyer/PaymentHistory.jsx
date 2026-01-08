import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { FaCoins, FaDollarSign, FaReceipt } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['paymentHistory', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/payments/buyer/${user.email}`);
            return res.data;
        }
    });

    if (isLoading) return <LoadingSpinner />;

    // Calculate totals
    const totalSpent = payments.reduce((sum, p) => sum + p.amount, 0);
    const totalCoins = payments.reduce((sum, p) => sum + p.coins_purchased, 0);

    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl font-bold text-gray-800">Payment History</h1>
                <p className="text-gray-600 mt-2">
                    View all your coin purchase transactions
                </p>
            </motion.div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-6 text-white"
                >
                    <div className="flex items-center gap-4">
                        <FaReceipt className="text-4xl opacity-80" />
                        <div>
                            <p className="text-blue-100 text-sm">Total Transactions</p>
                            <p className="text-3xl font-bold">{payments.length}</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 text-white"
                >
                    <div className="flex items-center gap-4">
                        <FaDollarSign className="text-4xl opacity-80" />
                        <div>
                            <p className="text-green-100 text-sm">Total Spent</p>
                            <p className="text-3xl font-bold">${totalSpent}</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-6 text-white"
                >
                    <div className="flex items-center gap-4">
                        <FaCoins className="text-4xl opacity-80" />
                        <div>
                            <p className="text-amber-100 text-sm">Total Coins Purchased</p>
                            <p className="text-3xl font-bold">{totalCoins}</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Payments Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    #
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    Transaction ID
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    Amount
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    Coins
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    Date
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {payments.length > 0 ? (
                                payments.map((payment, index) => (
                                    <tr key={payment._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-gray-500">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-4 text-gray-800 font-mono text-sm">
                                            {payment.transactionId.slice(0, 20)}...
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-green-600 font-semibold">
                                                ${payment.amount}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="flex items-center gap-1 text-amber-600 font-semibold">
                                                <FaCoins className="text-amber-500" />
                                                {payment.coins_purchased}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {new Date(payment.payment_date).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                        No payment history yet.
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

export default PaymentHistory;