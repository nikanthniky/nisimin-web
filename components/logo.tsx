import Image from "next/image";
import Link from "next/link";

export function Mark({
  className = "",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      className={className}
      src="/brand/nisimin-symbol.png"
      width={232}
      height={239}
      alt=""
      aria-hidden="true"
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      unoptimized
    />
  );
}

export function Logo() {
  return (
    <Link href="/" className="logo" aria-label="NISIMIN home">
      <Mark className="logo-symbol" />
      <Image
        className="logo-wordmark"
        src="/brand/nisimin-wordmark.png"
        width={459}
        height={88}
        alt=""
        aria-hidden="true"
        unoptimized
      />
    </Link>
  );
}
