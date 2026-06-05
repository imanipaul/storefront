"use client";

import { useRouter } from "next/navigation";
import { type ChangeEvent, type SubmitEvent, useRef, useState } from "react";

export default function SearchModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { replace } = useRouter();

  const [userInput, setUserInput] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    dialogRef.current?.close();
    replace(`/search?q=${userInput}`);
    setUserInput("");
  };

  return (
    <>
      <button className="btn" onClick={() => dialogRef.current?.showModal()}>
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 20L15.8033 15.8033M18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18C14.6421 18 18 14.6421 18 10.5Z" />
        </svg>{" "}
      </button>
      <dialog ref={dialogRef} id="my_modal_2" className="modal">
        <div className="modal-box bg-white h-3/4 w-[1200px] max-w-none">
          <label className="input w-full">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <form onSubmit={handleSubmit}>
              <input
                type="search"
                required
                placeholder="Search products..."
                value={userInput}
                onChange={handleChange}
              />
            </form>
          </label>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
