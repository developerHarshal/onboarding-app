import Stepper, { type Step } from "@/common/components/stepper";
import { ONBOARDING_STEPS } from "@/common/constants/onboarding/onboarding-steps";
import ProfileForm from "./onboarding-components/Profile";
import FavouriteSongsForm from "./onboarding-components/FavouriteSongs";
import PaymentForm from "./onboarding-components/Payment";

export const Onboarding: React.FC = () => {
    const steps: Step[] = [
        { label: "Profile", stepId: ONBOARDING_STEPS.PROFILE, element: <ProfileForm /> },
        { label: "Favourite Songs", stepId: ONBOARDING_STEPS.FAVOURITE_SONGS, element: <FavouriteSongsForm /> },
        { label: "Payment", stepId: ONBOARDING_STEPS.PAYMENT, element: <PaymentForm /> },
    ];

    return (
        <Stepper steps={steps} />
    );
}