import { useLocation } from "wouter";
import { Banner, SimpleHeader } from "@/components/Layout";

export default function Step01() {
  const [, setLocation] = useLocation();

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f2f2f2" }}>
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
        }}
      >
        <h1
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: "#111",
            marginBottom: 14,
            lineHeight: 1.2,
          }}
        >
          SEU ACESSO ESTÁ PRONTO!
        </h1>
        <p style={{ color: "#666", fontSize: 15, marginBottom: 32, lineHeight: 1.5 }}>
          Clique em "prosseguir" para acessar gratuitamente.
        </p>

        <button
          onClick={() => setLocation("/step-02")}
          style={{
            background: "#25D366",
            color: "white",
            fontWeight: 700,
            fontSize: 16,
            border: "none",
            borderRadius: 50,
            padding: "16px 40px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
            boxShadow: "0 4px 16px rgba(37,211,102,0.35)",
          }}
        >
          Prosseguir →
        </button>

        <p style={{ color: "#999", fontSize: 13, marginTop: 14 }}>
          100% seguro e confidencial.
        </p>
      </div>
    </div>
  );
}
