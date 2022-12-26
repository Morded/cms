import React from "react";
import { BsFillPersonFill } from "react-icons/bs";
import DeleteButton from "./DeleteButton";
import Edit from "./EditButton";
import { ICourse } from "shared/interface";

interface Props {
  index: number;
  name: string;
  desc: string;
  instructor: string;
  onEdit: ({ index, name, description, instructor }: ICourse) => void;
  onDelete: () => void;
}

const CourseCard = ({
  index,
  name,
  desc,
  instructor,
  onEdit,
  onDelete,
}: Props) => {
  return (
    <div className="flex w-full flex-row gap-4 border items-center justify-between border-zinc-50 p-4 rounded-xl mx-4 sm:mx-0 sm:max-w-sm md:max-w-md">
      <div className="flex flex-col gap-4">
        <h1 className="font-bold">{name}</h1>
        <p className="text-gray-400">{desc}</p>
        <p className="text-xs inline-flex items-center gap-2">
          <BsFillPersonFill /> {instructor}
        </p>
      </div>
      <div className="flex flex-col gap-8 text-lg mr-2">
        <Edit
          courseData={{ index, name, description: desc, instructor }}
          onEdit={onEdit}
        />
        <DeleteButton name={name} onDelete={onDelete} />
      </div>
    </div>
  );
};

export default CourseCard;
