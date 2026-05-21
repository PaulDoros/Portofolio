const talosSigil = '/pantheon/sigils/talos.png';
export default function TalosEmblem() {
  return (
    <div className="emblem-card card-talos">
      <div className="avatar-container talos" title="Talos - Quality & Certification">
        <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* 1. Rusted / Patina Bronze Background */}
            <radialGradient id="ta-bgGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#78350F" /> {/* Dark Bronze */}
              <stop offset="40%" stopColor="#451A03" /> {/* Rusted Shadow */}
              <stop offset="70%" stopColor="#27272A" /> {/* Heavy Iron */}
              <stop offset="100%" stopColor="#09090B" />
            </radialGradient>

            {/* Glowing Furnace Core (Internal Steam Engine) */}
            <radialGradient id="ta-furnaceCore" cx="50%" cy="50%" r="40%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="15%" stopColor="#FDE047" stopOpacity="0.6" />
              <stop offset="40%" stopColor="#EA580C" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#27272A" stopOpacity="0" />
            </radialGradient>

            {/* 2. Heavy Forged Metals */}
            {/* Main Automaton Bronze */}
            <linearGradient id="ta-bronze" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FCD34D" />
              <stop offset="30%" stopColor="#B45309" />
              <stop offset="70%" stopColor="#78350F" />
              <stop offset="100%" stopColor="#451A03" />
            </linearGradient>

            <linearGradient id="ta-iron" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#71717A" />
              <stop offset="50%" stopColor="#3F3F46" />
              <stop offset="100%" stopColor="#18181B" />
            </linearGradient>

            {/* 3. Combustion / Steam Filters */}
            <filter id="ta-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="ta-glowStrong" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="10" result="blur" />
              <feComponentTransfer in="blur" result="glow1">
                <feFuncA type="linear" slope="3" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode in="glow1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Steam / Smoke Exhaust Distortion */}
            <filter id="ta-steam" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="15" xChannelSelector="R" yChannelSelector="G" />
            </filter>

            <clipPath id="ta-clip">
              <circle cx="250" cy="250" r="230" />
            </clipPath>

            {/* Reusable Tectonic Armor Plate */}
            <path id="ta-armorPlate" d="M 230 40 L 270 40 L 280 80 L 250 100 L 220 80 Z" fill="url(#ta-bronze)" stroke="#18181B" strokeWidth="2" />
          </defs>

          {/* ========================================== */}
          {/* BASE SHIELD & FURNACE CORE                 */}
          {/* ========================================== */}
          <circle cx="250" cy="250" r="235" fill="url(#ta-bgGrad)" />
          
          {/* Heavy Steam Exhaust blowing across the base */}
          <circle cx="250" cy="250" r="235" fill="#E2E8F0" opacity="0.1" filter="url(#ta-steam)" style={{mixBlendMode: 'screen'}} />
          
          {/* The Boiler Core */}
          <circle cx="250" cy="250" r="140" fill="url(#ta-furnaceCore)" filter="url(#ta-glowStrong)" className="anim-pulse" style={{ animationDuration: '5s' }} />

          {/* ========================================== */}
          {/* INTERNAL ELEMENTS: GEARS & PISTONS         */}
          {/* ========================================== */}
          <g clipPath="url(#ta-clip)">
            
            {/* Massive Slow-Turning Iron Cog */}
            <g className="anim-spin" style={{ animationDuration: '60s' }}>
              <circle cx="250" cy="250" r="160" fill="none" stroke="url(#ta-iron)" strokeWidth="40" opacity="0.6" strokeDasharray="40 10" />
              <circle cx="250" cy="250" r="140" fill="none" stroke="#000000" strokeWidth="4" opacity="0.8" />
            </g>

            {/* Counter-Rotating Bronze Mechanism */}
            <g className="anim-spin-rev" style={{ animationDuration: '40s' }}>
              <circle cx="250" cy="250" r="110" fill="none" stroke="url(#ta-bronze)" strokeWidth="16" strokeDasharray="15 5" opacity="0.9" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.8))" />
              
              {/* Internal Spoke Supports */}
              {[0, 120, 240].map(deg => (
                <rect key={`spoke-${deg}`} x="240" y="110" width="20" height="140" fill="url(#ta-bronze)" stroke="#18181B" strokeWidth="2" transform={`rotate(${deg} 250 250)`} />
              ))}
            </g>

            {/* Molten Fluid / Power veins pumping through the machine */}
            <circle cx="250" cy="250" r="85" fill="none" stroke="#F97316" strokeWidth="4" filter="url(#ta-glowStrong)" strokeDasharray="30 40 100 50" className="anim-spin" style={{ animationDuration: '10s' }} />

            {/* Steam Vents / Boiling Bubbles rising up */}
            <g fill="#EA580C" filter="url(#ta-glow)">
              <circle cx="200" cy="380" r="6" style={{animation: 'floatUp 4s ease-in infinite'}} opacity="0.6" fill="#FDE047" />
              <circle cx="300" cy="340" r="4" style={{animation: 'floatUp 5s ease-in infinite 1.5s'}} opacity="0.5" />
              <circle cx="250" cy="300" r="8" style={{animation: 'floatUp 3s ease-in infinite 0.5s'}} opacity="0.4" fill="#FFFFFF" filter="url(#ta-glowStrong)" />
            </g>

          </g>

          {/* ========================================== */}
          {/* THE AUTOMATON BORDERS                        */}
          {/* ========================================== */}

          {/* Oil/Grease Base Rim Shadow */}
          <circle cx="250" cy="250" r="242" fill="none" stroke="#18181B" strokeWidth="6" opacity="0.9" />

          {/* Heavy Forged Armor Rim */}
          <circle cx="250" cy="250" r="230" fill="none" stroke="url(#ta-bronze)" strokeWidth="16" filter="drop-shadow(0 0 15px rgba(180, 83, 9, 0.4))" />
          
          {/* Iron Reinforcement Track */}
          <circle cx="250" cy="250" r="222" fill="none" stroke="url(#ta-iron)" strokeWidth="4" opacity="0.9" />

          {/* 12 Interlocking Armor Plates Bolted to the Edge */}
          <g filter="drop-shadow(0 6px 8px rgba(0,0,0,0.7))">
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
              <g transform={`rotate(${deg} 250 250)`} key={`armor-${deg}`}>
                <use href="#ta-armorPlate" />
                {/* Massive Iron Rivet */}
                <circle cx="250" cy="60" r="4" fill="url(#ta-iron)" stroke="#09090B" strokeWidth="1" />
                {/* Heat exhaust port glowing beneath the armor */}
                <circle cx="250" cy="85" r="2" fill="#FDE047" filter="url(#ta-glowStrong)" opacity="0.8" className="anim-flicker" />
              </g>
            ))}
          </g>

        
                    {/* Integrated Sigil Image Drop-in (Brought to Absolute Front) */}
                    <g filter="drop-shadow(0 0 20px rgba(180, 83, 9, 0.8))">
                        <image href={talosSigil} x="100" y="100" width="300" height="300" opacity="1" />
                    </g>
                </svg>
      </div>

      <div className="emblem-info">
        <span className="emblem-name">Talos</span>
        <span className="emblem-role">Quality & Certification</span>
      </div>
    </div>
  );
}
