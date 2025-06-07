"use client";

// Components
import { Button } from "@/components/Button";

// External packages
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.replace("/login");
    window.location.reload();
  };
  return (
    <Button
      onPress={handleLogout}
      size="sm"
      className="border-red-500 bg-red-500  hover:border-red-400 hover:bg-red-400"
    >
      Logout
    </Button>
  );
}
