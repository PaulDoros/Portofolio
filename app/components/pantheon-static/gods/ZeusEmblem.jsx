const zeusSigil = '/pantheon/sigils/zeus.png';

export default function ZeusEmblem() {
    return (
        <div className="emblem-card card-zeus">
            <div className="avatar-container zeus" title="Zeus - Supreme Commander">
                <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        {/* 1. Deepened Cosmic Background (Nebula to Void) */}
                        <radialGradient id="z-bgGrad" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#9C27B0" />
                            <stop offset="25%" stopColor="#6A1B9A" />
                            <stop offset="60%" stopColor="#311B5E" />
                            <stop offset="85%" stopColor="#120A2A" />
                            <stop offset="100%" stopColor="#05020A" />
                        </radialGradient>

                        {/* Center Storm Core for backlight */}
                        <radialGradient id="z-stormCore" cx="50%" cy="50%" r="40%">
                            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.3" />
                            <stop offset="50%" stopColor="#E0B0FF" stopOpacity="0.1" />
                            <stop offset="100%" stopColor="#6A1B9A" stopOpacity="0" />
                        </radialGradient>

                        {/* 2. Premium Beveled Gold Gradients */}
                        <linearGradient id="z-premiumGold" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#FFF5B8" />
                            <stop offset="20%" stopColor="#FFD700" />
                            <stop offset="50%" stopColor="#DAA520" />
                            <stop offset="80%" stopColor="#B8860B" />
                            <stop offset="100%" stopColor="#785000" />
                        </linearGradient>

                        <linearGradient id="z-goldHighlight" x1="0%" y1="50%" x2="100%" y2="50%">
                            <stop offset="0%" stopColor="#FFFFFF" />
                            <stop offset="30%" stopColor="#FFF066" />
                            <stop offset="100%" stopColor="#B8860B" />
                        </linearGradient>

                        <linearGradient id="z-goldShadow" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#B8860B" />
                            <stop offset="100%" stopColor="#4A3500" />
                        </linearGradient>

                        {/* 3. Glow Filters for Magic and Lightning */}
                        {/* MASSIVELY expanded filter bounding boxes to prevent clipping on small glowing ellipses! */}
                        <filter id="z-glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="5" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>

                        <filter id="z-glowStrong" x="-100%" y="-100%" width="300%" height="300%">
                            <feGaussianBlur stdDeviation="12" result="blur" />
                            <feComponentTransfer in="blur" result="glow1">
                                <feFuncA type="linear" slope="2.5" />
                            </feComponentTransfer>
                            <feMerge>
                                <feMergeNode in="glow1" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>

                        <filter id="z-glowBlinding" x="-200%" y="-200%" width="500%" height="500%">
                            <feGaussianBlur stdDeviation="8" result="blur" />
                            <feComponentTransfer in="blur" result="glow1">
                                <feFuncA type="linear" slope="4" />
                            </feComponentTransfer>
                            <feMerge>
                                <feMergeNode in="glow1" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>

                        {/* 4. REALISTIC PROCEDURAL TEXTURES (New) */}
                        {/* Storm/Nebula Clouds */}
                        <filter id="z-zeusNebula" x="-20%" y="-20%" width="140%" height="140%">
                            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="4" result="noise" />
                            <feComposite operator="in" in="noise" in2="SourceGraphic" />
                        </filter>

                        {/* Forged Metal Grain */}
                        <filter id="z-metalGrain" x="-20%" y="-20%" width="140%" height="140%">
                            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0.5  0 0 0 0 0.4  0 0 0 0 0.1  0 0 0 1 0" in="noise"
                                result="coloredNoise" />
                            <feComposite operator="in" in="coloredNoise" in2="SourceGraphic" />
                        </filter>

                        {/* 5. Clip Path */}
                        <clipPath id="z-circleClip">
                            <circle cx="250" cy="250" r="235" />
                        </clipPath>
                    </defs>

                    {/* ========================================== */}
                    {/* BASE SHIELD & STORM CORE                   */}
                    {/* ========================================== */}
                    <circle cx="250" cy="250" r="235" fill="url(#z-bgGrad)" />
                    {/* Realistic Nebula Overlay */}
                    <circle cx="250" cy="250" r="235" fill="#fff" filter="url(#z-zeusNebula)" style={{ mixBlendMode: 'color-dodge' }}
                        opacity="0.3" />

                    <circle cx="250" cy="250" r="180" fill="url(#z-stormCore)" filter="url(#z-glowStrong)" />

                    {/* ========================================== */}
                    {/* INTERNAL ELEMENTS (Clipped to Circle)      */}
                    {/* ========================================== */}
                    <g clipPath="url(#z-circleClip)">

                        {/* SUBTLE DIVINE HALO */}
                        <circle cx="250" cy="250" r="140" fill="url(#z-stormCore)" className="anim-pulse" filter="url(#z-glowStrong)" />

                        {/* DOTTED CELESTIAL ORBIT */}
                        <circle cx="250" cy="250" r="175" fill="none" stroke="url(#z-premiumGold)" strokeWidth="1.5"
                            opacity="0.25" strokeDasharray="3 12" filter="url(#z-glow)" className="anim-spin" />

                        {/* ELEGANT ENERGY TRACES (Smooth, atmospheric framing curves) */}
                        <g fill="none" stroke="url(#z-premiumGold)" opacity="0.3" filter="url(#z-glow)" strokeLinecap="round">
                            {/* Outer sweeping arcs */}
                            <path d="M 160 100 C 110 180, 90 260, 140 380" strokeWidth="2.5" />
                            <path d="M 340 100 C 390 180, 410 260, 360 380" strokeWidth="2.5" />

                            {/* Subtle inner electric veins */}
                            <path d="M 190 140 Q 150 250 195 340" strokeWidth="1.5" opacity="0.6" strokeDasharray="6 8" />
                            <path d="M 310 140 Q 350 250 305 340" strokeWidth="1.5" opacity="0.6" strokeDasharray="6 8" />
                        </g>

                        {/* 4 INTENTIONAL CELESTIAL STARS & ORBIT ANCHORS */}
                        <g fill="#FFF8DC" filter="url(#z-glow)" opacity="0.45">
                            {/* 4 Point Diamond Stars */}
                            <path d="M 140 120 Q 145 130 155 135 Q 145 140 140 150 Q 135 140 125 135 Q 135 130 140 120 Z" />
                            <path d="M 360 120 Q 365 130 375 135 Q 365 140 360 150 Q 355 140 345 135 Q 355 130 360 120 Z" />
                            <path d="M 140 360 Q 145 370 155 375 Q 145 380 140 390 Q 135 380 125 375 Q 135 370 140 360 Z" />
                            <path d="M 360 360 Q 365 370 375 375 Q 365 380 360 390 Q 355 380 345 375 Q 355 370 360 360 Z" />

                            {/* Tiny orbit anchor dots (Cardinal points on the dotted orbit) */}
                            <circle cx="250" cy="75" r="2.5" />
                            <circle cx="250" cy="425" r="2.5" />
                            <circle cx="75" cy="250" r="2.5" />
                            <circle cx="425" cy="250" r="2.5" />
                        </g>

                        {/* THUNDERBOLT IMPACT GLOW (Softer, atmospheric base) */}
                        <ellipse cx="180" cy="430" rx="80" ry="25" fill="#FFD700" opacity="0.2" filter="url(#z-glowStrong)" />
                        <ellipse cx="180" cy="430" rx="35" ry="8" fill="#FFFFFF" opacity="0.8" filter="url(#z-glowBlinding)"
                            className="anim-flicker" />

                        {/* FLOATING STORM EMBERS (New detail) */}
                        <g fill="#FFD700" filter="url(#z-glow)">
                            <circle cx="160" cy="400" r="2" style={{ animation: 'floatUp 3s ease-in infinite 0.2s' }} />
                            <circle cx="200" cy="420" r="1.5" style={{ animation: 'floatUp 4s ease-in infinite 1.5s' }} />
                            <circle cx="140" cy="380" r="2.5" style={{ animation: 'floatUp 3.5s ease-in infinite 0.7s' }} />
                            <circle cx="230" cy="390" r="1" style={{ animation: 'floatUp 2.5s ease-in infinite 2.1s' }} />
                        </g>

                    </g>

                    {/* ========================================== */}
                    {/* PREMIUM AVATAR FRAMING & BORDERS           */}
                    {/* ========================================== */}

                    {/* Outer containment aura */}
                    <circle cx="250" cy="250" r="240" fill="none" stroke="#4A148C" strokeWidth="6" opacity="0.5"
                        filter="url(#z-glowStrong)" />

                    {/* Main Thick Forged Gold Rim */}
                    <circle cx="250" cy="250" r="235" fill="none" stroke="url(#z-premiumGold)" strokeWidth="12"
                        filter="url(#z-glow)" />
                    {/* Inner Shadow on Main Rim to give it depth */}
                    <circle cx="250" cy="250" r="230" fill="none" stroke="#8B6508" strokeWidth="2" opacity="0.6" />
                    {/* Outer Highlight on Main Rim */}
                    <circle cx="250" cy="250" r="240" fill="none" stroke="#FFF8DC" strokeWidth="1.5" opacity="0.8" />

                    {/* Greek Power Ring (Thicker, more authoritative, now spins) */}
                    <circle cx="250" cy="250" r="218" fill="none" stroke="url(#z-premiumGold)" strokeWidth="6" opacity="0.95"
                        strokeDasharray="40 12 12 12" filter="url(#z-glow)" className="anim-spin-rev" />

                    {/* Inner Containment Ring */}
                    <circle cx="250" cy="250" r="204" fill="none" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.3"
                        strokeDasharray="4 6" />

                    {/* Ornamental Border Diamond Studs */}
                    <g fill="url(#z-goldHighlight)" filter="url(#z-glow)">
                        {/* Cardinal Points */}
                        <polygon points="250,5 258,15 250,25 242,15" />
                        <polygon points="250,475 258,485 250,495 242,485" />
                        <polygon points="5,250 15,258 25,250 15,242" />
                        <polygon points="475,250 485,258 495,250 485,242" />
                        {/* Diagonal Points */}
                        <polygon points="80,80 88,85 85,93 77,88" />
                        <polygon points="420,80 428,88 415,93 412,85" />
                        <polygon points="80,420 88,412 85,407 77,415" />
                        <polygon points="420,420 412,412 415,407 428,415" />
                    </g>

                    {/* Integrated Sigil Image Drop-in (Brought to Absolute Front) */}
                    <g filter="drop-shadow(0 0 20px rgba(255, 215, 0, 0.9))">
                        <image href={zeusSigil} x="100" y="100" width="300" height="300" opacity="1" />
                    </g>

                </svg>
            </div>

            <div className="emblem-info">
                <span className="emblem-name">Zeus</span>
                <span className="emblem-role">Supreme Commander</span>
            </div>
        </div>
    );
}
