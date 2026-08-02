# R8 Estate Design System & Token Reference

This document outlines the spacing scale, color system, typography rules, and shared components implemented to maintain stylistic consistency across all pages and views.

---

## 1. Design Tokens (CSS Variables)

All design system tokens are defined in [index.css](file:///c:/Users/akasi/Desktop/screens/src/index.css) within the Tailwind `@theme` block. They compile into Tailwind classes that can be used directly.

### Spacing Scale (4px Base)
Use these spacing variables to keep padding, margins, and gaps consistent. Do not use custom pixel values.

| Variable Name | Value | Tailwind Class Equivalent (e.g. padding) |
|---|---|---|
| `--space-1` | `4px` | `p-space-1` |
| `--space-2` | `8px` | `p-space-2` |
| `--space-3` | `12px` | `p-space-3` |
| `--space-4` | `16px` | `p-space-4` |
| `--space-6` | `24px` | `p-space-6` |
| `--space-8` | `32px` | `p-space-8` |
| `--space-12` | `48px` | `p-space-12` |
| `--space-16` | `64px` | `p-space-16` |
| `--space-24` | `96px` | `p-space-24` |

### Color Tokens

- **Navy (`--color-navy` / `#0a3d62`)**: Primary branding element. Class: `bg-navy`, `text-navy`.
- **Dark Surface (`--color-surface-dark` / `#0b1329`)**: Main background for premium components. Class: `bg-surface-dark`.
- **Gold/Accent (`--color-accent` / `#fac417`)**: Action and validation color. Hover: `#e5b210`. Class: `bg-accent`, `text-accent`.
- **Success (`--color-verified` / `#10b981`)**: Used for checked validation markers and badges. Class: `text-verified`, `bg-verified/10`.
- **Danger (`--color-danger` / `#ff1744`)**: Climax highlights. Class: `bg-danger`.

### Radius and Border Tokens

- **Radius Sm**: `4px` (`rounded-sm`)
- **Radius Md**: `8px` (`rounded-md`)
- **Radius Lg**: `12px` (`rounded-lg`)
- **Radius Xl**: `16px` (`rounded-xl`)
- **Radius 2Xl**: `24px` (`rounded-2xl`)
- **Radius Full**: `9999px` (`rounded-full`)

---

## 2. Reusable Primitives & Components

All components are fully compatible with the Antigravity Visual Editor (AST-based parsing, static names, proper parent-sibling relationships).

### A. `<Button />`
Located in [Button.jsx](file:///c:/Users/akasi/Desktop/screens/src/components/Button.jsx)

Standard touch-target audited interactive wrapper.

**Props:**
- `variant` (string): `"primary"` (Gold), `"secondary"` (White/border), `"dark"` (Slate-950), `"danger"` (Red), `"ghost"` (Transparent text).
- `size` (string): `"sm"`, `"md"`, `"lg"`.
- `disabled` (boolean): Sets disabled state.
- `onClick` (function): Trigger click handler.
- Standard HTML button attributes (e.g. `type`, `id`, `className`, `style`).

### B. `<Badge />`
Located in [Badge.jsx](file:///c:/Users/akasi/Desktop/screens/src/components/Badge.jsx)

Status tag pill for badges, specializations, and states.

**Props:**
- `variant` (string): `"accent"` (Gold border/bg), `"success"` (Emerald/Green), `"danger"` (Red), `"neutral"` (Slate/Silver text), `"info"` (Navy/Blue tag).
- `size` (string): `"sm"` (narrow line height, 8px font), `"md"` (full padding, 9-10px font).
- Standard HTML span attributes.

### C. `<Card />`
Located in [Card.jsx](file:///c:/Users/akasi/Desktop/screens/src/components/Card.jsx)

Card panel and grid list item container.

**Props:**
- `variant` (string): `"clean"` (Border & light shadow), `"preview"` (Medium shadow & rounded-2xl), `"dark"` (Deep premium gradient & white border), `"custom"` (Zero defaults for inline custom styling).
- `tag` (string/React component): Custom tag wrapper element (defaults to `"div"`).
- Standard HTML container attributes.

### D. `<StatTile />`
Located in [StatTile.jsx](file:///c:/Users/akasi/Desktop/screens/src/components/StatTile.jsx)

Grid-oriented stats panel. Supports text content, counters, icons, and highlight states.

**Props:**
- `value` (React element/string): Stat value to display.
- `label` (string): Metric label.
- `icon` (React node): Lucide icon reference.
- `variant` (string): `"dark"` (Dark preview card grid), `"light"` (Landing page strip stats).
- `highlighted` (boolean): Flag to toggle premium borders and focus styling.
- `activeAccent` (string): Highlights border color (defaults to `#FAC417`).

### E. `<NavBar />`
Located in [NavBar.jsx](file:///c:/Users/akasi/Desktop/screens/src/components/NavBar.jsx)

Global responsive header. Handles language selections (Arabic/English), auth triggers, brand rendering, and layout sync.

**Props:**
- `language` (string): `'en'` or `'ar'`.
- `setLanguage` (function): Triggers language changes.
- `user` (object): User object or `null`.
- `onSignOut` (function): Action to handle logout.
- `onSignInClick` (function): Action to launch AuthModal.
- `translations` (object): Translation object map.
