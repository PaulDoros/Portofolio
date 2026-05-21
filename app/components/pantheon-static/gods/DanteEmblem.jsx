const danteSigil = '/pantheon/sigils/dante.png';
export default function DanteEmblem() {
  return (
    <div className="emblem-card card-dante">
      <div className="avatar-container dante" title="Dante - Navigation & Flow">
        <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* 1. Deep Infernal Abyss Background */}
            <radialGradient id="d-bgGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#450A0A" /> {/* Deep Charred Crimson */}
              <stop offset="50%" stopColor="#2A0404" /> {/* Pitch Crimson */}
              <stop offset="85%" stopColor="#0B0000" /> {/* Bottomless Pit */}
              <stop offset="100%" stopColor="#000000" />
            </radialGradient>

            {/* Hellfire Magma Core */}
            <radialGradient id="d-infernoCore" cx="50%" cy="50%" r="40%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="15%" stopColor="#FDE047" stopOpacity="0.6" />
              <stop offset="40%" stopColor="#EF4444" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0B0000" stopOpacity="0" />
            </radialGradient>

            {/* 2. Charred and Smoldering Materials */}
            {/* Rusted / Charred Hell-Iron */}
            <linearGradient id="d-charredIron" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3F3F46" />
              <stop offset="30%" stopColor="#18181B" />
              <stop offset="70%" stopColor="#09090B" />
              <stop offset="100%" stopColor="#000000" />
            </linearGradient>

            {/* Molten Cracks in the Iron */}
            <linearGradient id="d-moltenEdge" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F97316" />
              <stop offset="50%" stopColor="#DC2626" />
              <stop offset="100%" stopColor="#7F1D1D" />
            </linearGradient>

            {/* 3. Fiery Filters */}
            <filter id="d-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="d-glowStrong" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="10" result="blur" />
              <feComponentTransfer in="blur" result="glow1">
                <feFuncA type="linear" slope="3" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode in="glow1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Purgatory / Brimstone Ash Filter */}
            <filter id="d-abyssDistortion" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" xChannelSelector="R" yChannelSelector="G" />
            </filter>

            <clipPath id="d-clip">
              <circle cx="250" cy="250" r="230" />
            </clipPath>

            {/* Heavy Hook/Chain Link template */}
            <path id="d-chainLink" d="M 245 40 L 255 40 A 10 10 0 0 1 265 50 L 265 90 A 10 10 0 0 1 255 100 L 245 100 A 10 10 0 0 1 235 90 L 235 50 A 10 10 0 0 1 245 40 Z" fill="none" stroke="url(#d-charredIron)" strokeWidth="6" />
          </defs>

          {/* ========================================== */}
          {/* BASE SHIELD & INFERNO CORE                 */}
          {/* ========================================== */}
          <circle cx="250" cy="250" r="235" fill="url(#d-bgGrad)" />
          
          {/* Boiling Abyss Disturbance */}
          <circle cx="250" cy="250" r="235" fill="#EF4444" opacity="0.15" filter="url(#d-abyssDistortion)" style={{mixBlendMode: 'color-dodge'}} />
          
          {/* Bottomless Pit Core Effect 
              Instead of protruding out, this creates an illusion of a deep glowing sinkhole.
          */}
          <circle cx="250" cy="250" r="80" fill="#000000" filter="drop-shadow(0 0 20px rgba(220, 38, 38, 1))" />
          <circle cx="250" cy="250" r="60" fill="url(#d-infernoCore)" filter="url(#d-glowStrong)" className="anim-pulse" style={{ animationDuration: '2s' }} />

          {/* ========================================== */}
          {/* INTERNAL ELEMENTS: 9 CIRCLES OF THE ABYSS  */}
          {/* ========================================== */}
          <g clipPath="url(#d-clip)">
            
            {/* The 9 Circles descending into madness */}
            <g opacity="0.6">
              {[220, 200, 180, 160, 140, 120, 100, 80].map((radius, i) => (
                <circle 
                  key={`circle-${i}`} 
                  cx="250" cy="250" r={radius} 
                  fill="none" 
                  stroke={i % 2 === 0 ? "url(#d-charredIron)" : "#7F1D1D"} 
                  strokeWidth={2 + (i * 0.5)} 
                  opacity={1 - (i * 0.08)} 
                  className={i % 2 === 0 ? "anim-spin" : "anim-spin-rev"} 
                  style={{ animationDuration: `${20 + (i * 5)}s` }}
                  strokeDasharray={i % 3 === 0 ? "10 5" : "none"}
                />
              ))}
            </g>

            {/* Glowing Molten Brand/Seal binding the abyss */}
            <g filter="url(#d-glow)">
              <polygon points="250,90 310,130 250,170 190,130" fill="none" stroke="url(#d-moltenEdge)" strokeWidth="2" opacity="0.5" className="anim-spin" style={{ animationDuration: '40s' }} />
              <polygon points="250,330 310,370 250,410 190,370" fill="none" stroke="url(#d-moltenEdge)" strokeWidth="2" opacity="0.5" className="anim-spin-rev" style={{ animationDuration: '40s' }} />
              <polygon points="90,250 130,190 170,250 130,310" fill="none" stroke="url(#d-moltenEdge)" strokeWidth="2" opacity="0.5" className="anim-spin" style={{ animationDuration: '40s' }} />
              <polygon points="330,250 370,190 410,250 370,310" fill="none" stroke="url(#d-moltenEdge)" strokeWidth="2" opacity="0.5" className="anim-spin-rev" style={{ animationDuration: '40s' }} />
            </g>

            {/* Heavy Hanging Chains dropping down into the pit */}
            <g opacity="0.8" filter="drop-shadow(0 5px 5px rgba(0,0,0,1))">
              <use href="#d-chainLink" />
              <use href="#d-chainLink" transform="rotate(45 250 250)" />
              <use href="#d-chainLink" transform="rotate(90 250 250)" />
              <use href="#d-chainLink" transform="rotate(135 250 250)" />
              <use href="#d-chainLink" transform="rotate(180 250 250)" />
              <use href="#d-chainLink" transform="rotate(225 250 250)" />
              <use href="#d-chainLink" transform="rotate(270 250 250)" />
              <use href="#d-chainLink" transform="rotate(315 250 250)" />
            </g>

            {/* Brimstone Ash (falling/floating wildly) */}
            <g fill="#FCA5A5" filter="url(#d-glowStrong)">
              <circle cx="200" cy="180" r="2.5" style={{animation: 'floatUp 2s ease-in infinite'}} />
              <circle cx="280" cy="150" r="1.5" style={{animation: 'floatUp 3s ease-in infinite 0.5s'}} fill="#FDE047" />
              <circle cx="150" cy="200" r="3" style={{animation: 'floatUp 1.5s ease-in infinite 1s'}} fill="#EF4444" />
              <circle cx="350" cy="400" r="2" style={{animation: 'floatUp 2.5s ease-in infinite 0.2s'}} />
              <circle cx="250" cy="300" r="4" style={{animation: 'floatUp 3.5s ease-in infinite 0.8s'}} fill="#F97316" className="anim-flicker" />
              <circle cx="100" cy="350" r="1" style={{animation: 'floatUp 2.8s ease-in infinite 1.2s'}} />
              <circle cx="400" cy="100" r="2.5" style={{animation: 'floatUp 1.8s ease-in infinite 0.4s'}} fill="#EF4444" />
            </g>

          </g>

          {/* ========================================== */}
          {/* THE GATES OF HELL BORDER                     */}
          {/* ========================================== */}

          {/* Heavy Base Ring */}
          <circle cx="250" cy="250" r="242" fill="none" stroke="#2A0404" strokeWidth="8" opacity="0.9" />

          {/* Charred Iron Gate Rim */}
          <circle cx="250" cy="250" r="230" fill="none" stroke="url(#d-charredIron)" strokeWidth="18" filter="drop-shadow(0 0 15px rgba(220, 38, 38, 0.4))" />
          
          {/* Sizzling Molten Seam leaking out of the iron casing */}
          <circle cx="250" cy="250" r="226" fill="none" stroke="url(#d-moltenEdge)" strokeWidth="3" opacity="0.8" filter="url(#d-glow)" strokeDasharray="30 10 50 150" className="anim-spin" style={{ animationDuration: '30s' }} />

          {/* Iron Spikes bridging the rim (like an iron maiden) */}
          <g filter="drop-shadow(0 3px 5px rgba(0,0,0,0.8))">
            {[15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map((deg) => (
              <g transform={`rotate(${deg} 250 250)`} key={`spike-${deg}`}>
                {/* Sharp Iron Tooth pointing INWARD */}
                <polygon points="250,20 256,12 250,-5 244,12" fill="url(#d-charredIron)" stroke="#450A0A" strokeWidth="1" />
                {/* Base rivet */}
                <circle cx="250" cy="18" r="2" fill="#000" opacity="0.8" />
              </g>
            ))}
          </g>

        
                    {/* Integrated Sigil Image Drop-in (Brought to Absolute Front) */}
                    <g filter="drop-shadow(0 0 20px rgba(220, 38, 38, 0.8))">
                        <image href={danteSigil} x="100" y="100" width="300" height="300" opacity="1" />
                    </g>
                </svg>
      </div>

      <div className="emblem-info">
        <span className="emblem-name">Dante</span>
        <span className="emblem-role">Navigation & Flow</span>
      </div>
    </div>
  );
}
