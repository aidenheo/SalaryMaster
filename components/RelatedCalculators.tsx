import Link from "next/link";
import { getRelatedCalculators } from "@/lib/calculatorList";

export default function RelatedCalculators({ slug }: { slug: string }) {
  const related = getRelatedCalculators(slug);
  if (related.length === 0) return null;

  return (
    <section aria-labelledby="related-heading">
      <h2 id="related-heading" className="mb-3 text-xl font-bold text-heading">
        관련 계산기
      </h2>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {related.map((calc) => (
          <li key={calc.slug}>
            <Link
              href={`/calculators/${calc.slug}`}
              className="block rounded-md border border-border bg-surface px-3 py-3 text-sm text-foreground hover:border-primary hover:text-primary"
            >
              {calc.shortTitle}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
