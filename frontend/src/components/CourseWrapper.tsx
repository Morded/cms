import React from "react";

interface Props {
  children: React.ReactNode;
}

const CourseWrapper = ({ children }: Props) => {
  return (
    <div className="flex flex-row flex-wrap container justify-center gap-4">
      {children}
    </div>
  );
};

export default CourseWrapper;
