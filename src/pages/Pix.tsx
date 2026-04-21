import { useState, useEffect } from "react";
import { FUNNEL_CONFIG } from "@/config";
import { store } from "@/store";

const reviews = [
  { initials: "RL", name: "Rogério Lima", stars: 4, text: 'Peguei conversa chamando outro de "meu amor". Print, bloqueio e adeus.', time: "há 12 min" },
  { initials: "LB", name: "Luciana Batista", stars: 4, text: "Peguei conversa dele reclamando de mim pra amante. Se ferrou bonito.", time: "há 40 min" },
  { initials: "BM", name: "Bruno Martins", stars: 5, text: "Ela dizia que ia pra yoga... mas tava no barzinho com ele. App mostrou tudo.", time: "há 54 min" },
  { initials: "PM", name: "Patrícia Monteiro", stars: 5, text: "O relatório veio com fotos na cama que não era a nossa. Acabei o amor e comecei minha paz.", time: "há 40 min" },
  { initials: "ES", name: "Eduardo Silva", stars: 4, text: "Vi ela reclamando de mim e mandando foto pra outro. Me livrei de uma.", time: "há 44 min" },
  { initials: "VX", name: "Vanessa Xavier", stars: 5, text: "Em 10 min vi tudo: conversas, fotos e até prints do Tinder. Chorei e depois ri.", time: "há 7 min" },
];

const faq = [
  { q: "Como vou receber o acesso?", a: "Após a confirmação do Pix, você recebe acesso completo automaticamente em segundos." },
  { q: "O monitoramento é 100% silencioso?", a: "Sim. O sistema opera em segundo plano sem nenhuma notificação na pessoa monitorada." },
  { q: "Funciona mesmo com o WhatsApp bloqueado?", a: "Sim. Mesmo que você tenha sido bloqueado(a), nosso sistema acessa os dados de forma independente." },
  { q: "Os dados são seguros e privados?", a: "Sim. Toda a operação é criptografada e apenas você tem acesso ao relatório gerado." },
];

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={i <= count ? "#f59e0b" : "#d1d5db"}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function Pix() {
  const [timeLeft, setTimeLeft] = useState(7 * 60 + 38);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(t => Math.max(t - 1, 0)), 1000);
    return () => clearInterval(id);
  }, []);

  const fmt = (s: number) =>
    `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  const handlePay = () => window.open(FUNNEL_CONFIG.paymentLink, "_blank");

  const features = [
    {
      icon: <svg width="20" height="20" fill="#ef4444" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>,
      title: "Localização em Tempo Real",
      desc: "Acompanhe movimentos recentes com precisão.",
    },
    {
      icon: <svg width="20" height="20" fill="#25D366" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" /></svg>,
      title: "Conversas do WhatsApp completa",
      desc: "Tenha acesso a todas as mensagens enviadas, excluídas e arquivadas.",
    },
    {
      icon: <svg width="20" height="20" fill="#555" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" /></svg>,
      title: "Acesso 100% anônimo",
      desc: "Ninguém nunca saberá que foi você: zero rastros, zero exposição.",
    },
    {
      icon: <svg width="20" height="20" fill="#25D366" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" /></svg>,
      title: "Proteção contra clonagem",
      desc: "Segurança para a sua privacidade e o que você está fazendo.",
    },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      {/* Profile header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "14px 16px",
        background: "white",
        borderBottom: "1px solid #eee",
      }}>
        <div style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "#e5e7eb",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}>
          <svg width="22" height="22" fill="#9ca3af" viewBox="0 0 24 24">
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
          </svg>
        </div>
        <div>
          <p style={{ fontWeight: 700, fontSize: 14, color: "#111" }}>Perfil WhatsApp</p>
          <p style={{ fontSize: 12, color: "#888" }}>{store.getPhone() || "(XX) XXXXX-XXXX"}</p>
        </div>
      </div>

      <div style={{ padding: "14px", maxWidth: 520, margin: "0 auto" }}>
        {/* Payment card */}
        <div style={{ background: "white", borderRadius: 16, padding: "20px 16px", marginBottom: 14, boxShadow: "0 1px 6px rgba(0,0,0,0.07)" }}>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: "#111", marginBottom: 12 }}>Pagamento via Pix</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 14, color: "#aaa", textDecoration: "line-through" }}>DE {FUNNEL_CONFIG.originalPrice}</span>
            <span style={{ background: "#25D366", color: "white", fontWeight: 700, fontSize: 11, borderRadius: 4, padding: "2px 6px" }}>POR</span>
          </div>
          <p style={{ fontSize: 32, fontWeight: 800, color: "#111", marginBottom: 2 }}>{FUNNEL_CONFIG.salePrice}</p>
          <p style={{ fontSize: 13, color: "#888", marginBottom: 6 }}>desbloqueio único</p>
          <p style={{ fontSize: 12, color: "#25D366", fontWeight: 700, marginBottom: 10, textTransform: "uppercase" }}>
            Apenas hoje {["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"][new Date().getDay()]}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
            <svg width="14" height="14" fill="#25D366" viewBox="0 0 24 24">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2z" />
            </svg>
            <span style={{ fontSize: 13, color: "#555" }}>Pagamento seguro e confirmado automaticamente</span>
          </div>
          <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 8, padding: "10px", textAlign: "center", marginBottom: 12 }}>
            <p style={{ fontSize: 14, color: "#92400e" }}>
              Oferta válida por <span style={{ fontWeight: 700, color: "#d97706" }}>{fmt(timeLeft)}</span>
            </p>
          </div>
          <button
            onClick={handlePay}
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
            }}
          >
            <svg width="18" height="18" fill="white" viewBox="0 0 24 24">
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zm-8 2V5h2v6h1.17L12 13.17 9.83 11H11zm-6 4h14v2H5v-2z" />
            </svg>
            Gerar Pix Agora
          </button>
        </div>

        {/* Features - vertical list */}
        <div style={{ background: "white", borderRadius: 16, overflow: "hidden", marginBottom: 14, boxShadow: "0 1px 6px rgba(0,0,0,0.07)" }}>
          {features.map((f, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 14,
                padding: "16px",
                borderBottom: i < features.length - 1 ? "1px solid #f5f5f5" : "none",
              }}
            >
              <div style={{ marginTop: 1, flexShrink: 0 }}>{f.icon}</div>
              <div>
                <p style={{ fontWeight: 700, fontSize: 14, color: "#111", marginBottom: 3 }}>{f.title}</p>
                <p style={{ fontSize: 13, color: "#888", lineHeight: 1.5 }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Reviews */}
        <div style={{ background: "white", borderRadius: 16, padding: "20px 16px", marginBottom: 14, boxShadow: "0 1px 6px rgba(0,0,0,0.07)" }}>
          <h2 style={{ fontWeight: 700, fontSize: 16, color: "#111", marginBottom: 16 }}>Avaliações recentes</h2>
          <div style={{ overflowX: "auto", marginLeft: -16, marginRight: -16, paddingLeft: 16 }}>
            <div style={{ display: "flex", gap: 12, paddingRight: 16, paddingBottom: 4 }}>
              {reviews.map((r, i) => (
                <div
                  key={i}
                  style={{
                    minWidth: 180,
                    border: "1px solid #f0f0f0",
                    borderRadius: 12,
                    padding: "12px",
                    flexShrink: 0,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <div style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: "#25D366",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontWeight: 700,
                      fontSize: 13,
                      flexShrink: 0,
                    }}>
                      {r.initials}
                    </div>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: 12, color: "#111" }}>{r.name}</p>
                      <Stars count={r.stars} />
                    </div>
                  </div>
                  <p style={{ fontSize: 12, color: "#555", lineHeight: 1.5, marginBottom: 6 }}>{r.text}</p>
                  <p style={{ fontSize: 11, color: "#bbb" }}>{r.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div style={{ background: "white", borderRadius: 16, padding: "20px 16px", marginBottom: 14, boxShadow: "0 1px 6px rgba(0,0,0,0.07)" }}>
          <h2 style={{ fontWeight: 700, fontSize: 16, color: "#111", marginBottom: 14, textAlign: "center" }}>Dúvidas Frequentes</h2>
          {faq.map((item, i) => (
            <div
              key={i}
              style={{ borderBottom: i < faq.length - 1 ? "1px solid #f5f5f5" : "none" }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 0",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  gap: 12,
                }}
              >
                <span style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>{item.q}</span>
                <span style={{ fontSize: 20, color: "#25D366", flexShrink: 0, fontWeight: 300 }}>
                  {openFaq === i ? "−" : "+"}
                </span>
              </button>
              {openFaq === i && (
                <p style={{ fontSize: 13, color: "#666", lineHeight: 1.6, paddingBottom: 14 }}>{item.a}</p>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={handlePay}
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
            marginBottom: 20,
          }}
        >
          Gerar Pix Agora — {FUNNEL_CONFIG.salePrice}
        </button>

        <p style={{ textAlign: "center", fontSize: 12, color: "#bbb", marginBottom: 20 }}>
          © {FUNNEL_CONFIG.year} {FUNNEL_CONFIG.companyName}. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}
