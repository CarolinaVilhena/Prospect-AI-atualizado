import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
      style={{ backgroundColor: "var(--bg)" }}
    >
      {/* Aurora orbs — decorative */}
      <div aria-hidden="true" style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)",
          width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(79,70,229,0.08) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", top: "40%", left: "20%",
          width: 300, height: 300, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)",
        }} />
      </div>

      <div className="relative z-10 max-w-md mx-auto">
        {/* Logo */}
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 mb-10 group"
        >
          <div
            className="p-1.5 rounded-lg"
            style={{ backgroundColor: "var(--accent)" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
              <path d="M20 2v4" /><path d="M22 4h-4" /><circle cx="4" cy="20" r="2" />
            </svg>
          </div>
          <span
            className="font-bold text-lg tracking-tight"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            Prospect<span style={{ color: "var(--accent)" }}>AI</span>
          </span>
        </Link>

        {/* 404 badge */}
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold mb-6"
          style={{
            background: "var(--danger-bg, #FEF2F2)",
            border: "1.5px solid var(--danger-border, rgba(239,68,68,0.2))",
            color: "var(--danger, #DC2626)",
          }}
        >
          Erro 404
        </div>

        {/* Headline */}
        <h1
          className="text-5xl font-black tracking-tight mb-4"
          style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
        >
          Página não<br />
          <span className="gradient-text">encontrada</span>
        </h1>

        <p
          className="text-base leading-relaxed mb-8"
          style={{ color: "var(--text-muted)" }}
        >
          A página que você está procurando não existe ou foi movida.
          <br />
          Volte para a busca e encontre seus próximos clientes.
        </p>

        {/* CTA */}
        <Link
          href="/"
          className="btn-prime inline-flex"
          style={{ textDecoration: "none" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
          </svg>
          Voltar ao início
        </Link>

        {/* Footer hint */}
        <p
          className="text-xs mt-6"
          style={{ color: "var(--text-subtle)" }}
        >
          ProspectAI · Powered by Gemini AI + Google Maps
        </p>
      </div>
    </div>
  );
}
