const auraSigil = '/pantheon/sigils/aura.png';
export default function AuraEmblem() {
  return (
    <div className="emblem-card card-aura">
      <div className="avatar-container aura" title="Aura - Environment">
        <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* 1. Stratosphere Cloud Background */}
            <radialGradient id="au-bgGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38BDF8" /> {/* Sky Blue */}
              <stop offset="40%" stopColor="#0284C7" /> {/* High Atmosphere */}
              <stop offset="80%" stopColor="#082F49" /> {/* Dark Stratosphere */}
              <stop offset="100%" stopColor="#020617" />
            </radialGradient>

            {/* Glowing Vortex Core */}
            <radialGradient id="au-windCore" cx="50%" cy="50%" r="40%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="30%" stopColor="#BAE6FD" stopOpacity="0.7" />
              <stop offset="60%" stopColor="#0EA5E9" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#082F49" stopOpacity="0" />
            </radialGradient>

            {/* 2. Sleek Aviation Materials */}
            {/* Quick Silver */}
            <linearGradient id="au-silver" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="40%" stopColor="#E0F2FE" />
              <stop offset="70%" stopColor="#7DD3FC" />
              <stop offset="100%" stopColor="#0369A1" />
            </linearGradient>

            {/* 3. Wind Vortex Filters */}
            <filter id="au-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="au-glowStrong" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComponentTransfer in="blur" result="glow1">
                <feFuncA type="linear" slope="3" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode in="glow1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* High-speed wind tear effect */}
            <filter id="au-windTear" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.1 0.01" numOctaves="2" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" xChannelSelector="R" yChannelSelector="G" />
            </filter>

            <clipPath id="au-clip">
              <circle cx="250" cy="250" r="230" />
            </clipPath>
          </defs>

          {/* ========================================== */}
          {/* BASE SHIELD & STORM CORE                     */}
          {/* ========================================== */}
          <circle cx="250" cy="250" r="235" fill="url(#au-bgGrad)" />
          
          {/* Extremely fast distorted wind rushing across the background */}
          <circle cx="250" cy="250" r="235" fill="#E0F2FE" opacity="0.1" filter="url(#au-windTear)" className="anim-spin" style={{ animationDuration: '4s' }} />
          
          {/* The High-Pressure Core */}
          <circle cx="250" cy="250" r="140" fill="url(#au-windCore)" filter="url(#au-glowStrong)" className="anim-pulse" style={{ animationDuration: '2s' }} />

          {/* ========================================== */}
          {/* INTERNAL ELEMENTS: VORTEX & AERODYNAMICS     */}
          {/* ========================================== */}
          <g clipPath="url(#au-clip)">
            
            {/* Swirling Hurricane Vortex Lines */}
            <g className="anim-spin" style={{ animationDuration: '3s' }}>
              <path d="M 250 80 A 170 170 0 0 1 420 250 A 170 170 0 0 0 250 420 A 170 170 0 0 1 80 250 A 170 170 0 0 0 250 80 Z" fill="none" stroke="url(#au-silver)" strokeWidth="4" filter="url(#au-glowStrong)" opacity="0.6" strokeDasharray="50 150" />
              <path d="M 250 120 A 130 130 0 0 1 380 250 A 130 130 0 0 0 250 380 A 130 130 0 0 1 120 250 A 130 130 0 0 0 250 120 Z" fill="none" stroke="#FFFFFF" strokeWidth="2" filter="url(#au-glow)" opacity="0.8" strokeDasharray="30 100" />
            </g>
            
            <g className="anim-spin-rev" style={{ animationDuration: '6s' }}>
              {/* Inner counter-rotating cyclone */}
              <path d="M 250 160 A 90 90 0 0 1 340 250 A 90 90 0 0 0 250 340 A 90 90 0 0 1 160 250 A 90 90 0 0 0 250 160 Z" fill="none" stroke="#7DD3FC" strokeWidth="6" filter="url(#au-glowStrong)" opacity="0.5" strokeDasharray="10 50" />
            </g>

            {/* Jet stream orbits (Perfect circles clipping in and out) */}
            <circle cx="250" cy="250" r="190" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="20 200" opacity="0.8" className="anim-spin" style={{ animationDuration: '1s' }} />
            <circle cx="250" cy="250" r="160" fill="none" stroke="#BAE6FD" strokeWidth="1" strokeDasharray="40 100" opacity="0.5" className="anim-spin-rev" style={{ animationDuration: '1.5s' }} />

            {/* Updrafts / Floating atmospheric dust */}
            <g fill="#FFFFFF" filter="url(#au-glowStrong)">
              <circle cx="250" cy="380" r="3" style={{animation: 'floatUp 1.5s ease-in infinite'}} opacity="0.9" />
              <circle cx="280" cy="320" r="2" style={{animation: 'floatUp 1s ease-in infinite 0.5s'}} opacity="0.8" />
              <circle cx="180" cy="300" r="4" style={{animation: 'floatUp 2s ease-in infinite 1.2s'}} opacity="0.6" />
              <circle cx="340" cy="280" r="1.5" style={{animation: 'floatUp 0.8s ease-in infinite 2s'}} />
            </g>

          </g>

          {/* ========================================== */}
          {/* THE STEALTH / AIRFOIL BORDERS                */}
          {/* ========================================== */}

          {/* Under-ring shadow */}
          <circle cx="250" cy="250" r="242" fill="none" stroke="#082F49" strokeWidth="6" opacity="0.8" />

          {/* Sleek Aerodynamic Aluminum / Silver Frame */}
          <circle cx="250" cy="250" r="230" fill="none" stroke="url(#au-silver)" strokeWidth="12" filter="drop-shadow(0 0 10px rgba(125, 211, 252, 0.4))" />
          
          {/* Dual recessed wind tracks carving the outer ring */}
          <circle cx="250" cy="250" r="226" fill="none" stroke="#0284C7" strokeWidth="1" opacity="0.8" />
          <circle cx="250" cy="250" r="234" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />

          {/* Chevron Air intakes / Thruster vents along the border */}
          <g filter="url(#au-glow)">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <g transform={`rotate(${deg} 250 250)`} key={`vent-${deg}`}>
                 <polygon points="250,14 258,26 242,26" fill="none" stroke="url(#au-silver)" strokeWidth="2" />
                 {/* Intense exhaust glow blowing OUT of the rim */}
                 <line x1="250" y1="26" x2="250" y2="40" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.8" className="anim-pulse" style={{ animationDelay: `${deg / 45}s` }} filter="url(#au-glowStrong)" />
              </g>
            ))}
          </g>

        
                    {/* Integrated Sigil Image Drop-in (Brought to Absolute Front) */}
                    <g filter="drop-shadow(0 0 20px rgba(56, 189, 248, 0.8))">
                        <image href={auraSigil} x="100" y="100" width="300" height="300" opacity="1" />
                    </g>
                </svg>
      </div>

      <div className="emblem-info">
        <span className="emblem-name">Aura</span>
        <span className="emblem-role">Environment</span>
      </div>
    </div>
  );
}
