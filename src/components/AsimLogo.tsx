import React from 'react';

interface AsimLogoProps {
  variant?: 'full' | 'horizontal' | 'mark' | 'footer';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  lightText?: boolean;
}

// Reusable single cross stitch component for high-fidelity embroidery rendering
const CrossStitch = ({
  x,
  y,
  color,
  size = 6,
  strokeWidth = 2.4,
}: {
  x: number;
  y: number;
  color: string;
  size?: number;
  strokeWidth?: number;
}) => {
  const half = size / 2;
  return (
    <g>
      <line
        x1={x - half}
        y1={y - half}
        x2={x + half}
        y2={y + half}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <line
        x1={x - half}
        y1={y + half}
        x2={x + half}
        y2={y - half}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </g>
  );
};

export const AsimLogoMark: React.FC<{ size?: number; className?: string }> = ({
  size = 64,
  className = '',
}) => {
  const MAROON = '#6B001A';
  const GOLD = '#D4B36A';
  const STEP = 8.5; // grid spacing between stitches
  const STITCH_SIZE = 7.5;
  const STROKE = 2.4;

  // Stitches coordinate array recreating the exact embroidery pattern from the official logo
  // Symmetrical 8-point motif
  const centerStitches = [
    // Center diamond ring (Maroon)
    { x: 0, y: -STEP, color: MAROON },
    { x: 0, y: STEP, color: MAROON },
    { x: -STEP, y: 0, color: MAROON },
    { x: STEP, y: 0, color: MAROON },
  ];

  // 4 Main Directional Chevron Arms (N, S, W, E)
  // Each arm has outer Maroon chevrons and inner Gold chevrons
  const mainArms = [0, 90, 180, 270].flatMap((angle) => {
    // Relative points for the Top (0 deg) arm
    const armPoints = [
      // Inner Gold layer
      { rx: 0, ry: -2 * STEP, color: GOLD },
      { rx: -STEP, ry: -2 * STEP, color: GOLD },
      { rx: STEP, ry: -2 * STEP, color: GOLD },
      { rx: -STEP, ry: -3 * STEP, color: GOLD },
      { rx: STEP, ry: -3 * STEP, color: GOLD },
      { rx: 0, ry: -3 * STEP, color: GOLD },
      { rx: -2 * STEP, ry: -3 * STEP, color: GOLD },
      { rx: 2 * STEP, ry: -3 * STEP, color: GOLD },

      // Outer Maroon chevron layer
      { rx: 0, ry: -4 * STEP, color: MAROON },
      { rx: -STEP, ry: -4 * STEP, color: MAROON },
      { rx: STEP, ry: -4 * STEP, color: MAROON },
      { rx: -2 * STEP, ry: -4 * STEP, color: MAROON },
      { rx: 2 * STEP, ry: -4 * STEP, color: MAROON },
      { rx: -STEP, ry: -5 * STEP, color: MAROON },
      { rx: STEP, ry: -5 * STEP, color: MAROON },
      { rx: 0, ry: -5 * STEP, color: MAROON },
      { rx: 0, ry: -6 * STEP, color: MAROON },
      { rx: -2 * STEP, ry: -5 * STEP, color: MAROON },
      { rx: 2 * STEP, ry: -5 * STEP, color: MAROON },
    ];

    const rad = (angle * Math.PI) / 180;
    const cos = Math.round(Math.cos(rad));
    const sin = Math.round(Math.sin(rad));

    return armPoints.map((pt) => ({
      x: pt.rx * cos - pt.ry * sin,
      y: pt.rx * sin + pt.ry * cos,
      color: pt.color,
    }));
  });

  // 4 Diagonal Corner Diamond Accents (Gold)
  const cornerClusters = [45, 135, 225, 315].flatMap((angle) => {
    const dist = 5.6 * STEP;
    const rad = (angle * Math.PI) / 180;
    const cx = Math.sin(rad) * dist;
    const cy = -Math.cos(rad) * dist;

    return [
      { x: cx, y: cy - STEP, color: GOLD },
      { x: cx, y: cy + STEP, color: GOLD },
      { x: cx - STEP, y: cy, color: GOLD },
      { x: cx + STEP, y: cy, color: GOLD },
    ];
  });

  const allStitches = [...centerStitches, ...mainArms, ...cornerClusters];

  return (
    <svg
      width={size}
      height={size}
      viewBox="-60 -60 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="ASIM FABRICS official emblem"
    >
      {allStitches.map((st, idx) => (
        <CrossStitch
          key={idx}
          x={st.x}
          y={st.y}
          color={st.color}
          size={STITCH_SIZE}
          strokeWidth={STROKE}
        />
      ))}
    </svg>
  );
};

export const AsimLogo: React.FC<AsimLogoProps> = ({
  variant = 'horizontal',
  className = '',
  size = 'md',
  lightText = false,
}) => {
  const markSizes = {
    sm: 32,
    md: 46,
    lg: 68,
    xl: 104,
  };

  const markSize = markSizes[size] || 46;

  if (variant === 'mark') {
    return <AsimLogoMark size={markSize} className={className} />;
  }

  if (variant === 'horizontal') {
    return (
      <div className={`inline-flex items-center gap-3 ${className}`}>
        <AsimLogoMark size={markSize} className="shrink-0" />
        <div className="flex flex-col">
          <span
            className={`font-serif tracking-[0.14em] font-bold text-lg md:text-xl leading-none uppercase ${
              lightText ? 'text-[#F8F5EF]' : 'text-[#6B001A]'
            }`}
          >
            ASIM FABRICS
          </span>
          <span
            className={`text-[9px] md:text-[10px] tracking-[0.34em] font-medium uppercase mt-1 leading-none ${
              lightText ? 'text-[#D4B36A]' : 'text-[#B39148]'
            }`}
          >
            Home Textile &amp; Decor
          </span>
        </div>
      </div>
    );
  }

  // Full vertical layout (as on official logo image)
  return (
    <div className={`inline-flex flex-col items-center text-center ${className}`}>
      <AsimLogoMark size={markSize} className="mb-3" />
      <h2
        className={`font-serif tracking-[0.16em] font-bold text-xl md:text-2xl lg:text-3xl leading-none uppercase ${
          lightText ? 'text-[#F8F5EF]' : 'text-[#6B001A]'
        }`}
      >
        ASIM FABRICS
      </h2>
      <p
        className={`text-[10px] md:text-xs tracking-[0.38em] font-medium uppercase mt-1.5 leading-none ${
          lightText ? 'text-[#D4B36A]' : 'text-[#B39148]'
        }`}
      >
        Home Textile &amp; Decor
      </p>
    </div>
  );
};

export default AsimLogo;
