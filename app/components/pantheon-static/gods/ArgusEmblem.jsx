const argusSigil = '/pantheon/sigils/argus.png';
export default function ArgusEmblem() {
  return (
    <div className="emblem-card card-argus">
      <div className="avatar-container argus" title="Argus - Observability">
        <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* 1. Deep Peacock Violet Background */}
            <radialGradient id="ar-bgGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#8B5CF6" /> {/* Vivid Violet */}
              <stop offset="40%" stopColor="#4C1D95" /> {/* Deep Purple */}
              <stop offset="70%" stopColor="#0F172A" /> {/* Night Sky */}
              <stop offset="100%" stopColor="#020617" />
            </radialGradient>

            {/* Toxic / Magical Green Core (Peacock eye center) */}
            <radialGradient id="ar-eyeCore" cx="50%" cy="50%" r="40%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="10%" stopColor="#A3E635" stopOpacity="0.8" />
              <stop offset="30%" stopColor="#047857" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#1E1B4B" stopOpacity="0" />
            </radialGradient>

            {/* 2. Mystical Materials */}
            <linearGradient id="ar-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="50%" stopColor="#EAB308" />
              <stop offset="100%" stopColor="#854D0E" />
            </linearGradient>

            {/* Peacock Feather Blues/Greens */}
            <linearGradient id="ar-peacock" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0EA5E9" />
              <stop offset="50%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#4C1D95" />
            </linearGradient>

            {/* 3. Ethereal Glows */}
            <filter id="ar-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="ar-glowStrong" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="10" result="blur" />
              <feComponentTransfer in="blur" result="glow1">
                <feFuncA type="linear" slope="3" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode in="glow1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <clipPath id="ar-clip">
              <circle cx="250" cy="250" r="230" />
            </clipPath>

            {/* Reusable Small Eye Motif */}
            <g id="ar-smallEye">
              {/* Gold Eyelid Frame */}
              <ellipse cx="0" cy="0" rx="14" ry="8" fill="none" stroke="url(#ar-gold)" strokeWidth="1" />
              {/* Peacock Iris */}
              <circle cx="0" cy="0" r="5" fill="url(#ar-peacock)" />
              {/* Glowing Pupil */}
              <circle cx="0" cy="0" r="2" fill="#A3E635" className="anim-flicker" filter="url(#ar-glow)" />
            </g>
          </defs>

          {/* ========================================== */}
          {/* BASE SHIELD & CENTRAL EYE                  */}
          {/* ========================================== */}
          <circle cx="250" cy="250" r="235" fill="url(#ar-bgGrad)" />
          
          {/* Subtle geometric mandala representing intersecting sight lines */}
          <g opacity="0.1" stroke="#EAB308" strokeWidth="1">
            <circle cx="250" cy="250" r="200" fill="none" />
            <circle cx="250" cy="250" r="150" fill="none" />
            <circle cx="250" cy="250" r="100" fill="none" />
            {[0, 30, 60, 90, 120, 150].map(deg => (
              <line key={`sight-${deg}`} x1="50" y1="250" x2="450" y2="250" transform={`rotate(${deg} 250 250)`} />
            ))}
          </g>

          {/* The Massive Central Pupil */}
          <circle cx="250" cy="250" r="140" fill="url(#ar-eyeCore)" filter="url(#ar-glowStrong)" className="anim-pulse" style={{ animationDuration: '6s' }} />

          {/* ========================================== */}
          {/* INTERNAL ELEMENTS: THE PANOPTICON          */}
          {/* ========================================== */}
          <g clipPath="url(#ar-clip)">
            
            {/* The Great Eyelid (Massive sweeping ellipses guarding the core) */}
            <ellipse cx="250" cy="250" rx="180" ry="100" fill="none" stroke="url(#ar-gold)" strokeWidth="4" opacity="0.6" className="anim-spin" style={{ animationDuration: '40s' }} filter="url(#ar-glow)" />
            <ellipse cx="250" cy="250" rx="100" ry="180" fill="none" stroke="url(#ar-peacock)" strokeWidth="4" opacity="0.6" className="anim-spin-rev" style={{ animationDuration: '40s' }} filter="url(#ar-glow)" />

            {/* Orbiting Ring of Floating Eyes (The 100 Eyes of Argus) */}
            <g className="anim-spin" style={{ animationDuration: '30s' }}>
              <circle cx="250" cy="250" r="180" fill="none" stroke="#C084FC" strokeWidth="1" strokeDasharray="5 20" opacity="0.4" />
              
              {/* Place 16 medium eyes around the inner orbit */}
              {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((deg) => (
                <use href="#ar-smallEye" transform={`rotate(${deg} 250 250) translate(250 70) rotate(-${deg})`} key={`orbit-eye-${deg}`} opacity="0.8" />
              ))}
            </g>

            {/* Ascending Magical Spores / Tears */}
            <g fill="#A3E635" filter="url(#ar-glowStrong)">
              <circle cx="150" cy="380" r="2" style={{animation: 'floatUp 4s ease-in infinite'}} />
              <circle cx="350" cy="340" r="1.5" style={{animation: 'floatUp 3s ease-in infinite 1s'}} fill="#38BDF8" />
              <circle cx="200" cy="300" r="3" style={{animation: 'floatUp 5s ease-in infinite 2s'}} fill="#FDE047" />
              <circle cx="300" cy="280" r="2" style={{animation: 'floatUp 3.5s ease-in infinite 0.5s'}} />
            </g>

          </g>

          {/* ========================================== */}
          {/* THE PEACOCK BORDERS                          */}
          {/* ========================================== */}

          {/* Base Violet Ring */}
          <circle cx="250" cy="250" r="242" fill="none" stroke="#4C1D95" strokeWidth="6" opacity="0.8" />

          {/* Main Gold and Emerald Armor Rim */}
          <circle cx="250" cy="250" r="230" fill="none" stroke="url(#ar-peacock)" strokeWidth="14" filter="drop-shadow(0 0 10px rgba(139, 92, 246, 0.5))" />
          
          {/* Inner Golden Seal Ring */}
          <circle cx="250" cy="250" r="223" fill="none" stroke="url(#ar-gold)" strokeWidth="2" opacity="0.9" />
          <circle cx="250" cy="250" r="237" fill="none" stroke="url(#ar-gold)" strokeWidth="1" opacity="0.6" />

          {/* 24 Perimeter Guard Eyes 
              His unblinking gaze permanently sealed around the frame.
          */}
          <g filter="drop-shadow(0 2px 4px rgba(0,0,0,0.6))">
            {Array.from({ length: 24 }).map((_, i) => {
              const deg = i * 15;
              return (
                <g transform={`rotate(${deg} 250 250)`} key={`guard-eye-${i}`}>
                   <ellipse cx="250" cy="18" rx="6" ry="12" fill="#020617" stroke="url(#ar-gold)" strokeWidth="1" />
                   {/* Neon pupil */}
                   <circle cx="250" cy="18" r="2" fill="#EAB308" filter="url(#ar-glow)" />
                </g>
              );
            })}
          </g>

        
                    {/* Integrated Sigil Image Drop-in (Brought to Absolute Front) */}
                    <g filter="drop-shadow(0 0 20px rgba(255, 255, 255, 0.8))">
                        <image href={argusSigil} x="100" y="100" width="300" height="300" opacity="1" />
                    </g>
                </svg>
      </div>

      <div className="emblem-info">
        <span className="emblem-name">Argus</span>
        <span className="emblem-role">Observability</span>
      </div>
    </div>
  );
}
