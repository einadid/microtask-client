import { Link, useRouteError } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

const ErrorPage = () => {
    const error = useRouteError();

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
            >
                {/* Error Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="mb-8"
                >
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                        <FaExclamationTriangle className="text-white text-6xl" />
                    </div>
                </motion.div>

                {/* Error Code */}
                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-9xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4"
                >
                    404
                </motion.h1>

                {/* Error Message */}
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-3xl font-bold text-gray-800 mb-4"
                >
                    Oops! Page Not Found
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-gray-600 mb-8 max-w-md mx-auto"
                >
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </motion.p>

                {/* Error Details (Development) */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg max-w-md mx-auto"
                    >
                        <p className="text-red-600 text-sm">
                            <span className="font-semibold">Error:</span>{' '}
                            {error.statusText || error.message}
                        </p>
                    </motion.div>
                )}

                {/* Back to Home Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                >
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 transform hover:scale-105"
                    >
                        <FaHome />
                        Back to Home
                    </Link>
                </motion.div>

                {/* Decorative Elements */}
                <div className="absolute top-20 left-20 w-20 h-20 bg-purple-300 rounded-full blur-xl opacity-50" />
                <div className="absolute bottom-20 right-20 w-32 h-32 bg-indigo-300 rounded-full blur-xl opacity-50" />
                <div className="absolute top-40 right-40 w-16 h-16 bg-pink-300 rounded-full blur-xl opacity-50" />
            </motion.div>
        </div>
    );
};

export default ErrorPage;