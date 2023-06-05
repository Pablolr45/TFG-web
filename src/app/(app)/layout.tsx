import Header from "@/components/Header/Header";
import { ReactNode } from "react";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <main className="p-5 grow bg-gradient-to-b from-virtual-50 to-virtual-900">{children}</main>
    </>
  );
};

export default AppLayout;
