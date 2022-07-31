import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Portal({ children, selector }) {
  const ref = useRef();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(selector);
    setMounted(true);
  }, [selector]);

  return mounted
    ? createPortal(
        <div className="fixed pointer-events-none top-0 left-0 h-screen w-screen">{children}</div>,
        ref.current
      )
    : null;
}
