"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SignOutButton() {
  const router = useRouter();
  return (
    <button
      className="underline"
      onClick={() =>
        authClient.signOut({
          fetchOptions: { onSuccess: () => router.push("/admin/login") },
        })
      }
    >
      Sign out
    </button>
  );
}