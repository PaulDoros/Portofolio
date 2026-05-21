const raSigil = '/pantheon/sigils/ra.png';
export default function RaEmblem() {
  return (
    <div className="emblem-card card-ra">
      <div className="avatar-container ra" title="Ra - Thorough Refactoring">
        <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* 1. Deep Egyptian Expanse Background */}
            <radialGradient id="r-bgGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#854D0E" /> {/* Burnished Desert Gold */}
              <stop offset="40%" stopColor="#7F1D1D" /> {/* Deep Blood Red */}
              <stop offset="70%" stopColor="#1E1B4B" /> {/* Night Sky Overlay */}
              <stop offset="100%" stopColor="#000000" />
            </radialGradient>

            {/* Intense Solar Flare Core (The Sun Disk) */}
            <radialGradient id="r-solarCore" cx="50%" cy="50%" r="40%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="25%" stopColor="#FEF08A" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#EF4444" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#7F1D1D" stopOpacity="0" />
            </radialGradient>

            {/* 2. Sacred Embellishments */}
            {/* Ra's Pure Divine Gold */}
            <linearGradient id="r-sunGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="30%" stopColor="#F59E0B" />
              <stop offset="70%" stopColor="#B45309" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>

            {/* Sacred Lapis Lazuli */}
            <linearGradient id="r-lapis" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0284C7" />
              <stop offset="50%" stopColor="#1D4ED8" />
              <stop offset="100%" stopColor="#1E3A8A" />
            </linearGradient>

            {/* 3. Solar Radiance Glows */}
            <filter id="r-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="r-glowStrong" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="15" result="blur" />
              <feComponentTransfer in="blur" result="glow1">
                <feFuncA type="linear" slope="3" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode in="glow1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <clipPath id="r-clip">
              <circle cx="250" cy="250" r="230" />
            </clipPath>

            {/* The Solar Flare Projection Vector */}
            <polygon id="r-flare" points="248,50 252,50 250,140" fill="url(#r-sunGold)" />
            {/* Egyptian Lotus / Pyramid Motif Marker */}
            <polygon id="r-pyramid" points="250,15 260,35 240,35" fill="url(#r-lapis)" stroke="#FEF08A" strokeWidth="1" />
          </defs>

          {/* ========================================== */}
          {/* BASE SHIELD & HIGH-NOON CORE               */}
          {/* ========================================== */}
          <circle cx="250" cy="250" r="235" fill="url(#r-bgGrad)" />
          
          {/* Deep desert mirage/heat shimmer inside the boundary */}
          <circle cx="250" cy="250" r="235" fill="#EF4444" opacity="0.1" style={{mixBlendMode: 'color-dodge'}} />
          
          {/* The Unwavering Eye of Ra (The Sun) */}
          <circle cx="250" cy="250" r="160" fill="url(#r-solarCore)" filter="url(#r-glowStrong)" className="anim-pulse" style={{ animationDuration: '6s' }} />

          {/* ========================================== */}
          {/* INTERNAL ELEMENTS: SOLAR FLARES & CORONA   */}
          {/* ========================================== */}
          <g clipPath="url(#r-clip)">
            
            {/* The Solar Corona (Massive erupting heat trails) */}
            <g className="anim-spin" style={{ animationDuration: '40s' }}>
              <circle cx="250" cy="250" r="150" fill="none" stroke="#F59E0B" strokeWidth="20" opacity="0.4" strokeDasharray="10 40 100 20 60 40" filter="url(#r-glow)" />
              <circle cx="250" cy="250" r="160" fill="none" stroke="#FEF08A" strokeWidth="4" opacity="0.6" strokeDasharray="2 10 50 15" />
            </g>

            {/* Erupting Solar Flares projecting from the core */}
            <g className="anim-spin-rev" style={{ animationDuration: '25s' }}>
              {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
                <use href="#r-flare" key={`flare-${deg}`} transform={`rotate(${deg} 250 250)`} opacity="0.8" filter="url(#r-glow)" />
              ))}
            </g>

            {/* Sacred Orbiting Lapis Ring (The Nile's lifeblood tracking the Sun) */}
            <circle cx="250" cy="250" r="100" fill="none" stroke="url(#r-lapis)" strokeWidth="6" opacity="0.85" strokeDasharray="30 20" className="anim-spin" style={{ animationDuration: '15s' }} filter="drop-shadow(0 0 5px rgba(2, 132, 199, 1))" />

            {/* Brilliant Ember Sparks flying off the Sun */}
            <g fill="#FEF08A" filter="url(#r-glowStrong)">
              <circle cx="250" cy="380" r="5" style={{animation: 'floatUp 2s ease-in infinite'}} fill="#FFFFFF" />
              <circle cx="180" cy="300" r="3" style={{animation: 'floatUp 1.5s ease-in infinite 0.5s'}} fill="#F59E0B" />
              <circle cx="320" cy="340" r="6" style={{animation: 'floatUp 3.5s ease-in infinite 1s'}} fill="#EF4444" />
              <circle cx="150" cy="250" r="2" style={{animation: 'floatUp 2s ease-in infinite 0.2s'}} />
              <circle cx="350" cy="280" r="4" style={{animation: 'floatUp 2.8s ease-in infinite 0.8s'}} fill="#FFFFFF" className="anim-flicker" />
            </g>

          </g>

          {/* ========================================== */}
          {/* THE HIEROGLYPHIC BORDERS                     */}
          {/* ========================================== */}

          {/* Shadow behind the burning rim */}
          <circle cx="250" cy="250" r="242" fill="none" stroke="#422006" strokeWidth="6" opacity="0.8" />

          {/* Main Egyptian Gold Boundary */}
          <circle cx="250" cy="250" r="230" fill="none" stroke="url(#r-sunGold)" strokeWidth="18" filter="drop-shadow(0 0 15px rgba(239, 68, 68, 0.4))" />
          
          {/* Inner Blood/Fire Seam */}
          <circle cx="250" cy="250" r="221" fill="none" stroke="#EF4444" strokeWidth="2" opacity="0.9" />
          <circle cx="250" cy="250" r="221" fill="none" stroke="#FDE047" strokeWidth="1" strokeDasharray="50 50" opacity="0.8" className="anim-spin" style={{ animationDuration: '10s' }} />

          {/* Geometric Pyramids / Obelisk Tops adorning the edge */}
          <g filter="drop-shadow(0 4px 6px rgba(0,0,0,0.6))">
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
              <g transform={`rotate(${deg} 250 250)`} key={`pyramid-${deg}`}>
                <use href="#r-pyramid" />
                {/* Micro-sparkle representing the sun hitting the apex */}
                <circle cx="250" cy="15" r="1.5" fill="#FFFFFF" filter="url(#r-glow)" opacity="0.9" />
              </g>
            ))}
          </g>

          {/* Inlaid Lapis Lazuli block pattern circling the rim */}
          <circle cx="250" cy="250" r="230" fill="none" stroke="url(#r-lapis)" strokeWidth="6" strokeDasharray="10 30" opacity="0.8" />

        
                    {/* Integrated Sigil Image Drop-in (Brought to Absolute Front) */}
                    <g filter="drop-shadow(0 0 20px rgba(253, 224, 71, 0.8))">
                        <image href={raSigil} x="100" y="100" width="300" height="300" opacity="1" />
                    </g>
                </svg>
      </div>

      <div className="emblem-info">
        <span className="emblem-name">Ra</span>
        <span className="emblem-role">Thorough Refactoring</span>
      </div>
    </div>
  );
}
