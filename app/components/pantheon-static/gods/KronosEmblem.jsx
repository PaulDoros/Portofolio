const kronosSigil = '/pantheon/sigils/kronos.png';

export default function KronosEmblem() {
  return (
    <div className="emblem-card card-kronos">
            <div className="avatar-container kronos" title="Kronos - Fleet Commander">
                <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        {/* Local Kronos Palette & Textures */}
                        <radialGradient id="k-bg" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#1E2233" />
                            <stop offset="50%" stopColor="#121520" />
                            <stop offset="85%" stopColor="#07080D" />
                            <stop offset="100%" stopColor="#020204" />
                        </radialGradient>
                        <radialGradient id="k-core" cx="50%" cy="50%" r="40%">
                            <stop offset="0%" stopColor="#DAA520" stopOpacity="0.25" />
                            <stop offset="50%" stopColor="#4A5A80" stopOpacity="0.1" />
                            <stop offset="100%" stopColor="#07080D" stopOpacity="0" />
                        </radialGradient>
                        <linearGradient id="k-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#E8D090" />
                            <stop offset="25%" stopColor="#C5A059" />
                            <stop offset="50%" stopColor="#9C7A35" />
                            <stop offset="80%" stopColor="#6B501A" />
                            <stop offset="100%" stopColor="#3A2A0A" />
                        </linearGradient>
                        <linearGradient id="k-gold-hi" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                            <stop offset="40%" stopColor="#E8D090" />
                            <stop offset="100%" stopColor="#9C7A35" />
                        </linearGradient>
                        <linearGradient id="k-obsidian" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#2A2F45" />
                            <stop offset="50%" stopColor="#16192B" />
                            <stop offset="100%" stopColor="#0B0D17" />
                        </linearGradient>
                        <filter id="k-dust" x="-20%" y="-20%" width="140%" height="140%">
                            <feTurbulence type="fractalNoise" baseFrequency="0.15" numOctaves="3" result="noise" />
                            <feComponentTransfer in="noise" result="stars">
                                <feFuncR type="linear" slope="5" intercept="-3" />
                                <feFuncG type="linear" slope="4.5" intercept="-2.8" />
                                <feFuncB type="linear" slope="4" intercept="-2.5" />
                            </feComponentTransfer>
                            <feComposite operator="in" in="stars" in2="SourceGraphic" />
                        </filter>
                        <clipPath id="k-clip">
                            <circle cx="250" cy="250" r="235" />
                        </clipPath>
                    </defs>

                    {/* Base Shield & Cosmic Core */}
                    <circle cx="250" cy="250" r="235" fill="url(#k-bg)" />
                    {/* Procedural Star Dust Overlay */}
                    <circle cx="250" cy="250" r="235" fill="#fff" filter="url(#k-dust)" style={{ mixBlendMode: "screen" }}
                        opacity="0.6" />
                    {/* Soft Core Glow */}
                    <circle cx="250" cy="250" r="190" fill="url(#k-core)" filter="url(#glowStrong)"
                        className="anim-pulse" style={{ animationDuration: '4s' }} />

                    {/* Internal Environment (No Center Symbols) */}
                    <g clipPath="url(#k-clip)">
                        {/* Time/Clock themed inner geometry */}
                        {/* 12-hour division lines (subtle cosmic rays) */}
                        <g stroke="url(#k-gold-hi)" strokeWidth="1.5" opacity="0.15" filter="url(#glow)">
                            <line x1="250" y1="15" x2="250" y2="485" />
                            <line x1="15" y1="250" x2="485" y2="250" />
                            <line x1="84.5" y1="84.5" x2="415.5" y2="415.5" />
                            <line x1="84.5" y1="415.5" x2="415.5" y2="84.5" />
                            <line x1="132.5" y1="46" x2="367.5" y2="454" />
                            <line x1="367.5" y1="46" x2="132.5" y2="454" />
                            <line x1="46" y1="132.5" x2="454" y2="367.5" />
                            <line x1="46" y1="367.5" x2="454" y2="132.5" />
                        </g>

                        {/* 5 Bold Crimson Orbital Rings */}
                        <g className="anim-spin">
                            <ellipse cx="250" cy="250" rx="210" ry="70" fill="none" stroke="#DC143C" strokeWidth="3.5"
                                opacity="0.85" transform="rotate(0 250 250)" strokeDasharray="10 6"
                                filter="url(#glowStrong)" />
                        </g>
                        <g className="anim-spin-rev">
                            <ellipse cx="250" cy="250" rx="210" ry="70" fill="none" stroke="#DC143C" strokeWidth="3.5"
                                opacity="0.85" transform="rotate(36 250 250)" strokeDasharray="8 8"
                                filter="url(#glowStrong)" />
                        </g>
                        <g className="anim-spin">
                            <ellipse cx="250" cy="250" rx="210" ry="70" fill="none" stroke="#DC143C" strokeWidth="3.5"
                                opacity="0.85" transform="rotate(72 250 250)" strokeDasharray="12 4"
                                filter="url(#glowStrong)" />
                        </g>
                        <g className="anim-spin-rev">
                            <ellipse cx="250" cy="250" rx="210" ry="70" fill="none" stroke="#DC143C" strokeWidth="3.5"
                                opacity="0.85" transform="rotate(108 250 250)" strokeDasharray="6 10"
                                filter="url(#glowStrong)" />
                        </g>
                        <g className="anim-spin">
                            <ellipse cx="250" cy="250" rx="210" ry="70" fill="none" stroke="#DC143C" strokeWidth="3.5"
                                opacity="0.85" transform="rotate(144 250 250)" strokeDasharray="14 6"
                                filter="url(#glowStrong)" />
                        </g>

                        {/* Inner Containment Rings */}
                        <circle cx="250" cy="250" r="150" fill="none" stroke="url(#k-gold)" strokeWidth="2"
                            opacity="0.3" filter="url(#glow)" />
                        <circle cx="250" cy="250" r="140" fill="none" stroke="url(#k-gold-hi)" strokeWidth="1"
                            strokeDasharray="2 12" opacity="0.4" />

                        {/* Suspended Cosmic Nodes */}
                        <g fill="#FFF8DC" opacity="0.6" filter="url(#glow)">
                            <circle cx="150" cy="150" r="2.5" />
                            <circle cx="350" cy="150" r="2.5" />
                            <circle cx="150" cy="350" r="2.5" />
                            <circle cx="350" cy="350" r="2.5" />
                        </g>
                    </g>

                    {/* Unique Border Identity (Time / Eclipse Motif) */}
                    {/* Outer Dark Base */}
                    <circle cx="250" cy="250" r="240" fill="none" stroke="#05050A" strokeWidth="8" opacity="0.8" />

                    {/* Main Aged Gold Trim (Heavy Forged Edge) */}
                    <circle cx="250" cy="250" r="230" fill="none" stroke="url(#k-gold)" strokeWidth="14"
                        filter="drop-shadow(0 0 10px rgba(218, 165, 32, 0.4))" />
                    {/* Outer Sharp Highlight */}
                    <circle cx="250" cy="250" r="236" fill="none" stroke="#FFF8DC" strokeWidth="1.5" opacity="0.5" />

                    {/* Inner Obsidian Inlay Ring */}
                    <circle cx="250" cy="250" r="222" fill="none" stroke="url(#k-obsidian)" strokeWidth="4"
                        opacity="0.9" />

                    {/* The 60-Tick Clockwork Ring (Represents seconds/minutes) */}
                    {/* circumference = 2 * pi * 212 = 1332.0. 1332 / 60 = 22.2. So strokeDasharray="3 19.2" */}
                    <circle cx="250" cy="250" r="212" fill="none" stroke="url(#k-gold-hi)" strokeWidth="6"
                        strokeDasharray="3 19.2" opacity="0.8" filter="url(#glow)" className="anim-spin" />

                    {/* Floating Inner Ring Structure */}
                    <circle cx="250" cy="250" r="204" fill="none" stroke="#4A5A80" strokeWidth="2" opacity="0.6" />

                    {/* Distinct 12-Point Markers */}
                    {/* circumference = 2 * pi * 230 = 1445.1. 1445.1 / 12 = 120.4. dasharray="4 116.4" */}
                    <circle cx="250" cy="250" r="230" fill="none" stroke="url(#k-gold-hi)" strokeWidth="14"
                        strokeDasharray="4 116.4" opacity="0.8" className="anim-spin-rev" />

                    {/* 4 Main Compass Jewels (Star-forged markers for cosmic time) */}
                    <g filter="url(#glow)">
                        {/* Top */}
                        <polygon points="250,14 255,20 250,26 245,20" fill="#FFF8DC" />
                        <circle cx="250" cy="20" r="2" fill="#E8D090" />
                        {/* Bottom */}
                        <polygon points="250,474 255,480 250,486 245,480" fill="#FFF8DC" />
                        <circle cx="250" cy="480" r="2" fill="#E8D090" />
                        {/* Left */}
                        <polygon points="14,250 20,255 26,250 20,245" fill="#FFF8DC" />
                        <circle cx="20" cy="250" r="2" fill="#E8D090" />
                        {/* Right */}
                        <polygon points="474,250 480,255 486,250 480,245" fill="#FFF8DC" />
                        <circle cx="480" cy="250" r="2" fill="#E8D090" />
                    </g>
                    
                    {/* Integrated Sigil Image Drop-in (Brought to Absolute Front) */}
                    <g filter="drop-shadow(0 0 20px rgba(218, 165, 32, 0.9))">
                        <image href={kronosSigil} x="100" y="100" width="300" height="300" opacity="1" />
                    </g>
                </svg>
            </div>
            <div className="emblem-info">
                <span className="emblem-name">Kronos</span>
                <span className="emblem-role">Fleet Commander</span>
            </div>
        </div>
  );
}
