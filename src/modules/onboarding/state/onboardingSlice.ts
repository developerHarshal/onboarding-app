import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type ProfileDetails = {
    name: string;
    email: string;
    age: number;
    profilePicture: Base64URLString;
}

type OnboardingState = {
    profileDetails: ProfileDetails;
    onboardingStep: number;
};

const initialProfileDetails:ProfileDetails = {
    name: '',
    email: '',
    age: null,
    profilePicture: ''
}

const initialState: OnboardingState = {
    profileDetails: initialProfileDetails,
    onboardingStep: null,
}

const onboardingSlice = createSlice({
    name: "onboarding",
    initialState,
    reducers: {
        saveProfile: (state, action: PayloadAction<ProfileDetails>) => {
            state.profileDetails = action.payload;
        },
        setOnboardingStep: (state, action: PayloadAction<number>) => {
            state.onboardingStep = action.payload
        }
    }
});

export const {saveProfile, setOnboardingStep} = onboardingSlice.actions;
export default onboardingSlice.reducer;