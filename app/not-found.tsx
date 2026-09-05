import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다",
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
      <p className="text-sm font-medium text-primary">404</p>
      <h1 className="mt-2 text-2xl font-bold text-heading">페이지를 찾을 수 없습니다</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        주소가 바뀌었거나 삭제된 페이지입니다. 아래에서 원하는 계산기를 찾아보세요.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover"
        >
          홈으로 가기
        </Link>
        <Link
          href="/calculators/salary"
          className="rounded-md border border-primary px-5 py-2.5 text-sm font-semibold text-primary hover:bg-primary hover:text-white"
        >
          월급 계산기로 가기
        </Link>
      </div>
    </div>
  );
}
