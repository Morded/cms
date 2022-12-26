import Input from "./Input";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { ICourse } from "shared/interface";

interface Props {
  onOkay: ({ index, name, description, instructor }: ICourse) => void;
  isEdit?: boolean;
  open: boolean;
  setOpen: (val: boolean) => void;
  data?: ICourse;
}

const CreateEditModal = ({ onOkay, isEdit, open, setOpen, data }: Props) => {
  const [courseData, setCourseData] = useState<ICourse>({
    index: -1,
    name: "",
    description: "",
    instructor: "",
  });

  useEffect(() => {
    if (data) setCourseData(data);
  }, [data]);

  const [required, setRequired] = useState({
    name: false,
    description: false,
    instructor: false,
  });

  const type = isEdit === true ? "Edit" : "Create";

  const handleOkay = () => {
    console.log(courseData);
    console.log(data);
    const { name, description, instructor } = courseData;
    setRequired({
      name: name === "",
      description: description === "",
      instructor: instructor === "",
    });

    if (name !== "" && description !== "" && instructor !== "") {
      setOpen(false);
      onOkay(courseData);
      setCourseData({
        index: data?.index,
        name: data ? data.name : "",
        description: data ? data.description : "",
        instructor: data ? data.instructor : "",
      });
    }
  };

  return (
    <Modal
      open={open}
      onOkay={handleOkay}
      onClose={() => {
        setOpen(false);
        setRequired({ name: false, description: false, instructor: false });
      }}
      okayButtonText={type}
    >
      <h2 className="text-center text-xl font-bold">{type} course</h2>
      <Input
        name="name"
        value={data?.name}
        showRequired={required.name}
        autofocus={true}
        onChange={(value) => setCourseData({ ...courseData, name: value })}
      />
      <Input
        name="description"
        value={data?.description}
        showRequired={required.description}
        isTextArea={true}
        onChange={(value) =>
          setCourseData({ ...courseData, description: value })
        }
      />
      <Input
        name="instructor"
        value={data?.instructor}
        showRequired={required.instructor}
        onChange={(value) =>
          setCourseData({ ...courseData, instructor: value })
        }
      />
    </Modal>
  );
};

export default CreateEditModal;
