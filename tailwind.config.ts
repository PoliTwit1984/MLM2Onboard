module.exports = {
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        genericblack: "var(--genericblack)",
        genericwhite: "var(--genericwhite)",
        "neutral-100": "var(--neutral-100)",
        "neutral-200": "var(--neutral-200)",
        "neutral-50": "var(--neutral-50)",
        "neutral-500": "var(--neutral-500)",
        "neutral-700": "var(--neutral-700)",
        "neutral-800": "var(--neutral-800)",
        "neutral-900": "var(--neutral-900)",
        "primary-500": "var(--primary-500)",
        "primary600-main": "var(--primary600-main)",
        primarywhite: "var(--primarywhite)",
        "secondarybright-green": "var(--secondarybright-green)",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        "heading-28-3xl-hero": "var(--heading-28-3xl-hero-font-family)",
        "heading-32-4xl-standard": "var(--heading-32-4xl-standard-font-family)",
        "heading-48-6xl-hero": "var(--heading-48-6xl-hero-font-family)",
        "heading-72-9xl-hero": "var(--heading-72-9xl-hero-font-family)",
        "heading-96-12xl-hero": "var(--heading-96-12xl-hero-font-family)",
        "label-12-xs-semibold": "var(--label-12-xs-semibold-font-family)",
        "label-14-sm-semibold": "var(--label-14-sm-semibold-font-family)",
        "label-16-base-semibold": "var(--label-16-base-semibold-font-family)",
        "paragraph-12-xs-semibold":
          "var(--paragraph-12-xs-semibold-font-family)",
        "paragraph-14-sm-medium": "var(--paragraph-14-sm-medium-font-family)",
        "paragraph-14-sm-special-italics":
          "var(--paragraph-14-sm-special-italics-font-family)",
        "paragraph-16-base-medium":
          "var(--paragraph-16-base-medium-font-family)",
        "paragraph-16-base-semibold":
          "var(--paragraph-16-base-semibold-font-family)",
        "paragraph-18-lg-medium": "var(--paragraph-18-lg-medium-font-family)",
        "paragraph-18-lg-semibold":
          "var(--paragraph-18-lg-semibold-font-family)",
        "paragraph-20-xl-medium": "var(--paragraph-20-xl-medium-font-family)",
        "paragraph-24-2xl-semibold":
          "var(--paragraph-24-2xl-semibold-font-family)",
        sans: [
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
  darkMode: ["class"],
};
