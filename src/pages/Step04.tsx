import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { WhatsAppHeader } from "@/components/Layout";
import { store } from "@/store";
import { useUserLocation } from "@/hooks/useUserLocation";

const LOAD_STEPS = [
  { icon: "📞", label: "Verificando número de telefone...", doneLabel: "Número de telefone válido!" },
  { icon: "🗄️", label: "Analisando base de dados..." },
  { icon: "👤", label: "Buscando informações de perfil..." },
  { icon: "📍", label: "Detectando localização do dispositivo..." },
];

export default function Step04() {
  const [, setLocation] = useLocation();
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "result">("loading");
  const { city, loading: locLoading } = useUserLocation();
  const savedPhone = store.getPhone();

  useEffect(() => {
    const total = 4000;
    const step = 50;
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + (100 / (total / step)), 100);
      setProgress(Math.round(current));
      if (current >= 100) {
        clearInterval(timer);
        setTimeout(() => setPhase("result"), 600);
      }
    }, step);
    return () => clearInterval(timer);
  }, []);

  const stepsDone = Math.floor((progress / 100) * LOAD_STEPS.length);
  const displayCity = city || (locLoading ? "Detectando..." : "sua cidade");
  const displayPhone = savedPhone || "(XX) XXXXX-XXXX";

  if (phase === "result") {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f0fdf4" }}>
        <WhatsAppHeader />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "32px 20px 80px", maxWidth: 480, margin: "0 auto", width: "100%" }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111", textAlign: "center", marginBottom: 10, lineHeight: 1.25 }}>
            Processando Acesso ao WhatsApp
          </h1>
          <p style={{ color: "#666", fontSize: 14, textAlign: "center", marginBottom: 28, lineHeight: 1.5 }}>
            Aguarde enquanto conectamos aos servidores e preparamos seu acesso.
          </p>

          <div style={{ width: "100%", background: "white", borderRadius: 16, padding: "24px 20px", boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", border: "3px solid #25D366", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fff8" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="#9ca3af">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              </div>
            </div>

            <p style={{ fontWeight: 700, fontSize: 16, color: "#111", textAlign: "center", marginBottom: 4 }}>Perfil WhatsApp</p>
            <p style={{ color: "#888", fontSize: 13, textAlign: "center", marginBottom: 6 }}>{displayPhone}</p>
            <p style={{ color: "#25D366", fontSize: 13, textAlign: "center", marginBottom: 20 }}>● Online há poucos minutos</p>

            <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: 16 }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 16 }}>
                <svg width="18" height="18" fill="#666" viewBox="0 0 24 24" style={{ marginTop: 1, flexShrink: 0 }}>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <div>
                  <p style={{ fontSize: 12, color: "#aaa" }}>Motel visitado em:</p>
                  <p style={{ fontSize: 15, fontWeight: 700, color: "#111" }}>{city || (locLoading ? "Detectando..." : "Cidade não detectada")}</p>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 20 }}>
                <svg width="18" height="18" fill="#666" viewBox="0 0 24 24" style={{ marginTop: 1, flexShrink: 0 }}>
                  <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" />
                </svg>
                <div>
                  <p style={{ fontSize: 12, color: "#aaa" }}>Status do dispositivo</p>
                  <p style={{ fontSize: 15, fontWeight: 700, color: "#111" }}>Ativo</p>
                </div>
              </div>

              <button
                onClick={() => setLocation("/step-05")}
                style={{
                  width: "100%",
                  background: "#25D366",
                  color: "white",
                  fontWeight: 700,
                  fontSize: 15,
                  border: "none",
                  borderRadius: 50,
                  padding: "14px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
                  <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99l1.5 1.5z" />
                </svg>
                Acessar Relatório
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f0fdf4" }}>
      <WhatsAppHeader />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "32px 20px 80px", maxWidth: 480, margin: "0 auto", width: "100%" }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111", textAlign: "center", marginBottom: 10, lineHeight: 1.25 }}>
          Processando Acesso ao WhatsApp
        </h1>
        <p style={{ color: "#666", fontSize: 14, textAlign: "center", marginBottom: 28, lineHeight: 1.5 }}>
          Aguarde enquanto conectamos aos servidores e preparamos seu acesso.
        </p>

        <div style={{ width: "100%", background: "white", borderRadius: 16, padding: "24px 20px", boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
            <svg className="spinner" width="52" height="52" viewBox="0 0 52 52">
              <circle cx="26" cy="26" r="22" fill="none" stroke="#e5e7eb" strokeWidth="4" />
              <circle cx="26" cy="26" r="22" fill="none" stroke="#25D366" strokeWidth="4"
                strokeDasharray={`${(progress / 100) * 138.2} 138.2`}
                strokeLinecap="round" transform="rotate(-90 26 26)" />
            </svg>
          </div>

          <div style={{ width: "100%", background: "#e5e7eb", borderRadius: 50, height: 8, marginBottom: 8, overflow: "hidden" }}>
            <div style={{ height: "100%", background: "#25D366", borderRadius: 50, width: `${progress}%`, transition: "width 0.1s linear" }} />
          </div>
          <p style={{ fontSize: 13, color: "#666", marginBottom: 20 }}>Conectando aos servidores... {progress}%</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {LOAD_STEPS.map((s, i) => {
              const done = i < stepsDone;
              const active = i === stepsDone;
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 16, width: 22, textAlign: "center" }}>{s.icon}</span>
                  <p style={{ fontSize: 13, color: done ? "#25D366" : active ? "#333" : "#aaa", fontWeight: done ? 600 : 400 }}>
                    {done && s.doneLabel ? s.doneLabel : s.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
