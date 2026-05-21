const lokiSigil = '/pantheon/sigils/loki.png';
export default function LokiEmblem() {
  return (
    <div className="emblem-card card-loki">
      <div className="avatar-container loki" title="Loki - Prototyping">
        <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* 1. Toxic / Illusion Background */}
            <radialGradient id="l-bgGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0B2B1B" /> {/* Deep Serpent Green */}
              <stop offset="45%" stopColor="#064E3B" /> {/* Dark Emerald */}
              <stop offset="70%" stopColor="#2E1065" /> {/* Poison Purple Edge */}
              <stop offset="100%" stopColor="#020617" />
            </radialGradient>

            {/* Acid / Venemous Core Glow */}
            <radialGradient id="l-acidCore" cx="50%" cy="50%" r="40%">
              <stop offset="0%" stopColor="#A3E635" stopOpacity="0.8" />
              <stop offset="30%" stopColor="#10B981" stopOpacity="0.4" />
              <stop offset="70%" stopColor="#047857" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#020617" stopOpacity="0" />
            </radialGradient>

            {/* 2. Deceptive / Cursed Materials */}
            {/* Tainted Gold */}
            <linearGradient id="l-cursedGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="40%" stopColor="#EAB308" />
              <stop offset="60%" stopColor="#047857" />
              <stop offset="100%" stopColor="#064E3B" />
            </linearGradient>

            {/* Serpent Scales (Emerald) */}
            <linearGradient id="l-emerald" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="50%" stopColor="#059669" />
              <stop offset="100%" stopColor="#064E3B" />
            </linearGradient>

            {/* 3. Chaos Glows */}
            <filter id="l-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="l-glowStrong" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="12" result="blur" />
              <feComponentTransfer in="blur" result="glow1">
                <feFuncA type="linear" slope="2.5" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode in="glow1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="l-glowBlinding" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComponentTransfer in="blur" result="glow1">
                <feFuncA type="linear" slope="4" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode in="glow1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Illusion / Mirage Distortion Field */}
            <filter id="l-illusion" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G" />
            </filter>

            <clipPath id="l-clip">
              <circle cx="250" cy="250" r="230" />
            </clipPath>

            {/* The Serpent Curve Path */}
            <path id="l-serpentCurve" d="M 250 80 C 400 150, 100 350, 250 420" fill="none" strokeWidth="3" />
            
            {/* The Dagger Shard */}
            <polygon id="l-dagger" points="250,110 260,140 250,145 240,140" fill="url(#l-cursedGold)" />
          </defs>

          {/* ========================================== */}
          {/* BASE SHIELD & CORE                         */}
          {/* ========================================== */}
          <circle cx="250" cy="250" r="235" fill="url(#l-bgGrad)" />
          
          {/* Toxic Magic Distortion across the back */}
          <circle cx="250" cy="250" r="235" fill="#10B981" opacity="0.1" filter="url(#l-illusion)" style={{mixBlendMode: 'color-dodge'}} />
          
          {/* Radiant Poison Core */}
          <circle cx="250" cy="250" r="150" fill="url(#l-acidCore)" filter="url(#l-glowStrong)" className="anim-pulse" style={{ animationDuration: '2s' }} />

          {/* ========================================== */}
          {/* INTERNAL ELEMENTS: SERPENTS & CHAOS        */}
          {/* ========================================== */}
          <g clipPath="url(#l-clip)">
            
            {/* Distorted chaotic ring trying to break containment */}
            <circle cx="250" cy="250" r="160" fill="none" stroke="url(#l-emerald)" strokeWidth="4" opacity="0.5" strokeDasharray="50 80 10 30" filter="url(#l-illusion)" className="anim-spin" style={{ animationDuration: '8s' }} />

            {/* Jörmungandr References - Ouroboros Intertwining Serpents */}
            <g className="anim-spin-rev" style={{ animationDuration: '30s', transformOrigin: '250px 250px' }}>
              <use href="#l-serpentCurve" stroke="url(#l-cursedGold)" filter="url(#l-glow)" opacity="0.8" />
              <use href="#l-serpentCurve" stroke="url(#l-cursedGold)" filter="url(#l-glow)" opacity="0.8" transform="rotate(120 250 250)" />
              <use href="#l-serpentCurve" stroke="url(#l-cursedGold)" filter="url(#l-glow)" opacity="0.8" transform="rotate(240 250 250)" />
              
              {/* Inner sharper serpent weave */}
              <use href="#l-serpentCurve" stroke="#34D399" strokeWidth="1" filter="url(#l-glowStrong)" opacity="0.6" transform="rotate(60 250 250) scale(0.8 0.8) translate(60 60)" />
              <use href="#l-serpentCurve" stroke="#34D399" strokeWidth="1" filter="url(#l-glowStrong)" opacity="0.6" transform="rotate(180 250 250) scale(0.8 0.8) translate(60 60)" />
              <use href="#l-serpentCurve" stroke="#34D399" strokeWidth="1" filter="url(#l-glowStrong)" opacity="0.6" transform="rotate(300 250 250) scale(0.8 0.8) translate(60 60)" />
            </g>

            {/* Chaotic Orbiting Daggers / Shards */}
            <g className="anim-spin" style={{ animationDuration: '15s', transformOrigin: '250px 250px' }}>
              <use href="#l-dagger" filter="url(#l-glowStrong)" />
              <use href="#l-dagger" filter="url(#l-glowStrong)" transform="rotate(72 250 250) translate(0 15)" />
              <use href="#l-dagger" filter="url(#l-glowStrong)" transform="rotate(144 250 250) translate(0 -10)" />
              <use href="#l-dagger" filter="url(#l-glowStrong)" transform="rotate(216 250 250) translate(0 20)" />
              <use href="#l-dagger" filter="url(#l-glowStrong)" transform="rotate(288 250 250) translate(0 -5)" />
            </g>

            {/* Toxic Wisps & Bubbles */}
            <g fill="#A3E635" filter="url(#l-glow)">
              <circle cx="250" cy="380" r="3" style={{animation: 'floatUp 3s ease-in infinite'}} opacity="0.8" />
              <circle cx="180" cy="320" r="1.5" style={{animation: 'floatUp 2.5s ease-in infinite 1s'}} fill="#34D399" />
              <circle cx="320" cy="340" r="4" style={{animation: 'floatUp 4.5s ease-in infinite 0.5s'}} fill="#10B981" />
              <circle cx="150" cy="270" r="2.5" style={{animation: 'floatUp 3s ease-in infinite 0.2s'}} />
              <circle cx="350" cy="270" r="1.5" style={{animation: 'floatUp 2s ease-in infinite 1.5s'}} fill="#A3E635" />
            </g>

          </g>

          {/* ========================================== */}
          {/* THE TRICKSTER BORDERS                        */}
          {/* ========================================== */}

          {/* Outer Mystical Shadow */}
          <circle cx="250" cy="250" r="242" fill="none" stroke="#064E3B" strokeWidth="6" opacity="0.8" />

          {/* Heavy Cursed Gold Rim (Slightly asymmetrical/jagged design) */}
          <circle cx="250" cy="250" r="230" fill="none" stroke="url(#l-cursedGold)" strokeWidth="14" filter="drop-shadow(0 0 15px rgba(16, 185, 129, 0.4))" />
          
          {/* Broken Inner Iron Line (Illusion of instability) */}
          <circle cx="250" cy="250" r="222" fill="none" stroke="#D1D5DB" strokeWidth="2" opacity="0.6" strokeDasharray="50 10 20 40 100 5 10" className="anim-spin" style={{ animationDuration: '40s' }} />

          {/* Serpent Eyes / Trickster Nodes around the rim */}
          <g filter="url(#l-glowStrong)">
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <g transform={`rotate(${deg} 250 250)`} key={`node-${deg}`}>
                {/* Slitted Snake Eye Motif */}
                <ellipse cx="250" cy="18" rx="8" ry="14" fill="#020617" stroke="url(#l-emerald)" strokeWidth="2" />
                <ellipse cx="250" cy="18" rx="2" ry="10" fill="#A3E635" className="anim-flicker" filter="url(#l-glowBlinding)" />
              </g>
            ))}
          </g>
          
          {/* Chaos Triangles (Sharp jagged anchors) */}
          <g filter="url(#l-glow)">
            {[30, 90, 150, 210, 270, 330].map((deg) => (
              <g transform={`rotate(${deg} 250 250)`} key={`anchor-${deg}`}>
                <polygon points="250,5 255,12 245,12" fill="#FDE047" />
              </g>
            ))}
          </g>

        
                    {/* Integrated Sigil Image Drop-in (Brought to Absolute Front) */}
                    <g filter="drop-shadow(0 0 20px rgba(16, 185, 129, 0.8))">
                        <image href={lokiSigil} x="100" y="100" width="300" height="300" opacity="1" />
                    </g>
                </svg>
      </div>

      <div className="emblem-info">
        <span className="emblem-name">Loki</span>
        <span className="emblem-role">Prototyping</span>
      </div>
    </div>
  );
}
