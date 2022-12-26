import React from "react";

interface Props {
  children?: React.ReactNode;
}

const Container = ({ children }: Props) => {
  return (
    <div className="max-w-[1280px] flex flex-col flex-wrap items-center gap-5 mx-auto">
      {children}
    </div>
  );
};

export default Container;
