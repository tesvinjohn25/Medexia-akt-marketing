/**
 * Animated equalizer bars — a small "this product is audio" signature.
 * Pure CSS animation (see .eq / .eq-bar); each bar gets a slightly
 * different duration and negative delay so the pattern never repeats
 * in an obvious loop. Decorative only, hidden from screen readers.
 */
export function AudioEqualizer({
  bars = 5,
  className = "",
}: {
  bars?: number;
  className?: string;
}) {
  return (
    <span className={`eq ${className}`} aria-hidden>
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className="eq-bar"
          style={{
            animationDelay: `${(i * -0.18).toFixed(2)}s`,
            animationDuration: `${(0.9 + (i % 3) * 0.22).toFixed(2)}s`,
          }}
        />
      ))}
    </span>
  );
}
