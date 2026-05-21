const plutusSigil = '/pantheon/sigils/plutus.png';
export default function PlutusEmblem() {
  return (
    <div className="emblem-card card-plutus">
      <div className="avatar-container plutus" title="Plutus - Cost Optimization">
        <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* 1. Deep Vault Gold Background */}
            <radialGradient id="p-bgGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#854D0E" /> {/* Burnished Gold */}
              <stop offset="40%" stopColor="#422006" /> {/* Deep Bronze */}
              <stop offset="70%" stopColor="#1E1B4B" /> {/* Velvet Vault */}
              <stop offset="100%" stopColor="#000000" />
            </radialGradient>

            {/* Pure 24k Glittering Core */}
            <radialGradient id="p-wealthCore" cx="50%" cy="50%" r="40%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="25%" stopColor="#FEF08A" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#422006" stopOpacity="0" />
            </radialGradient>

            {/* 2. Treasured Materials */}
            {/* Bright Polished Pure Gold */}
            <linearGradient id="p-pureGold" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFBEB" /> {/* White Gold */}
              <stop offset="30%" stopColor="#FDE047" /> {/* Bright Yellow */}
              <stop offset="70%" stopColor="#B45309" /> {/* Rich Amber */}
              <stop offset="100%" stopColor="#78350F" /> {/* Shadowed Coin */}
            </linearGradient>

            {/* Inlaid Ruby */}
            <radialGradient id="p-ruby" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FCA5A5" />
              <stop offset="40%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#7F1D1D" />
            </radialGradient>

            {/* 3. Wealth Glint Filters */}
            <filter id="p-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="p-glowStrong" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComponentTransfer in="blur" result="glow1">
                <feFuncA type="linear" slope="3" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode in="glow1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="p-glowBlinding" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComponentTransfer in="blur" result="glow1">
                <feFuncA type="linear" slope="5" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode in="glow1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <clipPath id="p-clip">
              <circle cx="250" cy="250" r="230" />
            </clipPath>

            {/* Reusable Gold Bullion / Ingot Shape */}
            <polygon id="p-ingot" points="230,60 270,60 280,80 220,80" fill="url(#p-pureGold)" stroke="#FEF08A" strokeWidth="1" />
          </defs>

          {/* ========================================== */}
          {/* BASE SHIELD & GOLD CORE                    */}
          {/* ========================================== */}
          <circle cx="250" cy="250" r="235" fill="url(#p-bgGrad)" />
          
          {/* Radiant Wealth Core */}
          <circle cx="250" cy="250" r="140" fill="url(#p-wealthCore)" filter="url(#p-glowStrong)" className="anim-pulse" style={{ animationDuration: '4s' }} />

          {/* ========================================== */}
          {/* INTERNAL ELEMENTS: THE TREASURY VAULT      */}
          {/* ========================================== */}
          <g clipPath="url(#p-clip)">
            
            {/* Bank Vault Locking Mechanisms */}
            <g className="anim-spin" style={{ animationDuration: '45s' }}>
              <circle cx="250" cy="250" r="160" fill="none" stroke="url(#p-pureGold)" strokeWidth="12" opacity="0.8" strokeDasharray="30 20 100 20" filter="url(#p-glow)" />
              <circle cx="250" cy="250" r="150" fill="none" stroke="#FDE047" strokeWidth="2" opacity="0.6" />
              
              {/* Inner heavy locking bars */}
              {[0, 60, 120, 180, 240, 300].map(deg => (
                <rect key={`bar-${deg}`} x="245" y="90" width="10" height="60" fill="url(#p-pureGold)" stroke="#A16207" strokeWidth="1" transform={`rotate(${deg} 250 250)`} />
              ))}
            </g>

            {/* Inner Rotating Diamond/Gem Settings */}
            <g className="anim-spin-rev" style={{ animationDuration: '30s' }}>
              <circle cx="250" cy="250" r="110" fill="none" stroke="url(#p-pureGold)" strokeWidth="4" opacity="0.7" filter="url(#p-glow)" />
              {/* 12 Ruby Inserts */}
              {[30, 90, 150, 210, 270, 330].map(deg => (
                <circle key={`ruby-${deg}`} cx="250" cy="140" r="6" fill="url(#p-ruby)" stroke="#EF4444" strokeWidth="1" transform={`rotate(${deg} 250 250)`} filter="drop-shadow(0 0 5px red)" />
              ))}
            </g>

            {/* Ascending Glinting Gold Coins */}
            <g filter="url(#p-glowBlinding)">
              <circle cx="200" cy="380" r="5" style={{animation: 'floatUp 3s ease-in infinite'}} fill="#FDE047" />
              <circle cx="280" cy="320" r="3" style={{animation: 'floatUp 2s ease-in infinite 0.5s'}} fill="#FFFFFF" />
              <circle cx="150" cy="300" r="6" style={{animation: 'floatUp 3.5s ease-in infinite 1s'}} fill="#FEF08A" />
              <circle cx="350" cy="250" r="4" style={{animation: 'floatUp 2.8s ease-in infinite 0.2s'}} fill="#F59E0B" />
              <circle cx="250" cy="400" r="3" style={{animation: 'floatUp 1.8s ease-in infinite 0.8s'}} fill="#FFFFFF" className="anim-flicker" />
            </g>

          </g>

          {/* ========================================== */}
          {/* THE GOLDEN HOARD BORDERS                     */}
          {/* ========================================== */}

          {/* Shadow behind the massive rim */}
          <circle cx="250" cy="250" r="242" fill="none" stroke="#422006" strokeWidth="6" opacity="0.8" filter="url(#p-glow)" />

          {/* Heaviest Pure Gold Plate Rim around the outside */}
          <circle cx="250" cy="250" r="226" fill="none" stroke="url(#p-pureGold)" strokeWidth="24" filter="drop-shadow(0 0 10px rgba(250, 204, 21, 0.5))" />
          
          {/* Recessed engraving in the gold plate */}
          <circle cx="250" cy="250" r="226" fill="none" stroke="#78350F" strokeWidth="2" opacity="0.7" />

          {/* 8 Golden Bullion Ingots bolted to the edge */}
          <g filter="drop-shadow(0 4px 6px rgba(0,0,0,0.5))">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <g transform={`rotate(${deg} 250 250)`} key={`bullion-${deg}`}>
                <use href="#p-ingot" />
                {/* Micro-sparkle on each ingot */}
                <circle cx="250" cy="70" r="1.5" fill="#FFFFFF" filter="url(#p-glowBlinding)" className="anim-pulse" style={{ animationDelay: `${deg / 45}s` }} />
              </g>
            ))}
          </g>

          {/* Golden Chain / Beaded filigree just inside the blocks */}
          <circle cx="250" cy="250" r="208" fill="none" stroke="#FDE047" strokeWidth="3" strokeDasharray="1 8" strokeLinecap="round" className="anim-spin" style={{ animationDuration: '50s' }} opacity="0.9" />

        
                    {/* Integrated Sigil Image Drop-in (Brought to Absolute Front) */}
                    <g filter="drop-shadow(0 0 20px rgba(250, 204, 21, 0.8))">
                        <image href={plutusSigil} x="100" y="100" width="300" height="300" opacity="1" />
                    </g>
                </svg>
      </div>

      <div className="emblem-info">
        <span className="emblem-name">Plutus</span>
        <span className="emblem-role">Cost Optimization</span>
      </div>
    </div>
  );
}
