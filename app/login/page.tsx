"use client";

// Components
import { Layout, LayoutRow, LayoutColumn } from "@/components/Layout";

// External packages
import * as React from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(false);

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push("/");
    } else {
      setError(true);
    }
  }

  return (
    <Layout>
      <LayoutRow>
        <LayoutColumn>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Prijavi se</button>
          </form>
          {error && (
            <p>
              Error
            </p>
          )}
        </LayoutColumn>
      </LayoutRow>
    </Layout>
  );
}
