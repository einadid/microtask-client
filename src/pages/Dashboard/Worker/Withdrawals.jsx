import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FaCoins, FaDollarSign, FaWallet } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import useUserData from '../../../hooks/useUserData';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Withdrawals = () => {
    const { user } = useAuth();
    const { userData, refetch } = useUserData();
    const axiosSecure = useAxiosSecure();
    const [submitting, setSubmitting] = useState(false);

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();

    const coinToWithdraw = watch('withdrawal_coin') || 0;
    const withdrawalAmount = (coinToWithdraw / 20).toFixed(2); // 20 coins = $1

    const canWithdraw = userData?.coin >= 200;

    const onSubmit = async (data) => {
        if (data.withdrawal_coin > userData?.coin) {
            return toast.error('Insufficient coins!');
        }

        if (data.withdrawal_coin < 200) {
            return toast.error('Minimum 200 coins required for withdrawal');
        }

        setSubmitting(true);

        const withdrawalData = {
            worker_email: user.email,
            worker_name: user.displayName,
            withdrawal_coin: parseInt(data.withdrawal_coin),
            withdrawal_amount: parseFloat(withdrawalAmount),
            payment_system: data.payment_system,
            account_number: data.account_number,
            status: 'pending',
            withdraw_date: new Date()
        };

        try {
            const res = await axiosSecure.post('/api/withdrawals', withdrawalData);
            
            if (res.data.insertedId) {
                toast.success('Withdrawal request submitted successfully!');
                reset();
                refetch();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Withdrawal request failed');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl font-bold text-gray-800">Withdrawals</h1>
                <p className="text-gray-600 mt-2">
                    Withdraw your earnings to your preferred payment method
                </p>
            </motion.div>

            {/* Earnings Summary */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="text-center p-4 bg-white/10 rounded-lg">
                        <FaCoins className="text-4xl mx-auto mb-2 text-yellow-300" />
                        <p className="text-indigo-200 text-sm">Available Coins</p>
                        <p className="text-3xl font-bold">{userData?.coin || 0}</p>
                    </div>
                    <div className="text-center p-4 bg-white/10 rounded-lg">
                        <FaDollarSign className="text-4xl mx-auto mb-2 text-green-300" />
                        <p className="text-indigo-200 text-sm">Withdrawal Amount</p>
                        <p className="text-3xl font-bold">
                            ${((userData?.coin || 0) / 20).toFixed(2)}
                        </p>
                    </div>
                </div>
                <p className="text-center mt-4 text-indigo-200 text-sm">
                    Exchange Rate: 20 Coins = $1.00
                </p>
            </motion.div>

            {/* Withdrawal Form */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-lg p-6"
            >
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <FaWallet className="text-indigo-600" />
                    Withdrawal Request
                </h2>

                {canWithdraw ? (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Coins to Withdraw */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Coins to Withdraw *
                            </label>
                            <input
                                type="number"
                                {...register('withdrawal_coin', {
                                    required: 'Please enter amount to withdraw',
                                    min: {
                                        value: 200,
                                        message: 'Minimum 200 coins required'
                                    },
                                    max: {
                                        value: userData?.coin,
                                        message: 'Cannot exceed available coins'
                                    }
                                })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="Enter coins (min 200)"
                            />
                            {errors.withdrawal_coin && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.withdrawal_coin.message}
                                </p>
                            )}
                        </div>

                        {/* Withdrawal Amount (Auto-calculated) */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Withdrawal Amount ($)
                            </label>
                            <input
                                type="text"
                                value={`$${withdrawalAmount}`}
                                readOnly
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 font-semibold"
                            />
                        </div>

                        {/* Payment System */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Payment System *
                            </label>
                            <select
                                {...register('payment_system', {
                                    required: 'Please select a payment system'
                                })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            >
                                <option value="">Select payment method</option>
                                <option value="Bkash">Bkash</option>
                                <option value="Nagad">Nagad</option>
                                <option value="Rocket">Rocket</option>
                                <option value="Stripe">Stripe (Bank Transfer)</option>
                            </select>
                            {errors.payment_system && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.payment_system.message}
                                </p>
                            )}
                        </div>

                        {/* Account Number */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Account Number *
                            </label>
                            <input
                                type="text"
                                {...register('account_number', {
                                    required: 'Account number is required'
                                })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="Enter your account number"
                            />
                            {errors.account_number && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.account_number.message}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition disabled:opacity-50"
                        >
                            {submitting ? 'Processing...' : 'Request Withdrawal'}
                        </button>
                    </form>
                ) : (
                    <div className="text-center py-12">
                        <FaCoins className="text-6xl text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            Insufficient Coins
                        </h3>
                        <p className="text-gray-500">
                            You need at least 200 coins ($10) to make a withdrawal.
                        </p>
                        <p className="text-gray-500 mt-2">
                            Current balance: <span className="font-semibold">{userData?.coin || 0} coins</span>
                        </p>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default Withdrawals;