import { LoginPayload } from "@/interfaces/interfaces";
import { AuthState } from "@/store/auth/authSlice";

export const initialState: AuthState = {
    status: 'checking',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
  };


  export const authenticatedState:AuthState = {
    status: 'authenticated',
    uid: '123ABC',
    email: 'demo@google.com',
    displayName: 'Demo User',
    photoURL: 'https://demo.jpg',
    errorMessage: null,
  };

  export const notAuthenticatedState = {
    status: 'not-authenticated',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: undefined,
  };

  export const demoUser:LoginPayload = {
    uid: 'ABC123',
    email: 'demo@google.com',
    displayName: 'Demo User',
    photoURL: '',
  }
  