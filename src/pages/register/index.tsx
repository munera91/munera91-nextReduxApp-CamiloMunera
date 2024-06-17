import { useAppDispatch } from "@/hooks/hooks";
import { useForm } from "@/hooks/useForm";
import { startCreatingUserWithEmailPassword } from "@/store/auth/thunks";
import { RootState } from "@/store/store";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

const formData = {
  email: "",
  password: "",
  displayName: "",
};

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { status, errorMessage } = useSelector(
    (state: RootState) => state.auth
  );
  const isCheckingAuthentication = useMemo(
    () => status === "checking",
    [status]
  );

  const {
    formState,
    displayName,
    email,
    password,
    onInputChange,
    onResetForm,
  } = useForm(formData);

  useEffect(() => {
    if (status == "authenticated") {
      onResetForm();
    }
  }, [status]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("entree", displayName, email, password);

    setFormSubmitted(true);

    dispatch(startCreatingUserWithEmailPassword(formState));
    console.log("errorRegistePage", errorMessage);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24 bg-[#262254]">
      <form onSubmit={onSubmit}>
        <div className="p-16 w-96 border border-1 flex flex-col gap-8 text-center bg-white">
          <h1>Register</h1>
          <input
            placeholder="Name"
            id="nameField"
            className={`p-2 form-control rounded-lg border`}
            name="displayName"
            value={displayName}
            onChange={onInputChange}
          />
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
              className="bg-white text-black rounded-lg p-2 border border-gray-300"
              type="submit"
              disabled={isCheckingAuthentication}
            >
              Create account
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
          {status == "authenticated" && (
            <div className="mt-4 flex justify-center">
              <div
                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <span className="block sm:inline">
                  Successfully Registered User
                </span>
              </div>
            </div>
          )}
          <div>
            <span>Have an account?</span>
            <Link className="pl-2 underline" href="/">
              Login
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
