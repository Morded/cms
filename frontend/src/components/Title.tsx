import React from "react";

interface Props {
  name: string;
}

const Title = ({ name }: Props) => {
  return (
    <div className="w-full h-28 flex justify-center items-center">
      <h1 className="font-extrabold text-4xl ">{name}</h1>
    </div>
  );
};

export default Title;
