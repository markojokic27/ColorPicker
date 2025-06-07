"use client";

// Components
import { Layout, LayoutRow, LayoutColumn } from "@/components/Layout";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

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
        <LayoutColumn smSpan={6} smOffset={3}>
          <div className="mt-32 mb-10">
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
                validationError: "Please enter a valid email address.",
              }}
              autoComplete="username"
              className="mb-10 w-full"
              isRequired
            />
            <Input
              label="Password"
              type="password"
              inputProps={{
                onChange: (e) => setPassword(e.target.value),
                validationError: "Please enter a valid password.",
              }}
              value={password}
              autoComplete="current-password"
              className="mb-10 w-full"
              isRequired
            />
            <Button
              className="h-14 w-full bg-amber-400 hover:bg-amber-500"
              type="submit"
            >
              Login
            </Button>
          </form>
          {error && <p>Error</p>}

          <Button size="md">Lorem ipsum</Button>
          <Button size="sm">Lorem ipsum</Button>
          <Button size="md" variant="outline">
            Lorem ipsum
          </Button>
          <Button size="sm" variant="outline">
            Lorem ipsum
          </Button>
        </LayoutColumn>
      </LayoutRow>
    </Layout>
  );
}
