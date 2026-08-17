const LOOP_BEADS: Array<[number, number]> = [
  [40.1, 80.5],
  [28.0, 73.9],
  [19.6, 63.1],
  [16.1, 49.9],
  [18.1, 36.3],
  [25.3, 24.6],
  [36.6, 16.8],
  [50.0, 14.0],
  [63.4, 16.8],
  [74.7, 24.6],
  [81.9, 36.3],
  [83.9, 49.9],
  [80.4, 63.1],
  [72.0, 73.9],
  [59.9, 80.5],
]

const NAVY = 'oklch(24% 0.06 258)'
const GOLD = 'oklch(74% 0.13 83)'

type TRosaryIconProps = {
  className?: string
}

export function RosaryIcon({ className }: TRosaryIconProps) {
  return (
    <svg viewBox="0 0 100 165" className={className} aria-hidden="true">
      <title>Terço com contas e crucifixo</title>
      <polyline
        points={LOOP_BEADS.map(([x, y]) => `${x},${y}`).join(' ')}
        fill="none"
        stroke={GOLD}
        strokeWidth="1"
      />
      <polyline
        points="40.1,80.5 50,95 59.9,80.5"
        fill="none"
        stroke={GOLD}
        strokeWidth="1"
      />
      <line x1="50" y1="106" x2="50" y2="119" stroke={GOLD} strokeWidth="1" />
      <line x1="50" y1="128" x2="50" y2="138" stroke={GOLD} strokeWidth="1" />

      {LOOP_BEADS.map(([x, y]) => (
        <circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r="5.4"
          fill={NAVY}
          stroke={GOLD}
          strokeWidth="1.4"
        />
      ))}

      <ellipse
        cx="50"
        cy="95"
        rx="8.5"
        ry="10.5"
        fill={NAVY}
        stroke={GOLD}
        strokeWidth="1.4"
      />
      <path
        d="M50 90.5v9M45.8 95h8.4"
        stroke={GOLD}
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      <circle
        cx="50"
        cy="112.5"
        r="4"
        fill={NAVY}
        stroke={GOLD}
        strokeWidth="1.2"
      />
      <circle
        cx="50"
        cy="123.5"
        r="4"
        fill={NAVY}
        stroke={GOLD}
        strokeWidth="1.2"
      />

      <rect
        x="47"
        y="136"
        width="6"
        height="56"
        rx="1.5"
        fill={NAVY}
        stroke={GOLD}
        strokeWidth="1.2"
      />
      <rect
        x="39"
        y="147.5"
        width="22"
        height="5"
        rx="1.5"
        fill={NAVY}
        stroke={GOLD}
        strokeWidth="1.2"
      />
    </svg>
  )
}
