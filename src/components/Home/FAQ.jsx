import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaMinus } from 'react-icons/fa';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: 'How do I start earning on MicroTask?',
            answer: 'Simply register as a Worker, complete your profile, and start browsing available tasks. Complete tasks according to instructions, submit your work, and earn coins once approved by the buyer.'
        },
        {
            question: 'How does the coin system work?',
            answer: 'Coins are our platform currency. Workers earn coins for completing tasks. Buyers purchase coins to post tasks. Workers can withdraw their coins (20 coins = $1) via multiple payment methods.'
        },
        {
            question: 'What types of tasks are available?',
            answer: 'Tasks range from data entry, surveys, social media engagement, content writing, image tagging, to app testing. New tasks are added daily by buyers from around the world.'
        },
        {
            question: 'How long does withdrawal take?',
            answer: 'Withdrawal requests are processed within 24-48 hours. Once approved, funds are transferred to your selected payment method within 1-3 business days.'
        },
        {
            question: 'Is there a minimum withdrawal amount?',
            answer: 'Yes, you need a minimum of 200 coins ($10) to request a withdrawal. This ensures efficient processing and reduces transaction fees.'
        },
        {
            question: 'How do I become a Buyer?',
            answer: 'Register as a Buyer, purchase coins, and start posting tasks. You can specify requirements, set deadlines, and choose how many workers you need.'
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        Frequently Asked <span className="text-indigo-600">Questions</span>
                    </h2>
                    <p className="text-xl text-gray-600">
                        Find answers to common questions about our platform
                    </p>
                </motion.div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="border border-gray-200 rounded-xl overflow-hidden"
                        >
                            {/* Question */}
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left bg-gray-50 hover:bg-gray-100 transition"
                            >
                                <span className="text-lg font-semibold text-gray-800 pr-4">
                                    {faq.question}
                                </span>
                                <span className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                                    {openIndex === index ? <FaMinus /> : <FaPlus />}
                                </span>
                            </button>

                            {/* Answer */}
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-6 bg-white text-gray-600 leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;