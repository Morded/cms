import React from "react";
import { Link } from "react-router-dom";
import { useRouteError } from "react-router-dom";

type Error = {
  message: string;
  stack: string;
};

type ErrorProps = {
  data: string;
  error: Error;
  internal: boolean;
  status: number;
  statusText: string;
};

export default function ErrorPage() {
  const error = useRouteError() as ErrorProps;
  console.error(error);

  return (
    <div className="flex flex-col p-4 justify-center items-center min-h-screen w-full text-center">
      <h1 className="text-6xl sm:text-8xl mb-4 font-extrabold">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p className="font-bold mt-2">
        {error.status} {error.statusText || error.error.message}{" "}
      </p>

      <Link
        to="/"
        className="border border-b-4 rounded border-white py-2 px-4 capitalize transition-all ease-in-out  hover:scale-95 mt-6"
      >
        Back to Homepage
      </Link>
    </div>
  );
}
