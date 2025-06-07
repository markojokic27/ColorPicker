"use client";

// External packages
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.replace("/login");
    window.location.reload();
  };
  return <button onClick={handleLogout}>Logout</button>;
}
