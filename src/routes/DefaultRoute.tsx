import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/app/hook';
import { APP_ROUTES } from '@/common/constants/routing/routes';

const DefaultRoute = () => {
    const { isAuthenticated, isOnboardingCompleted } = useAppSelector((state) => state.auth);

    if (!isAuthenticated) {
        return <Navigate to={APP_ROUTES.PUBLIC.LOGIN} replace />;
    }

    return (
        <Navigate
            to={isOnboardingCompleted ? APP_ROUTES.PROTECTED.DASHBOARD : APP_ROUTES.PROTECTED.ONBOARDING}
            replace
        />
    );
};

export default DefaultRoute;
