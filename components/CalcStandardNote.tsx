export default function CalcStandardNote({ sources }: { sources: string[] }) {
  return (
    <div className="rounded-md bg-warning-bg px-4 py-3 text-xs leading-relaxed text-warning">
      <p className="font-medium">계산 기준: 2026년 기준 (2026.1.1 ~ 2026.12.31 적용 법령·요율)</p>
      <p className="mt-1 text-muted">출처: {sources.join(" · ")}</p>
    </div>
  );
}
