import React from "react";

const limits = [4, 8, 12];
const viewDistance = 2;

interface Props {
  currentPage: number;
  pageCount: number;
  limit: number;
  setPage: (value: number) => void;
  setLimit: (limit: number) => void;
}

const Pagination = ({
  currentPage,
  pageCount,
  limit,
  setPage,
  setLimit,
}: Props) => {
  if (!limits.includes(limit)) limits.push(limit);
  return (
    <div className="mb-6">
      <div className="flex items-center justify-center text-sm text-gray-400 mb-6">
        <p>Per page:</p>
        <select
          value={limit}
          className="bg-black px-2 py-1 outline-none text-white font-bold"
          onChange={({ target }) => setLimit(parseInt(target.value))}
        >
          {limits.map((limit, i) => (
            <option
              key={i}
              value={limit}
              className="p-10"
              onClick={() => setLimit(limit)}
            >
              {limit}
            </option>
          ))}
        </select>
      </div>
      {pageCount > 1 && (
        <div className="flex flex-row justify-center items-center gap-2 w-full">
          <Button
            text="<"
            disabled={currentPage === 1}
            onClick={() => setPage(currentPage - 1)}
          />
          {Array(pageCount)
            .fill(null)
            .map(
              (_, i) =>
                i + 1 >=
                  currentPage -
                    (viewDistance +
                      (pageCount - currentPage < viewDistance
                        ? viewDistance - (pageCount - currentPage)
                        : 0)) &&
                i + 1 <=
                  currentPage +
                    (viewDistance +
                      (currentPage <= viewDistance
                        ? viewDistance + 1 - currentPage
                        : 0)) && (
                  <Button
                    key={i}
                    text={i + 1}
                    disabled={currentPage === i + 1}
                    onClick={() => setPage(i + 1)}
                  />
                )
            )}
          <Button
            text=">"
            disabled={currentPage === pageCount}
            onClick={() => setPage(currentPage + 1)}
          />
        </div>
      )}
    </div>
  );
};

export default Pagination;

interface ButtonProps {
  text: string | number;
  disabled: boolean;
  onClick: () => void;
}

const Button = ({ text, disabled, onClick }: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={`border border-b-4 rounded p-1.5 text-xs ${
        disabled === true
          ? "border-gray-400 text-gray-400"
          : "cursor-pointer border-white text-white hover:scale-95"
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
