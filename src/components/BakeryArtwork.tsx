import React from 'react';

interface BakeryArtworkProps {
  type: string;
  className?: string;
  subtle?: boolean;
}

export const BakeryArtwork: React.FC<BakeryArtworkProps> = ({
  type,
  className = 'w-full h-full',
}) => {
  switch (type) {
    case 'boule':
      return (
        <svg viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Country Sourdough Boule">
          <defs>
            <radialGradient id="bouleGrad" cx="45%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#DF9F5C" />
              <stop offset="45%" stopColor="#C07730" />
              <stop offset="85%" stopColor="#874312" />
              <stop offset="100%" stopColor="#552707" />
            </radialGradient>
            <linearGradient id="earGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F5DFBD" />
              <stop offset="50%" stopColor="#B66C23" />
              <stop offset="100%" stopColor="#3F1903" />
            </linearGradient>
            <radialGradient id="shadowGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#322216" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#322216" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Cast Shadow */}
          <ellipse cx="160" cy="195" rx="105" ry="24" fill="url(#shadowGrad)" />
          {/* Loaf Body */}
          <ellipse cx="160" cy="135" rx="98" ry="64" fill="url(#bouleGrad)" />
          {/* Flour dusting textures */}
          <path d="M90 120 C100 95, 140 85, 180 88 C210 90, 240 105, 250 128" stroke="#FCEFD8" strokeWidth="2.5" strokeDasharray="3 4" opacity="0.6" />
          <path d="M80 140 C110 160, 190 168, 235 145" stroke="#FCEFD8" strokeWidth="1.5" strokeDasharray="2 3" opacity="0.4" />
          {/* Artisanal Ear / Score mark */}
          <path d="M102 142 C125 110, 165 98, 218 108" stroke="url(#earGrad)" strokeWidth="9" strokeLinecap="round" />
          <path d="M108 140 C130 114, 168 103, 212 112" stroke="#FAF1DF" strokeWidth="2.5" strokeLinecap="round" />
          {/* Secondary micro scores */}
          <path d="M130 82 C142 80, 158 84, 165 89" stroke="#E29F54" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          <path d="M175 88 C188 92, 198 98, 208 104" stroke="#E29F54" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          <path d="M110 102 C118 108, 126 116, 130 124" stroke="#753509" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        </svg>
      );

    case 'croissant':
      return (
        <svg viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="French Butter Croissant">
          <defs>
            <linearGradient id="croissantGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F9DF9C" />
              <stop offset="35%" stopColor="#E99E39" />
              <stop offset="70%" stopColor="#BD6818" />
              <stop offset="100%" stopColor="#7E3706" />
            </linearGradient>
            <radialGradient id="shadowGradC" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#281A10" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#281A10" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="160" cy="190" rx="95" ry="18" fill="url(#shadowGradC)" />
          {/* Croissant Crescent Body */}
          <path d="M68 152 C78 120, 120 95, 160 95 C200 95, 242 120, 252 152 C242 165, 218 168, 195 160 C175 168, 145 168, 125 160 C102 168, 78 165, 68 152 Z" fill="url(#croissantGrad)" />
          {/* Laminated segment bands */}
          <path d="M136 100 C146 96, 174 96, 184 100 C182 158, 138 158, 136 100 Z" fill="#F4BD61" stroke="#AA5914" strokeWidth="1.5" />
          <path d="M108 114 C120 106, 134 104, 142 108 C136 156, 114 154, 108 114 Z" fill="#E89F38" stroke="#8C420B" strokeWidth="1.5" />
          <path d="M178 108 C186 104, 200 106, 212 114 C206 154, 184 156, 178 108 Z" fill="#E89F38" stroke="#8C420B" strokeWidth="1.5" />
          {/* Curved tips */}
          <path d="M68 152 C72 165, 88 170, 98 164" stroke="#682A03" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M252 152 C248 165, 232 170, 222 164" stroke="#682A03" strokeWidth="2.5" strokeLinecap="round" />
          {/* Honeycomb butter sheen */}
          <path d="M148 106 C155 103, 165 103, 172 106" stroke="#FEF2D5" strokeWidth="2" strokeLinecap="round" />
          <path d="M118 118 C124 114, 132 114, 138 117" stroke="#FEF2D5" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'pain_chocolat':
      return (
        <svg viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Pain au Chocolat">
          <defs>
            <linearGradient id="pacGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FBE5B2" />
              <stop offset="30%" stopColor="#E49C3C" />
              <stop offset="80%" stopColor="#AF5914" />
              <stop offset="100%" stopColor="#6C2E05" />
            </linearGradient>
            <radialGradient id="shadowPAC" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#281A10" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#281A10" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="160" cy="186" rx="88" ry="18" fill="url(#shadowPAC)" />
          {/* Pillow Viennoiserie Body */}
          <rect x="85" y="100" width="150" height="74" rx="22" fill="url(#pacGrad)" />
          {/* Center Lamination Cleft */}
          <path d="M88 135 C130 138, 190 138, 232 135" stroke="#773205" strokeWidth="2" opacity="0.75" />
          {/* Peeking dark chocolate batons */}
          <rect x="79" y="128" width="14" height="7" rx="3.5" fill="#2E1408" stroke="#160803" strokeWidth="1" />
          <rect x="79" y="142" width="14" height="7" rx="3.5" fill="#2E1408" stroke="#160803" strokeWidth="1" />
          <rect x="227" y="128" width="14" height="7" rx="3.5" fill="#2E1408" stroke="#160803" strokeWidth="1" />
          <rect x="227" y="142" width="14" height="7" rx="3.5" fill="#2E1408" stroke="#160803" strokeWidth="1" />
          {/* Golden Sheen Top */}
          <ellipse cx="160" cy="115" rx="55" ry="9" fill="#FFF2D6" opacity="0.4" />
        </svg>
      );

    case 'baguette':
      return (
        <svg viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Tradition French Baguette">
          <defs>
            <linearGradient id="baguetteGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F2D193" />
              <stop offset="40%" stopColor="#D2862B" />
              <stop offset="85%" stopColor="#8C440D" />
              <stop offset="100%" stopColor="#562304" />
            </linearGradient>
            <radialGradient id="shadowBag" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#281A10" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#281A10" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="160" cy="186" rx="115" ry="16" fill="url(#shadowBag)" />
          {/* Angled Baguette Body */}
          <path d="M45 160 C50 148, 260 90, 275 102 C285 110, 275 125, 265 130 C180 165, 80 185, 55 174 C42 168, 40 164, 45 160 Z" fill="url(#baguetteGrad)" />
          {/* Traditional 5 Grignes / Diagonal Score Cuts */}
          <path d="M75 158 C85 152, 98 144, 105 142" stroke="#FFF0D4" strokeWidth="4" strokeLinecap="round" />
          <path d="M75 158 C85 152, 98 144, 105 142" stroke="#873F0A" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M115 144 C128 138, 142 130, 150 128" stroke="#FFF0D4" strokeWidth="4" strokeLinecap="round" />
          <path d="M115 144 C128 138, 142 130, 150 128" stroke="#873F0A" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M160 130 C174 123, 188 116, 196 114" stroke="#FFF0D4" strokeWidth="4" strokeLinecap="round" />
          <path d="M160 130 C174 123, 188 116, 196 114" stroke="#873F0A" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M205 116 C218 109, 230 104, 238 102" stroke="#FFF0D4" strokeWidth="4" strokeLinecap="round" />
          <path d="M205 116 C218 109, 230 104, 238 102" stroke="#873F0A" strokeWidth="1.5" strokeLinecap="round" />
          {/* Flour dusting */}
          <path d="M70 162 C130 148, 210 120, 260 110" stroke="#FFFDF8" strokeWidth="1" strokeDasharray="3 4" opacity="0.65" />
        </svg>
      );

    case 'tart':
      return (
        <svg viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Wild Berry Frangipane Tart">
          <defs>
            <linearGradient id="crustRing" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F1CB8E" />
              <stop offset="100%" stopColor="#9C561E" />
            </linearGradient>
            <radialGradient id="berryShadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#25160E" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#25160E" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="160" cy="188" rx="88" ry="20" fill="url(#berryShadow)" />
          {/* Fluted Tart Crust Shell */}
          <ellipse cx="160" cy="142" rx="90" ry="46" fill="url(#crustRing)" stroke="#814210" strokeWidth="2.5" />
          {/* Frangipane Almond Custard Base */}
          <ellipse cx="160" cy="140" rx="76" ry="38" fill="#FCE5B5" />
          {/* Glossy Blackberries & Raspberries */}
          <circle cx="135" cy="132" r="13" fill="#671439" stroke="#3F0721" strokeWidth="1" />
          <circle cx="160" cy="126" r="14" fill="#981A44" stroke="#5E0B27" strokeWidth="1" />
          <circle cx="185" cy="132" r="13" fill="#3D133D" stroke="#220722" strokeWidth="1" />
          <circle cx="146" cy="148" r="12" fill="#88153B" stroke="#4F0A20" strokeWidth="1" />
          <circle cx="174" cy="148" r="12" fill="#5A1544" stroke="#350827" strokeWidth="1" />
          {/* Wild Berry highlights & Pistachio slivers */}
          <circle cx="132" cy="128" r="3" fill="#FFA5C8" opacity="0.6" />
          <circle cx="157" cy="122" r="3" fill="#FFA5C8" opacity="0.6" />
          <circle cx="182" cy="128" r="3" fill="#DC9FD8" opacity="0.6" />
          {/* Crushed Sicilian Pistachio Flakes */}
          <path d="M125 146 L130 144" stroke="#7BA658" strokeWidth="3" strokeLinecap="round" />
          <path d="M192 144 L198 147" stroke="#7BA658" strokeWidth="3" strokeLinecap="round" />
          <path d="M158 138 L163 140" stroke="#7BA658" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'focaccia':
      return (
        <svg viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Rosemary Sea Salt Focaccia">
          <defs>
            <linearGradient id="focacciaBase" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F9E2B2" />
              <stop offset="50%" stopColor="#DC9742" />
              <stop offset="100%" stopColor="#964F13" />
            </linearGradient>
            <radialGradient id="focacciaShd" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#25160E" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#25160E" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="160" cy="190" rx="98" ry="20" fill="url(#focacciaShd)" />
          {/* Focaccia Slab */}
          <rect x="75" y="105" width="170" height="70" rx="16" fill="url(#focacciaBase)" stroke="#8A4812" strokeWidth="2" />
          {/* Olive Oil Dimples */}
          <ellipse cx="110" cy="125" rx="8" ry="5" fill="#88460F" opacity="0.75" />
          <ellipse cx="150" cy="120" rx="10" ry="6" fill="#88460F" opacity="0.75" />
          <ellipse cx="190" cy="126" rx="9" ry="5" fill="#88460F" opacity="0.75" />
          <ellipse cx="130" cy="146" rx="9" ry="5" fill="#88460F" opacity="0.75" />
          <ellipse cx="170" cy="148" rx="8" ry="5" fill="#88460F" opacity="0.75" />
          <ellipse cx="210" cy="144" rx="7" ry="4" fill="#88460F" opacity="0.75" />
          {/* Fresh Rosemary Needles */}
          <path d="M102 122 L116 128" stroke="#3A5C35" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M108 118 L114 132" stroke="#3A5C35" strokeWidth="2" strokeLinecap="round" />
          <path d="M145 116 L158 124" stroke="#3A5C35" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M165 142 L178 152" stroke="#3A5C35" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M188 122 L196 130" stroke="#3A5C35" strokeWidth="2.5" strokeLinecap="round" />
          {/* Flaky Maldon Sea Salt Crystals */}
          <rect x="120" y="132" width="4" height="4" fill="#FFFFFF" transform="rotate(25 120 132)" opacity="0.9" />
          <rect x="160" y="135" width="5" height="5" fill="#FFFFFF" transform="rotate(40 160 135)" opacity="0.9" />
          <rect x="180" y="140" width="4" height="4" fill="#FFFFFF" transform="rotate(15 180 140)" opacity="0.9" />
          <rect x="140" y="152" width="4" height="4" fill="#FFFFFF" transform="rotate(30 140 152)" opacity="0.9" />
        </svg>
      );

    case 'morning_bun':
    case 'cinnamon_knot':
      return (
        <svg viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Cardamom Cinnamon Morning Bun">
          <defs>
            <linearGradient id="bunGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F9DF9D" />
              <stop offset="50%" stopColor="#D58327" />
              <stop offset="100%" stopColor="#7E3A06" />
            </linearGradient>
            <radialGradient id="bunShd" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#281A10" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#281A10" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="160" cy="188" rx="80" ry="18" fill="url(#bunShd)" />
          {/* Swirled Round Bun */}
          <ellipse cx="160" cy="138" rx="72" ry="50" fill="url(#bunGrad)" stroke="#743306" strokeWidth="2" />
          {/* Cinnamon Sugar Spirals */}
          <path d="M125 142 C120 120, 150 108, 172 114 C195 120, 204 145, 185 160 C162 170, 140 158, 146 142 C150 134, 166 132, 170 140" stroke="#481B05" strokeWidth="4" strokeLinecap="round" />
          {/* Coarse Pearl Sugar / Cardamom flecks */}
          <circle cx="135" cy="125" r="2.5" fill="#FFFFFF" opacity="0.9" />
          <circle cx="175" cy="120" r="3" fill="#FFFFFF" opacity="0.9" />
          <circle cx="192" cy="138" r="2.5" fill="#FFFFFF" opacity="0.9" />
          <circle cx="155" cy="155" r="3" fill="#FFFFFF" opacity="0.9" />
          <circle cx="140" cy="148" r="2" fill="#FFFFFF" opacity="0.9" />
          <circle cx="162" cy="138" r="1.5" fill="#3D1D0D" />
          <circle cx="180" cy="148" r="1.5" fill="#3D1D0D" />
        </svg>
      );

    case 'brioche':
      return (
        <svg viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Golden Brioche Feuilletée">
          <defs>
            <linearGradient id="briocheGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FEE4A6" />
              <stop offset="40%" stopColor="#ECA239" />
              <stop offset="85%" stopColor="#B35F12" />
              <stop offset="100%" stopColor="#6C2E05" />
            </linearGradient>
            <radialGradient id="briocheShd" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#281A10" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#281A10" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="160" cy="188" rx="88" ry="18" fill="url(#briocheShd)" />
          {/* Loaf Crown Buns */}
          <circle cx="118" cy="136" r="38" fill="url(#briocheGrad)" stroke="#743306" strokeWidth="2" />
          <circle cx="202" cy="136" r="38" fill="url(#briocheGrad)" stroke="#743306" strokeWidth="2" />
          <circle cx="160" cy="126" r="42" fill="url(#briocheGrad)" stroke="#743306" strokeWidth="2" />
          {/* Golden butter glaze sheen */}
          <ellipse cx="160" cy="108" rx="22" ry="7" fill="#FFF2CE" opacity="0.5" />
          <ellipse cx="120" cy="118" rx="16" ry="6" fill="#FFF2CE" opacity="0.5" />
          <ellipse cx="200" cy="118" rx="16" ry="6" fill="#FFF2CE" opacity="0.5" />
          {/* Pearl sugar grains */}
          <circle cx="152" cy="114" r="2.5" fill="#FFFFFF" />
          <circle cx="168" cy="118" r="2.5" fill="#FFFFFF" />
          <circle cx="124" cy="125" r="2" fill="#FFFFFF" />
          <circle cx="196" cy="125" r="2" fill="#FFFFFF" />
        </svg>
      );

    case 'latte':
    case 'drip_coffee':
      return (
        <svg viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Espresso Latte Coffee">
          <defs>
            <linearGradient id="cupGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F9F6F0" />
              <stop offset="100%" stopColor="#D8CFBF" />
            </linearGradient>
            <linearGradient id="coffeeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#552C16" />
              <stop offset="100%" stopColor="#2E1508" />
            </linearGradient>
            <radialGradient id="cupShd" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#281A10" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#281A10" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="160" cy="192" rx="76" ry="16" fill="url(#cupShd)" />
          {/* Saucer */}
          <ellipse cx="160" cy="180" rx="82" ry="16" fill="#ECE5DA" stroke="#BCB09F" strokeWidth="1.5" />
          {/* Ceramic Cup Body */}
          <path d="M110 115 L120 172 C122 178, 198 178, 200 172 L210 115 Z" fill="url(#cupGrad)" stroke="#B6A998" strokeWidth="1.5" />
          {/* Cup Handle */}
          <path d="M206 126 C225 128, 226 155, 202 158" stroke="#D1C7B7" strokeWidth="6" strokeLinecap="round" />
          {/* Cup Rim & Coffee Surface */}
          <ellipse cx="160" cy="115" rx="50" ry="14" fill="#3D1F10" stroke="#C2B7A8" strokeWidth="2" />
          {/* Microfoam Crema & Rosetta Latte Art */}
          <ellipse cx="160" cy="115" rx="46" ry="12" fill="url(#coffeeGrad)" />
          <path d="M160 110 C154 114, 154 118, 160 122 C166 118, 166 114, 160 110 Z" fill="#F8EBD4" />
          <path d="M152 113 C156 116, 164 116, 168 113" stroke="#F8EBD4" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M148 117 C154 120, 166 120, 172 117" stroke="#F8EBD4" strokeWidth="1.5" strokeLinecap="round" />
          {/* Steam wisps */}
          <path d="M150 90 C146 80, 154 75, 150 68" stroke="#A6947D" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
          <path d="M165 92 C168 84, 162 77, 166 70" stroke="#A6947D" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
        </svg>
      );

    case 'cookie':
    default:
      return (
        <svg viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Brown Butter Dark Chocolate Cookie">
          <defs>
            <radialGradient id="cookieGrad" cx="45%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#E9BD7D" />
              <stop offset="60%" stopColor="#C68636" />
              <stop offset="100%" stopColor="#7E4713" />
            </radialGradient>
            <radialGradient id="cookieShd" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#281A10" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#281A10" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="160" cy="186" rx="84" ry="18" fill="url(#cookieShd)" />
          {/* Rustic Crinkled Cookie Disk */}
          <ellipse cx="160" cy="138" rx="80" ry="52" fill="url(#cookieGrad)" stroke="#743B0B" strokeWidth="2" />
          {/* Dark Chocolate Puddles */}
          <ellipse cx="140" cy="130" rx="14" ry="9" fill="#200B03" stroke="#120501" strokeWidth="1" />
          <ellipse cx="178" cy="136" rx="12" ry="8" fill="#200B03" stroke="#120501" strokeWidth="1" />
          <ellipse cx="156" cy="152" rx="15" ry="9" fill="#200B03" stroke="#120501" strokeWidth="1" />
          <ellipse cx="120" cy="144" rx="10" ry="7" fill="#200B03" stroke="#120501" strokeWidth="1" />
          <ellipse cx="192" cy="124" rx="9" ry="6" fill="#200B03" stroke="#120501" strokeWidth="1" />
          {/* Flaky Salt Crystals */}
          <rect x="135" y="125" width="4" height="4" fill="#FFFFFF" transform="rotate(25 135 125)" opacity="0.9" />
          <rect x="165" y="145" width="4" height="4" fill="#FFFFFF" transform="rotate(45 165 145)" opacity="0.9" />
          <rect x="150" y="132" width="3" height="3" fill="#FFFFFF" transform="rotate(10 150 132)" opacity="0.9" />
        </svg>
      );
  }
};
