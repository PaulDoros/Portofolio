const fortunaSigil = '/pantheon/sigils/fortuna.png';
export default function FortunaEmblem() {
  return (
    <div className="emblem-card card-fortuna">
      <div className="avatar-container fortuna" title="Fortuna - Risk & Probability">
        <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* 1. Neon Casino & Velvet Background */}
            <radialGradient id="fo-bgGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#047857" /> {/* Neon Emerald */}
              <stop offset="40%" stopColor="#064E3B" /> {/* Deep Casino Felt */}
              <stop offset="75%" stopColor="#022C22" /> {/* Velvet Shadow */}
              <stop offset="100%" stopColor="#020617" />
            </radialGradient>

            {/* The Core of Probability (A blinding golden explosion) */}
            <radialGradient id="fo-riskCore" cx="50%" cy="50%" r="40%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="25%" stopColor="#FDE047" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#020617" stopOpacity="0" />
            </radialGradient>

            {/* 2. Premium Mechanism Materials */}
            {/* 24k Solid Gold */}
            <linearGradient id="fo-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="30%" stopColor="#EAB308" />
              <stop offset="70%" stopColor="#A16207" />
              <stop offset="100%" stopColor="#713F12" />
            </linearGradient>

            <linearGradient id="fo-goldDark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="50%" stopColor="#B45309" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>

            {/* Glowing Neon Light */}
            <filter id="fo-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="fo-glowStrong" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="10" result="blur" />
              <feComponentTransfer in="blur" result="glow1">
                <feFuncA type="linear" slope="3" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode in="glow1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <clipPath id="fo-clip">
              <circle cx="250" cy="250" r="230" />
            </clipPath>

            {/* Reusable Isometric 3D Golden Die (Hexagon mapped into a cube) */}
            <g id="fo-cube">
              {/* Top Face */}
              <polygon points="0,0 20,-12 0,-24 -20,-12" fill="url(#fo-gold)" />
              {/* Right Face */}
              <polygon points="0,0 20,-12 20,12 0,24" fill="url(#fo-goldDark)" />
              {/* Left Face */}
              <polygon points="0,0 0,24 -20,12 -20,-12" fill="#CA8A04" />
              
              {/* Glowing Probability Pips */}
              {/* Top: 1 */}
              <circle cx="0" cy="-12" r="2" fill="#FFFFFF" filter="url(#fo-glowStrong)" />
              {/* Right: 2 */}
              <circle cx="10" cy="4" r="1.5" fill="#FFFFFF" filter="url(#fo-glow)" />
              <circle cx="10" cy="-4" r="1.5" fill="#FFFFFF" filter="url(#fo-glow)" />
              {/* Left: 3 */}
              <circle cx="-10" cy="-4" r="1.5" fill="#A7F3D0" filter="url(#fo-glow)" />
              <circle cx="-10" cy="4" r="1.5" fill="#A7F3D0" filter="url(#fo-glow)" />
              <circle cx="-15" cy="0" r="1.5" fill="#A7F3D0" filter="url(#fo-glow)" />
            </g>
          </defs>

          {/* ========================================== */}
          {/* BASE SHIELD & LUCK ENGINE                  */}
          {/* ========================================== */}
          <circle cx="250" cy="250" r="235" fill="url(#fo-bgGrad)" />
          
          {/* Probability Sine Wave Grid mapping risk calculations natively into the felt */}
          <pattern id="fo-sine" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 0 20 Q 10 0, 20 20 T 40 20" fill="none" stroke="#10B981" strokeWidth="1" opacity="0.4" />
          </pattern>
          <circle cx="250" cy="250" r="235" fill="url(#fo-sine)" style={{ mixBlendMode: 'screen', animationDuration: '4s' }} opacity="0.6" className="anim-pulse" />

          {/* The Mathematical Singularity Core */}
          <circle cx="250" cy="250" r="120" fill="url(#fo-riskCore)" filter="url(#fo-glowStrong)" className="anim-pulse" style={{ animationDuration: '3s' }} />

          {/* ========================================== */}
          {/* INTERNAL ELEMENTS: ROULETTE & DICE         */}
          {/* ========================================== */}
          <g clipPath="url(#fo-clip)">
            
            {/* The Massive Roulette Engine Rim */}
            <g className="anim-spin" style={{ animationDuration: '24s' }}>
              <circle cx="250" cy="250" r="150" fill="none" stroke="#000000" strokeWidth="30" opacity="0.6" />
              {/* Alternating Slices (Circumference 942 / 12 = 78.5) */}
              <circle cx="250" cy="250" r="150" fill="none" stroke="#DC2626" strokeWidth="30" strokeDasharray="39.27 39.27" opacity="0.9" />
              {/* Golden Separator Rails */}
              <circle cx="250" cy="250" r="150" fill="none" stroke="url(#fo-gold)" strokeWidth="36" strokeDasharray="4 74.54" filter="url(#fo-glow)" />
            </g>

            {/* Inner Probability Compass / Risk Chart */}
            <g className="anim-spin-rev" style={{ animationDuration: '16s' }}>
              <circle cx="250" cy="250" r="90" fill="none" stroke="#FDE047" strokeWidth="2" strokeDasharray="4 12" filter="url(#fo-glow)" />
              {/* Inner tracking lines simulating data spikes */}
              <path d="M 250 160 L 260 250 L 340 250 L 250 240 L 250 160 Z" fill="url(#fo-gold)" opacity="0.3" filter="url(#fo-glow)" />
              <path d="M 250 340 L 240 250 L 160 250 L 250 260 L 250 340 Z" fill="#34D399" opacity="0.3" filter="url(#fo-glow)" />
            </g>

            {/* Isometric 3D Die Orbiting as massive risk engines */}
            <g className="anim-spin" style={{ animationDuration: '10s' }}>
              <use href="#fo-cube" x="250" y="60" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.8))" />
              <use href="#fo-cube" x="250" y="440" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.8))" />
            </g>

            {/* Flying Golden Chips / Probability Datapoints */}
            <g fill="#FDE047" filter="url(#fo-glowStrong)">
              <ellipse cx="200" cy="380" rx="8" ry="4" style={{animation: 'floatUp 3s ease-in infinite'}} fill="url(#fo-gold)" transform="rotate(20 200 380)" />
              <circle cx="280" cy="300" r="3" style={{animation: 'floatUp 2s ease-in infinite 0.5s'}} fill="#FFFFFF" />
              <ellipse cx="150" cy="280" rx="7" ry="3" style={{animation: 'floatUp 4s ease-in infinite 1.2s'}} fill="url(#fo-gold)" transform="rotate(-30 150 280)" />
              <circle cx="350" cy="240" r="4" style={{animation: 'floatUp 2.8s ease-in infinite 0.2s'}} fill="#34D399" />
              <circle cx="250" cy="400" r="2" style={{animation: 'floatUp 1.8s ease-in infinite 0.8s'}} className="anim-flicker" />
            </g>

          </g>

          {/* ========================================== */}
          {/* THE VAULT OF CHANCE BORDERS                  */}
          {/* ========================================== */}

          {/* Felt base shadow */}
          <circle cx="250" cy="250" r="242" fill="none" stroke="#022C22" strokeWidth="6" opacity="0.9" />

          {/* Massive 24k Gold Vault Ring containing the Roulette */}
          <circle cx="250" cy="250" r="230" fill="none" stroke="url(#fo-gold)" strokeWidth="18" filter="drop-shadow(0 0 15px rgba(250, 204, 21, 0.5))" />
          
          {/* Neon Emerald betting track inside the gold */}
          <circle cx="250" cy="250" r="221" fill="none" stroke="#10B981" strokeWidth="3" opacity="0.9" filter="url(#fo-glowStrong)" strokeDasharray="20 40 100 200" className="anim-spin" style={{ animationDuration: '6s' }} />

          {/* Golden Casino Chips embedded into the border rim as markers */}
          <g filter="drop-shadow(0 3px 5px rgba(0,0,0,0.6))">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <g transform={`rotate(${deg} 250 250)`} key={`chip-${deg}`}>
                 <circle cx="250" cy="20" r="10" fill="url(#fo-gold)" stroke="#6P3F12" strokeWidth="1" />
                 <circle cx="250" cy="20" r="6" fill="none" stroke="#FFF" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.5" />
                 {/* Internal glowing gem representing absolute luck */}
                 <circle cx="250" cy="20" r="2" fill="#FFFFFF" filter="url(#fo-glowStrong)" className="anim-pulse" style={{ animationDelay: `${deg / 45}s` }} />
              </g>
            ))}
          </g>

        
                    {/* Integrated Sigil Image Drop-in (Brought to Absolute Front) */}
                    <g filter="drop-shadow(0 0 20px rgba(16, 185, 129, 0.8))">
                        <image href={fortunaSigil} x="100" y="100" width="300" height="300" opacity="1" />
                    </g>
                </svg>
      </div>

      <div className="emblem-info">
        <span className="emblem-name">Fortuna</span>
        <span className="emblem-role">Risk & Probability</span>
      </div>
    </div>
  );
}
