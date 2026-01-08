import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash, FaCoins, FaUsers, FaCalendarAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useUserData from '../../../hooks/useUserData';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

const MyTasks = () => {
    const { user } = useAuth();
    const { refetch: refetchUser } = useUserData();
    const axiosSecure = useAxiosSecure();
    const [selectedTask, setSelectedTask] = useState(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    const { register, handleSubmit, reset, setValue } = useForm();

    // Fetch buyer's tasks
    const { data: tasks = [], isLoading, refetch } = useQuery({
        queryKey: ['myTasks', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/tasks/buyer/${user.email}`);
            return res.data;
        }
    });

    // Open update modal
    const openUpdateModal = (task) => {
        setSelectedTask(task);
        setValue('task_title', task.task_title);
        setValue('task_detail', task.task_detail);
        setValue('submission_info', task.submission_info);
        setIsUpdateModalOpen(true);
    };

    // Handle update
    const onUpdate = async (data) => {
        try {
            const res = await axiosSecure.patch(`/api/tasks/${selectedTask._id}`, {
                task_title: data.task_title,
                task_detail: data.task_detail,
                submission_info: data.submission_info
            });

            if (res.data.modifiedCount > 0) {
                toast.success('Task updated successfully!');
                refetch();
                setIsUpdateModalOpen(false);
                reset();
            }
        } catch (error) {
            toast.error('Failed to update task');
        }
    };

    // Handle delete
    const handleDelete = async (task) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                // Calculate refund amount
                const refundAmount = task.required_workers * task.payable_amount;

                const res = await axiosSecure.delete(`/api/tasks/${task._id}`, {
                    data: {
                        buyer_email: user.email,
                        refund_amount: refundAmount
                    }
                });

                if (res.data.deletedCount > 0) {
                    toast.success(`Task deleted! ${refundAmount} coins refunded.`);
                    refetch();
                    refetchUser();
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
                <h1 className="text-3xl font-bold text-gray-800">My Tasks</h1>
                <p className="text-gray-600 mt-2">
                    Manage all your created tasks ({tasks.length} tasks)
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
                                    Task Title
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    Workers Needed
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    Amount/Worker
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    Deadline
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    Actions
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
                                                <span className="font-medium text-gray-800">
                                                    {task.task_title}
                                                </span>
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
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => openUpdateModal(task)}
                                                    className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                                                    title="Edit"
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(task)}
                                                    className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                                                    title="Delete"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                        No tasks created yet. Start by adding a new task!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* Update Modal */}
            {isUpdateModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl max-w-lg w-full"
                    >
                        <div className="p-6 border-b">
                            <h3 className="text-xl font-bold text-gray-800">Update Task</h3>
                        </div>

                        <form onSubmit={handleSubmit(onUpdate)} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Task Title
                                </label>
                                <input
                                    type="text"
                                    {...register('task_title')}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Task Detail
                                </label>
                                <textarea
                                    {...register('task_detail')}
                                    rows="4"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Submission Info
                                </label>
                                <textarea
                                    {...register('submission_info')}
                                    rows="3"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 resize-none"
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
                                >
                                    Update Task
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsUpdateModalOpen(false);
                                        reset();
                                    }}
                                    className="px-6 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default MyTasks;