import { ReactNode, useEffect, useState } from "react";

interface LayoutProps {
  children: ReactNode;
  showBanner?: boolean;
  showWhatsAppHeader?: boolean;
  showSimpleHeader?: boolean;
}

const WhatsAppIcon = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="16" fill="#25D366" />
    <path
      d="M16 7C11.03 7 7 11.03 7 16c0 1.63.44 3.15 1.2 4.47L7 25l4.67-1.18A9 9 0 0016 25c4.97 0 9-4.03 9-9s-4.03-9-9-9zm4.46 12.31c-.19.53-1.1.98-1.52 1.04-.41.06-.83.09-2.67-.56-2.24-.79-3.69-3.03-3.8-3.17-.11-.14-.89-1.18-.89-2.26s.56-1.6.77-1.82c.2-.22.44-.28.59-.28h.42c.14 0 .32-.05.5.38.19.44.63 1.53.68 1.64.06.11.1.24.02.39-.08.15-.12.24-.24.38-.12.14-.25.3-.36.41-.12.12-.24.24-.1.47.14.23.61.99 1.3 1.6.89.79 1.64 1.03 1.87 1.15.23.11.37.09.5-.05.14-.15.57-.65.72-.87.15-.22.3-.18.5-.11.21.07 1.3.61 1.52.72.22.11.37.17.42.27.06.1.06.58-.12 1.12z"
      fill="white"
    />
  </svg>
);

const DownloadIcon = () => (
  <button
    style={{
      width: 44,
      height: 44,
      borderRadius: "50%",
      background: "#25D366",
      border: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      flexShrink: 0,
    }}
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
      <path d="M19 9h-4V3H9v6H5l7 7 7-7zm-8 2V5h2v6h1.17L12 13.17 9.83 11H11zm-6 4h14v2H5v-2z" />
    </svg>
  </button>
);

const HamburgerIcon = () => (
  <button
    style={{
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: 4,
    }}
  >
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.2">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  </button>
);

export function Banner() {
  const [dateStr, setDateStr] = useState("");
  useEffect(() => {
    const now = new Date();
    const d = String(now.getDate()).padStart(2, "0");
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const y = now.getFullYear();
    setDateStr(`${d}/${m}/${y}`);
  }, []);

  return (
    <div
      style={{
        background: "#d32f2f",
        color: "white",
        textAlign: "center",
        fontWeight: 700,
        fontSize: 13,
        padding: "8px 12px",
        letterSpacing: 0.2,
      }}
    >
      APENAS HOJE {dateStr} TESTE GRÁTIS.
    </div>
  );
}

export function SimpleHeader() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 16px",
        background: "white",
        borderBottom: "1px solid #eee",
      }}
    >
      <HamburgerIcon />
      <div />
      <DownloadIcon />
    </div>
  );
}

export function WhatsAppHeader() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 16px",
        background: "white",
        borderBottom: "1px solid #eee",
      }}
    >
      <HamburgerIcon />
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <WhatsAppIcon size={32} />
        <span style={{ fontWeight: 700, fontSize: 18, color: "#25D366" }}>WhatsApp</span>
      </div>
      <DownloadIcon />
    </div>
  );
}

export default function Layout({ children, showBanner, showWhatsAppHeader, showSimpleHeader }: LayoutProps) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#fff" }}>
      {showBanner && <Banner />}
      {showSimpleHeader && <SimpleHeader />}
      {showWhatsAppHeader && <WhatsAppHeader />}
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}
