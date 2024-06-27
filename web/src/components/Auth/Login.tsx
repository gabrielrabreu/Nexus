import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { ConnectedProps, connect } from "react-redux";

import { RootState } from "@/store/store";
import { PATH } from "@/constants/paths";

import { login } from "./Auth.thunks";

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
});

const mapDispatchToProps = {
  login,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

interface Props extends ConnectedProps<typeof connector> {}

const _Login: React.FC<Props> = ({ isAuthenticated, login }) => {
  const { register, handleSubmit } = useForm<ReqLogin>({
    mode: "onBlur",
  });

  const loginOptions = {
    email: { required: "Email is required" },
    password: { required: "Password is required" },
  };

  const onLogin = async (data: ReqLogin) => {
    await login(data);
  };

  if (isAuthenticated) {
    return <Navigate to={PATH.HOME} replace />;
  }

  return (
    <div
      className="
        md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full xl:w-2/5 p-8 md:p-10 lg:p-14 sm:rounded-lg md:rounded-none 
        bg-white"
      data-testid="Login"
    >
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2
            className="
              mt-6 text-3xl font-bold 
              text-gray-900"
            data-testid="Login_title"
          >
            Welcome Back!
          </h2>
          <p
            className="
              mt-2 text-sm 
              text-gray-500"
          >
            Please sign in to your account
          </p>
        </div>
        <form
          className="mt-8 space-y-6"
          onSubmit={handleSubmit(async (data) => {
            await onLogin(data);
          })}
        >
          <div className="mt-8 content-center">
            <label
              className="
                ml-3 text-sm font-bold tracking-wide
                text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="
                w-full content-center text-base px-4 py-2 rounded-2xl 
                border-gray-300 focus:border-dark-primary-500 border-b focus:outline-none"
              id="email"
              type="text"
              placeholder="mail@gmail.com"
              data-testid="Login_email_input"
              {...register("email", loginOptions.email)}
            />
          </div>
          <div className="mt-8 content-center">
            <label
              className="
                ml-3 text-sm font-bold tracking-wide
                text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="
                w-full content-center text-base px-4 py-2 border-b rounded-2xl 
                border-gray-300 focus:border-dark-primary-500 focus:outline-none"
              id="password"
              type="password"
              placeholder="Enter your password"
              data-testid="Login_password_input"
              {...register("password", loginOptions.password)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input className="h-4 w-4 rounded" id="remember-me" type="checkbox" {...register("rememberMe")} />
              <label
                className="
                  ml-2 block text-sm 
                  text-gray-900"
                htmlFor="remember-me"
              >
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <button
                className="
                  no-underline hover:underline 
                  text-dark-primary-700"
                type="button"
              >
                Forgot your password?
              </button>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="
                w-full flex justify-center p-4 rounded-full tracking-wide font-semibold cursor-pointer
                text-white bg-gradient-to-r from-dark-primary-700 to-dark-primary-600"
              data-testid="Login_submit_button"
            >
              Sign in
            </button>
          </div>
          <p
            className="
              flex flex-col items-center justify-center mt-10 text-center text-sm 
              text-dark-mixed-500"
          >
            <span>Don't have an account?</span>
            <button
              className="
                no-underline cursor-pointer hover:underline
                text-dark-primary-700"
              type="button"
            >
              Sign up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

const Login = connector(_Login);

export { Login };
