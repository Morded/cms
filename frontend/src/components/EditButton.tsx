import React, { useState } from "react";
import { BsPencilFill } from "react-icons/bs";
import CreateEditModal from "./CreateEditModal";
import { ICourse } from "shared/interface";

interface Props {
  courseData: {
    index: number;
    name: string;
    description: string;
    instructor: string;
  };
  onEdit: ({ index, name, description, instructor }: ICourse) => void;
}

const Edit = ({ courseData, onEdit }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <BsPencilFill
        className="cursor-pointer hover:text-gray-400"
        onClick={() => setIsOpen(true)}
      />
      <CreateEditModal
        onOkay={onEdit}
        open={isOpen}
        setOpen={setIsOpen}
        data={courseData}
        isEdit={true}
      />
    </>
  );
};

export default Edit;
