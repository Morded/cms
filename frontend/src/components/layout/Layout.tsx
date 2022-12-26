import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <div className="min-h-screen w-full bg-black text-white">{children}</div>
      <div id="portal"></div>
    </>
  );
};

export default Layout;
