import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useUserData = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: userData, isLoading, refetch } = useQuery({
        queryKey: ['userData', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/users/${user.email}`);
            return res.data;
        }
    });

    return { userData, isLoading, refetch };
};

export default useUserData;