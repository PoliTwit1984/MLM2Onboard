# Adobe Fonts Integration Guide

This document covers how Adobe Fonts (Typekit) is integrated into the MLM2PRO Onboarding site.

---

## Overview

The site uses **Acumin Pro ExtraCondensed Bold Italic** for all hero-style headings. This font is served via Adobe Fonts to ensure consistent rendering across all devices.

---

## Adobe Fonts Setup

### 1. Create a Web Project

1. Go to [fonts.adobe.com](https://fonts.adobe.com)
2. Sign in with your Adobe CC account
3. Navigate to **Web Projects**
4. Create a new project (e.g., "MLM2PRO Onboard")
5. Add the required font: **Acumin Pro ExtraCondensed Bold Italic**
   - font-weight: 700
   - font-style: italic

### 2. Get Your Kit ID

After adding fonts, Adobe provides an embed code:
```html
<link rel="stylesheet" href="https://use.typekit.net/odn7cin.css">
```

The Kit ID is `odn7cin` (the part before `.css`).

---

## Code Configuration

### Environment Variables

Add the Kit ID to your `.env` file:
```
VITE_ADOBE_FONTS_KIT_ID=odn7cin
```

For production deployment, pass it as a build-time variable:
```bash
--set-build-env-vars "VITE_ADOBE_FONTS_KIT_ID=odn7cin"
```

### Font Loading (client/src/lib/fonts.ts)

The font is loaded dynamically via JavaScript:
```typescript
export const ensureBrandFontsLoaded = (): void => {
  const kitId = import.meta.env.VITE_ADOBE_FONTS_KIT_ID;
  if (!kitId) return;

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `https://use.typekit.net/${kitId}.css`;
  document.head.appendChild(link);
};
```

### CSS Font-Family Declaration

Use both the Adobe Fonts name and local font name for fallback:
```css
--heading-72-9xl-hero-font-family: "acumin-pro-extra-condensed", "Acumin Pro ExtraCondensed", Helvetica;
```

- `"acumin-pro-extra-condensed"` - Adobe Fonts web name (for visitors)
- `"Acumin Pro ExtraCondensed"` - Local font name (for developers with Adobe CC)
- `Helvetica` - Final fallback

---

## Content Security Policy (CSP)

Adobe Fonts requires specific CSP directives. Add these to `server/index.ts`:

```typescript
contentSecurityPolicy: {
  directives: {
    // Allow font loading scripts from Typekit
    scriptSrc: ["'self'", "'unsafe-inline'", "https://use.typekit.net"],

    // Allow stylesheets from Typekit (unsafe-inline required for font events)
    styleSrc: ["'self'", "'unsafe-inline'", "https://use.typekit.net", "https://p.typekit.net"],

    // Allow font files from Typekit
    fontSrc: ["'self'", "https://use.typekit.net", "https://p.typekit.net"],

    // Allow tracking image for font usage metrics
    imgSrc: ["'self'", "data:", "https:"],  // or specifically "https://p.typekit.net"

    // Optional: Allow performance metrics
    connectSrc: ["'self'", "https://performance.typekit.net"],
  },
},
```

### CSP Summary Table

| Directive | Required Domain | Purpose |
|-----------|----------------|---------|
| script-src | use.typekit.net | Font loading scripts |
| style-src | use.typekit.net, p.typekit.net | Stylesheets + inline styles |
| font-src | use.typekit.net, p.typekit.net | Font files |
| img-src | p.typekit.net | Usage tracking pixel |
| connect-src | performance.typekit.net | Performance metrics (optional) |

**Note:** `'unsafe-inline'` is required in `style-src` for Adobe Fonts to work properly.

---

## Font Usage in the Codebase

### Headings Using Acumin Pro ExtraCondensed Bold Italic

| Component | Text Example |
|-----------|-------------|
| HeroSection.tsx | "MLM2PRO" (96px) |
| QuizSection.tsx | "HELP US GET TO KNOW YOU" (72px) |
| MetricsSection.tsx | "Understand The Data Behind Every Shot" (72px) |
| TroubleshootingHub.tsx | "Get Started Fast with the MLM2PRO Starter Guide" (72px) |
| SignupFormSection.tsx | "TEE TIME CHECKLIST" (48px) |
| CommunityCarousel.tsx | Section heading (72px) |
| FooterSection.tsx | Mission statement text |

### CSS Variables

```css
--heading-28-3xl-hero-font-family: "acumin-pro-extra-condensed", "Acumin Pro ExtraCondensed", Helvetica;
--heading-48-6xl-hero-font-family: "acumin-pro-extra-condensed", "Acumin Pro ExtraCondensed", Helvetica;
--heading-72-9xl-hero-font-family: "acumin-pro-extra-condensed", "Acumin Pro ExtraCondensed", Helvetica;
--heading-96-12xl-hero-font-family: "acumin-pro-extra-condensed", "Acumin Pro ExtraCondensed", Helvetica;
```

All use:
- font-weight: 700
- font-style: italic

---

## Deployment Checklist

1. **Adobe Fonts Web Project** created with correct font variant
2. **Kit ID** added to environment variables
3. **CSP directives** include all required Typekit domains
4. **CSS font-family** includes Adobe Fonts name as primary
5. **Test on device without local font** (e.g., iPhone, incognito mode)

---

## Troubleshooting

### Font not loading on production

1. Check browser DevTools Console for CSP errors
2. Verify Kit ID is passed to build: `VITE_ADOBE_FONTS_KIT_ID`
3. Ensure all CSP directives are in place

### Font looks different locally vs production

- Local: Uses installed Adobe CC font
- Production: Uses Adobe Fonts web version
- Both should render identically if using the same variant

### Rate limiting blocking font requests

If you hit rate limits during testing, the font CSS/files may return 429 errors. Wait for the rate limit to reset or increase the limit temporarily.

---

## References

- [Adobe Fonts CSP Documentation](https://helpx.adobe.com/fonts/using/content-security-policy.html)
- [Adobe Fonts Web Projects](https://fonts.adobe.com/my_fonts#web_projects-section)
