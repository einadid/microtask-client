import { createBrowserRouter } from 'react-router-dom';

// Layouts
import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashboardLayout';

// Pages
import Home from '../pages/Home/Home';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import ErrorPage from '../pages/ErrorPage';

// Dashboard - Worker
import WorkerHome from '../pages/Dashboard/Worker/WorkerHome';
import TaskList from '../pages/Dashboard/Worker/TaskList';
import TaskDetails from '../pages/Dashboard/Worker/TaskDetails';
import MySubmissions from '../pages/Dashboard/Worker/MySubmissions';
import Withdrawals from '../pages/Dashboard/Worker/Withdrawals';

// Dashboard - Buyer
import BuyerHome from '../pages/Dashboard/Buyer/BuyerHome';
import AddTask from '../pages/Dashboard/Buyer/AddTask';
import MyTasks from '../pages/Dashboard/Buyer/MyTasks';
import PurchaseCoin from '../pages/Dashboard/Buyer/PurchaseCoin';
import PaymentHistory from '../pages/Dashboard/Buyer/PaymentHistory';
import Payment from '../pages/Dashboard/Buyer/Payment';

// Dashboard - Admin
import AdminHome from '../pages/Dashboard/Admin/AdminHome';
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers';
import ManageTasks from '../pages/Dashboard/Admin/ManageTasks';

// Route Guards
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';
import BuyerRoute from './BuyerRoute';
import WorkerRoute from './WorkerRoute';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            }
        ]
    },
    {
        path: '/dashboard',
        element: (
            <PrivateRoute>
                <DashboardLayout />
            </PrivateRoute>
        ),
        children: [
            // Worker Routes
            {
                path: 'worker-home',
                element: (
                    <WorkerRoute>
                        <WorkerHome />
                    </WorkerRoute>
                )
            },
            {
                path: 'task-list',
                element: (
                    <WorkerRoute>
                        <TaskList />
                    </WorkerRoute>
                )
            },
            {
                path: 'task/:id',
                element: (
                    <WorkerRoute>
                        <TaskDetails />
                    </WorkerRoute>
                )
            },
            {
                path: 'my-submissions',
                element: (
                    <WorkerRoute>
                        <MySubmissions />
                    </WorkerRoute>
                )
            },
            {
                path: 'withdrawals',
                element: (
                    <WorkerRoute>
                        <Withdrawals />
                    </WorkerRoute>
                )
            },

            // Buyer Routes
            {
                path: 'buyer-home',
                element: (
                    <BuyerRoute>
                        <BuyerHome />
                    </BuyerRoute>
                )
            },
            {
                path: 'add-task',
                element: (
                    <BuyerRoute>
                        <AddTask />
                    </BuyerRoute>
                )
            },
            {
                path: 'my-tasks',
                element: (
                    <BuyerRoute>
                        <MyTasks />
                    </BuyerRoute>
                )
            },
            {
                path: 'purchase-coin',
                element: (
                    <BuyerRoute>
                        <PurchaseCoin />
                    </BuyerRoute>
                )
            },
            {
                path: 'payment/:amount',
                element: (
                    <BuyerRoute>
                        <Payment />
                    </BuyerRoute>
                )
            },
            {
                path: 'payment-history',
                element: (
                    <BuyerRoute>
                        <PaymentHistory />
                    </BuyerRoute>
                )
            },

            // Admin Routes
            {
                path: 'admin-home',
                element: (
                    <AdminRoute>
                        <AdminHome />
                    </AdminRoute>
                )
            },
            {
                path: 'manage-users',
                element: (
                    <AdminRoute>
                        <ManageUsers />
                    </AdminRoute>
                )
            },
            {
                path: 'manage-tasks',
                element: (
                    <AdminRoute>
                        <ManageTasks />
                    </AdminRoute>
                )
            }
        ]
    }
]);

export default router;