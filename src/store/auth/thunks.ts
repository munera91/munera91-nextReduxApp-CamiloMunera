import { AppThunk } from "../store";
import { checkingCredentials, login, logout } from "./authSlice";
import {
  loginWithEmailPassword,
  logoutFirebase,
  registerUserWithEmailPassword,
  signInWithGoogle,
} from "../../firebase/providers";

export const checkingAuthentication = (): AppThunk => async (dispatch) => {
  dispatch(checkingCredentials());
};

interface SignInResult {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  errorMessage?: string;
  ok: boolean;
}

export const startGoogleSignIn = (): AppThunk => async (dispatch) => {
  dispatch(checkingCredentials());

  const result = await signInWithGoogle();

  if (!result.ok) {
    return dispatch(logout(result.errorMessage));
  }

  const { uid, email, displayName, photoURL } = result;
  dispatch(
    login({
      uid: uid!,
      email: email!,
      displayName: displayName!,
      photoURL: photoURL!,
    })
  );
};

interface CreateUserParams {
  email: string;
  password: string;
  displayName: string;
}

type FormValues = {
  [key: string]: any;
};

export const startCreatingUserWithEmailPassword =
  (params: FormValues): AppThunk =>
  async (dispatch) => {
    dispatch(checkingCredentials());

    const { email, password, displayName } = params;
    console.log("thunk", email, password, displayName);

    const result = await registerUserWithEmailPassword({
      email,
      password,
      displayName,
    });
    if (!result.ok) return dispatch(logout(result.errorMessage));

    const {
      uid,
      email: resultEmail,
      displayName: resultDisplayName,
      photoURL,
    } = result;
    dispatch(
      login({
        uid: uid!,
        email: resultEmail!,
        displayName: resultDisplayName!,
        photoURL: photoURL!,
      })
    );
  };

interface LoginParams {
  email: string;
  password: string;
}

interface LoginPayload {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    errorMessage?: string;
  }

 export const startLoginWithEmailPassword =
  (params: LoginParams): AppThunk =>
  async (dispatch) => {
    dispatch(checkingCredentials());
    const { email, password } = params;
    const result = await loginWithEmailPassword({ email, password });
    console.log(result);

    if (!result.ok) return dispatch(logout(result.errorMessage));

    const loginPayload: LoginPayload = {
      uid: result.uid!,
      email: email!,
      displayName: result.displayName!,
      photoURL: result.photoURL!,
    };

    dispatch(login(loginPayload));
  };

export const startLogout = (): AppThunk => async (dispatch) => {
  await logoutFirebase();
  // dispatch(clearNotesLogout());
  dispatch(logout(''));
};
