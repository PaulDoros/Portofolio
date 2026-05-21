const thothSigil = '/pantheon/sigils/thoth.png';
export default function ThothEmblem() {
  const glyphs = ["𓁹", "𓆣", "𓃀", "𓅓", "𓋹", "𓊽", "𓌂", "𓍯", "𓎛", "𓏏", "𓃭", "𓍿"];
  
  return (
    <div className="emblem-card card-thoth">
      <div className="avatar-container thoth" title="Thoth - Documentation">
        <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* 1. Emerald / Obsidian Background */}
            <radialGradient id="th-bgGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#064E3B" /> {/* Deep Emerald */}
              <stop offset="50%" stopColor="#022C22" /> {/* Dark Jade */}
              <stop offset="85%" stopColor="#0F172A" /> {/* Slate Void */}
              <stop offset="100%" stopColor="#000000" />
            </radialGradient>

            {/* Glowing Moon / Magic Core */}
            <radialGradient id="th-moonCore" cx="50%" cy="50%" r="40%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="25%" stopColor="#A7F3D0" stopOpacity="0.6" />
              <stop offset="60%" stopColor="#10B981" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#0B0000" stopOpacity="0" />
            </radialGradient>

            {/* 2. Magical Papyrus / Gold Materials */}
            {/* Scribes Gold */}
            <linearGradient id="th-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="40%" stopColor="#D97706" />
              <stop offset="70%" stopColor="#78350F" />
              <stop offset="100%" stopColor="#451A03" />
            </linearGradient>

            {/* Papyrus Parchment Tone */}
            <linearGradient id="th-papyrus" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FEF3C7" />
              <stop offset="50%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>

            {/* 3. Aura Filters */}
            <filter id="th-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="th-glowStrong" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComponentTransfer in="blur" result="glow1">
                <feFuncA type="linear" slope="3" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode in="glow1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <clipPath id="th-clip">
              <circle cx="250" cy="250" r="230" />
            </clipPath>

            {/* The Crescent Moon Vector */}
            <path id="th-crescent" d="M 250 110 A 90 90 0 1 1 160 200 A 70 70 0 1 0 250 110 Z" fill="#FFFFFF" filter="url(#th-glowStrong)" />
          </defs>

          {/* ========================================== */}
          {/* BASE SHIELD & MOON CORE                    */}
          {/* ========================================== */}
          <circle cx="250" cy="250" r="235" fill="url(#th-bgGrad)" />
          
          {/* Subtle magical mandala geometry in the background */}
          <circle cx="250" cy="250" r="180" fill="none" stroke="#10B981" strokeWidth="1" opacity="0.2" strokeDasharray="5 15" />
          <circle cx="250" cy="250" r="140" fill="none" stroke="#34D399" strokeWidth="2" opacity="0.1" />
          
          {/* The Radiant Ibis / Moon Core */}
          <circle cx="250" cy="250" r="130" fill="url(#th-moonCore)" filter="url(#th-glowStrong)" className="anim-pulse" style={{ animationDuration: '6s' }} />

          {/* ========================================== */}
          {/* INTERNAL ELEMENTS: MAGIC INK & GLYPHS      */}
          {/* ========================================== */}
          <g clipPath="url(#th-clip)">
            
            {/* The Sacred Crescent Moon (Central) */}
            <g className="anim-spin" style={{ animationDuration: '60s', transformOrigin: '250px 250px' }}>
              <use href="#th-crescent" />
            </g>

            {/* Glowing Emerald Magic Rings (The magic of Thoth) */}
            <g className="anim-spin-rev" style={{ animationDuration: '24s' }}>
              <circle cx="250" cy="250" r="170" fill="none" stroke="#10B981" strokeWidth="4" opacity="0.8" strokeDasharray="60 30 10 30" filter="url(#th-glow)" />
              <circle cx="250" cy="250" r="160" fill="none" stroke="#A7F3D0" strokeWidth="1" opacity="0.6" strokeDasharray="2 10 50 15" />
            </g>

            {/* The Floating Glyphs / Knowledge Magic Orbit */}
            <g className="anim-spin" style={{ animationDuration: '45s', transformOrigin: '250px 250px' }}>
              {glyphs.map((glyph, i) => {
                const angle = (i * 360) / glyphs.length;
                return (
                  <g transform={`rotate(${angle} 250 250)`} key={`glyph-${i}`}>
                    <text x="250" y="80" fill="#34D399" fontSize="24" textAnchor="middle" filter="url(#th-glow)" opacity="0.9">
                      {glyph}
                    </text>
                  </g>
                );
              })}
            </g>

            {/* Ink drop particles (Wisdom floating upward) */}
            <g fill="#A7F3D0" filter="url(#th-glow)">
              <circle cx="200" cy="380" r="2" style={{animation: 'floatUp 3s ease-in infinite'}} opacity="0.8" />
              <circle cx="280" cy="350" r="1.5" style={{animation: 'floatUp 4s ease-in infinite 0.5s'}} fill="#34D399" />
              <circle cx="150" cy="300" r="3" style={{animation: 'floatUp 2.5s ease-in infinite 1s'}} fill="#FDE047" />
              <circle cx="350" cy="280" r="2" style={{animation: 'floatUp 3.2s ease-in infinite 0.2s'}} />
              <circle cx="250" cy="400" r="4" style={{animation: 'floatUp 5s ease-in infinite 0.8s'}} fill="#10B981" />
            </g>

          </g>

          {/* ========================================== */}
          {/* THE PAPYRUS BORDERS                          */}
          {/* ========================================== */}

          {/* Outer Abyss Container */}
          <circle cx="250" cy="250" r="242" fill="none" stroke="#022C22" strokeWidth="6" opacity="0.8" />

          {/* Main Egyptian Gold Boundary */}
          <circle cx="250" cy="250" r="230" fill="none" stroke="url(#th-gold)" strokeWidth="18" filter="drop-shadow(0 0 15px rgba(16, 185, 129, 0.4))" />
          
          {/* Inner Emerald / Ink Trim */}
          <circle cx="250" cy="250" r="221" fill="none" stroke="#047857" strokeWidth="2" opacity="0.9" />
          
          {/* Glowing runic pulse line inside the border */}
          <circle cx="250" cy="250" r="215" fill="none" stroke="#34D399" strokeWidth="2" opacity="0.8" strokeDasharray="10 50 100 200" className="anim-spin" style={{ animationDuration: '15s' }} filter="url(#th-glowStrong)" />

          {/* Sacred Obelisk / Pen Nib Anchors around the border */}
          <g filter="drop-shadow(0 3px 5px rgba(0,0,0,0.7))">
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <g transform={`rotate(${deg} 250 250)`} key={`anchor-${deg}`}>
                {/* Golden Pyramid/Nib Shape */}
                <polygon points="250,5 260,28 240,28" fill="url(#th-papyrus)" stroke="#A16207" strokeWidth="1" />
                {/* Emerald ink pool inside the nib */}
                <circle cx="250" cy="18" r="2.5" fill="#A7F3D0" filter="url(#th-glowStrong)" opacity="0.9" className="anim-flicker" />
              </g>
            ))}
          </g>

        
                    {/* Integrated Sigil Image Drop-in (Brought to Absolute Front) */}
                    <g filter="drop-shadow(0 0 20px rgba(167, 139, 250, 0.8))">
                        <image href={thothSigil} x="100" y="100" width="300" height="300" opacity="1" />
                    </g>
                </svg>
      </div>

      <div className="emblem-info">
        <span className="emblem-name">Thoth</span>
        <span className="emblem-role">Documentation</span>
      </div>
    </div>
  );
}
