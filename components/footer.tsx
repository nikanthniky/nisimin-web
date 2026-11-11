import Link from "next/link";
import { Logo } from "./logo";
export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Logo />
            <p>
              Thoughtful technology.
              <br />
              Meaningful progress.
            </p>
          </div>
          <nav aria-label="Footer navigation">
            <Link href="/products">Products</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <div className="footer-note">
            Independent thinking.
            <br />
            Connected possibilities.
            <div className="four-dots">
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} NISIMIN. All rights reserved.
          </span>
          <div>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <span>Made with purpose.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
