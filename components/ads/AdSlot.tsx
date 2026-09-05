/**
 * AdSense 승인 전까지 광고를 렌더링하지 않는 자리표시자.
 * 승인 후에는 이 컴포넌트 내부에 <ins class="adsbygoogle"> 태그와 스크립트만 추가하면 된다.
 * 고정 높이를 두어 광고 삽입 시에도 레이아웃이 밀리지 않도록 한다.
 */
export default function AdSlot({ label = "광고 영역" }: { label?: string }) {
  return (
    <div
      aria-hidden="true"
      className="flex h-24 w-full items-center justify-center rounded-md border border-dashed border-border text-xs text-muted"
    >
      {label}
    </div>
  );
}
