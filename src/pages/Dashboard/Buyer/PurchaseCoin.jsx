import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCoins, FaArrowRight } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import useUserData from '../../../hooks/useUserData';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PurchaseCoin = () => {
    const { user } = useAuth();
    const { userData, refetch } = useUserData();
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);

    const packages = [
        { id: 1, coins: 10, price: 1, color: 'from-blue-500 to-cyan-500' },
        { id: 2, coins: 150, price: 10, color: 'from-purple-500 to-pink-500', popular: true },
        { id: 3, coins: 500, price: 20, color: 'from-amber-500 to-orange-500' },
        { id: 4, coins: 1000, price: 35, color: 'from-green-500 to-emerald-500' }
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl font-bold text-gray-800">Purchase Coins</h1>
                <p className="text-gray-600 mt-2">Buy coins to post tasks and get work done</p>
            </motion.div>

            {/* Current Balance */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white"
            >
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-indigo-200 text-sm">Your Current Balance</p>
                        <p className="text-4xl font-bold flex items-center gap-3">
                            <FaCoins className="text-yellow-300" />
                            {userData?.coin || 0}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-indigo-200 text-sm">Account</p>
                        <p className="font-semibold">{user?.displayName}</p>
                        <p className="text-sm text-indigo-200">{user?.email}</p>
                    </div>
                </div>
            </motion.div>

            {/* Packages Grid */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                {packages.map((pkg, index) => (
                    <motion.div
                        key={pkg.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        whileHover={{ y: -10 }}
                        className={`relative bg-white rounded-2xl shadow-lg overflow-hidden ${
                            pkg.popular ? 'ring-4 ring-purple-500' : ''
                        }`}
                    >
                        {pkg.popular && (
                            <div className="bg-purple-500 text-white text-center py-1 text-sm font-semibold">
                                Most Popular
                            </div>
                        )}

                        <div className={`p-6 bg-gradient-to-br ${pkg.color} text-white`}>
                            <div className="text-center">
                                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FaCoins className="text-4xl" />
                                </div>
                                <h3 className="text-4xl font-bold">{pkg.coins}</h3>
                                <p className="text-white/80">Coins</p>
                            </div>
                        </div>

                        <div className="p-6 text-center">
                            <p className="text-gray-500 text-sm">For just</p>
                            <p className="text-4xl font-bold text-gray-800 mb-4">
                                ${pkg.price}
                            </p>
                            <Link
                                to={`/dashboard/payment/${pkg.id}`}
                                state={{ coins: pkg.coins, price: pkg.price }}
                                className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-white bg-gradient-to-r ${pkg.color} hover:opacity-90 transition`}
                            >
                                Buy Now
                                <FaArrowRight />
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Payment Info */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gray-50 rounded-xl p-6"
            >
                <h3 className="font-semibold text-gray-800 mb-4">Secure Payment</h3>
                <div className="flex flex-wrap gap-4 items-center">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/512px-Stripe_Logo%2C_revised_2016.svg.png" alt="Stripe" className="h-8 opacity-50" />
                    <span className="text-gray-500 text-sm">Secure payment powered by Stripe</span>
                </div>
            </motion.div>
        </div>
    );
};

export default PurchaseCoin;