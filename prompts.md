# Opencode Prompts — Quote Form Pro Max Redesign

> **Model**: Claude Opus 4.5 (thinking)  
> **Approach**: Task-by-task for maximum reliability  
> **Copy each prompt one at a time, wait for completion + verification before moving to the next**

---

## PROMPT 1: Focus Mode Overlay System

```
Before starting, read these two files to understand the context:
1. c:\Projects\Sun Pac Pallets\.agent\workflows\ui-ux-pro-max.md (UI/UX guidelines)
2. C:\Users\XxMik\.gemini\antigravity\brain\ae0e9ef0-f43e-451b-8380-ace42fece56d\implementation_plan.md (detailed implementation plan)

Now execute ONLY Task 1: Focus Mode Overlay System

Target file: c:\Projects\Sun Pac Pallets\src\app\mock-redesign\page.tsx

Requirements:
- When the Quote Builder wizard is active (started === true), add a full-screen scrim overlay (bg-black/70 backdrop-blur-sm)
- The calculator should float ABOVE the scrim with z-50
- Clicking the scrim should close the wizard
- Lock page scroll while wizard is active

Follow the implementation details in the plan exactly. After making changes, run: npm run build

Summarize what you changed when done.
```

---

## PROMPT 2: Floating Labels (Accessibility Fix)

```
Reference files:
1. c:\Projects\Sun Pac Pallets\.agent\workflows\ui-ux-pro-max.md
2. C:\Users\XxMik\.gemini\antigravity\brain\ae0e9ef0-f43e-451b-8380-ace42fece56d\implementation_plan.md

Execute ONLY Task 4: Floating Labels (Step 3 Accessibility Fix)

Target file: c:\Projects\Sun Pac Pallets\src\app\mock-redesign\page.tsx
Target lines: 481-498 (Step 3 contact form inputs)

Requirements:
- Replace placeholder-as-label pattern with floating labels
- Labels should float up when focused OR when input has content
- Add proper <label> elements with htmlFor attributes
- Use Tailwind peer classes for the floating effect
- Keep the validation checkmark that appears when input has 3+ characters

Follow the implementation details exactly. Run: npm run build

Summarize what you changed when done.
```

---

## PROMPT 3: Persistent Config Summary Bar

```
Reference files:
1. c:\Projects\Sun Pac Pallets\.agent\workflows\ui-ux-pro-max.md
2. C:\Users\XxMik\.gemini\antigravity\brain\ae0e9ef0-f43e-451b-8380-ace42fece56d\implementation_plan.md

Execute ONLY Task 3: Persistent Config Summary Bar

Target file: c:\Projects\Sun Pac Pallets\src\app\mock-redesign\page.tsx
Insert location: After line 291 (after the progress bar, inside the header)

Requirements:
- Add a slim horizontal bar that appears ONLY in Steps 2 and 3
- Show: Pallet type badge (48×40 GMA or Custom size)
- Show: Heat treatment status (ISPM-15 with ThermometerSun icon, or "No HT")
- Add "Edit" button that returns to Step 1
- Animate in smoothly (fade-in slide-in-from-top-2)

Follow the implementation details exactly. Run: npm run build

Summarize what you changed when done.
```

---

## PROMPT 4: Selection Checkmarks (Step 1)

```
Reference files:
1. c:\Projects\Sun Pac Pallets\.agent\workflows\ui-ux-pro-max.md
2. C:\Users\XxMik\.gemini\antigravity\brain\ae0e9ef0-f43e-451b-8380-ace42fece56d\implementation_plan.md

Execute ONLY Task 2: Selection Checkmarks (Step 1)

Target file: c:\Projects\Sun Pac Pallets\src\app\mock-redesign\page.tsx
Target lines: 314-326 (Step 1 pallet type cards)

Requirements:
- Add a yellow checkmark badge (circle with Check icon) in top-right corner of selected card
- Add icons to both cards: Package icon for "Standard GMA", Ruler icon for "Custom"
- Add glow effect to selected card: shadow-[0_0_15px_rgba(255,234,5,0.15)]
- Checkmark should animate in (zoom-in duration-200)

Follow the implementation details exactly. Run: npm run build

Summarize what you changed when done.
```

---

## PROMPT 5: Industry Card Checkmarks (Step 2)

```
Reference files:
1. c:\Projects\Sun Pac Pallets\.agent\workflows\ui-ux-pro-max.md
2. C:\Users\XxMik\.gemini\antigravity\brain\ae0e9ef0-f43e-451b-8380-ace42fece56d\implementation_plan.md

Execute ONLY Task 8: Industry Card Checkmarks (Step 2)

Target file: c:\Projects\Sun Pac Pallets\src\app\mock-redesign\page.tsx
Target lines: 406-416 (Step 2 industry/load category buttons)

Requirements:
- Add same yellow checkmark badge pattern as Step 1 cards
- When selected: checkmark in top-right corner, icon turns yellow, subtle glow
- Checkmark animates in (zoom-in duration-200)

Follow the implementation details exactly. Run: npm run build

Summarize what you changed when done.
```

---

## PROMPT 6: Step 2 Layout Fix

```
Reference files:
1. c:\Projects\Sun Pac Pallets\.agent\workflows\ui-ux-pro-max.md
2. C:\Users\XxMik\.gemini\antigravity\brain\ae0e9ef0-f43e-451b-8380-ace42fece56d\implementation_plan.md

Execute ONLY Task 7: Step 2 Layout Fix

Target file: c:\Projects\Sun Pac Pallets\src\app\mock-redesign\page.tsx
Target lines: 418-427 (Max Load Weight input)

Requirements:
- Change input to half-width (grid-cols-2)
- Add "LBS" suffix inside the input (absolute positioned, right side)
- Add helper text: "Optional — helps us spec stringer thickness"

Follow the implementation details exactly. Run: npm run build

Summarize what you changed when done.
```

---

## PROMPT 7: Enhanced Textarea & File Upload

```
Reference files:
1. c:\Projects\Sun Pac Pallets\.agent\workflows\ui-ux-pro-max.md
2. C:\Users\XxMik\.gemini\antigravity\brain\ae0e9ef0-f43e-451b-8380-ace42fece56d\implementation_plan.md

Execute ONLY Task 5: Enhanced Textarea & File Upload

Target file: c:\Projects\Sun Pac Pallets\src\app\mock-redesign\page.tsx
Target lines: 501-523 (Notes textarea and file upload button)

Requirements:
- Increase textarea rows from 3 to 5
- Add character counter (e.g., "0/500") in bottom-right corner
- Enhance file upload with:
  - Animated shimmer on hover
  - Circular icon container (yellow when file uploaded)
  - "Click to change file" hint after upload
  - "PDF, DWG, or images accepted" hint before upload

Follow the implementation details exactly. Run: npm run build

Summarize what you changed when done.
```

---

## PROMPT 8: Submit Button Celebration

```
Reference files:
1. c:\Projects\Sun Pac Pallets\.agent\workflows\ui-ux-pro-max.md
2. C:\Users\XxMik\.gemini\antigravity\brain\ae0e9ef0-f43e-451b-8380-ace42fece56d\implementation_plan.md

Execute ONLY Task 6: Submit Button Celebration

Target file: c:\Projects\Sun Pac Pallets\src\app\mock-redesign\page.tsx
Target lines: 536-544 (Submit/Next button in footer)

Requirements:
- Add disabled state when required fields (name, email) are empty on Step 3
- When form is valid: button pulses (animate-pulse), stronger yellow glow
- Add shimmer effect on hover
- CheckCircle2 icon should bounce (animate-bounce) on Step 3
- Keep existing "Next Step" behavior for Steps 1-2

Follow the implementation details exactly. Run: npm run build

Summarize what you changed when done.
```

---

## ✅ Verification Checklist (After All 8 Prompts)

After completing all prompts, run the dev server and verify:

```
npm run dev
```

Then check:
- [ ] Focus mode dims page when wizard is active
- [ ] Clicking outside closes wizard
- [ ] Step 1 cards have icons + checkmark badges
- [ ] Step 2 industry cards have checkmark badges
- [ ] Steps 2-3 show config summary bar
- [ ] Step 3 inputs have floating labels
- [ ] Textarea is taller with character counter
- [ ] File upload has enhanced styling
- [ ] Submit button pulses when valid

## Task 9: Final Pro Max Polish (Visuals & Messaging)

**Goal**: Implement the final "Pro Max" visual/copy upgrades to make the form feel cinematic, fast, and premium.

**Target File**: `c:\Projects\Sun Pac Pallets\src\app\mock-redesign\page.tsx`

**Instructions**:
1.  **Idle State Messaging Update**:
    *   Search for the idle state content (around line 258).
    *   Change the H3 to: `"The 30-Second Quote."`
    *   Change the P to: `"No account needed. No phone tag. Just specs."`
    *   Change the Button text to: `"Start My Quote"` (keep arrow icon).

2.  **Cinematic Spotlight & Rim Light**:
    *   Locate the main **Wizard Container** (starts around line 280, generic `div` with `className`).
    *   Update its `className`:
        *   Add `shadow-[0_0_100px_rgba(255,234,5,0.1)]` (The "Spotlight" glow behind it).
        *   Add `border-t border-white/10` (The "Rim Light" on top edge).
        *   Ensure it keeps `backdrop-blur-xl`, `bg-[#121212]/80`, etc.

3.  **Narrative Stepper (Replace "Step 1/3")**:
    *   Locate the header section (around line 287).
    *   Find the `div` containing `STEP {step} / 3`.
    *   **REPLACE** that entire text div with a new "Narrative Stepper" layout:
        ```tsx
        <div className="flex items-center gap-3">
            {['SPECS', 'LOAD', 'FINALIZE'].map((label, i) => (
                <div key={label} className="flex items-center gap-2">
                    <span 
                        className={`text-[10px] font-bold tracking-widest transition-colors duration-500 ${
                            step === i + 1 
                                ? 'text-[#FFEA05] drop-shadow-[0_0_8px_rgba(255,234,5,0.6)]' 
                                : 'text-gray-700'
                        }`}
                    >
                        {label}
                    </span>
                    {i < 2 && <div className="w-1 h-1 rounded-full bg-gray-800" />}
                </div>
            ))}
        </div>
        ```

**Verification**:
- Verify the messaging is punchy.
- Verify the form looks like it's floating in a spotlight.
- Verify the header shows "SPECS > LOAD > FINALIZE" instead of "Step 1 / 3".

## Task 10: Fix Wizard Dimensions (Prevent Shrinking)

**Goal**: The quote wizard "shrinks" when activated because it is trapped inside a `grid-cols-2` column (half width). We need to lift it out of the grid when active so it can be larger (e.g., `max-w-5xl`) and centered on the screen for better accessibility.

**Target File**: `c:\Projects\Sun Pac Pallets\src\app\mock-redesign\page.tsx`

**Instructions**:
1.  **Lift the Container**:
    *   Search for: `<div id="quote-calculator"` (around line 1089).
    *   Replace that **entire wrapper div** (including the `PalletQuoteCalculator` inside it) with this new logic:
    ```tsx
    <div 
        id="quote-calculator" 
        className={`
            transition-all duration-500 ease-in-out
            ${isQuoteActive 
                ? 'fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none' 
                : 'relative animate-in slide-in-from-bottom-8 fade-in duration-700 delay-100'
            }
        `}
    >
        <div className={`transition-all duration-500 ${isQuoteActive ? 'w-full max-w-5xl pointer-events-auto' : 'w-full'}`}>
            <PalletQuoteCalculator ref={calculatorRef} isEmbedded={true} onClose={() => setIsQuoteActive(false)} onOpen={() => setIsQuoteActive(true)} />
        </div>
    </div>
    ```

**Verification**:
- When clicking "Start My Quote", the form should expand to a large, comfortable size (`max-w-5xl`) in the center of the screen.
- It should NOT look "squeezed" or shrink to half-width.

## Task 11: Final Visual Tuning (Contrast & Size)

**Goal**: The user feels the form is "Too Big" now and lacks "Obvious Separation" from the background. We need to tighten the size and drastically increase the contrast.

**Target File**: `c:\Projects\Sun Pac Pallets\src\app\mock-redesign\page.tsx`

**Instructions**:
1.  **Increase Separation (The Overlay)**:
    *   Find the overlay div (around line 1080): `className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm..."`
    *   Change `bg-black/70` to `bg-black/90` (Make it almost solid black).
    *   Keep `backdrop-blur-sm`.

2.  **Tighten the Stage (The Container)**:
    *   Find the container div we just modified (around line 1089): `id="quote-calculator"`.
    *   In the inner div, change `max-w-5xl` to `max-w-4xl`. (3xl might be too small for the side-by-side layout, 4xl is a perfect "Pro" modal size).
    *   *Self-Correction*: The user said "Too Big". Let's stick to `max-w-4xl` first as it's the standard modal width.

3.  **Enhance the Glow (Obvious Separation)**:
    *   Find the `PalletQuoteCalculator` wrapper (the one with `shadow-[0_0_100px...]`).
    *   Boost the shadow opacity slightly: `shadow-[0_0_100px_rgba(255,234,5,0.15)]`.
    *   Ensure the border is visible: `border border-white/10`.

**Verification**:
- The background should fade to near-black, making the form pop.
- The form should be tighter/smaller than before, but still comfortable.

