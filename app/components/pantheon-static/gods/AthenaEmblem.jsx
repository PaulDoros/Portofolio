const athenaSigil = '/pantheon/sigils/athena.png';

export default function AthenaEmblem() {
  return (
    <div className="emblem-card card-athena">
      <div className="avatar-container athena" title="Athena - Security & Audits">
        <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* 1. Royal Navy & Strategic Void */}
            <radialGradient id="a-bgGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1E3A8A" />
              <stop offset="45%" stopColor="#172554" />
              <stop offset="75%" stopColor="#0B1333" />
              <stop offset="100%" stopColor="#02040A" />
            </radialGradient>

            {/* Cyan/Ice Core for Intellect and Tactics */}
            <radialGradient id="a-stormCore" cx="50%" cy="50%" r="40%">
              <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.4" />
              <stop offset="30%" stopColor="#38BDF8" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#0369A1" stopOpacity="0" />
            </radialGradient>

            {/* 2. Premium Divine Mats: Golden Bronze & Platinum Silver */}
            <linearGradient id="a-bronze" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="30%" stopColor="#D97706" />
              <stop offset="70%" stopColor="#B45309" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>

            <linearGradient id="a-silver" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F8FAFC" />
              <stop offset="40%" stopColor="#CBD5E1" />
              <stop offset="100%" stopColor="#64748B" />
            </linearGradient>

            <linearGradient id="a-goldHighlight" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="30%" stopColor="#FDE68A" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>

            {/* 3. High-Fidelity Non-Clipping Glows */}
            <filter id="a-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="a-glowStrong" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="15" result="blur" />
              <feComponentTransfer in="blur" result="glow1">
                <feFuncA type="linear" slope="2.5" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode in="glow1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="a-glowBlinding" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComponentTransfer in="blur" result="glow1">
                <feFuncA type="linear" slope="4" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode in="glow1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* 4. Tactical Data Grid / Aegis Weave */}
            <pattern id="a-tacticalGrid" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(15)">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#38BDF8" strokeWidth="1.5" />
            </pattern>

            <clipPath id="a-clip">
              <circle cx="250" cy="250" r="230" />
            </clipPath>

            {/* Perfect Hexagon Base (R=150) */}
            <polygon id="a-hex" points="250,100 379.9,175 379.9,325 250,400 120.1,325 120.1,175" fill="none" />
          </defs>

          {/* ========================================== */}
          {/* BASE SHIELD & CORE                         */}
          {/* ========================================== */}
          <circle cx="250" cy="250" r="235" fill="url(#a-bgGrad)" />
          
          {/* Faint ambient tactical grid mapping the deep void */}
          <circle cx="250" cy="250" r="235" fill="url(#a-tacticalGrid)" opacity="0.25" style={{mixBlendMode: 'color-dodge'}} />
          
          {/* Intellect Core Glow */}
          <circle cx="250" cy="250" r="190" fill="url(#a-stormCore)" filter="url(#a-glowStrong)" className="anim-pulse" />

          {/* ========================================== */}
          {/* INTERNAL ELEMENTS: TACTICAL GEOMETRY       */}
          {/* ========================================== */}
          <g clipPath="url(#a-clip)">

            {/* Geometric Constellations (Interlocking rotating hexagons) */}
            <g className="anim-spin">
              <use href="#a-hex" stroke="url(#a-silver)" strokeWidth="3.5" opacity="0.6" filter="url(#a-glow)" />
            </g>
            <g className="anim-spin-rev" style={{ transformOrigin: 'center' }}>
              <use href="#a-hex" stroke="#38BDF8" strokeWidth="3" opacity="0.75" transform="rotate(30 250 250)" filter="url(#a-glow)" />
              {/* Connecting radials inside the rotated hex */}
              <path d="M 250 100 L 250 400 M 120.1 175 L 379.9 325 M 120.1 325 L 379.9 175" stroke="#38BDF8" strokeWidth="2" opacity="0.5" />
            </g>

            {/* Strategic Target / Astrolabe Rings */}
            <circle cx="250" cy="250" r="175" fill="none" stroke="url(#a-bronze)" strokeWidth="2.5" opacity="0.85" strokeDasharray="2 6" className="anim-spin" />
            
            {/* Inner fine focus ring */}
            <circle cx="250" cy="250" r="110" fill="none" stroke="#E0F2FE" strokeWidth="4" opacity="0.65" strokeDasharray="40 10 10 10 5 10" className="anim-spin-rev" filter="url(#a-glow)" />

            {/* OWL EYES: Piercing Nodes of Wisdom */}
            {/* Two steady, brilliantly glowing silver nodes observing near the top */}
            <g filter="url(#a-glowStrong)">
              <circle cx="200" cy="150" r="4" fill="#FFFFFF" />
              <circle cx="200" cy="150" r="2" fill="#E0F2FE" filter="url(#a-glowBlinding)" className="anim-flicker" />
              
              <circle cx="300" cy="150" r="4" fill="#FFFFFF" />
              <circle cx="300" cy="150" r="2" fill="#E0F2FE" filter="url(#a-glowBlinding)" className="anim-flicker" />
            </g>

            {/* Floating Strategy Embers / Calculations */}
            <g fill="#38BDF8" filter="url(#a-glow)" opacity="0.8">
              <circle cx="250" cy="350" r="2.5" style={{animation: 'floatUp 4s ease-in infinite'}} />
              <circle cx="150" cy="280" r="1.5" style={{animation: 'floatUp 3s ease-in infinite 1s'}} />
              <circle cx="350" cy="280" r="2" style={{animation: 'floatUp 5s ease-in infinite 0.5s'}} />
              <circle cx="250" cy="400" r="1" style={{animation: 'floatUp 3.5s ease-in infinite 2s'}} />
            </g>

          </g>

          {/* ========================================== */}
          {/* THE AEGIS BORDERS                          */}
          {/* ========================================== */}

          {/* Outer Defense Barrier */}
          <circle cx="250" cy="250" r="242" fill="none" stroke="#0B1333" strokeWidth="6" opacity="0.8" />

          {/* Heavy Bronze Aegis Rim */}
          <circle cx="250" cy="250" r="230" fill="none" stroke="url(#a-bronze)" strokeWidth="16" filter="drop-shadow(0 0 15px rgba(217, 119, 6, 0.4))" />
          
          {/* Sharp Aegis Edge */}
          <circle cx="250" cy="250" r="237" fill="none" stroke="#FDE68A" strokeWidth="1.5" opacity="0.7" />
          
          {/* Inner Recessed Channel */}
          <circle cx="250" cy="250" r="222" fill="none" stroke="#172554" strokeWidth="3" opacity="0.9" />

          {/* The Greek Meander/Tactical Track (Animated Gear-like ring) */}
          <circle cx="250" cy="250" r="214" fill="none" stroke="url(#a-silver)" strokeWidth="6" opacity="0.8" strokeDasharray="18 6 3 6" filter="url(#a-glow)" className="anim-spin" />

          {/* Inner Safety Wall */}
          <circle cx="250" cy="250" r="206" fill="none" stroke="url(#a-goldHighlight)" strokeWidth="1.5" opacity="0.5" />

          {/* Mathematical Anchor Nodes 
              Using an 8-point compass layout representing precise cartography & tactics */}
          <g filter="url(#a-glow)">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <g transform={`rotate(${deg} 250 250)`} key={deg}>
                {/* Shield Boss Base */}
                <circle cx="250" cy="20" r="6" fill="#172554" stroke="url(#a-bronze)" strokeWidth="2" />
                {/* Silver Piercing Diamond */}
                <polygon points="250,17 253,20 250,23 247,20" fill="#FFFFFF" />
              </g>
            ))}
          </g>
          
          {/* 4 Extra-Strong Cardinal Tactical Nodes */}
          <g filter="url(#a-glowStrong)">
            {[0, 90, 180, 270].map((deg) => (
              <g transform={`rotate(${deg} 250 250)`} key={`cardinal-${deg}`}>
                <polygon points="250,10 254,20 250,30 246,20" fill="url(#a-goldHighlight)" />
                <circle cx="250" cy="8" r="1.5" fill="#E0F2FE" />
              </g>
            ))}
          </g>

          {/* Integrated Sigil Image Drop-in (Brought to Absolute Front) */}
          <g filter="drop-shadow(0 0 20px rgba(250, 204, 21, 0.9))">
              <image href={athenaSigil} x="100" y="100" width="300" height="300" opacity="1" />
          </g>
        </svg>
      </div>

      <div className="emblem-info">
        <span className="emblem-name">Athena</span>
        <span className="emblem-role">Security & Audits</span>
      </div>
    </div>
  );
}
