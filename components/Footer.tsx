import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-muted sm:px-6">
        <p className="mb-3 leading-relaxed">
          이 사이트의 계산 결과는 입력한 조건과 2026년 기준 공식 자료를 바탕으로 한 예상값입니다.
          실제 급여명세서, 4대보험 고지서, 원천징수세액과 차이가 있을 수 있으며 법률·세무·노무 상담을
          대신하지 않습니다.
        </p>
        <div className="mb-4 flex flex-wrap gap-x-4 gap-y-2">
          <Link href="/about" className="hover:text-primary">
            소개
          </Link>
          <Link href="/privacy" className="hover:text-primary">
            개인정보처리방침
          </Link>
          <Link href="/terms" className="hover:text-primary">
            이용약관
          </Link>
          <Link href="/contact" className="hover:text-primary">
            문의
          </Link>
        </div>
        <p>&copy; {new Date().getFullYear()} 급여계산기</p>
      </div>
    </footer>
  );
}
