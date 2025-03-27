"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Lock, Mail, Music, User } from "lucide-react";
import { useLogin, useRegister } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Email is invalid"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().min(1, "Email is required").email("Email is invalid"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: onRegister, isPending: isRegistering } = useRegister();
  const { mutate: onLogin, isPending: isLogining } = useLogin();

  const form = useForm({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: any) {
    if (isLogin) {
      onLogin({ email: values.email, password: values.password });
    } else {
      onRegister({
        name: values.name,
        email: values.email,
        password: values.password,
      });
      switchAuthMode();
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const switchAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-2xl border border-purple-100 transition-all duration-300 hover:shadow-3xl">
        <div className="flex items-center justify-center mb-6">
          <Music className="text-purple-500 mr-2" size={32} />
          <h2 className="text-center text-3xl font-bold text-gray-800">
            {isLogin ? "Harmony Hub" : "Join the Melody"}
          </h2>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {!isLogin && (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-600">Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                          size={20}
                        />
                        <Input
                          className="pl-10 border-purple-200 focus:border-purple-400"
                          placeholder="Enter your name"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600">Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <Input
                        className="pl-10 border-purple-200 focus:border-purple-400"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <Input
                        type={showPassword ? "text" : "password"}
                        className="pl-10 pr-10 border-purple-200 focus:border-purple-400"
                        placeholder="Enter your password"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {!isLogin && (
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-600">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                          size={20}
                        />
                        <Input
                          type={showPassword ? "text" : "password"}
                          className="pl-10 border-purple-200 focus:border-purple-400"
                          placeholder="Confirm your password"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Button
              type="submit"
              isLoading={isLogining || isRegistering}
              className="w-full bg-purple-500 text-white hover:bg-purple-600 transition-colors duration-300 ease-in-out transform hover:scale-105"
            >
              {isLogin ? "Tune In" : "Compose Account"}
            </Button>
          </form>
        </Form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            {isLogin ? "New to Harmony Hub? " : "Already have a rhythm? "}
            <button
              onClick={switchAuthMode}
              className="text-purple-500 hover:underline focus:outline-none transition-colors hover:text-purple-700"
            >
              {isLogin ? "Compose Account" : "Tune In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
