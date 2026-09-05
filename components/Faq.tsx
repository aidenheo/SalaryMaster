export interface FaqItem {
  question: string;
  answer: string;
}

export default function Faq({ items }: { items: FaqItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section aria-labelledby="faq-heading">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h2 id="faq-heading" className="mb-3 text-xl font-bold text-heading">
        자주 묻는 질문
      </h2>
      <div className="divide-y divide-border rounded-md border border-border bg-surface">
        {items.map((item, index) => (
          <details key={index} className="group px-4 py-3">
            <summary className="cursor-pointer list-none text-sm font-medium text-foreground marker:content-none">
              <span className="mr-2 text-primary">Q.</span>
              {item.question}
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
