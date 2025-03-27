import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const API_URL = 'http://localhost:4000';

interface AuthCredentials {
  email: string;
  password: string;
  name?: string;
}

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (credentials: AuthCredentials) => {
      const { data } = await axios.post(
        `${API_URL}/auth/login`,
        credentials,
        { withCredentials: true }
      );
      return data;
    },
    onSuccess: () => {
      router.push('/dashboard');
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
      router.push('/login');
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
      router.push('/');
    },
  });
};