const minervaSigil = '/pantheon/sigils/minerva.png';
export default function MinervaEmblem() {
  return (
    <div className="emblem-card card-minerva">
      <div className="avatar-container minerva" title="Minerva - Strategic Analysis">
        <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* 1. Deep Strategic Compass Background (Midnight / Owl Indigo) */}
            <radialGradient id="mi-bgGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1E3A8A" /> {/* Navy Blue */}
              <stop offset="50%" stopColor="#1E1B4B" /> {/* Deep Indigo */}
              <stop offset="85%" stopColor="#0F172A" /> {/* Night Shadow */}
              <stop offset="100%" stopColor="#000000" />
            </radialGradient>

            {/* Glowing Wisdom Star Core */}
            <radialGradient id="mi-wisdomCore" cx="50%" cy="50%" r="40%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="20%" stopColor="#38BDF8" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#312E81" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#020617" stopOpacity="0" />
            </radialGradient>

            {/* 2. Roman Gold & Bronze */}
            <linearGradient id="mi-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="50%" stopColor="#EAB308" />
              <stop offset="100%" stopColor="#854D0E" />
            </linearGradient>

            <filter id="mi-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="mi-glowStrong" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComponentTransfer in="blur" result="glow1">
                <feFuncA type="linear" slope="3" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode in="glow1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <clipPath id="mi-clip">
              <circle cx="250" cy="250" r="230" />
            </clipPath>

            {/* Reusable Laurel Leaf / Owl Feather Scale */}
            <polygon id="mi-leaf" points="250,40 258,60 250,70 242,60" fill="url(#mi-gold)" opacity="0.8" />
          </defs>

          {/* ========================================== */}
          {/* BASE SHIELD & STAR CORE                      */}
          {/* ========================================== */}
          <circle cx="250" cy="250" r="235" fill="url(#mi-bgGrad)" />
          
          {/* Constellation / Tactical Mapping Array Map */}
          <g opacity="0.2" stroke="#38BDF8" strokeWidth="1">
            <line x1="100" y1="150" x2="300" y2="400" />
            <line x1="300" y1="400" x2="400" y2="200" />
            <line x1="400" y1="200" x2="100" y2="150" />
            <circle cx="100" cy="150" r="3" fill="#FFFFFF" />
            <circle cx="300" cy="400" r="4" fill="#FFFFFF" />
            <circle cx="400" cy="200" r="3" fill="#FFFFFF" />
          </g>
          
          {/* The Brilliant Compass Core */}
          <circle cx="250" cy="250" r="130" fill="url(#mi-wisdomCore)" filter="url(#mi-glowStrong)" className="anim-pulse" style={{ animationDuration: '6s' }} />

          {/* ========================================== */}
          {/* INTERNAL ELEMENTS: ROMAN STRATEGY COMPASS  */}
          {/* ========================================== */}
          <g clipPath="url(#mi-clip)">
            
            {/* Massive Star Compass rotating precisely */}
            <g className="anim-spin" style={{ animationDuration: '90s', transformOrigin: '250px 250px' }}>
              <circle cx="250" cy="250" r="170" fill="none" stroke="url(#mi-gold)" strokeWidth="2" opacity="0.6" strokeDasharray="5 15" />
              <polygon points="250,60 265,235 440,250 265,265 250,440 235,265 60,250 235,235" fill="none" stroke="#EAB308" strokeWidth="1" opacity="0.8" filter="url(#mi-glow)" />
            </g>

            {/* The Owl's Iris Rings (Slow interlocking rings scanning) */}
            <g className="anim-spin-rev" style={{ animationDuration: '45s' }}>
              <circle cx="250" cy="250" r="140" fill="none" stroke="#38BDF8" strokeWidth="3" opacity="0.5" strokeDasharray="30 100 80 40" filter="url(#mi-glow)" />
              <circle cx="250" cy="250" r="110" fill="none" stroke="url(#mi-gold)" strokeWidth="4" opacity="0.9" strokeDasharray="4 20" />
            </g>

            {/* Ascending glowing wisdom nodes (like floating data points) */}
            <g fill="#38BDF8" filter="url(#mi-glowStrong)">
              <circle cx="200" cy="380" r="2.5" style={{animation: 'floatUp 4s ease-in infinite'}} fill="#FFFFFF" />
              <circle cx="280" cy="300" r="1.5" style={{animation: 'floatUp 3s ease-in infinite 0.5s'}} />
              <circle cx="180" cy="340" r="3" style={{animation: 'floatUp 5s ease-in infinite 1.2s'}} />
              <circle cx="340" cy="250" r="2" style={{animation: 'floatUp 3.5s ease-in infinite 2s'}} fill="#FDE047" />
            </g>

          </g>

          {/* ========================================== */}
          {/* THE LAUREL WREATH BORDERS                    */}
          {/* ========================================== */}

          {/* Base Navy Shadow */}
          <circle cx="250" cy="250" r="242" fill="none" stroke="#0F172A" strokeWidth="6" opacity="0.9" />

          {/* Main Solid Gold Tactic Rim */}
          <circle cx="250" cy="250" r="230" fill="none" stroke="url(#mi-gold)" strokeWidth="18" filter="drop-shadow(0 0 10px rgba(250, 204, 21, 0.4))" />
          
          {/* Laser-precise navy tracking line inside the gold */}
          <circle cx="250" cy="250" r="230" fill="none" stroke="#1E3A8A" strokeWidth="2" opacity="0.8" />
          <circle cx="250" cy="250" r="221" fill="none" stroke="#38BDF8" strokeWidth="1" strokeDasharray="50 50" opacity="0.6" className="anim-spin" style={{ animationDuration: '20s' }} />

          {/* Intersecting Laurel Scales / Feathers wrapping the border */}
          <g filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))">
            {Array.from({ length: 24 }).map((_, i) => {
              const deg = i * 15;
              return (
                <g transform={`rotate(${deg} 250 250)`} key={`leaf-${deg}`}>
                   <use href="#mi-leaf" transform="translate(0 -32)" />
                </g>
              );
            })}
          </g>

        
                    {/* Integrated Sigil Image Drop-in (Brought to Absolute Front) */}
                    <g filter="drop-shadow(0 0 20px rgba(37, 99, 235, 0.8))">
                        <image href={minervaSigil} x="100" y="100" width="300" height="300" opacity="1" />
                    </g>
                </svg>
      </div>

      <div className="emblem-info">
        <span className="emblem-name">Minerva</span>
        <span className="emblem-role">Strategic Analysis</span>
      </div>
    </div>
  );
}
