import "./globals.css";
export const metadata = { title: "Faizan Ahmed — Full Stack AI Developer", description: "Full stack and AI engineer building intelligent web applications, agents and RAG systems." };
export const viewport = { themeColor: "#000000", interactiveWidget: "resizes-content", width: "device-width", initialScale: 1 };
export default function RootLayout({ children }) {
  return (<html lang="en"><head>
    <link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Ubuntu:wght@400;500;700&display=swap" />
  </head><body>{children}</body></html>);
}
