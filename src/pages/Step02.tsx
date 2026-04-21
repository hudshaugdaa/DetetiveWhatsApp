import { useLocation } from "wouter";
import { Banner, SimpleHeader } from "@/components/Layout";
import { FUNNEL_CONFIG } from "@/config";

const PersonIcon = () => (
  <div
    style={{
      width: 40,
      height: 40,
      borderRadius: "50%",
      background: "rgba(255,255,255,0.3)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }}
  >
    <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
    </svg>
  </div>
);

export default function Step02() {
  const [, setLocation] = useLocation();

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#fff" }}>
      <Banner />
      <SimpleHeader />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 24px",
          textAlign: "center",
          maxWidth: 480,
          margin: "0 auto",
          width: "100%",
        }}
      >
        <h1
          style={{
            fontSize: 30,
            fontWeight: 800,
            color: "#111",
            marginBottom: 14,
            lineHeight: 1.2,
          }}
        >
          Proteja Seu Relacionamento
        </h1>
        <p style={{ color: "#666", fontSize: 15, marginBottom: 36, lineHeight: 1.6 }}>
          Localização em tempo real, áudios, fotos e vídeos excluídos! Resultados em 2 minutos, totalmente discreto.
        </p>

        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 14 }}>
          <button
            onClick={() => setLocation("/step-03")}
            style={{
              background: "#25D366",
              color: "white",
              fontWeight: 700,
              fontSize: 16,
              border: "none",
              borderRadius: 12,
              padding: "18px 20px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 14,
              width: "100%",
              boxShadow: "0 4px 16px rgba(37,211,102,0.3)",
            }}
          >
            <PersonIcon />
            <span style={{ flex: 1, textAlign: "center" }}>Quero Monitorar Meu Parceiro</span>
          </button>

          <button
            onClick={() => setLocation("/step-03")}
            style={{
              background: "#25D366",
              color: "white",
              fontWeight: 700,
              fontSize: 16,
              border: "none",
              borderRadius: 12,
              padding: "18px 20px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 14,
              width: "100%",
              boxShadow: "0 4px 16px rgba(37,211,102,0.3)",
            }}
          >
            <PersonIcon />
            <span style={{ flex: 1, textAlign: "center" }}>Quero Monitorar Minha Parceira</span>
          </button>
        </div>
      </div>

      <footer
        style={{
          textAlign: "center",
          padding: "20px 16px",
          borderTop: "1px solid #f0f0f0",
          fontSize: 13,
          color: "#999",
          lineHeight: 1.8,
        }}
      >
        <div>
          <a href="#" style={{ color: "#999", textDecoration: "none", marginRight: 16 }}>Política de Privacidade</a>
          <a href="#" style={{ color: "#999", textDecoration: "none" }}>Termos de Uso</a>
        </div>
        <div>
          <a href="#" style={{ color: "#999", textDecoration: "none" }}>Suporte por Email</a>
        </div>
        <div style={{ marginTop: 6 }}>© {FUNNEL_CONFIG.year} {FUNNEL_CONFIG.companyName}. Todos os direitos reservados.</div>
      </footer>
    </div>
  );
}
