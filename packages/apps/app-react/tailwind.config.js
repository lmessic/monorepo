/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{tsx, ts, jsx, js}"],
	theme: {
		extend: {
			spacing: {
				13: "3.25rem",
				"6xl": "65rem",
				"5/7": "71.4%",
				"2/7": "28.6%",
			},
			colors: {
				primary: "var(--color-primary)",
				secondary: "var(--color-secondary)",
				bg: "var(--color-bg)",
				text: "var(--color-text)",
				card: "var(--color-card)",
				border: "var(--color-border)",
				success: "var(--color-success)",
			},
			boxShadow: {
				card: "var(--card-shadow)",
			},
		},
	},
	plugins: [],
	darkMode: "class",
};
