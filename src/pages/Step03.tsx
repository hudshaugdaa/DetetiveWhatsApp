import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { WhatsAppHeader } from "@/components/Layout";
import { FUNNEL_CONFIG } from "@/config";
import { store, fakePhone } from "@/store";
import { useUserLocation } from "@/hooks/useUserLocation";

function buildNotifications(stateCode: string): string[] {
  const sc = stateCode || "SP";
  return [
    `${fakePhone(sc)} de ${stateCodeToName(sc)} está sendo clonado agora...`,
    `${fakePhone(sc)} está com localização sendo rastreada!`,
    `${fakePhone(sc)} de ${stateCodeToName(sc)} teve o WhatsApp clonado com sucesso!`,
    `${fakePhone(sc)} teve mensagens apagadas recuperadas!`,
    `${fakePhone(sc)} de ${stateCodeToName(sc)} teve fotos suspeitas encontradas!`,
    `${fakePhone(sc)} está sendo monitorado agora...`,
    `${fakePhone(sc)} teve áudios comprometedores detectados!`,
  ];
}

function stateCodeToName(code: string): string {
  const map: Record<string, string> = {
    AC: "Acre", AL: "Alagoas", AP: "Amapá", AM: "Amazonas", BA: "Bahia",
    CE: "Ceará", DF: "Distrito Federal", ES: "Espírito Santo", GO: "Goiás",
    MA: "Maranhão", MT: "Mato Grosso", MS: "Mato Grosso do Sul",
    MG: "Minas Gerais", PA: "Pará", PB: "Paraíba", PR: "Paraná",
    PE: "Pernambuco", PI: "Piauí", RJ: "Rio de Janeiro", RN: "Rio Grande do Norte",
    RS: "Rio Grande do Sul", RO: "Rondônia", RR: "Roraima",
    SC: "Santa Catarina", SP: "São Paulo", SE: "Sergipe", TO: "Tocantins",
  };
  return map[code.toUpperCase()] || code;
}

export default function Step03() {
  const [, setLocation] = useLocation();
  const [phone, setPhone] = useState("");
  const { stateCode } = useUserLocation();
  const [notifications, setNotifications] = useState<string[]>([]);
  const [popup, setPopup] = useState<string | null>(null);
  const indexRef = useRef(0);
  const keyRef = useRef(0);

  useEffect(() => {
    const notifs = buildNotifications(stateCode);
    setNotifications(notifs);
    indexRef.current = 0;

    const show = () => {
      const all = buildNotifications(stateCode || "SP");
      setPopup(all[indexRef.current % all.length]);
      indexRef.current++;
      keyRef.current++;
    };
    show();
    const id = setInterval(show, 4500);
    return () => clearInterval(id);
  }, [stateCode]);

  const formatPhone = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 11);
    if (!d) return "";
    if (d.length <= 2) return `(${d}`;
    if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  };

  const handleSubmit = () => {
    store.setPhone(phone);
    setLocation("/step-04");
  };

  const displayNotifs = notifications.length > 0 ? notifications.slice(0, 3) : [
    "Aguardando localização...",
    "Conectando aos servidores...",
    "Sistema pronto para monitorar...",
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f0fdf4" }}>
      <WhatsAppHeader />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "32px 20px 80px", maxWidth: 480, margin: "0 auto", width: "100%" }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#111", textAlign: "center", marginBottom: 12, lineHeight: 1.25 }}>
          Parabéns, você ganhou 1 acesso gratuito!
        </h1>
        <p style={{ color: "#666", fontSize: 15, textAlign: "center", marginBottom: 24, lineHeight: 1.5 }}>
          Insira o número abaixo e inicie o monitoramento silencioso.
        </p>

        <input
          type="tel"
          value={phone}
          onChange={e => setPhone(formatPhone(e.target.value))}
          placeholder="(99) 99999-9999"
          style={{
            width: "100%",
            border: "1.5px solid #ddd",
            borderRadius: 10,
            padding: "14px 16px",
            fontSize: 16,
            color: "#333",
            marginBottom: 12,
            background: "white",
            outline: "none",
          }}
        />

        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            background: "#25D366",
            color: "white",
            fontWeight: 700,
            fontSize: 16,
            border: "none",
            borderRadius: 10,
            padding: "16px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            marginBottom: 24,
            boxShadow: "0 4px 16px rgba(37,211,102,0.3)",
          }}
        >
          <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
          </svg>
          Clonar WhatsApp Agora
        </button>

        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
          {displayNotifs.map((n, i) => (
            <div key={i} style={{ background: "#dcfce7", borderRadius: 12, padding: "12px 14px", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="14" height="14" fill="white" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
              </div>
              <p style={{ fontSize: 13, color: "#333", lineHeight: 1.4 }}>{n}</p>
            </div>
          ))}
        </div>
      </div>

      {popup && (
        <div
          key={keyRef.current}
          className="notification-popup"
          style={{
            position: "fixed",
            bottom: 16,
            left: 16,
            right: 16,
            maxWidth: 440,
            margin: "0 auto",
            background: "white",
            borderRadius: 12,
            padding: "12px 14px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
            display: "flex",
            alignItems: "center",
            gap: 10,
            zIndex: 99,
          }}
        >
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="14" height="14" fill="white" viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
            </svg>
          </div>
          <p style={{ fontSize: 12, color: "#333" }}>{popup}</p>
        </div>
      )}

      <footer style={{ textAlign: "center", padding: "16px", fontSize: 12, color: "#aaa", borderTop: "1px solid #e5e5e5", background: "white" }}>
        <span style={{ marginRight: 12 }}><a href="#" style={{ color: "#aaa", textDecoration: "none" }}>Política de Privacidade</a></span>
        <span style={{ marginRight: 12 }}><a href="#" style={{ color: "#aaa", textDecoration: "none" }}>Termos de Uso</a></span>
        <span><a href="#" style={{ color: "#aaa", textDecoration: "none" }}>Suporte por Email</a></span>
        <div style={{ marginTop: 4 }}>© {FUNNEL_CONFIG.year} {FUNNEL_CONFIG.companyName}. Todos os direitos reservados.</div>
      </footer>
    </div>
  );
}
