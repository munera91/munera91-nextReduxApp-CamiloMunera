import { LoginPayload } from '@/interfaces/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  status: 'checking' | 'not-authenticated' | 'authenticated';
  uid: string | null;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  errorMessage: string | null | undefined;
}



const initialState: AuthState = {
  status: 'not-authenticated', // 'checking', 'not-authenticated', 'authenticated'
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};



export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      state.status = 'authenticated'; // 'checking', 'not-authenticated', 'authenticated'
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.displayName = action.payload.displayName;
      state.photoURL = action.payload.photoURL;
      state.errorMessage = null;
    },
    logout: (state, action: PayloadAction<string | undefined>) => {
      state.status = 'not-authenticated'; // 'checking', 'not-authenticated', 'authenticated'
      state.uid = null;
      state.email = null;
      state.displayName = null;
      state.photoURL = null;
      state.errorMessage = action.payload;
    },
    checkingCredentials: (state) => {
      state.status = 'checking';
    }
  }
});

// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions;

export default authSlice.reducer;
