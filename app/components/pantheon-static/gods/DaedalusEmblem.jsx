const daedalusSigil = '/pantheon/sigils/daedalus.png';
export default function DaedalusEmblem() {
  return (
    <div className="emblem-card card-daedalus">
      <div className="avatar-container daedalus" title="Daedalus - Architecture">
        <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* 1. Blueprint Deep Space Background */}
            <radialGradient id="dd-bgGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0284C7" /> {/* Cyan/Blueprint Core */}
              <stop offset="50%" stopColor="#0B2857" /> {/* Deep Graph Paper Blue */}
              <stop offset="100%" stopColor="#020617" />
            </radialGradient>

            {/* Glowing Invention Core */}
            <radialGradient id="dd-inventorCore" cx="50%" cy="50%" r="40%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="25%" stopColor="#38BDF8" stopOpacity="0.6" />
              <stop offset="70%" stopColor="#0369A1" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#020617" stopOpacity="0" />
            </radialGradient>

            {/* 2. Architectural Draft Lines & Grids */}
            <pattern id="dd-blueprintGrid" width="25" height="25" patternUnits="userSpaceOnUse">
              <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#38BDF8" strokeWidth="0.5" opacity="0.4" />
              <path d="M 25 25 L 0 25 0 0" fill="none" stroke="#BAE6FD" strokeWidth="0.2" opacity="0.2" />
            </pattern>
            
            <pattern id="dd-blueprintMajorGrid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#7DD3FC" strokeWidth="1" opacity="0.6" />
            </pattern>

            {/* 3. Platinum & Drafting Ink */}
            <linearGradient id="dd-platinum" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#94A3B8" />
              <stop offset="40%" stopColor="#F8FAFC" />
              <stop offset="70%" stopColor="#E2E8F0" />
              <stop offset="100%" stopColor="#64748B" />
            </linearGradient>

            <filter id="dd-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="dd-glowStrong" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComponentTransfer in="blur" result="glow1">
                <feFuncA type="linear" slope="3" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode in="glow1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <clipPath id="dd-clip">
              <circle cx="250" cy="250" r="230" />
            </clipPath>

            {/* Reusable Architect Ruler */}
            <polygon id="dd-ruler" points="248,5 252,5 252,40 248,40" fill="#38BDF8" />
          </defs>

          {/* ========================================== */}
          {/* BASE SHIELD & DRAFTING CORE                */}
          {/* ========================================== */}
          <circle cx="250" cy="250" r="235" fill="url(#dd-bgGrad)" />
          
          {/* Cyan Blueprint Grid covering the entire canvas */}
          <circle cx="250" cy="250" r="235" fill="url(#dd-blueprintGrid)" />
          <circle cx="250" cy="250" r="235" fill="url(#dd-blueprintMajorGrid)" />
          
          {/* Bright center mimicking an architect's light table */}
          <circle cx="250" cy="250" r="160" fill="url(#dd-inventorCore)" filter="url(#dd-glowStrong)" className="anim-pulse" style={{ animationDuration: '4s' }} />

          {/* ========================================== */}
          {/* INTERNAL ELEMENTS: THE LABYRINTH GEOMETRY  */}
          {/* ========================================== */}
          <g clipPath="url(#dd-clip)">
            
            {/* Massive drafting compass overlapping rings */}
            <circle cx="150" cy="250" r="100" fill="none" stroke="#7DD3FC" strokeWidth="1" opacity="0.3" />
            <circle cx="350" cy="250" r="100" fill="none" stroke="#7DD3FC" strokeWidth="1" opacity="0.3" />
            <circle cx="250" cy="150" r="100" fill="none" stroke="#7DD3FC" strokeWidth="1" opacity="0.3" />
            <circle cx="250" cy="350" r="100" fill="none" stroke="#7DD3FC" strokeWidth="1" opacity="0.3" />

            {/* The Endless Labyrinth Rings (Slow, complex, maze-like) */}
            <g className="anim-spin" style={{ animationDuration: '60s' }} filter="url(#dd-glow)">
              <circle cx="250" cy="250" r="180" fill="none" stroke="url(#dd-platinum)" strokeWidth="6" strokeDasharray="140 30" />
              <circle cx="250" cy="250" r="160" fill="none" stroke="#BAE6FD" strokeWidth="4" strokeDasharray="80 20 50 10 30 15" />
            </g>
            
            <g className="anim-spin-rev" style={{ animationDuration: '45s' }}>
              <circle cx="250" cy="250" r="140" fill="none" stroke="#38BDF8" strokeWidth="3" strokeDasharray="30 50 200 40" filter="url(#dd-glow)" />
              <circle cx="250" cy="250" r="120" fill="none" stroke="url(#dd-platinum)" strokeWidth="5" strokeDasharray="100 40 100 0" />
            </g>

            {/* Intersecting Square / Perfect Ratios (Vitruvian/Geometric) */}
            <g transform="rotate(22.5 250 250)" stroke="url(#dd-platinum)" strokeWidth="2" fill="none" opacity="0.7" className="anim-spin" style={{ animationDuration: '120s' }}>
              <rect x="130" y="130" width="240" height="240" />
              <rect x="130" y="130" width="240" height="240" transform="rotate(45 250 250)" />
            </g>

            {/* Precise Measurement Nodes orbiting the center */}
            <g className="anim-spin" style={{ animationDuration: '15s' }}>
              <circle cx="250" cy="160" r="6" fill="#FFFFFF" filter="url(#dd-glowStrong)" />
              <line x1="250" y1="166" x2="250" y2="250" stroke="#E0F2FE" strokeWidth="1" opacity="0.5" />
            </g>
            <g className="anim-spin-rev" style={{ animationDuration: '10s' }}>
              <circle cx="250" cy="370" r="4" fill="#7DD3FC" filter="url(#dd-glowStrong)" />
              <line x1="250" y1="366" x2="250" y2="250" stroke="#7DD3FC" strokeWidth="1" opacity="0.3" />
            </g>

          </g>

          {/* ========================================== */}
          {/* THE ARCHITECT BORDERS                        */}
          {/* ========================================== */}

          {/* Under-ring backing */}
          <circle cx="250" cy="250" r="242" fill="none" stroke="#0B2857" strokeWidth="6" />

          {/* Main Drafting Alloy Rim */}
          <circle cx="250" cy="250" r="230" fill="none" stroke="url(#dd-platinum)" strokeWidth="16" filter="drop-shadow(0 0 10px rgba(14, 165, 233, 0.4))" />
          
          {/* Technical drafting edge line */}
          <circle cx="250" cy="250" r="222" fill="none" stroke="#0369A1" strokeWidth="2" opacity="0.8" />
          <circle cx="250" cy="250" r="238" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.5" />

          {/* Ruler Measurement Tick Marks surrounding the entire edge 
              360 degrees, marked every 5 degrees.
          */}
          <g>
            {Array.from({ length: 72 }).map((_, i) => {
              const deg = i * 5;
              // Every 30 degrees gets a massive golden/blue anchor block, others are just small ticks
              if (i % 6 === 0) {
                return (
                  <g transform={`rotate(${deg} 250 250)`} key={`tick-${i}`}>
                    <rect x="246" y="8" width="8" height="24" fill="#38BDF8" stroke="#0284C7" strokeWidth="1" />
                    <circle cx="250" cy="14" r="2" fill="#FFFFFF" filter="url(#dd-glow)" />
                  </g>
                );
              }
              // Normal drafting tick mark
              return (
                <g transform={`rotate(${deg} 250 250)`} key={`tick-${i}`}>
                  <line x1="250" y1="12" x2="250" y2="25" stroke="#94A3B8" strokeWidth="1.5" />
                </g>
              );
            })}
          </g>

        
                    {/* Integrated Sigil Image Drop-in (Brought to Absolute Front) */}
                    <g filter="drop-shadow(0 0 20px rgba(14, 165, 233, 0.8))">
                        <image href={daedalusSigil} x="100" y="100" width="300" height="300" opacity="1" />
                    </g>
                </svg>
      </div>

      <div className="emblem-info">
        <span className="emblem-name">Daedalus</span>
        <span className="emblem-role">Architecture</span>
      </div>
    </div>
  );
}
