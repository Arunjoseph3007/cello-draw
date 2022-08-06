import { MinusIcon } from "@/icons/Minus";
import { PlusIcon } from "@/icons/Plus";
import { useState } from "react";

export default function ExpandableBox({ children, title }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col px-2">
      <div className="flex items-center justify-between border-y py-2">
        <h1>{title}</h1>
        <span
          className="rounded-full p-2 hover:bg-gray-400 transition"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <MinusIcon /> : <PlusIcon />}
        </span>
      </div>
      <div
        className={`py-3 transition-all overflow-y-hidden ${
          !isOpen ? "max-h-0 py-0 pointer-events-none" : "max-h-screen pointer-events-auto"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
