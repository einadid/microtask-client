import { motion } from 'framer-motion';
import {
    FaShieldAlt,
    FaBolt,
    FaGlobe,
    FaHeadset,
    FaMobileAlt,
    FaChartLine
} from 'react-icons/fa';

const Features = () => {
    const features = [
        {
            icon: FaShieldAlt,
            title: 'Secure Payments',
            description: 'Your earnings are protected with our secure payment gateway. Multiple withdrawal options available.',
            color: 'text-blue-500',
            bgColor: 'bg-blue-100'
        },
        {
            icon: FaBolt,
            title: 'Instant Task Matching',
            description: 'Our smart algorithm matches workers with suitable tasks instantly for maximum efficiency.',
            color: 'text-yellow-500',
            bgColor: 'bg-yellow-100'
        },
        {
            icon: FaGlobe,
            title: 'Global Workforce',
            description: 'Access talent from around the world. Work with the best, regardless of location.',
            color: 'text-green-500',
            bgColor: 'bg-green-100'
        },
        {
            icon: FaHeadset,
            title: '24/7 Support',
            description: 'Our dedicated support team is always available to help you with any issues or questions.',
            color: 'text-purple-500',
            bgColor: 'bg-purple-100'
        },
        {
            icon: FaMobileAlt,
            title: 'Mobile Friendly',
            description: 'Access and complete tasks on any device. Our platform works seamlessly on mobile.',
            color: 'text-pink-500',
            bgColor: 'bg-pink-100'
        },
        {
            icon: FaChartLine,
            title: 'Track Progress',
            description: 'Monitor your earnings, task completion rates, and performance with detailed analytics.',
            color: 'text-indigo-500',
            bgColor: 'bg-indigo-100'
        }
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        Why Choose <span className="text-indigo-600">MicroTask</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        We provide the best platform for micro-task completion with amazing features
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            {/* Icon */}
                            <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6`}>
                                <feature.icon className={`text-3xl ${feature.color}`} />
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-bold text-gray-800 mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;