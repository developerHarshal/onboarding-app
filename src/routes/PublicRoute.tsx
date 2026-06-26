// routes/PublicRoute.tsx

import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/app/hook';
import { APP_ROUTES } from '@/common/constants/routing/routes';

const PublicRoute = () => {
    const { isAuthenticated, isOnboardingCompleted } = useAppSelector((state) => state.auth);
    if (isAuthenticated) {
        return (
            <Navigate
                to={isOnboardingCompleted ? APP_ROUTES.PROTECTED.DASHBOARD : APP_ROUTES.PROTECTED.ONBOARDING}
                replace
            />
        );
    }

    return <Outlet />;
};

export default PublicRoute;