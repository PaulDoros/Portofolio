const hephaestusSigil = '/pantheon/sigils/hephaestus.png';
export default function HephaestusEmblem() {
  return (
    <div className="emblem-card card-hephaestus">
      <div className="avatar-container hephaestus" title="Hephaestus - DevOps & Infra">
        <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* 1. Volcanic / Furnace Background */}
            <radialGradient id="h-bgGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#991B1B" />
              <stop offset="40%" stopColor="#580A14" />
              <stop offset="70%" stopColor="#2A040B" />
              <stop offset="100%" stopColor="#0A0103" />
            </radialGradient>

            {/* Molten Magma Core for extreme heat */}
            <radialGradient id="h-magmaCore" cx="50%" cy="50%" r="40%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
              <stop offset="20%" stopColor="#FDE047" stopOpacity="0.4" />
              <stop offset="60%" stopColor="#DC2626" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#7F1D1D" stopOpacity="0" />
            </radialGradient>

            {/* 2. Heavy Industrial Materials */}
            {/* Dark Cast Iron */}
            <linearGradient id="h-castIron" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#71717A" />
              <stop offset="30%" stopColor="#3F3F46" />
              <stop offset="70%" stopColor="#27272A" />
              <stop offset="100%" stopColor="#18181B" />
            </linearGradient>

            {/* Smelted Bronze / Brass */}
            <linearGradient id="h-brass" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FCD34D" />
              <stop offset="40%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>

            {/* Glowing Hot Steel (Edge highlights) */}
            <linearGradient id="h-hotSteel" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="30%" stopColor="#F87171" />
              <stop offset="100%" stopColor="#7F1D1D" />
            </linearGradient>

            {/* 3. Heatwave & High-Contrast Glow Filters */}
            <filter id="h-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="h-glowStrong" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="15" result="blur" />
              <feComponentTransfer in="blur" result="glow1">
                <feFuncA type="linear" slope="3" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode in="glow1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="h-glowBlinding" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComponentTransfer in="blur" result="glow1">
                <feFuncA type="linear" slope="5" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode in="glow1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Heat Shimmer Displacement / Smoke filter applied to background */}
            <filter id="h-heatShimmer" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise">
                {/* A subtle animation could be added here in advanced SVG, but static noise works well */}
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G" />
            </filter>

            {/* 4. Clip Path */}
            <clipPath id="h-clip">
              <circle cx="250" cy="250" r="230" />
            </clipPath>

            {/* Reusable Heavy Gear Tooth */}
            {/* A thick polygon wedge representing a mechanical cog */}
            <polygon id="h-gearTooth" points="240,70 260,70 265,110 235,110" fill="url(#h-castIron)" stroke="#3F3F46" />

            {/* Reusable Inner Brass Cog */}
            <polygon id="h-brassCog" points="245,140 255,140 258,160 242,160" fill="url(#h-brass)" />
          </defs>

          {/* ========================================== */}
          {/* BASE SHIELD & FURNACE CORE                 */}
          {/* ========================================== */}
          <circle cx="250" cy="250" r="235" fill="url(#h-bgGrad)" />
          
          {/* Heat Shimmer over the dark magma base */}
          <circle cx="250" cy="250" r="235" fill="#EF4444" opacity="0.15" filter="url(#h-heatShimmer)" style={{mixBlendMode: 'overlay'}} />
          
          {/* The Intense Forge Fire Core */}
          <circle cx="250" cy="250" r="180" fill="url(#h-magmaCore)" filter="url(#h-glowStrong)" className="anim-pulse" />

          {/* ========================================== */}
          {/* INTERNAL ELEMENTS: MECHANISMS & HEAT       */}
          {/* ========================================== */}
          <g clipPath="url(#h-clip)">

            {/* Massive Deep Iron Gear mechanism (Rotating slowly) */}
            <g className="anim-spin" style={{ animationDuration: '40s' }}>
              <circle cx="250" cy="250" r="150" fill="none" stroke="url(#h-castIron)" strokeWidth="30" opacity="0.4" />
              <circle cx="250" cy="250" r="136" fill="none" stroke="#27272A" strokeWidth="2" opacity="0.5" />
              <circle cx="250" cy="250" r="164" fill="none" stroke="#27272A" strokeWidth="2" opacity="0.5" />
              
              {/* 12 Giant Iron Teeth */}
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(deg => (
                <use href="#h-gearTooth" transform={`rotate(${deg} 250 250)`} key={`tooth-${deg}`} opacity="0.5" />
              ))}
            </g>

            {/* Inner Counter-Rotating Brass Mechanism */}
            <g className="anim-spin-rev" style={{ animationDuration: '25s' }}>
              <circle cx="250" cy="250" r="110" fill="none" stroke="url(#h-brass)" strokeWidth="6" opacity="0.6" filter="url(#h-glow)" />
              <circle cx="250" cy="250" r="107" fill="none" stroke="#FDE047" strokeWidth="1" opacity="0.4" />
              
              {/* 24 Fine Brass Cogs */}
              {Array.from({ length: 24 }).map((_, i) => (
                <use href="#h-brassCog" transform={`rotate(${i * 15} 250 250)`} key={`brass-${i}`} opacity="0.7" />
              ))}
            </g>

            {/* Glowing Hot Strike Rings (where the hammer hits) */}
            <circle cx="250" cy="250" r="180" fill="none" stroke="url(#h-hotSteel)" strokeWidth="1.5" strokeDasharray="10 30" className="anim-spin" filter="url(#h-glowStrong)" opacity="0.8" style={{ animationDuration: '60s' }} />

            {/* Furnace Embers and Sparks (Faster, chaotic ash) */}
            <g fill="#FBBF24" filter="url(#h-glowStrong)">
              <circle cx="200" cy="380" r="3" style={{animation: 'floatUp 2.5s ease-in infinite'}} />
              <circle cx="280" cy="420" r="2" style={{animation: 'floatUp 3s ease-in infinite 0.5s'}} fill="#EF4444" />
              <circle cx="150" cy="300" r="4" style={{animation: 'floatUp 2s ease-in infinite 1s'}} fill="#FFFFFF" filter="url(#h-glowBlinding)" />
              <circle cx="350" cy="350" r="2.5" style={{animation: 'floatUp 3.5s ease-in infinite 0.2s'}} />
              <circle cx="250" cy="450" r="1.5" style={{animation: 'floatUp 1.8s ease-in infinite 1.5s'}} fill="#FDE047" />
              <circle cx="100" cy="250" r="1" style={{animation: 'floatUp 2.2s ease-in infinite 0.8s'}} />
              <circle cx="400" cy="250" r="2.5" style={{animation: 'floatUp 2.8s ease-in infinite 1.2s'}} fill="#EF4444" />
            </g>

          </g>

          {/* ========================================== */}
          {/* THE ANVIL BORDERS                            */}
          {/* ========================================== */}

          {/* Outer Containment Ring (Smokey Shadow) */}
          <circle cx="250" cy="250" r="242" fill="none" stroke="#000000" strokeWidth="8" opacity="0.8" />

          {/* Heavy Cast Iron Main Rim (Thickest rim yet, rugged industrial look) */}
          <circle cx="250" cy="250" r="228" fill="none" stroke="url(#h-castIron)" strokeWidth="20" filter="drop-shadow(0 0 10px rgba(0,0,0,1))" />
          
          {/* Beveled Edge lines to give the iron rim 3D chunkiness */}
          <circle cx="250" cy="250" r="238" fill="none" stroke="#3F3F46" strokeWidth="2" opacity="0.7" />
          <circle cx="250" cy="250" r="218" fill="none" stroke="#18181B" strokeWidth="2" opacity="0.9" />

          {/* Glowing Red-Hot Seam (Molten core leaking through the armor) */}
          <circle cx="250" cy="250" r="214" fill="none" stroke="url(#h-hotSteel)" strokeWidth="3" opacity="0.8" filter="url(#h-glowStrong)" className="anim-pulse" />

          {/* Hexagonal Iron Rivets 
              Massive structural bolts holding the forge plate together. 
              16 giant bolts around the boundary. 
          */}
          <g filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))">
            {Array.from({ length: 16 }).map((_, i) => {
              const deg = i * 22.5; // 360 / 16
              return (
                <g transform={`rotate(${deg} 250 250)`} key={`rivet-${i}`}>
                  {/* Heavy Iron Nut base */}
                  <polygon points="250,15 255.8,18.3 255.8,25 250,28.3 244.2,25 244.2,18.3" fill="url(#h-castIron)" stroke="#18181B" strokeWidth="1" />
                  {/* Inner bolt indent */}
                  <circle cx="250" cy="21.6" r="1.5" fill="#000" opacity="0.8" />
                </g>
              );
            })}
          </g>
          
          {/* 4 Super-heated Brass Master Anchors at the cardinal points */}
          <g filter="url(#h-glowStrong)">
            {[0, 90, 180, 270].map((deg) => (
              <g transform={`rotate(${deg} 250 250)`} key={`anchor-${deg}`}>
                {/* Brass Block */}
                <rect x="245" y="10" width="10" height="24" rx="2" fill="url(#h-brass)" stroke="#FDE047" strokeWidth="1" />
                {/* Glowing Heat Indicator */}
                <circle cx="250" cy="22" r="2" fill="#FFFFFF" className="anim-flicker" filter="url(#h-glowBlinding)" />
              </g>
            ))}
          </g>

        
                    {/* Integrated Sigil Image Drop-in (Brought to Absolute Front) */}
                    <g filter="drop-shadow(0 0 20px rgba(239, 68, 68, 0.8))">
                        <image href={hephaestusSigil} x="100" y="100" width="300" height="300" opacity="1" />
                    </g>
                </svg>
      </div>

      <div className="emblem-info">
        <span className="emblem-name">Hephaestus</span>
        <span className="emblem-role">DevOps & Infra</span>
      </div>
    </div>
  );
}
