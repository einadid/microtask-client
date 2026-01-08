import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCoins, FaUsers, FaCalendarAlt, FaEye } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

const TaskList = () => {
    const axiosSecure = useAxiosSecure();

    const { data: tasks = [], isLoading } = useQuery({
        queryKey: ['availableTasks'],
        queryFn: async () => {
            const res = await axiosSecure.get('/api/tasks/available');
            return res.data;
        }
    });

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl font-bold text-gray-800">Available Tasks</h1>
                <p className="text-gray-600 mt-2">
                    Browse and complete tasks to earn coins
                </p>
            </motion.div>

            {/* Tasks Grid */}
            {tasks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tasks.map((task, index) => (
                        <motion.div
                            key={task._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="bg-white rounded-xl shadow-lg overflow-hidden"
                        >
                            {/* Task Image */}
                            <div className="relative h-48">
                                <img
                                    src={task.task_image_url}
                                    alt={task.task_title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                                    <FaCoins />
                                    {task.payable_amount}
                                </div>
                            </div>

                            {/* Task Content */}
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                                    {task.task_title}
                                </h3>

                                <p className="text-gray-500 text-sm mb-4">
                                    By: {task.buyer_name}
                                </p>

                                {/* Task Meta */}
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                                        <FaUsers className="text-indigo-500" />
                                        <span>{task.required_workers} workers needed</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                                        <FaCalendarAlt className="text-green-500" />
                                        <span>Due: {new Date(task.completion_date).toLocaleDateString()}</span>
                                    </div>
                                </div>

                                {/* View Details Button */}
                                <Link
                                    to={`/dashboard/task/${task._id}`}
                                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
                                >
                                    <FaEye />
                                    View Details
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20"
                >
                    <img
                        src="https://illustrations.popsy.co/gray/work-from-home.svg"
                        alt="No Tasks"
                        className="w-64 h-64 mx-auto mb-6"
                    />
                    <h3 className="text-2xl font-bold text-gray-700 mb-2">
                        No Tasks Available
                    </h3>
                    <p className="text-gray-500">
                        Check back later for new tasks to complete.
                    </p>
                </motion.div>
            )}
        </div>
    );
};

export default TaskList;