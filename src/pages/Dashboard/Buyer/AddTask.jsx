import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FaPlus, FaImage, FaCoins } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import useUserData from '../../../hooks/useUserData';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AddTask = () => {
    const { user } = useAuth();
    const { userData, refetch } = useUserData();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [imageUploading, setImageUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset
    } = useForm();

    const requiredWorkers = watch('required_workers') || 0;
    const payableAmount = watch('payable_amount') || 0;
    const totalCost = requiredWorkers * payableAmount;

    // Handle image upload to ImgBB
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setImageUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await fetch(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
                {
                    method: 'POST',
                    body: formData
                }
            );
            const data = await res.json();
            
            if (data.success) {
                setImageUrl(data.data.url);
                toast.success('Image uploaded successfully!');
            }
        } catch (error) {
            toast.error('Image upload failed');
        } finally {
            setImageUploading(false);
        }
    };

    const onSubmit = async (data) => {
        // Check if user has enough coins
        if (totalCost > userData?.coin) {
            toast.error('Not enough coins! Please purchase more coins.');
            navigate('/dashboard/purchase-coin');
            return;
        }

        if (!imageUrl) {
            toast.error('Please upload a task image');
            return;
        }

        setSubmitting(true);

        const taskData = {
            task_title: data.task_title,
            task_detail: data.task_detail,
            required_workers: parseInt(data.required_workers),
            payable_amount: parseInt(data.payable_amount),
            completion_date: data.completion_date,
            submission_info: data.submission_info,
            task_image_url: imageUrl,
            buyer_email: user.email,
            buyer_name: user.displayName
        };

        try {
            const res = await axiosSecure.post('/api/tasks', taskData);

            if (res.data.insertedId) {
                // Reduce buyer's coins
                await axiosSecure.patch(`/api/users/reduce-coin/${user.email}`, {
                    coin: totalCost
                });

                toast.success('Task added successfully!');
                reset();
                setImageUrl('');
                refetch();
                navigate('/dashboard/my-tasks');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add task');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl font-bold text-gray-800">Add New Task</h1>
                <p className="text-gray-600 mt-2">
                    Create a new task for workers to complete
                </p>
            </motion.div>

            {/* Coins Info */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-6 text-white"
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <FaCoins className="text-3xl" />
                        <div>
                            <p className="text-amber-100 text-sm">Available Coins</p>
                            <p className="text-2xl font-bold">{userData?.coin || 0}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-amber-100 text-sm">Task Cost</p>
                        <p className="text-2xl font-bold">{totalCost} Coins</p>
                    </div>
                </div>
                {totalCost > (userData?.coin || 0) && (
                    <p className="mt-4 bg-red-500/20 p-3 rounded-lg text-center">
                        ⚠️ Insufficient coins! You need {totalCost - (userData?.coin || 0)} more coins.
                    </p>
                )}
            </motion.div>

            {/* Add Task Form */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-lg p-6"
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Task Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Task Title *
                        </label>
                        <input
                            type="text"
                            {...register('task_title', { required: 'Task title is required' })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder="e.g., Watch my YouTube video and leave a comment"
                        />
                        {errors.task_title && (
                            <p className="text-red-500 text-sm mt-1">{errors.task_title.message}</p>
                        )}
                    </div>

                    {/* Task Detail */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Task Description *
                        </label>
                        <textarea
                            {...register('task_detail', { required: 'Task detail is required' })}
                            rows="4"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                            placeholder="Provide detailed description of what workers need to do"
                        />
                        {errors.task_detail && (
                            <p className="text-red-500 text-sm mt-1">{errors.task_detail.message}</p>
                        )}
                    </div>

                    {/* Two Column Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Required Workers */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Required Workers *
                            </label>
                            <input
                                type="number"
                                {...register('required_workers', {
                                    required: 'Required workers is needed',
                                    min: { value: 1, message: 'Minimum 1 worker required' }
                                })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="e.g., 100"
                                min="1"
                            />
                            {errors.required_workers && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.required_workers.message}
                                </p>
                            )}
                        </div>

                        {/* Payable Amount */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Payable Amount (Coins per worker) *
                            </label>
                            <input
                                type="number"
                                {...register('payable_amount', {
                                    required: 'Payable amount is required',
                                    min: { value: 1, message: 'Minimum 1 coin required' }
                                })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="e.g., 10"
                                min="1"
                            />
                            {errors.payable_amount && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.payable_amount.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Completion Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Completion Date *
                        </label>
                        <input
                            type="date"
                            {...register('completion_date', { required: 'Completion date is required' })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            min={new Date().toISOString().split('T')[0]}
                        />
                        {errors.completion_date && (
                            <p className="text-red-500 text-sm mt-1">{errors.completion_date.message}</p>
                        )}
                    </div>

                    {/* Submission Info */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Submission Requirements *
                        </label>
                        <textarea
                            {...register('submission_info', { required: 'Submission info is required' })}
                            rows="3"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                            placeholder="What proof should workers submit? (e.g., screenshot, link, etc.)"
                        />
                        {errors.submission_info && (
                            <p className="text-red-500 text-sm mt-1">{errors.submission_info.message}</p>
                        )}
                    </div>

                    {/* Task Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Task Image *
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            {imageUrl ? (
                                <div className="relative">
                                    <img
                                        src={imageUrl}
                                        alt="Task"
                                        className="max-h-48 mx-auto rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setImageUrl('')}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ) : (
                                <label className="cursor-pointer">
                                    <FaImage className="text-4xl text-gray-400 mx-auto mb-2" />
                                    <p className="text-gray-500">
                                        {imageUploading ? 'Uploading...' : 'Click to upload image'}
                                    </p>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        disabled={imageUploading}
                                    />
                                </label>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={submitting || imageUploading || totalCost > (userData?.coin || 0)}
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        <FaPlus />
                        {submitting ? 'Adding Task...' : 'Add Task'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default AddTask;