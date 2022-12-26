import React from "react";

const nameClasses = "text-gray-400 capitalize";
const inputClasses =
  "w-full border-b-2 border-gray-400 outline-none py-1 bg-black";

interface Props {
  name: string;
  value?: string;
  showRequired: boolean;
  isTextArea?: boolean;
  autofocus?: boolean;
  onChange: (value: string) => void;
}

const Input = ({
  name,
  value,
  showRequired,
  isTextArea,
  autofocus,
  onChange,
}: Props) => {
  const Required = () => {
    if (showRequired === false) return null;

    return <p className="text-red-400 text-xs pt-1">Required</p>;
  };

  return (
    <div>
      <p className={nameClasses}>{name}</p>
      {isTextArea === true ? (
        <>
          <textarea
            defaultValue={value ? value : ""}
            autoFocus={autofocus}
            name={name}
            className={inputClasses}
            onChange={({ target }) => onChange(target.value)}
          />
          <Required />
        </>
      ) : (
        <>
          <input
            defaultValue={value ? value : ""}
            autoFocus={autofocus}
            name={name}
            type="text"
            className={inputClasses}
            onChange={({ target }) => onChange(target.value)}
          />
          <Required />
        </>
      )}
    </div>
  );
};

export default Input;
