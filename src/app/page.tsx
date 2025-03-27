import AuthForm from "@/components/auth/auth-form";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-md">
        <AuthForm />
      </div>
    </main>
  );
}