import QloaxGeometricLogo from "@/components/shared/QloaxGeometricLogo";

/** QLOAX mark plus the wide-tracked wordmark used in the PDF logo. */
export default function Wordmark({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      <QloaxGeometricLogo fixed={false} size={size} />
      <span className="font-display text-[15px] font-medium tracking-[0.32em] text-navy">QLOAX</span>
    </span>
  );
}
