import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { FaCoins, FaMedal, FaCrown, FaTrophy } from 'react-icons/fa';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';

const BestWorkers = () => {
    const axiosPublic = useAxiosPublic();

    const { data: topWorkers = [], isLoading } = useQuery({
        queryKey: ['topWorkers'],
        queryFn: async () => {
            const res = await axiosPublic.get('/api/users/top-workers');
            return res.data;
        }
    });

    if (isLoading) return <LoadingSpinner />;

    const getRankIcon = (index) => {
        switch (index) {
            case 0:
                return <FaCrown className="text-yellow-400 text-3xl" />;
            case 1:
                return <FaMedal className="text-gray-400 text-2xl" />;
            case 2:
                return <FaTrophy className="text-amber-600 text-2xl" />;
            default:
                return <span className="text-xl font-bold text-gray-500">#{index + 1}</span>;
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        Our <span className="text-indigo-600">Top Workers</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Meet our highest earning workers who have completed the most tasks with excellence
                    </p>
                </motion.div>

                {/* Workers Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {topWorkers.slice(0, 6).map((worker, index) => (
                        <motion.div
                            key={worker._id}
                            variants={itemVariants}
                            whileHover={{ y: -10, scale: 1.02 }}
                            className={`relative bg-white rounded-2xl shadow-lg overflow-hidden ${
                                index === 0 ? 'ring-4 ring-yellow-400' : ''
                            }`}
                        >
                            {/* Rank Badge */}
                            <div className="absolute top-4 right-4 z-10">
                                {getRankIcon(index)}
                            </div>

                            {/* Card Content */}
                            <div className="p-8 text-center">
                                {/* Avatar */}
                                <div className="relative inline-block mb-6">
                                    <img
                                        src={worker.photoURL || 'https://i.ibb.co/MBtjqXQ/no-avatar.png'}
                                        alt={worker.name}
                                        className={`w-28 h-28 rounded-full object-cover border-4 ${
                                            index === 0
                                                ? 'border-yellow-400'
                                                : index === 1
                                                ? 'border-gray-400'
                                                : index === 2
                                                ? 'border-amber-600'
                                                : 'border-indigo-400'
                                        }`}
                                    />
                                    {index < 3 && (
                                        <div
                                            className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-white text-sm font-semibold ${
                                                index === 0
                                                    ? 'bg-yellow-500'
                                                    : index === 1
                                                    ? 'bg-gray-500'
                                                    : 'bg-amber-600'
                                            }`}
                                        >
                                            {index === 0 ? '1st' : index === 1 ? '2nd' : '3rd'}
                                        </div>
                                    )}
                                </div>

                                {/* Name */}
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                    {worker.name}
                                </h3>

                                {/* Coins */}
                                <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-100 to-yellow-100 px-6 py-3 rounded-full">
                                    <FaCoins className="text-amber-500 text-xl" />
                                    <span className="text-2xl font-bold text-amber-600">
                                        {worker.coin?.toLocaleString() || 0}
                                    </span>
                                    <span className="text-amber-600 font-medium">Coins</span>
                                </div>
                            </div>

                            {/* Bottom Gradient */}
                            <div
                                className={`h-2 ${
                                    index === 0
                                        ? 'bg-gradient-to-r from-yellow-400 to-amber-500'
                                        : index === 1
                                        ? 'bg-gradient-to-r from-gray-400 to-gray-500'
                                        : index === 2
                                        ? 'bg-gradient-to-r from-amber-500 to-amber-600'
                                        : 'bg-gradient-to-r from-indigo-500 to-purple-500'
                                }`}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default BestWorkers;