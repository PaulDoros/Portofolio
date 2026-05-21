const ptahSigil = '/pantheon/sigils/ptah.png';
export default function PtahEmblem() {
  return (
    <div className="emblem-card card-ptah">
      <div className="avatar-container ptah" title="Ptah - Engineering">
        <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* 1. Lapis Lazuli & Sandstone Background */}
            <radialGradient id="pt-bgGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0284C7" /> {/* Deep Lapis Blue */}
              <stop offset="40%" stopColor="#0F172A" /> {/* Midnight */}
              <stop offset="75%" stopColor="#78350F" /> {/* Desert Sandstone Edge */}
              <stop offset="100%" stopColor="#000000" />
            </radialGradient>

            {/* Glowing Golden Core of Creation */}
            <radialGradient id="pt-creationCore" cx="50%" cy="50%" r="40%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="25%" stopColor="#FEF08A" stopOpacity="0.7" />
              <stop offset="60%" stopColor="#B45309" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#020617" stopOpacity="0" />
            </radialGradient>

            {/* 2. Structured Masonry Materials */}
            {/* Pure Gold */}
            <linearGradient id="pt-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="40%" stopColor="#EAB308" />
              <stop offset="70%" stopColor="#B45309" />
              <stop offset="100%" stopColor="#713F12" />
            </linearGradient>

            {/* Granite / Desert Stone */}
            <linearGradient id="pt-granite" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D4D4D8" />
              <stop offset="50%" stopColor="#71717A" />
              <stop offset="100%" stopColor="#3F3F46" />
            </linearGradient>

            <filter id="pt-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="pt-glowStrong" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComponentTransfer in="blur" result="glow1">
                <feFuncA type="linear" slope="3" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode in="glow1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <clipPath id="pt-clip">
              <circle cx="250" cy="250" r="230" />
            </clipPath>

            {/* Reusable Perfect Square (The Foundation Block) */}
            <rect id="pt-foundation" x="150" y="150" width="200" height="200" fill="none" stroke="url(#pt-gold)" strokeWidth="4" />
          </defs>

          {/* ========================================== */}
          {/* BASE SHIELD & MASON CORE                   */}
          {/* ========================================== */}
          <circle cx="250" cy="250" r="235" fill="url(#pt-bgGrad)" />
          
          {/* Rigid structural masonry grid mapping the background */}
          <pattern id="pt-masonGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FDE047" strokeWidth="0.5" opacity="0.3" />
          </pattern>
          <circle cx="250" cy="250" r="235" fill="url(#pt-masonGrid)" style={{mixBlendMode: 'overlay'}} />
          
          {/* The Core of Creation */}
          <circle cx="250" cy="250" r="140" fill="url(#pt-creationCore)" filter="url(#pt-glowStrong)" className="anim-pulse" style={{ animationDuration: '6s' }} />

          {/* ========================================== */}
          {/* INTERNAL ELEMENTS: STRUCTURE & ARCHITECTURE*/}
          {/* ========================================== */}
          <g clipPath="url(#pt-clip)">
            
            {/* Expanding Perfect Squares (Vitruvian / Masonry concepts) */}
            <g className="anim-spin" style={{ animationDuration: '60s' }}>
              <use href="#pt-foundation" filter="url(#pt-glow)" opacity="0.8" />
              <use href="#pt-foundation" transform="rotate(30 250 250)" filter="url(#pt-glow)" opacity="0.8" />
              <use href="#pt-foundation" transform="rotate(60 250 250)" filter="url(#pt-glow)" opacity="0.8" />
            </g>

            {/* Slowly rotating golden scaffold rings */}
            <g className="anim-spin-rev" style={{ animationDuration: '40s' }}>
              <circle cx="250" cy="250" r="170" fill="none" stroke="url(#pt-gold)" strokeWidth="2" strokeDasharray="10 5" opacity="0.6" filter="url(#pt-glow)" />
              <circle cx="250" cy="250" r="150" fill="none" stroke="#FEF08A" strokeWidth="1" strokeDasharray="50 50" opacity="0.8" />
              
              {/* Load-bearing geometric cross-beams */}
              {[45, 135].map(deg => (
                <rect key={`beam-${deg}`} x="248" y="80" width="4" height="340" fill="url(#pt-gold)" opacity="0.5" transform={`rotate(${deg} 250 250)`} />
              ))}
            </g>

            {/* Floating Sparks of Creation (Sparks from the anvil/chisel) */}
            <g fill="#FDE047" filter="url(#pt-glowStrong)">
              <rect x="200" y="380" width="4" height="4" style={{animation: 'floatUp 2.5s ease-in infinite'}} transform="rotate(15 200 380)" />
              <rect x="280" y="340" width="3" height="3" style={{animation: 'floatUp 3s ease-in infinite 0.5s'}} transform="rotate(45 280 340)" />
              <rect x="150" y="300" width="5" height="5" style={{animation: 'floatUp 4s ease-in infinite 1s'}} fill="#FFFFFF" />
              <rect x="350" y="270" width="3" height="3" style={{animation: 'floatUp 2s ease-in infinite 0.2s'}} />
              <rect x="250" y="400" width="4" height="4" style={{animation: 'floatUp 1.8s ease-in infinite 0.8s'}} className="anim-flicker" />
            </g>

          </g>

          {/* ========================================== */}
          {/* THE MASON's BLOCK BORDERS                    */}
          {/* ========================================== */}

          {/* Outer Mystical Shadow */}
          <circle cx="250" cy="250" r="242" fill="none" stroke="#000000" strokeWidth="6" opacity="0.8" />

          {/* Heavy Granite Masonry Rim */}
          <circle cx="250" cy="250" r="230" fill="none" stroke="url(#pt-granite)" strokeWidth="20" filter="drop-shadow(0 0 10px rgba(2, 132, 199, 0.4))" />
          
          {/* Internal pure gold inlay */}
          <circle cx="250" cy="250" r="220" fill="none" stroke="url(#pt-gold)" strokeWidth="4" opacity="0.9" />

          {/* 12 Interlocking Granite Blocks 
              Simulating cyclopean masonry walls (perfectly flush stones).
          */}
          <g filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))">
            {Array.from({ length: 12 }).map((_, i) => {
              const deg = i * 30;
              return (
                <g transform={`rotate(${deg} 250 250)`} key={`stone-${i}`}>
                   {/* Heavy cut stone boundary lines (mortar/seams) */}
                   <line x1="250" y1="5" x2="250" y2="25" stroke="#18181B" strokeWidth="3" />
                   {/* Golden mortise and tenon joint locks */}
                   <circle cx="250" cy="15" r="2.5" fill="url(#pt-gold)" filter="url(#pt-glow)" />
                </g>
              );
            })}
          </g>
          
          {/* Slowly rotating golden measuring wheel around the edge */}
          <circle cx="250" cy="250" r="238" fill="none" stroke="#FDE047" strokeWidth="1.5" strokeDasharray="4 8" opacity="0.6" className="anim-spin" style={{ animationDuration: '90s' }} />

        
                    {/* Integrated Sigil Image Drop-in (Brought to Absolute Front) */}
                    <g filter="drop-shadow(0 0 20px rgba(217, 119, 6, 0.8))">
                        <image href={ptahSigil} x="100" y="100" width="300" height="300" opacity="1" />
                    </g>
                </svg>
      </div>

      <div className="emblem-info">
        <span className="emblem-name">Ptah</span>
        <span className="emblem-role">Engineering</span>
      </div>
    </div>
  );
}
