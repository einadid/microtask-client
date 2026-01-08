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
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        How It <span className="text-indigo-600">Works</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Get started in 4 simple steps and begin earning or getting work done today
                    </p>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div key={step.id} className="relative text-center">
                            {/* Connecting Line */}
                            {index < 3 && (
                                <div className="hidden lg:block absolute top-10 left-1/2 w-full h-1 bg-gray-200">
                                    <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 w-0 group-hover:w-full transition-all duration-500"></div>
                                </div>
                            )}

                            {/* Icon Container */}
                            <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300`}>
                                <step.icon className="text-white text-3xl" />
                            </div>

                            {/* Step Number */}
                            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white border-4 border-indigo-500 rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm shadow-md">
                                {step.id}
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-bold text-gray-800 mb-3">
                                {step.title}
                            </h3>
                            <p className="text-gray-600">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;