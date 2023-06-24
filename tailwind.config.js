/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.{js,ts,jsx,tsx,css}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        backgroundGradient:
          "linear-gradient(270.3deg, rgba(0, 35, 126, 0.6) 0.23%, rgba(0, 35, 126, 0) 36.14%);",
        background: "url('../src/assets/images/common/background.png')",
        backgroundRiskWeather1:
          "linear-gradient(rgba(1,32,109,0.83), rgba(1,32,109,0.83)),url('../src/assets/images/risk_weather/bg1.png');",
        backgroundRiskWeather2:
          "url('../src/assets/images/risk_weather/bg2.png')",
        backgroundRiskWeather3:
          "url('../src/assets/images/risk_weather/bg3.png')",
        backgroundRiskWeather3Mobile:
          "url('../src/assets/images/risk_weather/bg3Mobile.png')",
        backgroundWideEyes: "url('../src/assets/images/wide_eyes/bg.png')",
        backgroundWideEyesMobile:
          "url('../src/assets/images/wide_eyes/bgMobile.png')",
        backgroundState1:
          "linear-gradient(180deg, rgba(90, 131, 254, 0.33) 0%, #040F30 100%), url('../src/assets/images/risk_weather/stateBg1.png')",
        backgroundState2:
          "linear-gradient(180deg, rgba(90, 131, 254, 0.33) 0%, #040F30 100%), url('../src/assets/images/risk_weather/stateBg2.png')",
        backgroundState3:
          "linear-gradient(180deg, rgba(90, 131, 254, 0.33) 0%, #040F30 100%), url('../src/assets/images/risk_weather/stateBg3.png')",
        backgroundState4:
          "linear-gradient(180deg, rgba(90, 131, 254, 0.33) 0%, #040F30 100%), url('../src/assets/images/risk_weather/stateBg4.png')",
        backgroundButton:
          "linear-gradient(0deg, #FCFCFF 72.38%, rgba(252, 252, 255, 0) 89.67%)",
      },
      screens: {
        smMobile: { max: "450px" },
        mobile: { max: "640px" },
        lgMobile: { min: "641px", max: "767px" },
        smLaptop: { max: "950px" },
        laptop: { max: "1279px" },
        desktop: { min: "1280px" },
      },
      borderRadius: {
        10: "10px",
        20: "20px",
        60: "60px",
      },
      colors: {
        blue: "#0148FF",
        purple: "#8736FF",
        "light-purple": "#F8EFFF",
        black: "#111111",
        "dark-gray": "#1F2937",
        gray: "#374151",
        "light-gray": "#4b5563",
        "white-400": "rgba(255, 255, 255, 0.4)",
        "white-500": "rgba(255, 255, 255, 0.5)",
        "white-700": "rgba(255, 255, 255, 0.7);",
        "lighter-gray": "#9CA3AF",
      },
      translate: {
        half: "-50%",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};