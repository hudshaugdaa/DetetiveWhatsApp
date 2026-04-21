import { useMemo, useState, useEffect } from "react";
import { useLocation } from "wouter";
import { FUNNEL_CONFIG } from "@/config";
import { store, fakePhone } from "@/store";
import { useUserLocation } from "@/hooks/useUserLocation";

interface MotelInfo {
  name: string;
  lat: string;
  lon: string;
}

async function fetchTopMotel(city: string): Promise<MotelInfo | null> {
  try {
    const q = encodeURIComponent(`motel ${city} Brasil`);
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${q}&format=json&limit=5&accept-language=pt-BR`,
      { signal: AbortSignal.timeout(6000) }
    );
    const data: Array<{ display_name: string; lat: string; lon: string; type: string; class: string }> = await res.json();
    if (data && data.length > 0) {
      const motel = data.find(d => d.class === "tourism" || d.type === "motel") || data[0];
      const rawName = motel.display_name.split(",")[0].trim();
      return { name: rawName, lat: motel.lat, lon: motel.lon };
    }
  } catch {}
  return null;
}

function stateCodeToName(code: string): string {
  const map: Record<string, string> = {
    AC: "Acre", AL: "Alagoas", AP: "Amapá", AM: "Amazonas", BA: "Bahia",
    CE: "Ceará", DF: "Brasília", ES: "Espírito Santo", GO: "Goiás",
    MA: "Maranhão", MT: "Mato Grosso", MS: "Mato Grosso do Sul",
    MG: "Minas Gerais", PA: "Pará", PB: "Paraíba", PR: "Paraná",
    PE: "Pernambuco", PI: "Piauí", RJ: "Rio de Janeiro", RN: "Rio Grande do Norte",
    RS: "Rio Grande do Sul", RO: "Rondônia", RR: "Roraima",
    SC: "Santa Catarina", SP: "São Paulo", SE: "Sergipe", TO: "Tocantins",
  };
  return map[code?.toUpperCase()] || code || "sua cidade";
}

const keywords = [
  { word: '"Safada"', count: 13 },
  { word: '"Amor"', count: 9 },
  { word: '"Segredo"', count: 8 },
  { word: '"Escondido"', count: 6 },
  { word: '"Não conta"', count: 5 },
];

const UnlockBar = ({ onClick }: { onClick: () => void }) => (
  <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "white", padding: "12px 16px", boxShadow: "0 -4px 16px rgba(0,0,0,0.1)", zIndex: 50 }}>
    <button
      onClick={onClick}
      style={{
        width: "100%", maxWidth: 480, margin: "0 auto", display: "flex",
        background: "#25D366", color: "white", fontWeight: 800, fontSize: 14,
        border: "none", borderRadius: 50, padding: "16px", cursor: "pointer",
        letterSpacing: 0.5, alignItems: "center", justifyContent: "center", gap: 8,
      }}
    >
      <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2z" />
      </svg>
      DESBLOQUEAR TUDO POR {FUNNEL_CONFIG.salePrice}
    </button>
  </div>
);

const SectionCard = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: "white", borderRadius: 16, padding: "20px 16px", marginBottom: 14, boxShadow: "0 1px 6px rgba(0,0,0,0.07)" }}>
    {children}
  </div>
);

const SectionTitle = ({ icon, title, color = "#25D366" }: { icon: React.ReactNode; title: string; color?: string }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
    <span style={{ color }}>{icon}</span>
    <h2 style={{ fontSize: 16, fontWeight: 700, color }}>{title}</h2>
  </div>
);

const BlurredAvatar = () => (
  <div style={{
    width: 44, height: 44, borderRadius: "50%",
    background: "linear-gradient(135deg, #bbb, #999)",
    filter: "blur(5px)", flexShrink: 0,
  }} />
);

const GreenBtn = ({ onClick, children }: { onClick: () => void; children: React.ReactNode }) => (
  <button
    onClick={onClick}
    style={{
      width: "100%", background: "#25D366", color: "white", fontWeight: 700,
      fontSize: 13, border: "none", borderRadius: 50, padding: "13px",
      cursor: "pointer", letterSpacing: 0.5, display: "flex",
      alignItems: "center", justifyContent: "center", gap: 8,
    }}
  >
    <svg width="14" height="14" fill="white" viewBox="0 0 24 24">
      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2z" />
    </svg>
    {children}
  </button>
);

export default function Step05() {
  const [, setLocation] = useLocation();
  const { city, stateCode } = useUserLocation();
  const savedPhone = store.getPhone();
  const [motel, setMotel] = useState<MotelInfo | null>(null);

  const displayCity = city || "sua cidade";
  const sc = stateCode || "SP";

  useEffect(() => {
    if (!city) return;
    fetchTopMotel(city).then(setMotel);
  }, [city]);

  const conversations = useMemo(() => [
    { number: fakePhone(sc), msg: "Mensagem apagada recuperada", time: "Ontem" },
    { number: fakePhone(sc), msg: "Áudio suspeito detectado", time: "3 dias" },
    { number: fakePhone(sc), msg: "Fotos suspeitas encontradas", time: "1 semana" },
  ], [sc]);

  const mapSrc = motel
    ? `https://maps.google.com/maps?q=${motel.lat},${motel.lon}&output=embed&hl=pt-BR&z=17`
    : `https://maps.google.com/maps?q=motel+${encodeURIComponent(displayCity)}+${stateCode || ""}&output=embed&hl=pt-BR&z=15`;

  const go = () => setLocation("/pix");

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5", paddingBottom: 90 }}>
      <div style={{ background: "#25D366", paddingTop: 20, paddingBottom: 56, textAlign: "center" }}>
        <h1 style={{ color: "white", fontSize: 22, fontWeight: 800, marginBottom: 16 }}>
          Relatório de Acesso ao WhatsApp
        </h1>
        <div style={{
          width: 70, height: 70, borderRadius: "50%",
          background: "rgba(255,255,255,0.25)", border: "3px solid rgba(255,255,255,0.6)",
          display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto",
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="rgba(255,255,255,0.85)">
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
          </svg>
        </div>
      </div>

      <div style={{ padding: "0 14px", marginTop: -24, maxWidth: 520, margin: "-24px auto 0" }}>

        {/* Análise de Conversas */}
        <SectionCard>
          <SectionTitle
            icon={<svg width="18" height="18" fill="#25D366" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" /></svg>}
            title="Análise de Conversas"
          />
          <p style={{ fontSize: 14, color: "#333", lineHeight: 1.6, marginBottom: 10 }}>
            <span style={{ color: "#f59e0b", fontWeight: 700 }}>3 Conversas Suspeitas</span> foram encontradas durante a análise. O sistema conseguiu recuperar{" "}
            <span style={{ color: "#f59e0b", fontWeight: 700 }}>mensagens apagadas</span> e algumas foram classificadas como{" "}
            <span style={{ color: "#ef4444", fontWeight: 700 }}>críticas</span> com base no conteúdo.
          </p>
          <p style={{ fontSize: 13, color: "#aaa", marginBottom: 16 }}>Toque em uma conversa abaixo para visualizar os detalhes.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {conversations.map((c, i) => (
              <div
                key={i}
                onClick={go}
                style={{ border: "1px solid #f0f0f0", borderRadius: 12, padding: "12px 14px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}
              >
                <BlurredAvatar />
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 700, fontSize: 13, color: "#1d4ed8", marginBottom: 3 }}>{c.number}</p>
                  <p style={{ fontSize: 12, color: "#888", display: "flex", alignItems: "center", gap: 4 }}>
                    <span style={{ color: "#ef4444", fontSize: 16, lineHeight: 1 }}>●</span>
                    {c.msg}
                  </p>
                </div>
                <span style={{ fontSize: 11, color: "#bbb", flexShrink: 0 }}>{c.time}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Mídia Recuperada */}
        <SectionCard>
          <SectionTitle
            icon={<svg width="18" height="18" fill="#25D366" viewBox="0 0 24 24"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" /></svg>}
            title="Mídia Recuperada"
          />
          <p style={{ fontSize: 14, color: "#333", lineHeight: 1.6, marginBottom: 14 }}>
            <span style={{ color: "#ef4444", fontWeight: 700 }}>3 áudios comprometedores</span> foram apagados durante a análise. Além disso, o sistema encontrou{" "}
            <span style={{ color: "#ef4444", fontWeight: 700 }}>31 fotos apagadas</span> que podem conter conteúdo sensível.
          </p>
          <GreenBtn onClick={go}>DESBLOQUEAR ÁUDIOS COMPLETOS</GreenBtn>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 14 }}>
            {[1, 2, 3, 4].map(n => (
              <div
                key={n}
                onClick={go}
                style={{
                  background: "linear-gradient(135deg, #555, #333)",
                  borderRadius: 10, aspectRatio: "1",
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", filter: "blur(2px)",
                }}
              >
                <svg width="24" height="24" fill="rgba(255,255,255,0.8)" viewBox="0 0 24 24">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2z" />
                </svg>
                <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 11, marginTop: 4 }}>Bloqueado</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14 }}>
            <GreenBtn onClick={go}>DESBLOQUEAR TODAS AS FOTOS</GreenBtn>
          </div>
        </SectionCard>

        {/* Palavras-chave */}
        <SectionCard>
          <SectionTitle
            icon={<svg width="18" height="18" fill="#25D366" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" /></svg>}
            title="Palavras-chave Suspeitas"
          />
          <p style={{ fontSize: 14, color: "#333", lineHeight: 1.6, marginBottom: 16 }}>
            O sistema escaneou <span style={{ color: "#ef4444", fontWeight: 700 }}>4.327 mensagens</span> e identificou várias palavras-chave que podem indicar comportamento suspeito.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
            {keywords.map((k, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 14, color: "#333" }}>{k.word}</span>
                <div style={{ background: "#25D366", color: "white", fontWeight: 700, fontSize: 12, borderRadius: 50, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {k.count}
                </div>
              </div>
            ))}
          </div>
          <GreenBtn onClick={go}>VER TODAS AS MENSAGENS</GreenBtn>
        </SectionCard>

        {/* Localização Suspeita */}
        <SectionCard>
          <SectionTitle
            icon={<svg width="18" height="18" fill="#25D366" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>}
            title="Localização Suspeita"
          />
          <p style={{ fontSize: 14, color: "#333", lineHeight: 1.6, marginBottom: 12 }}>
            O número <span style={{ fontWeight: 700 }}>{savedPhone || "detectado"}</span> visitou um{" "}
            <span style={{ color: "#ef4444", fontWeight: 700 }}>motel</span> em {displayCity}.
          </p>

          <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <svg width="18" height="18" fill="#ef4444" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            </svg>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#dc2626" }}>
                {motel ? motel.name : `Motel em ${displayCity}`}
              </p>
              <p style={{ fontSize: 11, color: "#9ca3af" }}>
                {motel ? "Motel mais bem avaliado da região" : "Carregando localização..."} · {displayCity}
              </p>
            </div>
          </div>

          <div style={{ width: "100%", borderRadius: 12, overflow: "hidden", marginBottom: 14, border: "1px solid #eee" }}>
            <iframe
              key={mapSrc}
              width="100%"
              height="220"
              style={{ border: "none", display: "block" }}
              loading="lazy"
              src={mapSrc}
              allowFullScreen
            />
          </div>

          <GreenBtn onClick={go}>VER HISTÓRICO COMPLETO</GreenBtn>
        </SectionCard>

      </div>

      <UnlockBar onClick={go} />
    </div>
  );
}
