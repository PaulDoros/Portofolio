const aphroditeSigil = '/pantheon/sigils/aphrodite.png';
export default function AphroditeEmblem() {
  return (
    <div className="emblem-card card-aphrodite">
      <div className="avatar-container aphrodite" title="Aphrodite - Design & UX">
        <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* 1. Deep Rose Background */}
            <radialGradient id="ap-bgGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#BE185D" /> {/* Deep Rose */}
              <stop offset="40%" stopColor="#831843" /> {/* Dark Velvet Red */}
              <stop offset="70%" stopColor="#4C0519" /> {/* Shadow Pink */}
              <stop offset="100%" stopColor="#0B0000" />
            </radialGradient>

            {/* Radiant Pearl Core (Sea Foam) */}
            <radialGradient id="ap-pearlCore" cx="50%" cy="50%" r="40%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="25%" stopColor="#FDF2F8" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#FBCFE8" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#BE185D" stopOpacity="0" />
            </radialGradient>

            {/* 2. Soft Metals & Silks */}
            {/* Rose Gold */}
            <linearGradient id="ap-roseGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEE2E2" />
              <stop offset="40%" stopColor="#FCA5A5" />
              <stop offset="70%" stopColor="#F43F5E" />
              <stop offset="100%" stopColor="#BE123C" />
            </linearGradient>

            {/* 3. Soft Glow Filters */}
            <filter id="ap-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="ap-glowStrong" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="12" result="blur" />
              <feComponentTransfer in="blur" result="glow1">
                <feFuncA type="linear" slope="2.5" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode in="glow1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <clipPath id="ap-clip">
              <circle cx="250" cy="250" r="230" />
            </clipPath>

            {/* Reusable Overlapping Rose Petal Arc */}
            {/* A gentle sweeping curve resembling a folded flower petal */}
            <path id="ap-petal" d="M 250 140 C 310 90, 350 150, 250 250 C 150 150, 190 90, 250 140 Z" fill="url(#ap-roseGold)" opacity="0.6" stroke="#FDA4AF" strokeWidth="1" />
          </defs>

          {/* ========================================== */}
          {/* BASE SHIELD & PEARL CORE                   */}
          {/* ========================================== */}
          <circle cx="250" cy="250" r="235" fill="url(#ap-bgGrad)" />
          
          {/* Outer floating silk ripples */}
          <circle cx="250" cy="250" r="200" fill="none" stroke="#F472B6" strokeWidth="1" opacity="0.1" strokeDasharray="50 100" className="anim-spin" style={{ animationDuration: '40s' }} />
          <circle cx="250" cy="250" r="180" fill="none" stroke="#FDA4AF" strokeWidth="2" opacity="0.15" strokeDasharray="30 80" className="anim-spin-rev" style={{ animationDuration: '30s' }} />

          {/* The Iridescent Pearl Core */}
          <circle cx="250" cy="250" r="100" fill="url(#ap-pearlCore)" filter="url(#ap-glowStrong)" className="anim-pulse" style={{ animationDuration: '5s' }} />

          {/* ========================================== */}
          {/* INTERNAL ELEMENTS: THE ROSE OF LOVE        */}
          {/* ========================================== */}
          <g clipPath="url(#ap-clip)">
            
            {/* Gently rotating fractal rose petals (overlapping scaling paths) */}
            <g className="anim-spin" style={{ animationDuration: '90s', transformOrigin: '250px 250px' }}>
              {/* Outer massive petals */}
              {[0, 72, 144, 216, 288].map(deg => (
                <g key={`petal-outer-${deg}`} transform={`rotate(${deg} 250 250) scale(1.4) translate(-100 -100)`} filter="url(#ap-glow)">
                  <use href="#ap-petal" />
                </g>
              ))}
            </g>
            
            <g className="anim-spin-rev" style={{ animationDuration: '70s', transformOrigin: '250px 250px' }}>
              {/* Inner interlaced petals */}
              {[36, 108, 180, 252, 324].map(deg => (
                <g key={`petal-inner-${deg}`} transform={`rotate(${deg} 250 250) scale(0.9) translate(25 25)`} filter="url(#ap-glow)">
                  <use href="#ap-petal" />
                </g>
              ))}
            </g>

            {/* Glowing Golden Thread bindings crossing the flower */}
            <g className="anim-spin" style={{ animationDuration: '30s' }}>
              <circle cx="250" cy="250" r="140" fill="none" stroke="url(#ap-roseGold)" strokeWidth="1.5" strokeDasharray="1 10" opacity="0.8" />
            </g>

            {/* Falling Sea Foam & Rose Sparks */}
            <g filter="url(#ap-glowStrong)">
              <circle cx="250" cy="380" r="3" style={{animation: 'floatUp 4s ease-in infinite'}} fill="#FFFFFF" opacity="0.9" />
              <circle cx="280" cy="320" r="2" style={{animation: 'floatUp 3s ease-in infinite 0.5s'}} fill="#FBCFE8" />
              <circle cx="200" cy="300" r="4" style={{animation: 'floatUp 5s ease-in infinite 1.2s'}} fill="#FDA4AF" />
              <circle cx="340" cy="280" r="2.5" style={{animation: 'floatUp 4.5s ease-in infinite 2s'}} fill="#FEE2E2" />
            </g>

          </g>

          {/* ========================================== */}
          {/* THE ROSE GOLD BORDES                         */}
          {/* ========================================== */}

          {/* Under-ring backing */}
          <circle cx="250" cy="250" r="242" fill="none" stroke="#4C0519" strokeWidth="6" opacity="0.8" />

          {/* Main Rose Gold Floral Frame */}
          <circle cx="250" cy="250" r="230" fill="none" stroke="url(#ap-roseGold)" strokeWidth="14" filter="drop-shadow(0 0 10px rgba(244, 63, 94, 0.4))" />
          
          {/* Elegant Filigree Lines (Multiple thin interwoven rims) */}
          <circle cx="250" cy="250" r="224" fill="none" stroke="#FDA4AF" strokeWidth="2" opacity="0.8" />
          <circle cx="250" cy="250" r="221" fill="none" stroke="#FECDD3" strokeWidth="1" opacity="0.5" />

          {/* Rose Thorns / Subtle Diamonds anchored to the rim */}
          <g filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <g transform={`rotate(${deg} 250 250)`} key={`thorn-${deg}`}>
                 {/* Diamond cut gem */}
                 <polygon points="250,15 255,22 250,29 245,22" fill="#FFFFFF" stroke="url(#ap-roseGold)" strokeWidth="1" filter="url(#ap-glow)" />
              </g>
            ))}
          </g>

        
                    {/* Integrated Sigil Image Drop-in (Brought to Absolute Front) */}
                    <g filter="drop-shadow(0 0 20px rgba(244, 114, 182, 0.8))">
                        <image href={aphroditeSigil} x="100" y="100" width="300" height="300" opacity="1" />
                    </g>
                </svg>
      </div>

      <div className="emblem-info">
        <span className="emblem-name">Aphrodite</span>
        <span className="emblem-role">Design & UX</span>
      </div>
    </div>
  );
}
