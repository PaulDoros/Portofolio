const vulcanSigil = '/pantheon/sigils/vulcan.png';
export default function VulcanEmblem() {
  return (
    <div className="emblem-card card-vulcan">
      <div className="avatar-container vulcan" title="Vulcan - Refactoring">
        <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* 1. Volcanic Ash & Iron Background */}
            <radialGradient id="vu-bgGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#450A0A" /> {/* Deep Magma Shadow */}
              <stop offset="40%" stopColor="#27272A" /> {/* Iron Slag */}
              <stop offset="80%" stopColor="#09090B" /> {/* Core Ash */}
              <stop offset="100%" stopColor="#000000" />
            </radialGradient>

            {/* Glowing Magma / Forge Core */}
            <radialGradient id="vu-forgeCore" cx="50%" cy="50%" r="40%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="20%" stopColor="#FEF08A" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#DC2626" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#18181B" stopOpacity="0" />
            </radialGradient>

            {/* 2. Heavy Industrial Forged Materials */}
            {/* Roman Cast Iron */}
            <linearGradient id="vu-iron" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A1A1AA" />
              <stop offset="40%" stopColor="#52525B" />
              <stop offset="70%" stopColor="#27272A" />
              <stop offset="100%" stopColor="#09090B" />
            </linearGradient>

            {/* Molten Slag line */}
            <linearGradient id="vu-slag" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#EA580C" />
              <stop offset="50%" stopColor="#DC2626" />
              <stop offset="100%" stopColor="#7F1D1D" />
            </linearGradient>

            <filter id="vu-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="vu-glowStrong" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="10" result="blur" />
              <feComponentTransfer in="blur" result="glow1">
                <feFuncA type="linear" slope="3" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode in="glow1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <clipPath id="vu-clip">
              <circle cx="250" cy="250" r="230" />
            </clipPath>

            {/* Geometric Refactoring Block Motif */}
            <polygon id="vu-block" points="10,0 20,40 -20,40 -10,0" fill="url(#vu-iron)" stroke="#DC2626" strokeWidth="1" />
          </defs>

          {/* ========================================== */}
          {/* BASE SHIELD & MAGMA CORE                   */}
          {/* ========================================== */}
          <circle cx="250" cy="250" r="235" fill="url(#vu-bgGrad)" />
          
          {/* The Intense Forge Heater Core */}
          <circle cx="250" cy="250" r="140" fill="url(#vu-forgeCore)" filter="url(#vu-glowStrong)" className="anim-pulse" style={{ animationDuration: '2s' }} />

          {/* ========================================== */}
          {/* INTERNAL ELEMENTS: REFACTORING BLOCKS      */}
          {/* ========================================== */}
          <g clipPath="url(#vu-clip)">
            
            {/* Refactoring / Rebuilding Geometry (Rings shattering and reforming) */}
            <g className="anim-spin" style={{ animationDuration: '60s' }}>
              <circle cx="250" cy="250" r="180" fill="none" stroke="url(#vu-iron)" strokeWidth="12" strokeDasharray="30 10 10 20 60 40" opacity="0.8" />
              <circle cx="250" cy="250" r="160" fill="none" stroke="url(#vu-slag)" strokeWidth="4" strokeDasharray="100 50" opacity="0.9" filter="url(#vu-glow)" />
              {/* Inner interlocking gear logic */}
              <circle cx="250" cy="250" r="100" fill="none" stroke="#A1A1AA" strokeWidth="2" strokeDasharray="5 15" opacity="0.6" />
            </g>

            <g className="anim-spin-rev" style={{ animationDuration: '40s' }}>
              {/* Floating heavy blocks being pushed into place by the forge */}
              {Array.from({ length: 8 }).map((_, i) => (
                <use href="#vu-block" x="250" y="50" transform={`rotate(${i * 45} 250 250)`} key={`block-${i}`} opacity="0.9" />
              ))}
              <circle cx="250" cy="250" r="130" fill="none" stroke="#DC2626" strokeWidth="3" strokeDasharray="40 120" filter="url(#vu-glow)" />
            </g>

            {/* Violent Forge Sparks hitting the anvil */}
            <g fill="#FDE047" filter="url(#vu-glowStrong)">
              <rect x="250" y="380" width="6" height="6" style={{animation: 'floatUp 2.5s ease-in infinite'}} fill="#FFFFFF" transform="rotate(25 250 380)" />
              <rect x="280" y="300" width="4" height="4" style={{animation: 'floatUp 1.5s ease-in infinite 0.5s'}} transform="rotate(60 280 300)" fill="#EA580C" />
              <circle cx="180" cy="340" r="3" style={{animation: 'floatUp 3s ease-in infinite 1s'}} fill="#DC2626" />
              <circle cx="340" cy="250" r="2" style={{animation: 'floatUp 2s ease-in infinite 0.2s'}} />
              <rect x="200" y="270" width="5" height="5" style={{animation: 'floatUp 1.8s ease-in infinite 0.8s'}} className="anim-flicker" transform="rotate(45 200 270)" />
            </g>

          </g>

          {/* ========================================== */}
          {/* THE HEAVY ROMAN IRON BORDER                  */}
          {/* ========================================== */}

          {/* Core Ash Shadow */}
          <circle cx="250" cy="250" r="242" fill="none" stroke="#000000" strokeWidth="6" opacity="0.9" />

          {/* Solid Roman Iron Anvil Rim */}
          <circle cx="250" cy="250" r="230" fill="none" stroke="url(#vu-iron)" strokeWidth="20" filter="drop-shadow(0 0 10px rgba(220, 38, 38, 0.4))" />
          
          {/* Deep Magma vent seeping inside the rim */}
          <circle cx="250" cy="250" r="220" fill="none" stroke="url(#vu-slag)" strokeWidth="3" opacity="0.8" className="anim-pulse" style={{ animationDuration: '5s' }} filter="url(#vu-glow)" />

          {/* Large flat-headed Roman rivets securing the frame */}
          <g filter="drop-shadow(0 4px 6px rgba(0,0,0,0.8))">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <g transform={`rotate(${deg} 250 250)`} key={`rivet-${deg}`}>
                 <polygon points="250,8 260,18 240,18" fill="url(#vu-iron)" stroke="#000" strokeWidth="2" />
                 {/* Intense red hot spots reflecting internal heat */}
                 <polygon points="250,14 254,18 246,18" fill="#DC2626" filter="url(#vu-glow)" opacity="0.8" />
              </g>
            ))}
          </g>

        
                    {/* Integrated Sigil Image Drop-in (Brought to Absolute Front) */}
                    <g filter="drop-shadow(0 0 20px rgba(239, 68, 68, 0.8))">
                        <image href={vulcanSigil} x="100" y="100" width="300" height="300" opacity="1" />
                    </g>
                </svg>
      </div>

      <div className="emblem-info">
        <span className="emblem-name">Vulcan</span>
        <span className="emblem-role">Refactoring</span>
      </div>
    </div>
  );
}
