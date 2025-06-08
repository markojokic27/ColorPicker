// Components
import { Header } from "@/components/Header";
import { Layout, LayoutRow, LayoutColumn } from "@/components/Layout";
import MyPalette from "@/components/MyPallete";
import RandomColors from "@/components/RandomColors";

// Context
import { ColorProvider } from "@/context/ColorContext";

// External packages
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  return (
    <>
      <Header />
      <Layout className="mt-30 mb-4 lg:mt-34">
        <LayoutRow>
          <ColorProvider>
            <LayoutColumn lgSpan={6}>
              <RandomColors token={token} />
            </LayoutColumn>
            <LayoutColumn lgSpan={6}>
              <MyPalette />
            </LayoutColumn>
          </ColorProvider>
        </LayoutRow>
      </Layout>
    </>
  );
}
