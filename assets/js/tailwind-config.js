window.tailwind = window.tailwind || {};
tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "surface-container-lowest": "#ffffff",
                "surface-container-highest": "#e1e3e4",
                "surface-dim": "#d9dadb",
                "tertiary-fixed-dim": "#83d99c",
                "on-primary-fixed-variant": "#00530e",
                "on-secondary-fixed-variant": "#22496b",
                "primary-fixed": "#a1f797",
                "inverse-on-surface": "#f0f1f2",
                "error-container": "#ffdad6",
                "on-primary-container": "#f7fff0",
                "on-secondary": "#ffffff",
                "primary-fixed-dim": "#86da7e",
                "outline": "#707a6c",
                "primary": "#156b1d",
                "background": "#f8f9fa",
                "surface-bright": "#f8f9fa",
                "on-error": "#ffffff",
                "on-surface-variant": "#40493d",
                "inverse-primary": "#86da7e",
                "inverse-surface": "#2e3132",
                "surface": "#f8f9fa",
                "secondary-container": "#b0d5fe",
                "secondary-fixed": "#cfe5ff",
                "tertiary": "#056a39",
                "tertiary-container": "#2d8450",
                "tertiary-fixed": "#9ef6b6",
                "on-error-container": "#93000a",
                "outline-variant": "#bfcab9",
                "surface-container-low": "#f3f4f5",
                "on-tertiary-fixed": "#00210e",
                "on-secondary-container": "#375d80",
                "secondary": "#3c6185",
                "secondary-fixed-dim": "#a5caf2",
                "on-primary": "#ffffff",
                "surface-container": "#edeeef",
                "error": "#ba1a1a",
                "on-primary-fixed": "#002203",
                "on-tertiary-fixed-variant": "#00522a",
                "on-background": "#191c1d",
                "surface-variant": "#e1e3e4",
                "on-tertiary": "#ffffff",
                "on-tertiary-container": "#f6fff4",
                "surface-tint": "#186d1f",
                "surface-container-high": "#e7e8e9",
                "on-surface": "#191c1d",
                "on-secondary-fixed": "#001d33",
                "primary-container": "#338534",
                "unphu-green": "#439441",
                "unphu-blue": "#0A3859",
                "unphu-dark": "#006837"
            },
            borderRadius: {
                DEFAULT: "0.25rem",
                lg: "0.5rem",
                xl: "0.75rem",
                "2xl": "1rem",
                "3xl": "1.5rem",
                "4xl": "2rem",
                full: "9999px"
            },
            boxShadow: {
                "soft": "0 10px 30px rgba(0, 0, 0, 0.03)",
                "premium": "0 15px 40px -10px rgba(10, 56, 89, 0.08), 0 10px 25px -12px rgba(10, 56, 89, 0.04)"
            },
            spacing: {
                "section-padding": "120px",
                "stack-md": "20px",
                "stack-lg": "44px",
                "gutter": "36px",
                "stack-sm": "10px",
                "container-max": "1280px"
            },
            fontFamily: {
                "body-lg": ["Lato", "sans-serif"],
                "body-md": ["Lato", "sans-serif"],
                "headline-lg": ["Lato", "sans-serif"],
                "headline-md": ["Lato", "sans-serif"],
                "headline-lg-mobile": ["Lato", "sans-serif"],
                "display-xl": ["Lato", "sans-serif"],
                "label-bold": ["Lato", "sans-serif"]
            },
            fontSize: {
                "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
                "body-md": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
                "headline-lg": ["48px", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "600" }],
                "headline-md": ["32px", { lineHeight: "1.3", fontWeight: "600" }],
                "headline-lg-mobile": ["32px", { lineHeight: "1.2", fontWeight: "600" }],
                "display-xl": ["64px", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
                "label-bold": ["14px", { lineHeight: "1.2", letterSpacing: "0.05em", fontWeight: "700" }]
            }
        }
    }
};
