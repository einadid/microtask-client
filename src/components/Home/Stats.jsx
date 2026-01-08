import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { FaUsers, FaTasks, FaCoins, FaSmile } from 'react-icons/fa';

const Stats = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    const stats = [
        {
            icon: FaUsers,
            value: 50000,
            suffix: '+',
            label: 'Active Users',
            color: 'from-blue-500 to-cyan-500'
        },
        {
            icon: FaTasks,
            value: 250000,
            suffix: '+',
            label: 'Tasks Completed',
            color: 'from-purple-500 to-pink-500'
        },
        {
            icon: FaCoins,
            value: 1000000,
            suffix: '+',
            label: 'Coins Earned',
            color: 'from-yellow-500 to-orange-500'
        },
        {
            icon: FaSmile,
            value: 98,
            suffix: '%',
            label: 'Satisfaction Rate',
            color: 'from-green-500 to-emerald-500'
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }} />
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10" ref={ref}>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Platform Statistics
                    </h2>
                    <p className="text-xl text-indigo-200 max-w-2xl mx-auto">
                        Numbers that speak for our success and growth
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center"
                        >
                            {/* Icon */}
                            <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                                <stat.icon className="text-white text-3xl" />
                            </div>

                            {/* Counter */}
                            <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                                {inView && (
                                    <CountUp
                                        end={stat.value}
                                        duration={2.5}
                                        separator=","
                                        suffix={stat.suffix}
                                    />
                                )}
                            </div>

                            {/* Label */}
                            <p className="text-indigo-200 text-lg font-medium">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;