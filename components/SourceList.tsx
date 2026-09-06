export interface SourceLink {
  label: string;
  href: string;
}

/** 계산의 법적·제도적 근거가 되는 공식 기관 자료 링크 목록. */
export default function SourceList({ items }: { items: SourceLink[] }) {
  return (
    <section aria-labelledby="sources-heading">
      <h2 id="sources-heading" className="mb-2 text-xl font-bold text-heading">
        공식 기준 및 출처
      </h2>
      <ul className="list-inside list-disc space-y-1 text-sm leading-relaxed text-muted">
        {items.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2 hover:text-primary-hover"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
