const hermesSigil = '/pantheon/sigils/hermes.png';
export default function HermesEmblem() {
  return (
    <div className="emblem-card card-hermes">
      <div className="avatar-container hermes" title="Hermes - Research & Intel">
        <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* 1. Supersonic Atmosphere Background */}
            <radialGradient id="he-bgGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#14B8A6" />  {/* Bright Teal Wind */}
              <stop offset="30%" stopColor="#0369A1" /> {/* Deep Sky Blue */}
              <stop offset="70%" stopColor="#1E1B4B" /> {/* Night Sky / Indigo */}
              <stop offset="100%" stopColor="#0B0914" />
            </radialGradient>

            {/* High-Velocity Energy Core */}
            <radialGradient id="he-velocityCore" cx="50%" cy="50%" r="40%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="25%" stopColor="#5EEAD4" stopOpacity="0.5" />
              <stop offset="70%" stopColor="#0F766E" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#1E1B4B" stopOpacity="0" />
            </radialGradient>

            {/* 2. Sleek Aviator / Mercury Materials */}
            {/* Liquid Mercury / Polished Chrome */}
            <linearGradient id="he-mercury" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="40%" stopColor="#94A3B8" />
              <stop offset="60%" stopColor="#E2E8F0" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>

            {/* Swift Divine Gold */}
            <linearGradient id="he-gold" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="50%" stopColor="#EAB308" />
              <stop offset="100%" stopColor="#854D0E" />
            </linearGradient>
            
            {/* Neon Courier Stream (Cyan-Green) */}
            <linearGradient id="he-neon" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2DD4BF" />
              <stop offset="50%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#818CF8" />
            </linearGradient>

            {/* 3. Aerodynamic Glows */}
            <filter id="he-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="he-glowStrong" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="10" result="blur" />
              <feComponentTransfer in="blur" result="glow1">
                <feFuncA type="linear" slope="3" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode in="glow1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="he-glowBlinding" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComponentTransfer in="blur" result="glow1">
                <feFuncA type="linear" slope="5" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode in="glow1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Wind Vortex Texture Pattern */}
            <pattern id="he-windVortex" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <path d="M 0 10 Q 10 0 20 10 T 40 10" fill="none" stroke="#5EEAD4" strokeWidth="0.5" />
            </pattern>

            <clipPath id="he-clip">
              <circle cx="250" cy="250" r="230" />
            </clipPath>

            {/* Speed Wing / Chevron Path */}
            <polygon id="he-wing" points="250,5 260,20 250,30 240,20" fill="url(#he-gold)" />
            <path id="he-aerodynamics" d="M 250 80 Q 320 180 350 250 Q 320 320 250 420 Q 180 320 150 250 Q 180 180 250 80" fill="none" />
          </defs>

          {/* ========================================== */}
          {/* BASE SHIELD & SWIFT CORE                   */}
          {/* ========================================== */}
          <circle cx="250" cy="250" r="235" fill="url(#he-bgGrad)" />
          
          {/* Atmospheric Wind Shear overlay */}
          <circle cx="250" cy="250" r="230" fill="url(#he-windVortex)" opacity="0.15" style={{mixBlendMode: 'screen', animationDuration: '60s'}} className="anim-spin" />
          
          {/* Brilliant Supersonic Core */}
          <circle cx="250" cy="250" r="160" fill="url(#he-velocityCore)" filter="url(#he-glowStrong)" className="anim-pulse" style={{ animationDuration: '1.5s' }} />

          {/* ========================================== */}
          {/* INTERNAL ELEMENTS: VELOCITY RINGS & WINGS  */}
          {/* ========================================== */}
          <g clipPath="url(#he-clip)">
            
            {/* Magnetic / Slipstream Curves */}
            <g stroke="#5EEAD4" strokeWidth="2" opacity="0.6" filter="url(#he-glow)">
              <use href="#he-aerodynamics" stroke="url(#he-neon)" />
              <use href="#he-aerodynamics" transform="rotate(90 250 250)" stroke="#14B8A6" opacity="0.4" />
            </g>

            {/* Extreme High-Speed Orbital Tracks */}
            {/* Inner rapid orbit */}
            <circle cx="250" cy="250" r="120" fill="none" stroke="url(#he-mercury)" strokeWidth="3" opacity="0.8" strokeDasharray="1 15 5 15" className="anim-spin" style={{ animationDuration: '8s' }} filter="url(#he-glow)" />
            
            {/* Outer rapid orbit reversing */}
            <circle cx="250" cy="250" r="170" fill="none" stroke="url(#he-gold)" strokeWidth="1.5" opacity="0.7" strokeDasharray="30 20 5 20" className="anim-spin-rev" style={{ animationDuration: '12s' }} filter="url(#he-glow)" />

            {/* Super-fast data/message packets orbiting */}
            <g className="anim-spin" style={{ animationDuration: '3s' }}>
              <circle cx="250" cy="80" r="4" fill="#FFFFFF" filter="url(#he-glowBlinding)" />
              {/* Slipstream tail */}
              <circle cx="245" cy="82" r="2" fill="#5EEAD4" opacity="0.8" />
              <circle cx="240" cy="84" r="1" fill="#38BDF8" opacity="0.5" />
            </g>
            
            <g className="anim-spin-rev" style={{ animationDuration: '4.5s' }}>
              <circle cx="250" cy="370" r="3" fill="#FEF08A" filter="url(#he-glowStrong)" />
              <circle cx="255" cy="373" r="1.5" fill="#EAB308" opacity="0.8" />
            </g>

            {/* Ascending wind sparks */}
            <g fill="#2DD4BF" filter="url(#he-glow)">
              <circle cx="200" cy="380" r="1.5" style={{animation: 'floatUp 1.5s ease-in infinite'}} />
              <circle cx="280" cy="350" r="2" style={{animation: 'floatUp 2s ease-in infinite 0.5s'}} fill="#FEF08A" />
              <circle cx="150" cy="300" r="1" style={{animation: 'floatUp 1s ease-in infinite 1s'}} fill="#FFFFFF" />
              <circle cx="350" cy="280" r="2" style={{animation: 'floatUp 1.8s ease-in infinite 0.2s'}} />
              <circle cx="250" cy="400" r="3" style={{animation: 'floatUp 2.5s ease-in infinite 0.7s'}} fill="#38BDF8" />
            </g>

          </g>

          {/* ========================================== */}
          {/* THE AVIATOR BORDERS                          */}
          {/* ========================================== */}

          {/* Windshear containment ring */}
          <circle cx="250" cy="250" r="242" fill="none" stroke="#1E1B4B" strokeWidth="6" opacity="0.8" />

          {/* Main Aerodynamic Chrome Rim */}
          <circle cx="250" cy="250" r="228" fill="none" stroke="url(#he-mercury)" strokeWidth="12" filter="drop-shadow(0 0 10px rgba(20, 184, 166, 0.5))" />
          
          {/* Inner Golden Wing-Track (Very sharp, smooth) */}
          <circle cx="250" cy="250" r="218" fill="none" stroke="url(#he-gold)" strokeWidth="3" opacity="0.9" />

          {/* Outer Chrome Highlight */}
          <circle cx="250" cy="250" r="236" fill="none" stroke="#F8FAFC" strokeWidth="1" opacity="0.6" />

          {/* Winged Compass / Wind Roses 
              Representing Hermes crossing the cardinal directions.
              6 fast-sweeping wings around the border. 
          */}
          <g filter="url(#he-glow)">
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <g transform={`rotate(${deg} 250 250)`} key={`wing-${deg}`}>
                {/* Sleek Golden Chevron / Feather */}
                <polygon points="250,8 262,24 250,20 238,24" fill="url(#he-gold)" stroke="#854D0E" strokeWidth="1" />
                {/* Silver aerodynamic core */}
                <polygon points="250,12 254,20 250,22 246,20" fill="#FFFFFF" />
              </g>
            ))}
          </g>

          {/* Slipstream Arc cuts across the rim edge (animates very fast) */}
          <circle cx="250" cy="250" r="235" fill="none" stroke="#5EEAD4" strokeWidth="2" opacity="0.8" strokeDasharray="10 200 40 500" className="anim-spin" style={{ animationDuration: '2s' }} filter="url(#he-glowBlinding)" />

        
                    {/* Integrated Sigil Image Drop-in (Brought to Absolute Front) */}
                    <g filter="drop-shadow(0 0 20px rgba(250, 204, 21, 0.8))">
                        <image href={hermesSigil} x="100" y="100" width="300" height="300" opacity="1" />
                    </g>
                </svg>
      </div>

      <div className="emblem-info">
        <span className="emblem-name">Hermes</span>
        <span className="emblem-role">Research & Intel</span>
      </div>
    </div>
  );
}
