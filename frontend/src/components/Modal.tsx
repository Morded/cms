import React, { ReactNode, useEffect, useState } from "react";
import ReactDom from "react-dom";

type ModalProps = {
  open: boolean;
  children: ReactNode;
  onClose: () => void;
  onOkay: () => void;
  okayButtonText?: string;
};

const Modal: React.FC<ModalProps> = ({
  open,
  children,
  onClose,
  onOkay,
  okayButtonText,
}: ModalProps) => {
  const [portal, setPortal] = useState<HTMLElement>();

  useEffect(() => {
    if (document.readyState === "complete") {
      setPortal(document.getElementById("portal") || undefined);
    }
  }, []);

  if (!open) return null;

  return portal
    ? ReactDom.createPortal(
        <>
          <div className="fixed w-full min-h-screen left-0 right-0 bottom-0 bg-black opacity-80 z-50" />
          <div className="fixed w-5/6 bg-black md:w-96 text-white border-2 rounded border-white top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 p-6 z-50">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onOkay();
              }}
              className="flex flex-col gap-5"
            >
              {children}

              {onOkay && (
                <div className="flex flex-row gap-2 items-center justify-center">
                  <ModalButton text={okayButtonText || "Ok"} onClick={onOkay} />
                  <ModalButton text="Cancel" onClick={onClose} />
                </div>
              )}
            </form>
          </div>
        </>,
        portal
      )
    : null;
};

export default Modal;

type ModalButtonProps = {
  text: string;
  onClick: () => void;
};

const ModalButton = ({ text, onClick }: ModalButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="border border-b-4 rounded border-white py-2 px-4 capitalize transition-all ease-in-out  hover:scale-95"
    >
      {text}
    </button>
  );
};
