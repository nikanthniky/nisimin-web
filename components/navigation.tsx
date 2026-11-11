"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "./logo";
export function Navigation() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    function close(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    }
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="header">
      <div className="container nav">
        <Logo />
        <nav aria-label="Main navigation" className="desktop-nav">
          {["Products", "About", "Contact"].map((name) => (
            <Link
              key={name}
              href={`/${name.toLowerCase()}`}
              aria-current={
                path.startsWith(`/${name.toLowerCase()}`) ? "page" : undefined
              }
            >
              {name}
            </Link>
          ))}
        </nav>
        <Link href="/products" className="nav-cta">
          Explore products <ArrowUpRight size={15} />
        </Link>
        <button
          ref={button}
          className="menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          {["Products", "About", "Contact"].map((name) => (
            <Link
              key={name}
              href={`/${name.toLowerCase()}`}
              onClick={() => setOpen(false)}
            >
              {name}
              <ArrowUpRight size={18} />
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
