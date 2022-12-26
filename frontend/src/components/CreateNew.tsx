import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import CreateEditModal from "./CreateEditModal";
import { ICourse } from "shared/interface";

interface Props {
  onCreate: ({ name, description, instructor }: ICourse) => void;
  isEdit?: boolean;
}

const CreateNew = ({ onCreate, isEdit }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1 mb-6 cursor-pointer border border-b-4 border-white mx-auto px-4 py-2 rounded hover:scale-95 transition-all ease-in-out"
      >
        <FiPlus className="text-lg" />
        Create new course
      </div>
      <CreateEditModal
        onOkay={onCreate}
        isEdit={isEdit}
        open={isOpen}
        setOpen={setIsOpen}
      />
    </>
  );
};

export default CreateNew;
