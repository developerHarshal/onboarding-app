import Stepper, { type Step } from "@/common/components/stepper";
import ProfileForm from "./onboarding-components/Profile";
import FavouriteSongsForm from "./onboarding-components/FavouriteSongs";
import PaymentForm from "./onboarding-components/Payment";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { APP_ROUTES, getOnboardingStepUrl } from "@/common/constants/routing/routes";
import { useAppDispatch, useAppSelector } from "@/app/hook";
import { ONBOARDING_STEPS } from "@/common/constants/onboarding/onboarding-steps";
import SuccessTab from "./onboarding-components/Success";
import { setOnboardingComplete } from "../auth/login/state/authSlice";
import { Container } from "@mui/material";

export const Onboarding: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const onboardingStep = useAppSelector((state) => state.onboarding.onboardingStep);
    const steps: Step[] = [
        { label: "Profile", element: <ProfileForm onSuccess={() => { }} submitFormId="profile-form" />, submitFormId: 'profile-form' },
        { label: "Favourite Songs", element: <FavouriteSongsForm submitFormId="favourite-songs-form" />, submitFormId: 'favourite-songs-form' },
        { label: "Payment", element: <PaymentForm submitFormId="payment-form" />, submitFormId: 'payment-form' },
        { label: "Success", element: <SuccessTab /> },
    ];
    const [searchParams] = useSearchParams();
    const activeStepUrl = searchParams.get('step');

    const [activeStep, setActiveStep] = useState(0);
    useEffect(() => {
        if (activeStepUrl !== undefined && activeStepUrl !== null) {
            setActiveStep(Number(activeStepUrl));
        } else {
            navigate(getOnboardingStepUrl(onboardingStep ?? ONBOARDING_STEPS.PROFILE));
        }
    }, [activeStepUrl, onboardingStep]);

    const onBack = () => {
        navigate(getOnboardingStepUrl(activeStep - 1));
    }

    const onNext = () => {
        if (activeStep === ONBOARDING_STEPS.SUCCESS) {
            dispatch(setOnboardingComplete(true));
            navigate(APP_ROUTES.PROTECTED.DASHBOARD);
        }
    }

    return (
        <Container maxWidth="md" sx={{ minHeight: '600px' }} >
            <Stepper steps={steps} activeStep={activeStep} onBack={onBack} onNext={onNext} />
        </Container>
    );
}