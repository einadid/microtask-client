import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { FaTrash, FaCoins, FaUsers, FaCalendarAlt } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

const ManageTasks = () => {
    const axiosSecure = useAxiosSecure();

    // Fetch all tasks
    const { data: tasks = [], isLoading, refetch } = useQuery({
        queryKey: ['allTasks'],
        queryFn: async () => {
            const res = await axiosSecure.get('/api/tasks');
            return res.data;
        }
    });

    // Handle delete task
    const handleDeleteTask = async (task) => {
        const result = await Swal.fire({
            title: 'Delete Task?',
            text: `Are you sure you want to delete "${task.task_title}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete!'
        });

        if (result.isConfirmed) {
            try {
                const res = await axiosSecure.delete(`/api/tasks/admin/${task._id}`);

                if (res.data.deletedCount > 0) {
                    toast.success('Task deleted successfully');
                    refetch();
                }
            } catch (error) {
                toast.error('Failed to delete task');
            }
        }
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl font-bold text-gray-800">Manage Tasks</h1>
                <p className="text-gray-600 mt-2">
                    View and manage all platform tasks ({tasks.length} tasks)
                </p>
            </motion.div>

            {/* Tasks Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    Task
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    Buyer
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    Workers Needed
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    Reward
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    Deadline
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {tasks.length > 0 ? (
                                tasks.map((task) => (
                                    <tr key={task._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={task.task_image_url}
                                                    alt={task.task_title}
                                                    className="w-12 h-12 rounded-lg object-cover"
                                                />
                                                <div>
                                                    <p className="font-medium text-gray-800 line-clamp-1">
                                                        {task.task_title}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="text-gray-800">{task.buyer_name}</p>
                                                <p className="text-sm text-gray-500">{task.buyer_email}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="flex items-center gap-1 text-gray-600">
                                                <FaUsers className="text-indigo-500" />
                                                {task.required_workers}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="flex items-center gap-1 text-amber-600 font-semibold">
                                                <FaCoins className="text-amber-500" />
                                                {task.payable_amount}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="flex items-center gap-1 text-gray-600">
                                                <FaCalendarAlt className="text-green-500" />
                                                {new Date(task.completion_date).toLocaleDateString()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleDeleteTask(task)}
                                                className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                                                title="Delete Task"
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                        No tasks found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
};

export default ManageTasks;