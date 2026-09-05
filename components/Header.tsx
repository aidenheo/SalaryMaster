import Link from "next/link";

const navLinks = [
  { href: "/calculators/salary", label: "월급" },
  { href: "/calculators/annual-salary", label: "연봉" },
  { href: "/calculators/hourly-wage", label: "시급" },
  { href: "/calculators/weekly-holiday-pay", label: "주휴수당" },
  { href: "/calculators/severance", label: "퇴직금" },
];

export default function Header() {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="text-lg font-bold text-heading">
          급여계산기
        </Link>
        <nav aria-label="주요 계산기" className="hidden gap-5 text-sm text-foreground sm:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-primary">
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/calculators/salary"
          className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-white hover:bg-primary-hover sm:hidden"
        >
          계산하기
        </Link>
      </div>
    </header>
  );
}
