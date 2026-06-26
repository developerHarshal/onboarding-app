import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/app/hook';
import { APP_ROUTES } from '@/common/constants/routing/routes';

const OnboardingCompleteGuard = () => {
    const { isOnboardingCompleted } = useAppSelector((state) => state.auth);

    if (!isOnboardingCompleted) {
        return <Navigate to={APP_ROUTES.PROTECTED.ONBOARDING} replace />;
    }

    return <Outlet />;
};

export default OnboardingCompleteGuard;
