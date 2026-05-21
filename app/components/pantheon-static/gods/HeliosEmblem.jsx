const heliosSigil = '/pantheon/sigils/helios.png';
export default function HeliosEmblem() {
  return (
    <div className="emblem-card card-helios">
      <div className="avatar-container helios" title="Helios - Visibility">
        <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* 1. Dawn / Sunrise Background */}
            <radialGradient id="hl-bgGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FB923C" /> {/* Bright Dawn Orange */}
              <stop offset="40%" stopColor="#EA580C" /> {/* Intense Sun */}
              <stop offset="75%" stopColor="#9A3412" /> {/* Deep Heat */}
              <stop offset="100%" stopColor="#431407" />
            </radialGradient>

            {/* Blinding Solar Core */}
            <radialGradient id="hl-solarCore" cx="50%" cy="50%" r="40%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="30%" stopColor="#FDE047" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#F97316" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0B0000" stopOpacity="0" />
            </radialGradient>

            {/* 2. Solar Gold Materials */}
            <linearGradient id="hl-sunGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="40%" stopColor="#F59E0B" />
              <stop offset="70%" stopColor="#EA580C" />
              <stop offset="100%" stopColor="#7C2D12" />
            </linearGradient>

            <filter id="hl-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="hl-glowStrong" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="10" result="blur" />
              <feComponentTransfer in="blur" result="glow1">
                <feFuncA type="linear" slope="3" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode in="glow1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <clipPath id="hl-clip">
              <circle cx="250" cy="250" r="230" />
            </clipPath>

            {/* The Solar Ray Polygon (A sharp, perfectly symmetrical sun ray) */}
            <polygon id="hl-solarRay" points="250,55 265,140 250,145 235,140" fill="url(#hl-sunGold)" />
            {/* Minor Solar Ray */}
            <polygon id="hl-solarRayMinor" points="250,85 258,145 250,150 242,145" fill="#FDE047" opacity="0.8" />
          </defs>

          {/* ========================================== */}
          {/* BASE SHIELD & DAYBREAK CORE                  */}
          {/* ========================================== */}
          <circle cx="250" cy="250" r="235" fill="url(#hl-bgGrad)" />
          
          {/* Intensely Bright Core */}
          <circle cx="250" cy="250" r="150" fill="url(#hl-solarCore)" filter="url(#hl-glowStrong)" className="anim-pulse" style={{ animationDuration: '4s' }} />

          {/* ========================================== */}
          {/* INTERNAL ELEMENTS: THE SUN'S CORONA          */}
          {/* ========================================== */}
          <g clipPath="url(#hl-clip)">
            
            {/* Massive Rotating Solar Starburst (12 Major Rays) */}
            <g className="anim-spin" style={{ animationDuration: '50s', transformOrigin: '250px 250px' }}>
              {Array.from({ length: 12 }).map((_, i) => (
                <use href="#hl-solarRay" transform={`rotate(${i * 30} 250 250)`} key={`ray-major-${i}`} filter="url(#hl-glow)" />
              ))}
            </g>

            {/* Counter-Rotating Minor Sunburst (12 Minor Rays) */}
            <g className="anim-spin-rev" style={{ animationDuration: '30s', transformOrigin: '250px 250px' }}>
              {Array.from({ length: 12 }).map((_, i) => (
                <use href="#hl-solarRayMinor" transform={`rotate(${i * 30 + 15} 250 250)`} key={`ray-minor-${i}`} filter="url(#hl-glowStrong)" />
              ))}
            </g>

            {/* Overlapping intense orbital rings (The Chariot's Wheels) */}
            <circle cx="250" cy="250" r="160" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="15 30" opacity="0.9" filter="url(#hl-glowStrong)" className="anim-spin" style={{ animationDuration: '8s' }} />
            <circle cx="250" cy="250" r="180" fill="none" stroke="url(#hl-sunGold)" strokeWidth="4" strokeDasharray="150 50" opacity="0.6" filter="url(#hl-glow)" className="anim-spin-rev" style={{ animationDuration: '12s' }} />

            {/* Solar flares ripping off the sun into space */}
            <g fill="#FEF08A" filter="url(#hl-glowStrong)" opacity="0.9">
              <rect x="250" y="380" width="3" height="15" style={{animation: 'floatUp 2.5s ease-in infinite'}} fill="#FFFFFF" rx="1.5" />
              <rect x="180" y="320" width="2" height="10" style={{animation: 'floatUp 2s ease-in infinite 0.5s'}} fill="#F97316" rx="1" transform="rotate(30 180 320)" />
              <rect x="320" y="300" width="4" height="20" style={{animation: 'floatUp 3s ease-in infinite 1.2s'}} rx="2" transform="rotate(-30 320 300)" />
            </g>

          </g>

          {/* ========================================== */}
          {/* THE DAWN BORDERS                             */}
          {/* ========================================== */}

          {/* Heat shadow */}
          <circle cx="250" cy="250" r="242" fill="none" stroke="#7C2D12" strokeWidth="6" opacity="0.8" />

          {/* Massive Golden Sunplate rim */}
          <circle cx="250" cy="250" r="230" fill="none" stroke="url(#hl-sunGold)" strokeWidth="18" filter="drop-shadow(0 0 15px rgba(249, 115, 22, 0.4))" />
          
          {/* Brilliant white heat rim */}
          <circle cx="250" cy="250" r="221" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.9" />

          {/* Geometric Solar Flare Engravings on the rim */}
          <g filter="url(#hl-glow)">
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
              <g transform={`rotate(${deg} 250 250)`} key={`rim-ray-${deg}`}>
                {/* Outward pointing triangles cut into the solid gold base */}
                <polygon points="250,5 256,22 244,22" fill="#FFFFFF" opacity="0.9" />
                <circle cx="250" cy="30" r="2" fill="#FDE047" className="anim-pulse" style={{ animationDelay: `${deg / 30}s` }} />
              </g>
            ))}
          </g>
          
          {/* The Outer Halo (An incredibly fast spinning heat line) */}
          <circle cx="250" cy="250" r="237" fill="none" stroke="#FDE047" strokeWidth="2" strokeDasharray="100 300 10 50" opacity="0.8" className="anim-spin" style={{ animationDuration: '4s' }} filter="url(#hl-glowStrong)" />

        
                    {/* Integrated Sigil Image Drop-in (Brought to Absolute Front) */}
                    <g filter="drop-shadow(0 0 20px rgba(250, 204, 21, 0.8))">
                        <image href={heliosSigil} x="100" y="100" width="300" height="300" opacity="1" />
                    </g>
                </svg>
      </div>

      <div className="emblem-info">
        <span className="emblem-name">Helios</span>
        <span className="emblem-role">Visibility</span>
      </div>
    </div>
  );
}
