// Components
import { Header } from "@/components/Header";
import { Layout, LayoutRow, LayoutColumn } from "@/components/Layout";

// Context
import { ColorProvider } from "@/context/ColorContext";

// External packages
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import RandomColors from "@/components/RandomColors";
import MyPalette from "@/components/MyPallete";

export default async function HomePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  return (
    <>
      <Header />
      <Layout className="mt-30 lg:mt-34">
        <LayoutRow>
          <ColorProvider>
            <LayoutColumn mdSpan={6}>
              <RandomColors token={token} />
            </LayoutColumn>
            <LayoutColumn mdSpan={6}>
              <MyPalette />
            </LayoutColumn>
          </ColorProvider>
        </LayoutRow>
      </Layout>
    </>
  );
}
