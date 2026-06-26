import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import Login from "@modules/auth/login";
import Dashboard from "@modules/dashboard";
import { Onboarding } from "@/modules/onboarding";
import OnboardingGuard from "./OnboardingGuard";
import OnboardingCompleteGuard from "./OnboardingCompleteGuard";
import { APP_ROUTES } from "@/common/constants/routing/routes";

export const router = createBrowserRouter([
    {
        element: <PublicRoute />,
        children: [
            {
                path: APP_ROUTES.PUBLIC.LOGIN,
                element: <Login />,
            },
        ],
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                element: <OnboardingGuard />,
                children: [
                    {
                        path: APP_ROUTES.PROTECTED.ONBOARDING,
                        element: <Onboarding />,
                    },
                ],
            },
            {
                element: <OnboardingCompleteGuard />,
                children: [
                    {
                        path: APP_ROUTES.PROTECTED.DASHBOARD,
                        element: <Dashboard />,
                    },
                ],
            },
        ],
    },
]);
