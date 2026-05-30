interface MascotProps {
  size?: number;
  className?: string;
}

export default function Mascot({ size = 32, className = "" }: MascotProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/mascot.png"
      alt=""
      width={size}
      height={size}
      className={`shrink-0 object-contain ${className}`}
      aria-hidden
    />
  );
}
