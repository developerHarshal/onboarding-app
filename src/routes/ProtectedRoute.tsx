import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/app/hook';
import { APP_ROUTES } from '@/common/constants/routing/routes';

const ProtectedRoute = () => {
    const { isAuthenticated } = useAppSelector((state) => state.auth);

    if (!isAuthenticated) {
        return <Navigate to={APP_ROUTES.PUBLIC.LOGIN} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;