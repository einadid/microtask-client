import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { FaTrash, FaCoins, FaUserShield, FaUser, FaUserTie } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();

    // Fetch all users
    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/api/users');
            return res.data;
        }
    });

    // Handle role change
    const handleRoleChange = async (userId, newRole) => {
        try {
            const res = await axiosSecure.patch(`/api/users/role/${userId}`, {
                role: newRole
            });

            if (res.data.modifiedCount > 0) {
                toast.success(`User role updated to ${newRole}`);
                refetch();
            }
        } catch (error) {
            toast.error('Failed to update role');
        }
    };

    // Handle delete user
    const handleDeleteUser = async (user) => {
        const result = await Swal.fire({
            title: 'Delete User?',
            text: `Are you sure you want to delete ${user.name}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete!'
        });

        if (result.isConfirmed) {
            try {
                const res = await axiosSecure.delete(`/api/users/${user._id}`);

                if (res.data.deletedCount > 0) {
                    toast.success('User deleted successfully');
                    refetch();
                }
            } catch (error) {
                toast.error('Failed to delete user');
            }
        }
    };

    const getRoleIcon = (role) => {
        switch (role) {
            case 'admin':
                return <FaUserShield className="text-red-500" />;
            case 'buyer':
                return <FaUserTie className="text-purple-500" />;
            default:
                return <FaUser className="text-blue-500" />;
        }
    };

    const getRoleBadgeColor = (role) => {
        switch (role) {
            case 'admin':
                return 'bg-red-100 text-red-700';
            case 'buyer':
                return 'bg-purple-100 text-purple-700';
            default:
                return 'bg-blue-100 text-blue-700';
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
                <h1 className="text-3xl font-bold text-gray-800">Manage Users</h1>
                <p className="text-gray-600 mt-2">
                    View and manage all platform users ({users.length} users)
                </p>
            </motion.div>

            {/* Users Table */}
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
                                    User
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    Email
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    Role
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    Coins
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    Update Role
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {users.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={user.photoURL || 'https://i.ibb.co/MBtjqXQ/no-avatar.png'}
                                                alt={user.name}
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                            <span className="font-medium text-gray-800">
                                                {user.name}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium capitalize ${getRoleBadgeColor(user.role)}`}>
                                            {getRoleIcon(user.role)}
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="flex items-center gap-1 text-amber-600 font-semibold">
                                            <FaCoins className="text-amber-500" />
                                            {user.coin}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={user.role}
                                            onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        >
                                            <option value="worker">Worker</option>
                                            <option value="buyer">Buyer</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleDeleteUser(user)}
                                            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                                            title="Delete User"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
};

export default ManageUsers;