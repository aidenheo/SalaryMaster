"use client";

import { useId } from "react";

interface NumberFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  suffix?: string;
  helpText?: string;
  min?: number;
  max?: number;
  error?: string;
}

function formatWithCommas(value: number): string {
  if (Number.isNaN(value)) return "";
  return value.toLocaleString("ko-KR");
}

export default function NumberField({
  label,
  value,
  onChange,
  suffix,
  helpText,
  min = 0,
  max = 1_000_000_000,
  error,
}: NumberFieldProps) {
  const id = useId();

  function handleChange(raw: string) {
    const digitsOnly = raw.replace(/[^0-9]/g, "");
    if (digitsOnly === "") {
      onChange(0);
      return;
    }
    const parsed = Math.min(max, Math.max(min, Number(digitsOnly)));
    onChange(parsed);
  }

  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-foreground">
        {label}
      </label>
      <div className="flex items-center rounded-md border border-border bg-surface focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
        <input
          id={id}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={formatWithCommas(value)}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full min-w-0 bg-transparent px-3 py-2.5 text-right text-base text-foreground outline-none"
          aria-describedby={helpText ? `${id}-help` : undefined}
          aria-invalid={!!error}
        />
        {suffix && <span className="shrink-0 whitespace-nowrap pr-3 text-sm text-muted">{suffix}</span>}
      </div>
      {helpText && !error && (
        <p id={`${id}-help`} className="mt-1 text-xs text-muted">
          {helpText}
        </p>
      )}
      {error && (
        <p className="mt-1 text-xs text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
