/*eslint-env node*/
/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {},
	},
	plugins: [require("daisyui")],
	daisyui: {
		themes: [
			{
				tutorspace: {
					primary: "#7494FB",
					secondary: "#FFFFFF",
					accent: "#2E4756",
					neutral: "#2b3440",
					"base-100": "#ffffff",
					"base-200": "#f8f8f8",
					info: "#3abff8",
					success: "#36d399",
					warning: "#fbbd23",
					error: "#f87272",
				},
			},
			"light",
			{
				tutorspacedark: {
					primary: "#7494FB",
					secondary: "#FFFFFF",
					accent: "#2E4756",
					neutral: "#2b3440",
					"base-100": "#ffffff",
					"base-200": "#f8f8f8",
					info: "#3abff8",
					success: "#36d399",
					warning: "#fbbd23",
					error: "#f87272",
				},
			},
			"dark",
		],
		darkTheme: "tutorspacedark",
	},
};
