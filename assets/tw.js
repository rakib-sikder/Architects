// Tailwind Play CDN theme — assigned after the CDN script loads (which defines
// the global `tailwind`). The Play runtime re-scans and picks these up.
tailwind.config = {
  theme: {
    extend: {
      colors: {
        concrete: "#EEEAE3",
        paper: "#F6F4EF",
        ink: "#14161B",
        blueprint: "#23486B",
        "blueprint-800": "#1A3350",
        steel: "#6B7178",
        rust: "#C0592C",
        line: "#DBD6CB",
      },
      fontFamily: {
        display: ['"Archivo"', "system-ui", "sans-serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
      maxWidth: { shell: "84rem" },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
      },
      animation: { marquee: "marquee 30s linear infinite" },
    },
  },
};
