const prometheusSigil = '/pantheon/sigils/prometheus.png';
export default function PrometheusEmblem() {
  return (
    <div className="emblem-card card-prometheus">
      <div className="avatar-container prometheus" title="Prometheus - Planning">
        <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* 1. Deep Graphite / Spark Background */}
            <radialGradient id="pm-bgGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3F3F46" /> {/* Charcoal / Ash */}
              <stop offset="60%" stopColor="#18181B" /> {/* Deep Forged Iron */}
              <stop offset="100%" stopColor="#000000" />
            </radialGradient>

            {/* The Stolen Fire Core (A brilliant beacon of warmth in the dark) */}
            <radialGradient id="pm-fireCore" cx="50%" cy="50%" r="40%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="20%" stopColor="#FDE047" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#EA580C" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#7C2D12" stopOpacity="0" />
            </radialGradient>

            {/* 2. Titanic Chains & Iron */}
            <linearGradient id="pm-iron" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A1A1AA" />
              <stop offset="40%" stopColor="#52525B" />
              <stop offset="100%" stopColor="#27272A" />
            </linearGradient>

            <filter id="pm-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="pm-glowStrong" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="15" result="blur" />
              <feComponentTransfer in="blur" result="glow1">
                <feFuncA type="linear" slope="3" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode in="glow1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <clipPath id="pm-clip">
              <circle cx="250" cy="250" r="230" />
            </clipPath>
          </defs>

          {/* ========================================== */}
          {/* BASE SHIELD & STOLEN FIRE CORE             */}
          {/* ========================================== */}
          <circle cx="250" cy="250" r="235" fill="url(#pm-bgGrad)" />
          
          {/* Subtle geometric planning grid mapping the mind of forethought */}
          <circle cx="250" cy="250" r="180" fill="none" stroke="#52525B" strokeWidth="1" opacity="0.4" strokeDasharray="10 5" />
          <polygon points="250,70 430,250 250,430 70,250" fill="none" stroke="#EA580C" strokeWidth="1" opacity="0.1" />
          <polygon points="120,120 380,120 380,380 120,380" fill="none" stroke="#EA580C" strokeWidth="1" opacity="0.1" />
          
          {/* The Fire of Knowledge Core */}
          <circle cx="250" cy="250" r="130" fill="url(#pm-fireCore)" filter="url(#pm-glowStrong)" className="anim-pulse" style={{ animationDuration: '4s' }} />

          {/* ========================================== */}
          {/* INTERNAL ELEMENTS: CHAINS & EMBERS         */}
          {/* ========================================== */}
          <g clipPath="url(#pm-clip)">
            
            {/* The Bounding Chains of the Caucasus (Orbiting iron rings) */}
            <g className="anim-spin" style={{ animationDuration: '60s' }} filter="drop-shadow(0 4px 6px rgba(0,0,0,0.8))">
              <circle cx="250" cy="250" r="200" fill="none" stroke="url(#pm-iron)" strokeWidth="6" strokeDasharray="40 20" opacity="0.8" />
              <circle cx="250" cy="250" r="150" fill="none" stroke="url(#pm-iron)" strokeWidth="10" strokeDasharray="100 15 20 15" opacity="0.6" />
            </g>

            {/* Ember sparks scattering in all directions representing shared knowledge */}
            <g fill="#FDE047" filter="url(#pm-glowStrong)">
              <circle cx="200" cy="250" r="4" style={{animation: 'floatUp 3s ease-in infinite'}} fill="#FFFFFF" />
              <circle cx="280" cy="220" r="3" style={{animation: 'floatUp 2.5s ease-in infinite 0.5s'}} />
              <circle cx="230" cy="280" r="5" style={{animation: 'floatUp 4s ease-in infinite 1s'}} fill="#EA580C" />
              <circle cx="350" cy="300" r="2" style={{animation: 'floatUp 3s ease-in infinite 0.2s'}} />
              <circle cx="150" cy="200" r="3" style={{animation: 'floatUp 2s ease-in infinite 0.8s'}} className="anim-flicker" />
            </g>
          </g>

          {/* ========================================== */}
          {/* THE TITAN'S IRON BORDER                      */}
          {/* ========================================== */}

          {/* Deep Ash Shadow */}
          <circle cx="250" cy="250" r="242" fill="none" stroke="#000000" strokeWidth="6" opacity="0.8" />

          {/* Heavy Cast Iron Rim */}
          <circle cx="250" cy="250" r="230" fill="none" stroke="url(#pm-iron)" strokeWidth="18" filter="drop-shadow(0 0 10px rgba(234, 88, 12, 0.3))" />
          
          {/* Internal ember glow bleeding through the border */}
          <circle cx="250" cy="250" r="221" fill="none" stroke="#EA580C" strokeWidth="2" strokeDasharray="50 100" opacity="0.9" className="anim-spin-rev" style={{ animationDuration: '30s' }} filter="url(#pm-glow)" />

          {/* Massive Forge Rivets binding the shield */}
          <g filter="drop-shadow(0 4px 6px rgba(0,0,0,0.6))">
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <g transform={`rotate(${deg} 250 250)`} key={`rivet-${deg}`}>
                 <circle cx="250" cy="20" r="6" fill="#18181B" stroke="url(#pm-iron)" strokeWidth="1.5" />
                 {/* Intense crack of fire lighting up within the rivet */}
                 <polygon points="250,18 252,20 250,22 248,20" fill="#FDE047" opacity="0.9" filter="url(#pm-glow)" />
              </g>
            ))}
          </g>

        
                    {/* Integrated Sigil Image Drop-in (Brought to Absolute Front) */}
                    <g filter="drop-shadow(0 0 20px rgba(255, 255, 255, 0.8))">
                        <image href={prometheusSigil} x="100" y="100" width="300" height="300" opacity="1" />
                    </g>
                </svg>
      </div>

      <div className="emblem-info">
        <span className="emblem-name">Prometheus</span>
        <span className="emblem-role">Planning</span>
      </div>
    </div>
  );
}
