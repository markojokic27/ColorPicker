"use client";

// Components
import { Layout, LayoutRow, LayoutColumn } from "@/components/Layout";
import { Input } from "@/components/Input";

// External packages
import * as React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Assets
import Logo from "@/public/assets/images/logo.png";

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
          <div className="mx-auto mt-32 mb-10 sm:w-1/2">
            <Image
              src={Logo}
              alt="logo"
              className="w-full object-cover"
              priority
            />
          </div>
        </LayoutColumn>
        <LayoutColumn smSpan={6} smOffset={3}>
          <form onSubmit={handleSubmit} className="w-full">
            <Input
              label="Email"
              type="email"
              value={email}
              inputProps={{
                onChange: (e) => setEmail(e.target.value),
                validationError: "Email",
              }}
              autoComplete="username"
              className="mb-8 w-full"
              isRequired
            />
            <Input
              label="Password"
              type="password"
              inputProps={{
                onChange: (e) => setPassword(e.target.value),
                validationError: "Password",
              }}
              value={password}
              autoComplete="current-password"
              className="mb-8 w-full"
              isRequired
            />
            <button type="submit">Prijavi se</button>
          </form>
          {error && <p>Error</p>}
        </LayoutColumn>
      </LayoutRow>
    </Layout>
  );
}
