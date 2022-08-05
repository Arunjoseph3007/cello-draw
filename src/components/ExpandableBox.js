import { MinusIcon } from "@/icons/Minus";
import { PlusIcon } from "@/icons/Plus";
import { useState } from "react";

export default function ExpandableBox({ children, title }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col px-2 gap-3">
      <div className="flex items-center justify-between border-y py-2">
        <h1>{title}</h1>
        <span
          className="rounded-full p-2 hover:bg-gray-400 transition"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <MinusIcon /> : <PlusIcon />}
        </span>
      </div>
      {isOpen && <div className="pb-3">{children}</div>}
    </div>
  );
}
