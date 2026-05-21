const thorSigil = '/pantheon/sigils/thor.png';

export default function ThorEmblem() {
  return (
    <div className="emblem-card card-thor">
      <div className="avatar-container thor" title="Thor - Heavy Lifting">
        <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* 1. Deep Storm Atmosphere Background */}
            <radialGradient id="t-bgGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1E40AF" /> {/* Thundercloud Blue */}
              <stop offset="35%" stopColor="#1E293B" /> {/* Heavy Slate Navy */}
              <stop offset="70%" stopColor="#0F172A" /> {/* Dark Storm */}
              <stop offset="100%" stopColor="#020617" />
            </radialGradient>

            {/* Crackling High-Voltage Core */}
            <radialGradient id="t-lightningCore" cx="50%" cy="50%" r="40%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="25%" stopColor="#38BDF8" stopOpacity="0.5" />
              <stop offset="60%" stopColor="#1D4ED8" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#020617" stopOpacity="0" />
            </radialGradient>

            {/* 2. Heavy Norse Iron & Silver */}
            {/* Dark Asgardian Steel */}
            <linearGradient id="t-norseSteel" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#94A3B8" />
              <stop offset="30%" stopColor="#475569" />
              <stop offset="70%" stopColor="#334155" />
              <stop offset="100%" stopColor="#1E293B" />
            </linearGradient>

            {/* Polished Lightning Silver */}
            <linearGradient id="t-silver" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#E0F2FE" />
              <stop offset="100%" stopColor="#7DD3FC" />
            </linearGradient>

            {/* 3. Electrical Glow Filters */}
            <filter id="t-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="t-glowStrong" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="10" result="blur" />
              <feComponentTransfer in="blur" result="glow1">
                <feFuncA type="linear" slope="3" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode in="glow1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            
            <filter id="t-glowBlinding" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComponentTransfer in="blur" result="glow1">
                <feFuncA type="linear" slope="5" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode in="glow1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Static Electricity Turbulence */}
            <filter id="t-staticDistortion" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="3" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
            </filter>

            <clipPath id="t-clip">
              <circle cx="250" cy="250" r="230" />
            </clipPath>

            {/* Jagged Lightning Fork templates */}
            <polyline id="t-lightning1" points="250,50 260,100 240,150 255,200 250,250" fill="none" />
            <polyline id="t-lightning2" points="250,250 230,300 245,350 220,400 250,450" fill="none" />
          </defs>

          {/* ========================================== */}
          {/* BASE SHIELD & STORM CORE                   */}
          {/* ========================================== */}
          <circle cx="250" cy="250" r="235" fill="url(#t-bgGrad)" />
          
          {/* Ominous Storm Disturbance in the background */}
          <circle cx="250" cy="250" r="235" fill="#38BDF8" opacity="0.15" filter="url(#t-staticDistortion)" style={{ mixBlendMode: 'color-dodge' }} />
          
          {/* Brilliant Electrical Core */}
          <circle cx="250" cy="250" r="170" fill="url(#t-lightningCore)" filter="url(#t-glowStrong)" className="anim-pulse" style={{ animationDuration: '2.5s' }} />

          {/* ========================================== */}
          {/* INTERNAL ELEMENTS: LIGHTNING & RUNES       */}
          {/* ========================================== */}
          <g clipPath="url(#t-clip)">
            
            {/* Crackling Electromagnetic Fields */}
            {/* Outer rapid jagged crackle */}
            <circle cx="250" cy="250" r="150" fill="none" stroke="#7DD3FC" strokeWidth="2" opacity="0.6" strokeDasharray="5 30 2 15 15 60" className="anim-spin" style={{ animationDuration: '3s' }} filter="url(#t-glow)" />
            
            {/* Inner dense static field */}
            <circle cx="250" cy="250" r="110" fill="none" stroke="#BAE6FD" strokeWidth="4" opacity="0.4" strokeDasharray="1 10 3 20" className="anim-spin-rev" style={{ animationDuration: '2s' }} filter="url(#t-staticDistortion)" />

            {/* Ambient Lightning Arcs (Stationary but flickering) */}
            <g filter="url(#t-glowStrong)" className="anim-flicker" opacity="0.7">
              <use href="#t-lightning1" stroke="#FFFFFF" strokeWidth="2" />
              <use href="#t-lightning2" stroke="#7DD3FC" strokeWidth="1.5" />
              <use href="#t-lightning1" transform="rotate(120 250 250)" stroke="#38BDF8" strokeWidth="2" />
              <use href="#t-lightning2" transform="rotate(-120 250 250)" stroke="#E0F2FE" strokeWidth="1" />
            </g>

            {/* Slow massive heavy orbital rings representing mjolnir's swing momentum */}
            <circle cx="250" cy="250" r="190" fill="none" stroke="url(#t-silver)" strokeWidth="3" opacity="0.3" strokeDasharray="150 150" className="anim-spin" style={{ animationDuration: '10s' }} filter="url(#t-glow)" />

            {/* Plasma/Static Embers sparking up from the core */}
            <g fill="#BAE6FD" filter="url(#t-glow)">
              <rect x="245" y="380" width="2" height="6" style={{animation: 'floatUp 1s ease-in infinite'}} fill="#FFFFFF" />
              <rect x="180" y="350" width="3" height="10" style={{animation: 'floatUp 0.8s ease-in infinite 0.5s'}} transform="rotate(15 180 350)" />
              <rect x="320" y="320" width="1.5" height="4" style={{animation: 'floatUp 1.2s ease-in infinite 0.2s'}} transform="rotate(-20 320 320)" fill="#7DD3FC" />
              <rect x="250" y="420" width="4" height="12" style={{animation: 'floatUp 1.5s ease-in infinite 0.8s'}} fill="#38BDF8" />
            </g>

          </g>

          {/* ========================================== */}
          {/* THE MJOLNIR BORDERS                          */}
          {/* ========================================== */}

          {/* Outer Containment Shockwave */}
          <circle cx="250" cy="250" r="242" fill="none" stroke="#0F172A" strokeWidth="6" opacity="0.9" />

          {/* Main Forged Norse Steel Rim (Very thick and brutalist) */}
          <circle cx="250" cy="250" r="230" fill="none" stroke="url(#t-norseSteel)" strokeWidth="18" filter="drop-shadow(0 0 15px rgba(29, 78, 216, 0.4))" />
          
          {/* Inner striking plate edge */}
          <circle cx="250" cy="250" r="221" fill="none" stroke="#475569" strokeWidth="2" opacity="0.8" />
          
          {/* Glowing lightning channel embedded in the rim */}
          <circle cx="250" cy="250" r="215" fill="none" stroke="#38BDF8" strokeWidth="4" opacity="0.8" filter="url(#t-glowStrong)" strokeDasharray="60 30" className="anim-spin" style={{ animationDuration: '20s' }} />

          {/* Runic Geometric Weights 
              Massive octagonal brackets bolted around the edge representing the hammer's strength.
              8 primary anchors.
          */}
          <g filter="drop-shadow(0 4px 6px rgba(0,0,0,0.6))">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <g transform={`rotate(${deg} 250 250)`} key={`bracket-${deg}`}>
                {/* Heavy Steel Bracket Base */}
                <path d="M 235 5 L 265 5 L 260 25 L 240 25 Z" fill="url(#t-norseSteel)" stroke="#1E293B" strokeWidth="2" />
                
                {/* Glowing Runic Etching in the center of the bracket */}
                <line x1="250" y1="10" x2="250" y2="20" stroke="#E0F2FE" strokeWidth="2" filter="url(#t-glow)" />
              </g>
            ))}
          </g>

          {/* 4 Massive Corner Anvils crossing the cardinal lines */}
          <g filter="url(#t-glow)">
            {[45, 135, 225, 315].map((deg) => (
              <g transform={`rotate(${deg} 250 250)`} key={`anvil-${deg}`}>
                {/* Silver Anvil Cap */}
                <rect x="242" y="-2" width="16" height="8" rx="1" fill="url(#t-silver)" stroke="#475569" strokeWidth="1" />
                <circle cx="250" cy="2" r="2" fill="#FFFFFF" filter="url(#t-glowBlinding)" />
              </g>
            ))}
          </g>

          {/* Integrated Sigil Image Drop-in (Brought to Absolute Front) */}
          <g filter="drop-shadow(0 0 20px rgba(56, 189, 248, 0.9))">
              <image href={thorSigil} x="100" y="100" width="300" height="300" opacity="1" />
          </g>
        </svg>
      </div>

      <div className="emblem-info">
        <span className="emblem-name">Thor</span>
        <span className="emblem-role">Heavy Lifting</span>
      </div>
    </div>
  );
}
