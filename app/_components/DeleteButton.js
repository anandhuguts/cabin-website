"use client";
import { TrashIcon } from "@heroicons/react/24/solid";
import SpinnerMini from "./SpinnerMini";
import { useTransition } from "react";

function DeleteButton({ ProfileAction, bookingId, text }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (
      confirm(
        "Are you sure you want to delete this reservation? This action cannot be undone."
      )
    )
      startTransition(() => ProfileAction(bookingId));
  }
  return (
    <button
      onClick={handleDelete}
      className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
    >
      {!isPending ? (
        <>
          <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
          <span className="mt-1">{text}</span>
        </>
      ) : (
        <>
          <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
          <span className="mt-1">
            <SpinnerMini />
          </span>
        </>
      )}
    </button>
  );
}

export default DeleteButton;
