const heimdallSigil = '/pantheon/sigils/heimdal.png';
export default function HeimdallEmblem() {
  return (
    <div className="emblem-card card-heimdall">
      <div className="avatar-container heimdall" title="Heimdall - Gateway Access">
        <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* 1. Crystal Clear Aether Background */}
            <radialGradient id="hi-bgGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0EA5E9" /> {/* Bright Ice Blue */}
              <stop offset="35%" stopColor="#3B82F6" /> {/* Deep Aether */}
              <stop offset="70%" stopColor="#1E1B4B" /> {/* Night Sky */}
              <stop offset="100%" stopColor="#020617" />
            </radialGradient>

            {/* Piercing Optical Core */}
            <radialGradient id="hi-lensCore" cx="50%" cy="50%" r="40%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="15%" stopColor="#E0F2FE" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#7DD3FC" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#020617" stopOpacity="0" />
            </radialGradient>

            {/* 2. Prismatic & Metallic Materials */}
            {/* The Bifrost Prism */}
            <linearGradient id="hi-bifrost" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EF4444" /> {/* Red */}
              <stop offset="20%" stopColor="#F59E0B" /> {/* Yellow */}
              <stop offset="40%" stopColor="#10B981" /> {/* Green */}
              <stop offset="60%" stopColor="#06B6D4" /> {/* Cyan */}
              <stop offset="80%" stopColor="#3B82F6" /> {/* Blue */}
              <stop offset="100%" stopColor="#8B5CF6" /> {/* Violet */}
            </linearGradient>

            {/* Divine Silver / Crystal Glass */}
            <linearGradient id="hi-crystal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="30%" stopColor="#E0F2FE" />
              <stop offset="70%" stopColor="#BAE6FD" />
              <stop offset="100%" stopColor="#38BDF8" />
            </linearGradient>

            {/* Gjallarhorn Gold */}
            <linearGradient id="hi-gold" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="50%" stopColor="#EAB308" />
              <stop offset="100%" stopColor="#854D0E" />
            </linearGradient>

            {/* 3. Pure Optical Glows */}
            <filter id="hi-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="hi-glowStrong" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="10" result="blur" />
              <feComponentTransfer in="blur" result="glow1">
                <feFuncA type="linear" slope="3" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode in="glow1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="hi-glowBlinding" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComponentTransfer in="blur" result="glow1">
                <feFuncA type="linear" slope="5" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode in="glow1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <clipPath id="hi-clip">
              <circle cx="250" cy="250" r="230" />
            </clipPath>

            {/* Reusable Geometric Shards for the Iris */}
            <polygon id="hi-irisBlade" points="250,50 255,90 250,110 245,90" fill="url(#hi-crystal)" stroke="#0EA5E9" strokeWidth="0.5" />
          </defs>

          {/* ========================================== */}
          {/* BASE SHIELD & LENS CORE                    */}
          {/* ========================================== */}
          <circle cx="250" cy="250" r="235" fill="url(#hi-bgGrad)" />
          
          {/* Faint optical background rings */}
          <circle cx="250" cy="250" r="220" fill="none" stroke="#38BDF8" strokeWidth="1" opacity="0.1" strokeDasharray="5 5" />
          <circle cx="250" cy="250" r="180" fill="none" stroke="#38BDF8" strokeWidth="1" opacity="0.1" strokeDasharray="10 10" />
          
          {/* The Blinding Eye Core */}
          <circle cx="250" cy="250" r="150" fill="url(#hi-lensCore)" filter="url(#hi-glowStrong)" className="anim-pulse" style={{ animationDuration: '3s' }} />

          {/* ========================================== */}
          {/* INTERNAL ELEMENTS: OPTICS & THE BIFROST    */}
          {/* ========================================== */}
          <g clipPath="url(#hi-clip)">
            
            {/* The Iris Aperture (Overlapping Crystal Blades) */}
            <g className="anim-spin" style={{ animationDuration: '40s', transformOrigin: '250px 250px' }}>
              {Array.from({ length: 12 }).map((_, i) => (
                <use href="#hi-irisBlade" transform={`rotate(${i * 30} 250 250)`} key={`blade-${i}`} opacity="0.6" filter="url(#hi-glow)" />
              ))}
            </g>
            <g className="anim-spin-rev" style={{ animationDuration: '60s', transformOrigin: '250px 250px' }}>
              {Array.from({ length: 12 }).map((_, i) => (
                <use href="#hi-irisBlade" transform={`rotate(${i * 30 + 15} 250 250) scale(0.8) translate(60, 60)`} key={`blade-inner-${i}`} opacity="0.8" filter="url(#hi-glow)" />
              ))}
            </g>

            {/* The Inner Bifrost Ring */}
            <circle cx="250" cy="250" r="140" fill="none" stroke="url(#hi-bifrost)" strokeWidth="4" opacity="0.6" strokeDasharray="60 10 20 15 5 10" className="anim-spin" style={{ animationDuration: '15s' }} filter="url(#hi-glow)" />
            
            <circle cx="250" cy="250" r="120" fill="none" stroke="url(#hi-crystal)" strokeWidth="1.5" opacity="0.8" strokeDasharray="3 15 8 20" className="anim-spin-rev" style={{ animationDuration: '20s' }} filter="url(#hi-glow)" />

            {/* High-Focus Tactical Crosshairs (Seeing all 9 realms) */}
            <g stroke="url(#hi-crystal)" strokeWidth="1" opacity="0.4" filter="url(#hi-glow)">
              <line x1="250" y1="20" x2="250" y2="480" />
              <line x1="20" y1="250" x2="480" y2="250" />
              <line x1="87" y1="87" x2="413" y2="413" />
              <line x1="87" y1="413" x2="413" y2="87" />
            </g>

            {/* Prismatic Sight Embers (Multi-colored floaters) */}
            <g filter="url(#hi-glowStrong)" opacity="0.9">
              <circle cx="200" cy="380" r="2" fill="#F59E0B" style={{animation: 'floatUp 2.5s ease-in infinite 0.2s'}} />
              <circle cx="280" cy="340" r="1.5" fill="#3B82F6" style={{animation: 'floatUp 3s ease-in infinite 0.8s'}} />
              <circle cx="150" cy="300" r="2.5" fill="#10B981" style={{animation: 'floatUp 2s ease-in infinite 1.5s'}} />
              <circle cx="350" cy="270" r="2" fill="#8B5CF6" style={{animation: 'floatUp 3.5s ease-in infinite 0.5s'}} />
              <circle cx="250" cy="400" r="3" fill="#FFFFFF" style={{animation: 'floatUp 2s ease-in infinite'}} className="anim-flicker" />
            </g>

          </g>

          {/* ========================================== */}
          {/* THE WATCHER BORDERS                          */}
          {/* ========================================== */}

          {/* Outer Mystical Shadow */}
          <circle cx="250" cy="250" r="242" fill="none" stroke="#1E1B4B" strokeWidth="6" opacity="0.8" filter="url(#hi-glowStrong)" />

          {/* Main Crystal & Gjallarhorn Gold Rim */}
          <circle cx="250" cy="250" r="230" fill="none" stroke="url(#hi-gold)" strokeWidth="14" filter="drop-shadow(0 0 15px rgba(250, 204, 21, 0.4))" />
          
          {/* Outer Bevel / Optical Mount */}
          <circle cx="250" cy="250" r="236" fill="none" stroke="url(#hi-crystal)" strokeWidth="2" opacity="0.9" />
          <circle cx="250" cy="250" r="223" fill="none" stroke="#854D0E" strokeWidth="2" opacity="0.8" />

          {/* The Outer Bifrost Prism Band */}
          <circle cx="250" cy="250" r="214" fill="none" stroke="url(#hi-bifrost)" strokeWidth="6" opacity="0.85" filter="url(#hi-glowStrong)" className="anim-spin" style={{ animationDuration: '60s' }} />

          {/* Micro-Engraved Lens Ticks (360 degrees of vision) */}
          <circle cx="250" cy="250" r="206" fill="none" stroke="url(#hi-crystal)" strokeWidth="4" opacity="0.7" strokeDasharray="2 10 4 20" className="anim-spin-rev" style={{ animationDuration: '45s' }} />

          {/* 8 Optical Focus Anchors (Gjallarhorn Muzzles spreading outward) */}
          <g filter="url(#hi-glow)">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <g transform={`rotate(${deg} 250 250)`} key={`focus-${deg}`}>
                {/* Golden Bell Motif */}
                <polygon points="250,5 258,20 250,15 242,20" fill="url(#hi-gold)" stroke="#FFFFFF" strokeWidth="1" />
                <circle cx="250" cy="8" r="1.5" fill="#FFFFFF" filter="url(#hi-glowBlinding)" className="anim-pulse" />
              </g>
            ))}
          </g>

        
                    {/* Integrated Sigil Image Drop-in (Brought to Absolute Front) */}
                    <g filter="drop-shadow(0 0 20px rgba(236, 72, 153, 0.8))">
                        <image href={heimdallSigil} x="100" y="100" width="300" height="300" opacity="1" />
                    </g>
                </svg>
      </div>

      <div className="emblem-info">
        <span className="emblem-name">Heimdall</span>
        <span className="emblem-role">Gateway Access</span>
      </div>
    </div>
  );
}
