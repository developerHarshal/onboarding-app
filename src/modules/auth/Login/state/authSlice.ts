import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { AuthService, type LoginPayload } from "@services/Auth/auth.service";

export type User = {
    id: number;
    username: string;
    name: string;
}

type AuthState = {
    isAuthenticated: boolean;
    user: User | null;
    loading: boolean;
    error: string | null;
    isOnboardingCompleted: boolean;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
    isOnboardingCompleted: false
};

export const login = createAsyncThunk('auth/login',
    async (creds: LoginPayload,{rejectWithValue}) => {
        try{
            return await new AuthService().handleLogin(creds);
        }  catch(err){
            if(err instanceof Error){
                return rejectWithValue(err.message);
            }
        }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        },
        setOnboardingComplete: (state, action: PayloadAction<boolean>) => {
            state.isOnboardingCompleted = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload as User;
                state.loading = false;
                state.error = null;
                state.isAuthenticated = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
                state.isAuthenticated = false;
            });
    },
});

export const { logout, setOnboardingComplete } = authSlice.actions;
export default authSlice.reducer;