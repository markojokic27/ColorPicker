// External packages
import { NextApiRequest, NextApiResponse } from "next";
import axios, { isAxiosError } from "axios";
import { serialize } from "cookie";

type ApiResponse = {
  data: {
    token: string;
  };
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Missing credentials" });
  }
  try {
    const response = await axios.post<ApiResponse>(
      "https://bootcamp2025.depster.me/login",
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const token = response.data.data.token;
    if (!token) throw new Error("Token not found in response");

    res.setHeader(
      "Set-Cookie",
      serialize("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 86400,
        path: "/",
        sameSite: "lax",
      }),
    );

    return res.status(200).json({ success: true });
  } catch (error) {
    if (isAxiosError(error)) {
      const status = error.response?.status || 500;
      const message = error.response?.data?.message || "Neuspješna prijava";
      return res.status(status).json({ error: message });
    }
  }
}
