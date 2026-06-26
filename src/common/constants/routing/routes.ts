export const APP_ROUTES = {
    PUBLIC: {
        LOGIN: '/login'
    },
    PROTECTED: {
        DASHBOARD: '/dashboard',
        ONBOARDING: '/onboarding'
    }
} as const;

export const getOnboardingStepUrl = (step: number) =>
    `${APP_ROUTES.PROTECTED.ONBOARDING}?step=${step}`;