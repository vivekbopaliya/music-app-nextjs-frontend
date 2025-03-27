import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const API_URL = "http://localhost:4000";

interface AuthCredentials {
  email: string;
  password: string;
  name?: string;
}

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (credentials: AuthCredentials) => {
      const { data } = await axios.post(`${API_URL}/auth/login`, credentials, {
        withCredentials: true,
      });
      return data;
    },
    onSuccess: () => {
      toast.success("Logged in successfully");
      router.push("/dashboard");
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 401) {
        return toast.error("Invalid credentials");
      }
      if(error.response?.status === 400) {
        return toast.error("Invalid data passed in backend");
      }
      return toast.error("Something went wrong on server side, pleae try again later");
    },
  });
};

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (credentials: AuthCredentials) => {
      const { data } = await axios.post(
        `${API_URL}/auth/register`,
        credentials,
        { withCredentials: true }
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Registered successfully");
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 401) {
        return toast.error("This email is already taken");
      }
      if(error.response?.status === 400) {
        return toast.error("Invalid data passed in backend");
      }
      return toast.error("Something went wrong on server side, pleae try again later");
    },
  });
};

export const useLogout = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const { data } = await axios.post(
        `${API_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
      return data;
    },
    onSuccess: () => {
      router.push("/");
      toast.success("Logged out successfully");
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 401) {
        return toast.error("You are not logged in");
      }
      return toast.error("Something went wrong on server side, pleae try again later");
    },
  });
};
