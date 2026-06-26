import { useAppSelector } from '@/app/hook'
import { APP_ROUTES } from '@/common/constants/routing/routes';
import { Navigate, Outlet } from 'react-router-dom';

const OnboardingGuard = () => {
    const { isOnboardingCompleted } = useAppSelector(state => state.auth);
    if (isOnboardingCompleted) {
        return <Navigate to={APP_ROUTES.PROTECTED.DASHBOARD}></Navigate>
    }
    return <Outlet />
}

export default OnboardingGuard