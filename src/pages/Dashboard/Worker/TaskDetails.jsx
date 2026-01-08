import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
    FaCoins,
    FaUsers,
    FaCalendarAlt,
    FaUser,
    FaEnvelope,
    FaClipboardList
} from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

const TaskDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm();

    // Fetch task details
    const { data: task, isLoading } = useQuery({
        queryKey: ['task', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/tasks/${id}`);
            return res.data;
        }
    });

    // Handle submission
    const onSubmit = async (data) => {
        setSubmitting(true);

        const submissionData = {
            task_id: task._id,
            task_title: task.task_title,
            payable_amount: task.payable_amount,
            worker_email: user.email,
            worker_name: user.displayName,
            buyer_email: task.buyer_email,
            buyer_name: task.buyer_name,
            submission_details: data.submission_details,
            status: 'pending',
            submitted_date: new Date()
        };

        try {
            const res = await axiosSecure.post('/api/submissions', submissionData);
            
            if (res.data.insertedId) {
                toast.success('Task submitted successfully!');
                navigate('/dashboard/my-submissions');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Submission failed');
        } finally {
            setSubmitting(false);
        }
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Task Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
                {/* Task Image */}
                <div className="relative h-64">
                    <img
                        src={task.task_image_url}
                        alt={task.task_title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                        <h1 className="text-3xl font-bold mb-2">{task.task_title}</h1>
                        <div className="flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-1">
                                <FaUser /> {task.buyer_name}
                            </span>
                            <span className="flex items-center gap-1 bg-amber-500 px-3 py-1 rounded-full">
                                <FaCoins /> {task.payable_amount} Coins
                            </span>
                        </div>
                    </div>
                </div>

                {/* Task Info */}
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="flex items-center gap-3 bg-blue-50 p-4 rounded-lg">
                            <FaUsers className="text-2xl text-blue-500" />
                            <div>
                                <p className="text-sm text-gray-500">Workers Needed</p>
                                <p className="text-xl font-bold text-gray-800">
                                    {task.required_workers}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-green-50 p-4 rounded-lg">
                            <FaCoins className="text-2xl text-green-500" />
                            <div>
                                <p className="text-sm text-gray-500">Reward</p>
                                <p className="text-xl font-bold text-gray-800">
                                    {task.payable_amount} Coins
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-purple-50 p-4 rounded-lg">
                            <FaCalendarAlt className="text-2xl text-purple-500" />
                            <div>
                                <p className="text-sm text-gray-500">Deadline</p>
                                <p className="text-xl font-bold text-gray-800">
                                    {new Date(task.completion_date).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Task Detail */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            Task Description
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            {task.task_detail}
                        </p>
                    </div>

                    {/* Submission Info */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                            <FaClipboardList />
                            What to Submit
                        </h3>
                        <p className="text-yellow-700">
                            {task.submission_info}
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Submission Form */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-lg p-6"
            >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Submit Your Work
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Submission Details */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Submission Details *
                        </label>
                        <textarea
                            {...register('submission_details', {
                                required: 'Submission details are required'
                            })}
                            rows="6"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                            placeholder="Provide proof of task completion (e.g., screenshot link, description of work done)"
                        />
                        {errors.submission_details && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.submission_details.message}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={submitting || task.required_workers <= 0}
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {submitting ? 'Submitting...' : 'Submit Task'}
                    </button>

                    {task.required_workers <= 0 && (
                        <p className="text-center text-red-500">
                            This task is no longer accepting submissions.
                        </p>
                    )}
                </form>
            </motion.div>
        </div>
    );
};

export default TaskDetails;