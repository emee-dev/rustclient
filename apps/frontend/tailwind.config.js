const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	corePlugins: {
		backgroundOpacity: false,
	},
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
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
				victoria: {
					50: "#f3f4fb",
					100: "#e3e6f6",
					200: "#ced4ef",
					300: "#acb7e4",
					400: "#8493d6",
					500: "#6772ca",
					600: "#5458bc",
					700: "#4a49ac",
					800: "#464393",
					900: "#383771",
					950: "#262546",
				},
				"peach-cream": {
					50: "#fff7ed",
					100: "#fff2e0",
					200: "#fed8aa",
					300: "#fdbb74",
					400: "#fb943c",
					500: "#f97516",
					600: "#ea5a0c",
					700: "#c2430c",
					800: "#9a3512",
					900: "#7c2e12",
					950: "#431507",
				},
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
			fontFamily: {
				Fira_Mono: ["Fira Mono", "monospace"],
				Roboto_Flex: ["Roboto Flex", "sans-serif"],
			},
			screens: {
				xs: "475px",
			},
		},
	},
	plugins: [
		require("tailwindcss-animate"),
		require("@tailwindcss/line-clamp"),
		plugin(function ({ addBase, addComponents, addUtilities, theme }) {
			addUtilities({
				"::-webkit-scrollbar": {
					display: "none",
				},
				".no-scrollbar": {
					"-ms-overflow-style": "none",
					"scrollbar-width": "none",
				},
				".fade": {
					background: "linear-gradient(to right, blue, red)",
				},

				".overlay": {
					position: "absolute",
					top: "0",
					left: "0",
					width: "100%",
					height: "100%",
					background:
						"linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))",
					opacity: "0",
					"pointer-events":
						"none" /* Allow clicks to pass through the overlay */,
					"z-index": "2",
					animation: "fadeOverlay 0.5s forwards",
				},
				".variable-row:hover": {
					background: "rgb(220 252 231 / 0.3)",
					borderRadius: "0.3rem",
				},
				".variable-row[data-active]": {
					// background: "rgb(220 252 231 / 0.3)",
					background: "red",
					borderRadius: "0.3rem",
				},

				// ".cm-line": {
				// 	fontFamily: "'Roboto Flex', sans-serif",
				// 	fontSize: "0.94rem",
				// },
			});
		}),
	],
};
