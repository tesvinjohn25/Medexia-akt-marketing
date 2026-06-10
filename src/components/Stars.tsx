/** Five-star rating row. Gold reads as "review" instantly, even at a glance. */
export function Stars({
  size = 12,
  glow = false,
  className = "",
}: {
  size?: number;
  glow?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex gap-[3px] ${className}`}
      role="img"
      aria-label="Rated 5 out of 5"
      style={
        glow
          ? { filter: "drop-shadow(0 0 7px rgba(255,200,87,.45))" }
          : undefined
      }
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="rgba(255,200,87,.95)"
          aria-hidden
        >
          <path d="M12 2l2.9 6.26 6.6.7-4.9 4.5 1.35 6.54L12 16.9 6.05 20l1.35-6.54-4.9-4.5 6.6-.7z" />
        </svg>
      ))}
    </span>
  );
}
