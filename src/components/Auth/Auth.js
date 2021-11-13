import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../../actions/auth";
import Icon from "./Icons";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const [showPassword, setshowPassword] = useState(false);
  const [isSignUp, setisSignUp] = useState(false);
  const [fromData, setfromData] = useState(initialState);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      dispatch(signup(fromData, navigate));
    } else {
      dispatch(signin(fromData, navigate));
    }
  };

  const handleChange = (e) => {
    setfromData({ ...fromData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => {};

  const switchMode = () => {
    setisSignUp((prevIsSignUp) => !prevIsSignUp);
    setshowPassword(false);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: "AUTH", data: { result, token } });
      navigate("/", {
        replace: true,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = () => {
    console.log("Google Sign In was unsuccessful. Try again later");
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            {isSignUp ? "Sign up to your account" : "Sign in to your account"}
          </h2>
        </div>
        <form
          className="mt-8 space-y-6"
          action="#"
          method="POST"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            {isSignUp && (
              <div className="lg:flex lg:justify-between lg:items-center">
                <div className="mb-8">
                  <label htmlFor=" first-name" className="sr-only">
                    First Name
                  </label>
                  <input
                    id="first-name"
                    name="firstname"
                    type="text"
                    autoComplete="off"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2  focus:ring-indigo-700 focus:border-indigo-700 focus:z-10 sm:text-sm"
                    placeholder="First Name"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-10">
                  <label htmlFor="password" className="sr-only">
                    Last Name
                  </label>
                  <input
                    id="last-name"
                    name="lastName"
                    type="text"
                    autoComplete="off"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:border-indigo-700 focus:z-10 sm:text-sm"
                    placeholder="Last Name"
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}
            <div className="mb-10 ">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:border-indigo-700 focus:z-10 sm:text-sm"
                placeholder="Email address"
                onChange={handleChange}
              />
            </div>
            <div className="mb-10 ">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="mt-8  appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:border-indigo-700 focus:z-10 sm:text-sm"
                placeholder="Password"
                onClick={handleShowPassword}
                onChange={handleChange}
              />
            </div>
            {isSignUp && (
              <div className="mb-10 ">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="confirmPassword"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="mt-8  appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:border-indigo-700 focus:z-10 sm:text-sm"
                  placeholder="Confoirm Password"
                  onClick={handleShowPassword}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-white"
              >
                Remember me
              </label>
            </div>

            {/* <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div> */}
          </div>
          <div className="mb-8">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  className="h-6 w-6 text-white group-hover:text-white "
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </span>
              {isSignUp ? "Sign Up" : "Sign in"}
            </button>
          </div>

          <div className="mb-8">
            <GoogleLogin
              clientId="215788316259-19045d2c81fjp531ojnc13seobn6ij46.apps.googleusercontent.com"
              render={(renderProps) => (
                <button
                  type="submit"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <Icon />
                  </span>
                  Google Sign In
                </button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            />
          </div>

          <div>
            <button
              type="button"
              className="flex items-end justify-items-end"
              onClick={switchMode}
            >
              {isSignUp
                ? "Already have an account? Sign In"
                : "Don't have an account? Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
