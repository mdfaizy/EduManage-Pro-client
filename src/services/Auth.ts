  import { AppDispatch } from "@/redux/store";
  import { apiConnector } from "./apiConnecter";
  import { endpointAuth } from "./apis";
  import { toast } from "react-hot-toast";
  import { AxiosError } from "axios";
  import { setAuthData,setUser, setLoading, logout } from "@/redux/authSlice";

  const { LOGIN_API, SIGNUP_API,  FORGOT_PASSWORD_API,RESET_PASSWORD_API } = endpointAuth;

  interface ErrorResponse {
    message?: string;
  }

  type AppRouter = any;
  const getErrorMessage = (err: unknown): string => {
    const error = err as AxiosError<any>;

    // Backend response error
    if (error.response?.data) {
      const data = error.response.data;

      if (typeof data === "string") return data;
      if (data.message) return data.message;
      if (Array.isArray(data.errors)) return data.errors[0]?.message;
    }

    // Network / Axios error
    if (error.message) return error.message;

    return "Something went wrong. Please try again.";
  };

  ///////////////////////////
  // 🔐 SIGNUP SERVICE
  ///////////////////////////
  interface SignupParams {
    schoolName: string;
    schoolEmail: string;
    adminName: string;
    adminEmail: string;
    password: string;
    router: AppRouter;
  }

  export const signup =
    ({ schoolName, schoolEmail, adminName, adminEmail, password, router }: SignupParams) =>
    async (dispatch: AppDispatch) => {
      const toastId = toast.loading("Creating school...");
      dispatch(setLoading(true));

      try {
        const res = await apiConnector("POST", SIGNUP_API, {
          schoolName,
          schoolEmail,
          adminName,
          adminEmail,
          password,
        });

        toast.success(res.data?.message || "School Registered 🎉");
        router.push("/login");
      } catch (err) {
        const error = err as AxiosError<ErrorResponse>;
        toast.error(getErrorMessage(err));
      } finally {
        dispatch(setLoading(false));
        toast.dismiss(toastId);
      }
    };


  ///////////////////////////
  // 🔐 LOGIN SERVICE
  ///////////////////////////
  interface LoginParams {
    email: string;
    password: string;
    router: AppRouter;
  }

  export const login = ({ email, password, router }: LoginParams) => {
    return async (dispatch: AppDispatch) => {
      const toastId = toast.loading("Logging in...");

      try {
        const res = await apiConnector("POST", LOGIN_API, {
          email,
          password,
        });

        if (!res.data?.user) {
          throw new Error(res.data?.message || "Invalid credentials");
        }

        const user = res.data.user;

        dispatch(setUser(user));
        localStorage.setItem("user", JSON.stringify(user));

        toast.success("Login successful 🎉");
        router.replace("/admin");

      } catch (err: any) {
        toast.error(err.response?.data?.message || err.message || "Login failed");
      } finally {
        toast.dismiss(toastId);
      }
    };
  };


  ///////////////////////////
  // 🔐 LOGOUT SERVICE
  ///////////////////////////
  export const logoutUser = (router: AppRouter) => async (dispatch: AppDispatch) => {
  try {
    await apiConnector("POST", "/api/auth/logout"); // backend revoke
  } catch {}

  localStorage.removeItem("user");
  dispatch(logout());
  router.replace("/login");
};

export const forgotPassword = (
  email: string,
  setEmailSent: (val: boolean) => void
) => {
  return async () => {
    const toastId = toast.loading("Sending reset email...");

    try {
      const res = await apiConnector("POST", FORGOT_PASSWORD_API, { email });

      toast.success(res.data?.message || "Reset email sent 📧");
      setEmailSent(true);

    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to send reset email");
    } finally {
      toast.dismiss(toastId);
    }
  };
};
export const resetPassword = (
  password: string,
  token: string,
  setResetComplete: (val: boolean) => void
) => {
  return async () => {
    const toastId = toast.loading("Resetting password...");

    try {
      const res = await apiConnector("POST", RESET_PASSWORD_API, {
        token,
        password,
      });

      toast.success(res.data?.message || "Password reset successful ✅");
      setResetComplete(true);

    } catch (err: any) {
      toast.error(err.response?.data?.message || "Invalid or expired reset link");
    } finally {
      toast.dismiss(toastId);
    }
  };
};






