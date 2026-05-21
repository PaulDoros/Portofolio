const heraclesSigil = '/pantheon/sigils/heracles.png';
export default function HeraclesEmblem() {
  return (
    <div className="emblem-card card-heracles">
      <div className="avatar-container heracles" title="Heracles - Heavy Lifting">
        <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* 1. Deep Earth & Lion's Fur Background */}
            <radialGradient id="he-bgGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#9A3412" /> {/* Raw Earth Orange */}
              <stop offset="40%" stopColor="#431407" /> {/* Deep Soil */}
              <stop offset="75%" stopColor="#290E05" /> {/* Underworld Rock */}
              <stop offset="100%" stopColor="#0B0000" />
            </radialGradient>

            {/* Glowing Core of Power */}
            <radialGradient id="he-powerCore" cx="50%" cy="50%" r="40%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="25%" stopColor="#F97316" stopOpacity="0.6" />
              <stop offset="60%" stopColor="#7C2D12" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#0B0000" stopOpacity="0" />
            </radialGradient>

            {/* 2. Heavy Rugged Materials */}
            {/* Primitive Bronze / Earth Ore */}
            <linearGradient id="he-bronze" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D97706" />
              <stop offset="40%" stopColor="#92400E" />
              <stop offset="70%" stopColor="#451A03" />
              <stop offset="100%" stopColor="#290E05" />
            </linearGradient>

            {/* 3. Glowing Tones */}
            <filter id="he-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
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

            {/* Lion's Fur / Earth Texture Vector Displacement */}
            <filter id="he-earthTexture" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="4" result="noise" />
              <feColorMatrix type="matrix" values="1 0 0 0 0  0 0.5 0 0 0  0 0.2 0 0 0  0 0 0 2 0" in="noise" result="coloredNoise" />
              <feComposite operator="in" in="coloredNoise" in2="SourceGraphic" result="texture" />
              <feBlend mode="multiply" in="texture" in2="SourceGraphic" />
            </filter>

            <clipPath id="he-clip">
              <circle cx="250" cy="250" r="230" />
            </clipPath>

            {/* Heavy Club Strike / Fang Motif */}
            <polygon id="he-fang" points="250,50 265,120 250,110 235,120" fill="url(#he-bronze)" stroke="#0B0000" strokeWidth="2" />
          </defs>

          {/* ========================================== */}
          {/* BASE SHIELD & STRENGTH CORE                  */}
          {/* ========================================== */}
          <circle cx="250" cy="250" r="235" fill="url(#he-bgGrad)" />
          
          {/* Deep Organic Earth/Fur Texture overlay */}
          <circle cx="250" cy="250" r="235" fill="#F97316" opacity="0.3" filter="url(#he-earthTexture)" />
          
          {/* The Intense Earth Core (Raw Power) */}
          <circle cx="250" cy="250" r="140" fill="url(#he-powerCore)" filter="url(#he-glowStrong)" className="anim-pulse" style={{ animationDuration: '3s' }} />

          {/* ========================================== */}
          {/* INTERNAL ELEMENTS: FANGS & COMBAT            */}
          {/* ========================================== */}
          <g clipPath="url(#he-clip)">
            
            {/* Heavy jagged ring representing his wooden club */}
            <g className="anim-spin" style={{ animationDuration: '80s' }}>
              <circle cx="250" cy="250" r="170" fill="none" stroke="url(#he-bronze)" strokeWidth="15" strokeDasharray="30 20" opacity="0.9" />
              <circle cx="250" cy="250" r="170" fill="none" stroke="#000" strokeWidth="2" strokeDasharray="30 20" opacity="0.5" />
            </g>

            {/* Counter-Rotating Nemean Lion Fangs piercing inward */}
            <g className="anim-spin-rev" style={{ animationDuration: '100s', transformOrigin: '250px 250px' }}>
              {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
                <use href="#he-fang" key={`fang-${deg}`} transform={`rotate(${deg} 250 250)`} filter="drop-shadow(0 4px 6px rgba(0,0,0,0.8))" />
              ))}
            </g>

            {/* Glowing combat rings (impact waves) */}
            <circle cx="250" cy="250" r="130" fill="none" stroke="#F97316" strokeWidth="2" opacity="0.8" strokeDasharray="10 40 100 20" className="anim-spin" style={{ animationDuration: '5s' }} filter="url(#he-glowStrong)" />
            <circle cx="250" cy="250" r="110" fill="none" stroke="#FDE047" strokeWidth="4" opacity="0.6" strokeDasharray="50 50" className="anim-spin-rev" style={{ animationDuration: '3s' }} filter="url(#he-glow)" />

            {/* Ash / Impact Embers floating upwards */}
            <g fill="#FACC15" filter="url(#he-glowStrong)">
              <rect x="200" y="380" width="4" height="4" style={{animation: 'floatUp 2.5s ease-in infinite'}} transform="rotate(45 200 380)" fill="#F97316" />
              <rect x="280" y="340" width="6" height="6" style={{animation: 'floatUp 3s ease-in infinite 0.5s'}} transform="rotate(15 280 340)" />
              <polygon points="150,300 155,305 145,305" style={{animation: 'floatUp 2s ease-in infinite 1s'}} fill="#FFFFFF" />
              <polygon points="350,270 355,275 345,275" style={{animation: 'floatUp 3.5s ease-in infinite 0.2s'}} fill="#EF4444" />
            </g>

          </g>

          {/* ========================================== */}
          {/* THE HERCULEAN BORDERS                        */}
          {/* ========================================== */}

          {/* Unpolished Earth Shadow */}
          <circle cx="250" cy="250" r="242" fill="none" stroke="#290E05" strokeWidth="6" opacity="0.9" />

          {/* The thickest, most brutal outer rim of the fleet. Represents the indestructible Nemean Lion pelt and primitive stone/club. */}
          <circle cx="250" cy="250" r="226" fill="none" stroke="url(#he-bronze)" strokeWidth="24" filter="drop-shadow(0 0 10px rgba(154, 52, 18, 0.5))" />
          
          {/* Leather-binding / Raw cord wrapping the edge. Simulated with thick stroke dashes */}
          <circle cx="250" cy="250" r="226" fill="none" stroke="#431407" strokeWidth="26" strokeDasharray="10 30" opacity="0.9" />

          {/* Massive Bronze Spikes driven into the rim. Primitive aesthetic. */}
          <g filter="drop-shadow(0 4px 6px rgba(0,0,0,0.8))">
            {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((deg) => (
              <g transform={`rotate(${deg} 250 250)`} key={`spike-${deg}`}>
                 <polygon points="250,2 256,15 244,15" fill="url(#he-bronze)" stroke="#0B0000" strokeWidth="1" />
                 <circle cx="250" cy="18" r="2" fill="#F97316" filter="url(#he-glow)" className="anim-flicker" />
              </g>
            ))}
          </g>

        
                    {/* Integrated Sigil Image Drop-in (Brought to Absolute Front) */}
                    <g filter="drop-shadow(0 0 20px rgba(180, 83, 9, 0.8))">
                        <image href={heraclesSigil} x="100" y="100" width="300" height="300" opacity="1" />
                    </g>
                </svg>
      </div>

      <div className="emblem-info">
        <span className="emblem-name">Heracles</span>
        <span className="emblem-role">Heavy Lifting</span>
      </div>
    </div>
  );
}
