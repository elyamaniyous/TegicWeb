/**
 * Motif de cercles concentriques — signature visuelle tegic
 * (reprise directe de la livrée flotte et de la charte).
 */
export function Rings({
  className,
  cx = "78%",
  cy = "30%",
  animated = true,
}: {
  className?: string;
  cx?: string;
  cy?: string;
  animated?: boolean;
}) {
  const radii = [90, 170, 260, 360, 470];
  return (
    <svg className={className ?? "rings-svg"} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <g className={animated ? "breathe" : undefined}>
        {radii.map((r, i) => (
          <circle
            key={r}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="var(--g400)"
            strokeOpacity={0.16 - i * 0.024}
            strokeWidth={i === 0 ? 44 : 54 + i * 10}
          />
        ))}
      </g>
    </svg>
  );
}
