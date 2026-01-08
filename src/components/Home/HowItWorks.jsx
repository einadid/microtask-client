import { motion } from 'framer-motion';
import { FaUserPlus, FaTasks, FaCheckCircle, FaWallet } from 'react-icons/fa';

const HowItWorks = () => {
    const steps = [
        {
            id: 1,
            icon: FaUserPlus,
            title: 'Create Account',
            description: 'Sign up as a Worker or Buyer in just a few clicks. Get bonus coins on registration!',
            color: 'from-blue-500 to-cyan-500'
        },
        {
            id: 2,
            icon: FaTasks,
            title: 'Browse or Post Tasks',
            description: 'Workers find tasks to complete. Buyers post tasks they need done quickly.',
            color: 'from-purple-500 to-pink-500'
        },
        {
            id: 3,
            icon: FaCheckCircle,
            title: 'Complete & Review',
            description: 'Workers complete tasks and submit. Buyers review and approve submissions.',
            color: 'from-orange-500 to-red-500'
        },
        {
            id: 4,
            icon: FaWallet,
            title: 'Get Paid',
            description: 'Workers earn coins for approved tasks. Withdraw anytime via multiple methods.',
            color: 'from-green-500 to-emerald-500'
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        How It <span className="text-indigo-600">Works</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Get started in 4 simple steps and begin earning or getting work done today
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="relative">
                    {/* Connection Line (Desktop) */}
                    <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gray-200">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: '100%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5 }}
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="relative text-center"
                            >
                                {/* Icon Container */}
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg relative z-10`}
                                >
                                    <step.icon className="text-white text-3xl" />
                                </motion.div>

                                {/* Step Number */}
                                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white border-4 border-indigo-500 rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm z-20">
                                    {step.id}
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold text-gray-800 mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;