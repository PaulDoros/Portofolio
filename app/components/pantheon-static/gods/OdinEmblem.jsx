const odinSigil = '/pantheon/sigils/odin.png';
export default function OdinEmblem() {
  // The 24 characters of the Elder Futhark
  const runes = ["ᚠ","ᚢ","ᚦ","ᚨ","ᚱ","ᚲ","ᚷ","ᚹ","ᚺ","ᚾ","ᛁ","ᛃ","ᛇ","ᛈ","ᛉ","ᛊ","ᛏ","ᛒ","ᛖ","ᛗ","ᛚ","ᛜ","ᛟ","ᛞ"];

  return (
    <div className="emblem-card card-odin">
      <div className="avatar-container odin" title="Odin - Code Review">
        <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* 1. Deep Asgardian Cosmos & Raven Feathers */}
            <radialGradient id="od-bgGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#4C1D95" /> {/* Wisdom Purple */}
              <stop offset="40%" stopColor="#312E81" /> {/* Deep Indigo */}
              <stop offset="70%" stopColor="#111827" /> {/* Raven Black */}
              <stop offset="100%" stopColor="#030712" />
            </radialGradient>

            {/* The All-Seeing Eye Core (Piercing Gold & White) */}
            <radialGradient id="od-eyeCore" cx="50%" cy="50%" r="40%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="15%" stopColor="#FDE047" stopOpacity="0.8" />
              <stop offset="40%" stopColor="#8B5CF6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#030712" stopOpacity="0" />
            </radialGradient>

            {/* 2. Asgardian Metals */}
            <linearGradient id="od-royalGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="30%" stopColor="#F59E0B" />
              <stop offset="70%" stopColor="#B45309" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>

            <linearGradient id="od-obsidian" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4B5563" />
              <stop offset="50%" stopColor="#1F2937" />
              <stop offset="100%" stopColor="#030712" />
            </linearGradient>

            {/* 3. Mystical Filters */}
            <filter id="od-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="od-glowStrong" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="10" result="blur" />
              <feComponentTransfer in="blur" result="glow1">
                <feFuncA type="linear" slope="3" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode in="glow1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <clipPath id="od-clip">
              <circle cx="250" cy="250" r="230" />
            </clipPath>

            {/* Reusable Data/Network Node for "Code Review" Map */}
            <g id="od-node">
              <circle cx="0" cy="0" r="3" fill="#FDE047" filter="url(#od-glowStrong)" />
              <circle cx="0" cy="0" r="8" fill="none" stroke="#C4B5FD" strokeWidth="1" opacity="0.6" />
            </g>
          </defs>

          {/* ========================================== */}
          {/* BASE SHIELD & THE ALLFATHER'S EYE          */}
          {/* ========================================== */}
          <circle cx="250" cy="250" r="235" fill="url(#od-bgGrad)" />
          
          {/* Geometric Code Matrix replacing the stars */}
          <g opacity="0.15" stroke="#C4B5FD" strokeWidth="1">
            <line x1="250" y1="20" x2="250" y2="480" />
            <line x1="20" y1="250" x2="480" y2="250" />
            <circle cx="250" cy="250" r="150" fill="none" />
            <circle cx="250" cy="250" r="100" fill="none" />
          </g>

          {/* The Singularity / Piercing Eye of Odin */}
          <circle cx="250" cy="250" r="140" fill="url(#od-eyeCore)" filter="url(#od-glowStrong)" className="anim-pulse" style={{ animationDuration: '4s' }} />

          {/* ========================================== */}
          {/* INTERNAL ELEMENTS: ASTROLABE & RUNES       */}
          {/* ========================================== */}
          <g clipPath="url(#od-clip)">
            
            {/* Massive interconnected Yggdrasil / Code Commit Graph */}
            <g className="anim-spin" style={{ animationDuration: '100s', transformOrigin: '250px 250px' }}>
              {/* Complex branching network lines */}
              <path d="M 250 150 L 300 100 L 350 120 L 250 250 L 150 100 L 200 80 Z" fill="none" stroke="url(#od-royalGold)" strokeWidth="2" opacity="0.5" filter="url(#od-glow)" />
              <path d="M 250 350 L 320 400 L 250 250 L 180 400 Z" fill="none" stroke="#A78BFA" strokeWidth="1.5" opacity="0.5" />
              
              {/* Glowing Review Nodes */}
              <use href="#od-node" x="250" y="150" />
              <use href="#od-node" x="300" y="100" />
              <use href="#od-node" x="350" y="120" />
              <use href="#od-node" x="150" y="100" />
              <use href="#od-node" x="200" y="80" />
              <use href="#od-node" x="250" y="350" />
              <use href="#od-node" x="320" y="400" />
              <use href="#od-node" x="180" y="400" />
            </g>

            {/* Optical scanning astrolabe rings tracking changes */}
            <g className="anim-spin-rev" style={{ animationDuration: '40s' }}>
              <circle cx="250" cy="250" r="120" fill="none" stroke="#FDE047" strokeWidth="3" opacity="0.8" strokeDasharray="30 50 2 10 100 40" filter="url(#od-glow)" />
              <circle cx="250" cy="250" r="130" fill="none" stroke="#8B5CF6" strokeWidth="1.5" opacity="0.6" strokeDasharray="10 10" />
              <polygon points="250,110 260,118 250,126 240,118" fill="#FDE047" filter="url(#od-glowStrong)" />
            </g>

            {/* Floating Elder Futhark Runes spinning rapidly */}
            <g className="anim-spin" style={{ animationDuration: '25s', transformOrigin: '250px 250px' }}>
              {runes.map((rune, i) => {
                const angle = (i * 360) / runes.length;
                return (
                  <g transform={`rotate(${angle} 250 250)`} key={`rune-${i}`}>
                    <text x="250" y="65" fill="#EAB308" fontSize="22" fontWeight="bold" textAnchor="middle" filter="url(#od-glowStrong)" opacity="0.95">
                      {rune}
                    </text>
                  </g>
                );
              })}
            </g>

            {/* Ascending Magical Ash & Golden Data Packets */}
            <g fill="#FDE047" filter="url(#od-glowStrong)">
              <rect x="200" y="380" width="3" height="15" style={{animation: 'floatUp 3s ease-in infinite'}} rx="1.5" />
              <circle cx="280" cy="340" r="2.5" style={{animation: 'floatUp 2.5s ease-in infinite 0.5s'}} fill="#C4B5FD" />
              <rect x="150" y="300" width="2" height="10" style={{animation: 'floatUp 4s ease-in infinite 1s'}} rx="1" fill="#FFFFFF" />
              <circle cx="350" cy="270" r="3.5" style={{animation: 'floatUp 3.2s ease-in infinite 0.2s'}} fill="#8B5CF6" />
              <rect x="250" y="400" width="4" height="20" style={{animation: 'floatUp 2s ease-in infinite 0.8s'}} className="anim-flicker" rx="2" fill="#FDE047" />
            </g>

          </g>

          {/* ========================================== */}
          {/* THE ASGARDIAN OBSERVATORY BORDER             */}
          {/* ========================================== */}

          {/* Heavy Void backing */}
          <circle cx="250" cy="250" r="242" fill="none" stroke="#030712" strokeWidth="8" opacity="0.9" />

          {/* Massive Solid Gold Frame */}
          <circle cx="250" cy="250" r="230" fill="none" stroke="url(#od-royalGold)" strokeWidth="16" filter="drop-shadow(0 0 15px rgba(234, 179, 8, 0.4))" />
          
          {/* Interlocking engraved runic edge lines */}
          <circle cx="250" cy="250" r="222" fill="none" stroke="#4C1D95" strokeWidth="2" opacity="0.8" />
          <circle cx="250" cy="250" r="238" fill="none" stroke="#FEF08A" strokeWidth="1" opacity="0.6" strokeDasharray="10 20" className="anim-spin" style={{ animationDuration: '60s' }} />

          {/* Geometric Diamond Review Anchors bridging the rim */}
          <g filter="drop-shadow(0 4px 6px rgba(0,0,0,0.6))">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <g transform={`rotate(${deg} 250 250)`} key={`anchor-${deg}`}>
                 <polygon points="250,5 260,20 250,35 240,20" fill="url(#od-obsidian)" stroke="url(#od-royalGold)" strokeWidth="1" />
                 {/* Internal scanning eye inside the diamond */}
                 <circle cx="250" cy="20" r="3" fill="#A78BFA" filter="url(#od-glowStrong)" className="anim-pulse" style={{ animationDelay: `${deg / 45}s` }} />
              </g>
            ))}
          </g>

        
                    {/* Integrated Sigil Image Drop-in (Brought to Absolute Front) */}
                    <g filter="drop-shadow(0 0 20px rgba(139, 92, 246, 0.8))">
                        <image href={odinSigil} x="100" y="100" width="300" height="300" opacity="1" />
                    </g>
                </svg>
      </div>

      <div className="emblem-info">
        <span className="emblem-name">Odin</span>
        <span className="emblem-role">Code Review</span>
      </div>
    </div>
  );
}
