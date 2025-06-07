// Components
import { Layout, LayoutRow, LayoutColumn } from "@/components/Layout";
import LogoutButton from "@/components/LogoutButton";

// External packages
import Image from "next/image";

// Assets
import Logo from "@/public/assets/images/logo.png";

export const Header: React.FC<{ children?: React.ReactNode }> = () => {
  return (
    <div className="fixed top-0 z-40 mx-auto h-20 w-full bg-transparent py-1 backdrop-blur-sm">
      <Layout>
        <LayoutRow>
          <LayoutColumn className="flex items-center justify-between">
            <div className="w-auto">
              <Image
                src={Logo}
                alt="logo"
                className="h-20 lg:h-24 w-full object-contain"
                priority
              />
            </div>
            <div className="flex">
              <LogoutButton />
            </div>
          </LayoutColumn>
        </LayoutRow>
      </Layout>
    </div>
  );
};
