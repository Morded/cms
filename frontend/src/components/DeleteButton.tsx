import React, { useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import Modal from "./Modal";

interface Props {
  name: string;
  onDelete: () => void;
}

const DeleteButton = ({ name, onDelete }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    setIsOpen(true);
  };

  return (
    <>
      <BsFillTrashFill
        onClick={handleDelete}
        className="cursor-pointer hover:text-gray-400"
      />
      <Modal
        open={isOpen}
        onOkay={() => {
          setIsOpen(false);
          onDelete();
        }}
        onClose={() => setIsOpen(false)}
        okayButtonText="Delete"
      >
        <h2 className="text-center text-xl font-bold">Warning</h2>
        <p className="text-center ">
          You&quot;re about to delete the course &ldquo;{name}&rdquo;. To
          confirm, click the Delete button.
        </p>
      </Modal>
    </>
  );
};

export default DeleteButton;
