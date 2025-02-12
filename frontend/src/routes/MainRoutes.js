import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

const Error404 = Loadable(lazy(() => import('views/error_pages/Error404')));
const Dashboard = Loadable(lazy(() => import('views/dashboard/Default')));

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/error404',
            element: <Error404 />
        },
        {
            path: '/',
            element: <Dashboard />
        }
    ]
};

export default MainRoutes;
