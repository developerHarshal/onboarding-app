import { useAppSelector } from '@/app/hook'
import { ONBOARDING_STEPS } from '@/common/constants/onboarding/onboarding-steps';
import { APP_ROUTES, getOnboardingStepUrl } from '@/common/constants/routing/routes';
import { Navigate, Outlet, useSearchParams } from 'react-router-dom';

const OnboardingGuard = () => {
    const { isOnboardingCompleted } = useAppSelector(state => state.auth);
    const [searchParams] = useSearchParams();
    const stepFormUrl = Number(searchParams.get('step'));

    const onboardingStep = useAppSelector((state) => state.onboarding.onboardingStep);
    if (isOnboardingCompleted) {
        return <Navigate to={APP_ROUTES.PROTECTED.DASHBOARD} replace />;
    } else {
        if (Number(onboardingStep) < stepFormUrl) {
            return <Navigate to={getOnboardingStepUrl(onboardingStep ?? ONBOARDING_STEPS.PROFILE)} replace />;
        } else {
            return <Outlet />;
        }
    }
}

export default OnboardingGuard