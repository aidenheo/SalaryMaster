export function ResultHighlight({ label, value, unit = "원" }: { label: string; value: number; unit?: string }) {
  return (
    <div className="rounded-lg bg-primary px-5 py-6 text-white">
      <p className="text-sm text-white/80">{label}</p>
      <p className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
        {value.toLocaleString("ko-KR")}
        <span className="ml-1 text-lg font-medium">{unit}</span>
      </p>
    </div>
  );
}

export function ResultRow({
  label,
  value,
  unit = "원",
  negative = false,
}: {
  label: string;
  value: number;
  unit?: string;
  negative?: boolean;
}) {
  return (
    <div className="flex items-center justify-between border-b border-border py-2.5 text-sm last:border-b-0">
      <span className="text-muted">{label}</span>
      <span className="font-medium text-foreground">
        {negative && value > 0 ? "-" : ""}
        {value.toLocaleString("ko-KR")}
        {unit}
      </span>
    </div>
  );
}
