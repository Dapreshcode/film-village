
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/admin",
      });

      if (result.error) {
        setError("Sign-in failed. Check your credentials and try again.");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--cinematic-navy)] px-6 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md border border-white/10 bg-[var(--surface)] p-8 md:p-10"
      >
        <p className="mb-4 text-xs uppercase tracking-[0.2em] text-[var(--orange)]">
          CFCV Administration
        </p>

        <h1 className="font-[var(--font-cormorant)] text-4xl">
          Admin sign in
        </h1>

        <p className="mt-3 text-sm leading-6 text-white/50">
          Sign in with your authorized administrator account.
        </p>

        <label className="mt-8 block text-sm text-white/70">
          Email address
          <input
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full border border-white/15 bg-black/20 px-4 py-3 outline-none focus:border-[var(--orange)]"
          />
        </label>

        <label className="mt-5 block text-sm text-white/70">
          Password
          <input
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full border border-white/15 bg-black/20 px-4 py-3 outline-none focus:border-[var(--orange)]"
          />
        </label>

        {error && (
          <p role="alert" className="mt-4 text-sm text-red-400">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-7 w-full bg-[var(--orange)] px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}
