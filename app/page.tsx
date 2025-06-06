// Components
import { Layout, LayoutRow, LayoutColumn } from "@/components/Layout";
import LogoutButton from "@/components/LogoutButton";

export default function Home() {
  return (
    <Layout>
      <LayoutRow>
        <LayoutColumn>
          <LogoutButton />
          <div>ColorPicker</div>
        </LayoutColumn>
      </LayoutRow>
    </Layout>
  );
}
