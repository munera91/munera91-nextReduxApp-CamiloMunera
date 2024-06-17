import Link from "next/link";
import { useForm } from "@/hooks/useForm";
import { startLoginWithEmailPassword } from "@/store/auth/thunks";
import { AppDispatch, AppThunk, RootState } from "@/store/store";
import { useAppDispatch } from "@/hooks/hooks";
import { startGoogleSignIn } from "../store/auth/thunks";
import { useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/router";

const formData = {
  email: "camilomunera@hotmail.com",
  password: "a2763824",
};

const Home = (): React.ReactElement => {
  const { status, errorMessage } = useSelector(
    (state: RootState) => state.auth
  );

  const isAuthenticating = useMemo(() => status === "checking", [status]);

  const dispatch = useAppDispatch();
  const { email, password, onInputChange } = useForm(formData);

  const router = useRouter();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log("SubmitMethod");
    dispatch(startLoginWithEmailPassword({ email, password }));
  };

  useEffect(() => {
    if (status == "authenticated") {
      router.push('/journal');
    }
  }, [status]);

  const onGoogleSignIn = () => {
    console.log("GoogleSign");
    dispatch(startGoogleSignIn());
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24 bg-[#262254]">
      <form onSubmit={onSubmit}>
        <div className="p-16 w-96 bg-white border border-1 flex flex-col gap-8 text-center rounded-xl">
          <h1>Login</h1>
          <input
            placeholder="Email"
            id="emailField"
            className="p-2 form-control rounded-lg border border-gray-300"
            name="email"
            value={email}
            onChange={onInputChange}
          />
          <input
            type="password"
            placeholder="Password"
            autoComplete="off"
            id="passField"
            className="p-2 form-control rounded-lg border border-gray-300"
            name="password"
            value={password}
            onChange={onInputChange}
          />
          <div className="flex justify-center gap-4">
            <button
              className="bg-white text-black rounded-lg p-2 border border-gray-300 hover:bg-orange-200"
              type="submit"
              disabled={isAuthenticating}
            >
              Login
            </button>
            <button
              className="bg-white text-black rounded-lg p-2 border border-gray-300 hover:bg-orange-200"
              type="button"
              onClick={onGoogleSignIn}
              disabled={isAuthenticating}
            >
              Google
            </button>
          </div>
          {errorMessage && (
            <div className="mt-4 flex justify-center">
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <span className="block sm:inline">{errorMessage}</span>
              </div>
            </div>
          )}
          <Link className="underline" href="/register">
            Create account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Home;
