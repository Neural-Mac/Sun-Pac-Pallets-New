# Sun Pac Pallets: "Pro Max" Design System
> Extracted from `mock-redesign/page.tsx` (Home Page - The Gold Standard)

---

## 1. Theme Wrapper: `DarkIndustrialTheme`

**Purpose:** Provides global CSS variables, background textures, and selection styling.

**CSS Variables:**
```css
--color-brand: #FFEA05      /* Safety Yellow - PRIMARY */
--color-surface: #202020    /* Card surfaces */
--color-surface-dark: #151515
--color-text-muted: #9CA3AF
--font-serif: 'Playfair Display', serif
--font-sans: 'Inter', sans-serif
backgroundColor: #111111
```

**Background Texture:**
- SVG fractal noise at 5% opacity for industrial grain effect
- Touch action `manipulation` + `WebkitTapHighlightColor: transparent` for native feel

**Selection Styling:**
```css
selection:bg-[#FFEA05] selection:text-black
```

---

## 2. Navigation: Floating Industrial Nav

**Key Characteristics:**
- **Position:** `fixed top-4 left-4 right-4` (NOT `top-0`)
- **Style:** Glass morphism with `backdrop-blur-md`, `bg-black/80` on scroll
- **Border:** `border-white/20` → more opaque on scroll

**Industrial Monogram Logo:**
```jsx
<div className="w-12 h-12 bg-[#FFEA05] rounded-sm flex items-center justify-center">
   <span className="font-black text-black text-xl tracking-tighter">SPP</span>
</div>
```

**Link Styling:**
- `text-xs font-black uppercase tracking-[0.2em] text-gray-400 hover:text-white`
- Underline animation: `w-0 h-[2px] bg-[#FFEA05] transition-all duration-300 group-hover:w-full`

**CTA Button (Scanner Animation):**
```css
after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/40 after:to-transparent 
after:translate-x-[-200%] hover:after:translate-x-[200%] after:transition-transform after:duration-[1.5s]
```

---

## 3. Quote Calculator: Idle vs Wizard States

### 3.1 Idle State (Pre-Activation)

**Cinematic Preview + Click Prompt:**
- Ken Burns animated background (`animate-[ken-burns_12s_ease-in-out_infinite]`)
- Breathing conic gradient border (`conic-gradient` spinning at 4s → 2s on hover)
- Pulsing icon with `ring-4 ring-[#ffea05]/20 animate-pulse`
- Dark overlay that recedes on hover (`bg-black/60 → bg-black/30`)

**Shockwave Hover Effect:**
```css
/* Massive glow on hover */
boxShadow: '0 0 100px rgba(255, 234, 5, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.2)'

/* White flash */
.animate-[flash_0.5s_ease-out]
```

**Scanner Effect:**
```css
bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 
animate-[shimmer-slow_6s_infinite_linear] group-hover:animate-[shimmer_2s_infinite]
```

### 3.2 Wizard State (Portal Modal)

**Activation:** Uses `createPortal(document.body)` to render OUTSIDE component tree
- Full-screen overlay: `fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm`
- Centered modal: `max-w-4xl max-h-[90vh]`
- Height transitions with `ResizeObserver` for fluid step changes

**Modal Header Pattern:**
```jsx
<div className="flex items-center gap-2">
   <div className="w-1.5 h-6 bg-[#FFEA05] rounded-sm"></div>
   <div className="w-1.5 h-6 bg-[#FFEA05] rounded-sm"></div>
   <span className="font-serif text-lg font-bold">Build Your Quote</span>
</div>
```

**Step Indicators:**
```jsx
['SPECS', 'LOAD', 'FINALIZE'].map((label, i) => (
  <span className={`text-[10px] font-bold tracking-widest uppercase 
    ${step === i + 1 ? 'text-[#FFEA05] drop-shadow-[0_0_8px_rgba(255,234,5,0.6)]' : 'text-gray-700'}`}>
    {label}
  </span>
))
```

**Progress Bar:**
- 2px height, yellow fill with shimmer effect
- Width: `${(step / totalSteps) * 100}%`

**Selection Cards:**
```jsx
{formData.type === type && (
  <div className="absolute top-2 right-2 w-5 h-5 bg-[#FFEA05] rounded-full flex items-center justify-center">
    <Check size={12} className="text-black" />
  </div>
)}
```

**Floating Labels (Contact Fields):**
- Transforms from placeholder to floating label on focus/value
- Yellow glow: `shadow-[0_0_10px_rgba(255,234,5,0.2)]`

### 3.3 Success State (Step 4 - The Ticket)

**Quote ID Format:** `#SPP-2026-XXXX` (randomized)

**Ticket Box:**
```jsx
<div className="bg-[#111] border border-white/10 rounded-sm p-6 relative overflow-hidden">
  <div className="absolute top-0 left-0 w-1 h-full bg-[#FFEA05]"></div>
  <p className="text-2xl font-mono text-white tracking-widest">{quoteId}</p>
</div>
```

---

## 4. Animation Keyframes (Required in Global CSS / Style Block)

```css
@keyframes ken-burns {
  0% { transform: scale(1) translate(0, 0); }
  50% { transform: scale(1.1) translate(-2%, -1%); }
  100% { transform: scale(1) translate(0, 0); }
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@keyframes shimmer-slow {
  0% { transform: translateX(-100%) skewX(12deg); }
  100% { transform: translateX(200%) skewX(12deg); }
}

@keyframes flash {
  0% { opacity: 0.2; }
  100% { opacity: 0; }
}

@keyframes scan {
  0%, 100% { top: 0; }
  50% { top: calc(100% - 2px); }
}

@keyframes pulse-shadow {
  0%, 100% { box-shadow: 0 0 15px rgba(255, 234, 5, 0.1); }
  50% { box-shadow: 0 0 25px rgba(255, 234, 5, 0.3); }
}
```

---

## 5. Button Styles

**Primary CTA:**
```css
bg-[#FFEA05] text-black font-black text-sm uppercase tracking-[0.2em]
hover:bg-white hover:scale-105 transition-all 
shadow-[0_0_30px_rgba(255,234,5,0.2)]
```

**Secondary/Ghost:**
```css
border border-white/20 hover:border-[#FFEA05] text-white
hover:bg-white/5 transition-all backdrop-blur-md
```

**Disabled State:**
```css
bg-gray-800 text-gray-500 border border-white/10 cursor-not-allowed opacity-50
```

---

## 6. Form Input Patterns

**Standard Input:**
```css
bg-[#111] border border-white/10 text-white text-sm rounded-sm p-2
focus:border-[#FFEA05] focus:bg-black focus:outline-none 
focus:shadow-[0_0_15px_rgba(255,234,5,0.1)] 
hover:border-white/40 transition-all duration-300
```

**Toggle Switch (ISPM-15):**
```jsx
<div className={`w-8 h-4 rounded-full relative transition-colors ${formData.heatTreated ? 'bg-[#ffea05]' : 'bg-gray-700'}`}>
  <div className={`absolute top-0.5 w-3 h-3 bg-black rounded-full transition-all duration-300 ${formData.heatTreated ? 'translate-x-[18px]' : 'translate-x-[2px]'}`}></div>
</div>
```

---

## 7. Visual Effects Reference

| Effect | Trigger | CSS/Animation |
|--------|---------|---------------|
| Shockwave | Hover on Idle card | `boxShadow: '0 0 100px rgba(255, 234, 5, 0.6)'` |
| Scanner | Always on Idle + accelerates on hover | `shimmer-slow_6s` → `shimmer_2s` |
| White Flash | Hover on Idle | `animate-[flash_0.5s_ease-out]` |
| Ken Burns | Background image subtle motion | `ken-burns_12s_ease-in-out_infinite` |
| Breathing Border | Idle card border | Conic gradient `spin_4s` → `spin_2s` on hover |
| Pulsing Glow | CTA buttons, badges | `animate-pulse` + `shadow-[0_0_20px_...]` |

---

## 8. Anti-Patterns to Avoid

| DO NOT | DO INSTEAD |
|--------|------------|
| Use emojis as icons | Use Lucide React SVG icons |
| Use different yellow hex values | Always use `#FFEA05` |
| Stick nav to `top-0` | Use floating `top-4 left-4 right-4` |
| Use plain form buttons | Add shimmer/pulse effects |
| Create forms without step indicators | Use labeled steps + progress bar |
| Have hover without visual feedback | Add color, glow, or scale transitions |
| Mix font families | Serif for headers, Sans for body |
