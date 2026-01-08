import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useUserData from '../hooks/useUserData';
import LoadingSpinner from '../components/Shared/LoadingSpinner';

const WorkerRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { userData, isLoading } = useUserData();
    const location = useLocation();

    if (loading || isLoading) {
        return <LoadingSpinner />;
    }

    if (user && userData?.role === 'worker') {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default WorkerRoute;