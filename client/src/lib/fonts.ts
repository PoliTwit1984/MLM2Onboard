let fontsRequested = false;

/**
 * Load Adobe Fonts kit if the project provides a `VITE_ADOBE_FONTS_KIT_ID`.
 * This keeps the proprietary Acumin family available in production builds
 * without shipping the font files in the repo.
 */
export const ensureBrandFontsLoaded = (): void => {
  if (fontsRequested || typeof document === "undefined") {
    return;
  }

  const kitId = import.meta.env.VITE_ADOBE_FONTS_KIT_ID;
  if (!kitId) {
    return;
  }

  const existing = document.querySelector<HTMLLinkElement>(
    `link[data-adobe-font-kit="${kitId}"]`
  );

  if (existing) {
    fontsRequested = true;
    return;
  }

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `https://use.typekit.net/${kitId}.css`;
  link.dataset.adobeFontKit = kitId;
  link.onload = () => {
    fontsRequested = true;
  };
  link.onerror = () => {
    fontsRequested = false;
    console.warn(`[fonts] Failed to load Adobe Fonts kit "${kitId}".`);
  };

  document.head.appendChild(link);
};

