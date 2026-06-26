import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type ProfileDetails = {
    name: string;
    email: string;
    age: number | null;
    profilePicture: Base64URLString;
}

export type PaymentDetails = {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
}

type OnboardingState = {
    profileDetails: ProfileDetails;
    onboardingStep: number | null;
    favouriteSongs: { favouriteSongs: string[] };
    paymentDetails: PaymentDetails;
};

const initialProfileDetails:ProfileDetails = {
    name: '',
    email: '',
    age: null,
    profilePicture: ''
};

const initialFavSongsState: { favouriteSongs: string[] } = {
    favouriteSongs: []
};

const initialPaymentDetails: PaymentDetails = {
    cardNumber: '',
    expiryDate: '',
    cvv: ''
};

const initialState: OnboardingState = {
    profileDetails: initialProfileDetails,
    onboardingStep: null,
    favouriteSongs: initialFavSongsState,
    paymentDetails: initialPaymentDetails
};

const onboardingSlice = createSlice({
    name: "onboarding",
    initialState,
    reducers: {
        saveProfile: (state, action: PayloadAction<ProfileDetails>) => {
            state.profileDetails = action.payload;
        },
        setOnboardingStep: (state, action: PayloadAction<number>) => {
            state.onboardingStep = action.payload
        },
        saveFavouriteSongs: (state, action: PayloadAction<{ favouriteSongs: string[] }>) => {
            state.favouriteSongs = action.payload;
        },
        savePaymentDetails: (state, action: PayloadAction<PaymentDetails>) => {
            state.paymentDetails = action.payload;
        }
    }
});

export const {saveProfile, setOnboardingStep, saveFavouriteSongs, savePaymentDetails} = onboardingSlice.actions;
export default onboardingSlice.reducer;