import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';

// dashboard routing
const StatusPage = Loadable(lazy(() => import('../views/pages/status/Status')));

const StatusRoute = {
    path: '/status',
    element: <StatusPage />,
};

export default StatusRoute;
