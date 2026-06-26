import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import Login from "@modules/auth/login";
import Dashboard from "@modules/dashboard";
import { Onboarding } from "@/modules/onboarding";
import OnboardingGuard from "./OnboardingGuard";
import OnboardingCompleteGuard from "./OnboardingCompleteGuard";
import DefaultRoute from "./DefaultRoute";
import { APP_ROUTES } from "@/common/constants/routing/routes";

const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

export const router = createBrowserRouter([
    {
        path: APP_ROUTES.ROOT,
        element: <DefaultRoute />,
    },
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
    {
        path: '*',
        element: <DefaultRoute />,
    },
], { basename });
