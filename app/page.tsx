// Components
import { Header } from "@/components/Header";
import { Layout, LayoutRow, LayoutColumn } from "@/components/Layout";

// External packages
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import RandomColors from "@/components/RandomColors";

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
          <LayoutColumn mdSpan={6}>
            <RandomColors token={token} />
          </LayoutColumn>
        </LayoutRow>
      </Layout>
    </>
  );
}
