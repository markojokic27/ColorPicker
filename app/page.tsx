// Components
import { Layout, LayoutRow, LayoutColumn } from "@/components/Layout";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <Layout className="mt-20 lg:mt-24">
        <LayoutRow>
          <LayoutColumn>
            <div>ColorPicker</div>
          </LayoutColumn>
        </LayoutRow>
      </Layout>
    </>
  );
}
