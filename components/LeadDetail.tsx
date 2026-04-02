"use client";

import { useState, useEffect } from "react";
import { Lead, SearchParams } from "@/types";
import {
  ArrowLeft,
  Copy,
  MapPin,
  Phone,
  Globe,
  Star,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import Markdown from "react-markdown";
import { GoogleGenAI } from "@google/genai";
import { COUNTRIES } from "@/lib/constants";
import { useLanguage } from "@/contexts/LanguageContext";

interface LeadDetailProps {
  lead: Lead;
  searchParams: SearchParams;
  onBack: () => void;
}

/* ── Score Ring ───────────────────────────────── */
function ScoreRing({ score }: { score: number }) {
  const { t } = useLanguage();
  const r = 44;
  const circ = 2 * Math.PI * r;
  const filled = (score / 100) * circ;

  const isHigh = score > 60;
  const isMid  = score > 30 && score <= 60;

  const color      = isHigh ? "var(--danger)"      : isMid ? "var(--warning)"      : "var(--success)";
  const trackColor = isHigh ? "var(--danger-bg)"   : isMid ? "var(--warning-bg)"   : "var(--success-bg)";
  const label      = isHigh ? t.detail.scoreHigh   : isMid ? t.detail.scoreMid     : t.detail.scoreLow;
  const badgeClass = isHigh ? "score-high"         : isMid ? "score-mid"           : "score-low";

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-[112px] h-[112px]">
        <svg
          width="112"
          height="112"
          className="absolute inset-0"
          style={{ transform: "rotate(-90deg)" }}
        >
          <circle cx="56" cy="56" r={r} fill="none" stroke={trackColor} strokeWidth="7" />
          <circle
            cx="56" cy="56" r={r}
            fill="none"
            stroke={color}
            strokeWidth="7"
            strokeDasharray={`${filled} ${circ}`}
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 4px ${color}60)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-3xl font-bold leading-none"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            {score}
          </span>
          <span className="text-xs mt-0.5" style={{ color: "var(--text-subtle)" }}>/ 100</span>
        </div>
      </div>
      <span className={`score-badge ${badgeClass}`}>{label}</span>
    </div>
  );
}

/* ── Info row ─────────────────────────────────── */
function InfoRow({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "var(--text-subtle)" }} />
      <div className="text-sm" style={{ color: "var(--text-muted)" }}>
        {children}
      </div>
    </div>
  );
}

/* ── Main Component ───────────────────────────── */
export function LeadDetail({ lead, searchParams, onBack }: LeadDetailProps) {
  const { t } = useLanguage();
  const [report, setReport]     = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError]       = useState<string | null>(null);
  const [copied, setCopied]     = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const fetchReport = async () => {
      try {
        setIsLoading(true);
        const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

        const countryData = COUNTRIES.find((c) => c.value === searchParams.country);
        const language    = countryData?.language ?? "pt-BR";

        const reportTemplates: Record<string, { languageInstruction: string; intro: string; sections: string }> = {
          "pt-BR": {
            languageInstruction: "Responda SEMPRE em português do Brasil (pt-BR).",
            intro: "Você é um consultor de vendas B2B especialista em IA.",
            sections: `
          Gere um relatório de oportunidade de vendas completo em formato Markdown (pt-BR).
          O relatório DEVE conter as seguintes seções (use headers h2 ##):

          ## Diagnóstico Digital
          (Analise o que está faltando ou fraco na presença online deles com base nos dados acima)

          ## Análise de Avaliações
          (Resumo do sentimento das avaliações e reclamações comuns, se houver)

          ## Por que esta empresa precisa de IA
          (Conecte as dores específicas deles com o serviço de IA oferecido pelo usuário)

          ## Abordagem de Vendas Sugerida
          (Como o usuário deve abordar este lead, o que dizer na primeira mensagem/ligação)

          ## Impacto Estimado
          (O que a IA poderia melhorar para eles em termos de negócios/faturamento/tempo)`,
          },
          "pt-PT": {
            languageInstruction: "Responda SEMPRE em português europeu (pt-PT).",
            intro: "É um consultor de vendas B2B especialista em IA.",
            sections: `
          Gere um relatório de oportunidade de vendas em Markdown (pt-PT) com as seguintes secções:
          ## Diagnóstico Digital
          ## Análise de Avaliações
          ## Por que esta empresa precisa de IA
          ## Abordagem de Vendas Sugerida
          ## Impacto Estimado`,
          },
          es: {
            languageInstruction: "Responda SIEMPRE en español.",
            intro: "Eres un consultor de ventas B2B especialista en IA.",
            sections: `
          Genera un informe completo en Markdown (español) con las secciones:
          ## Diagnóstico Digital
          ## Análisis de Reseñas
          ## Por qué esta empresa necesita IA
          ## Enfoque de Ventas Sugerido
          ## Impacto Estimado`,
          },
          en: {
            languageInstruction: "ALWAYS respond in English.",
            intro: "You are a B2B sales consultant specializing in AI.",
            sections: `
          Generate a complete Markdown report (English) with sections:
          ## Digital Diagnosis
          ## Review Analysis
          ## Why This Business Needs AI
          ## Suggested Sales Approach
          ## Estimated Impact`,
          },
        };

        const tpl = reportTemplates[language] ?? reportTemplates["pt-BR"];

        const reviewsLabel: Record<string, string>    = { "pt-BR": "Avaliações recentes", "pt-PT": "Avaliações recentes", es: "Reseñas recientes", en: "Recent reviews" };
        const noReviewsLabel: Record<string, string>  = { "pt-BR": "Nenhuma avaliação detalhada disponível.", "pt-PT": "Nenhuma avaliação detalhada disponível.", es: "No hay reseñas detalladas disponibles.", en: "No detailed reviews available." };
        const starsLabel: Record<string, string>      = { "pt-BR": "estrelas", "pt-PT": "estrelas", es: "estrellas", en: "stars" };

        const reviewsText =
          lead.reviews
            ?.map((r: any) => `- ${r.rating} ${starsLabel[language] ?? "stars"}: "${r.text?.text}"`)
            .join("\n") || noReviewsLabel[language];

        const reportPrompt = `
          ${tpl.languageInstruction}
          ${tpl.intro}
          The user is trying to sell the following service: "${searchParams.service}".

          Lead data:
          Name: ${lead.name}
          Address: ${lead.address}
          Rating: ${lead.rating} (${lead.userRatingCount} reviews)
          Website: ${lead.websiteUri ? "Yes" : "No"}
          Phone: ${lead.nationalPhoneNumber ? "Yes" : "No"}
          Types: ${lead.types?.join(", ")}

          ${reviewsLabel[language] ?? "Recent reviews"}:
          ${reviewsText}
          ${tpl.sections}
        `;

        const reportResponse = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: reportPrompt,
        });

        setReport(reportResponse.text || t.detail.reportError);
      } catch (err: any) {
        console.error("Report error:", err);
        setError(err.message || t.detail.reportError);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReport();
  }, [lead, searchParams]);

  const copyToClipboard = () => {
    if (report) {
      navigator.clipboard.writeText(report);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">

      {/* ── Top bar ── */}
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="btn-ghost -ml-2">
          <ArrowLeft className="w-4 h-4" />
          {t.detail.backToResults}
        </button>

        <button
          onClick={copyToClipboard}
          disabled={!report || isLoading}
          className="btn-outline-sm"
          style={copied ? { color: "var(--success)", borderColor: "var(--success-border)" } : undefined}
        >
          {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? t.detail.copied : t.detail.copyEmail}
        </button>
      </div>

      {/* ── Content grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* ── Left: business info + score ── */}
        <div className="space-y-5">

          {/* Business card */}
          <div className="card p-6">
            <h1
              className="text-xl font-bold mb-1 leading-snug"
              style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
            >
              {lead.name}
            </h1>

            <div className="flex items-center gap-2 text-xs mb-5" style={{ color: "var(--text-muted)" }}>
              <span className="capitalize">{lead.primaryType?.replace(/_/g, " ")}</span>
              <span style={{ color: "var(--border-hover)" }}>•</span>
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5" style={{ color: "var(--warning)" }} />
                <span style={{ color: "var(--text)" }}>{lead.rating || "N/A"}</span>
                <span>({lead.userRatingCount || 0})</span>
              </div>
            </div>

            <div className="space-y-3.5">
              <InfoRow icon={MapPin}>{lead.address}</InfoRow>

              <InfoRow icon={Phone}>
                {lead.nationalPhoneNumber ? (
                  <a href={`tel:${lead.nationalPhoneNumber}`} style={{ color: "var(--accent)" }} className="hover:underline">
                    {lead.nationalPhoneNumber}
                  </a>
                ) : (
                  <span className="italic" style={{ color: "var(--text-subtle)" }}>{t.detail.noAddress}</span>
                )}
              </InfoRow>

              <InfoRow icon={Globe}>
                {lead.websiteUri ? (
                  <a
                    href={lead.websiteUri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate block hover:underline"
                    style={{ color: "var(--accent)" }}
                  >
                    {lead.websiteUri}
                  </a>
                ) : (
                  <span className="italic" style={{ color: "var(--text-subtle)" }}>{t.detail.noAddress}</span>
                )}
              </InfoRow>

              {lead.googleMapsUri && (
                <div className="pt-3 mt-1 border-t" style={{ borderColor: "var(--border)" }}>
                  <a
                    href={lead.googleMapsUri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium flex items-center gap-1.5 hover:underline"
                    style={{ color: "var(--accent)" }}
                  >
                    {t.detail.maps}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Score card */}
          <div className="card p-6 flex flex-col items-center text-center">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: "var(--text-subtle)" }}
            >
              Digital Pain Score
            </p>
            <ScoreRing score={lead.digitalPainScore} />
            <p className="text-xs mt-5 leading-relaxed max-w-[180px]" style={{ color: "var(--text-muted)" }}>
              {lead.digitalPainScore > 60
                ? t.detail.scoreHighDesc
                : lead.digitalPainScore > 30
                  ? t.detail.scoreMidDesc
                  : t.detail.scoreLowDesc}
            </p>
          </div>
        </div>

        {/* ── Right: AI report ── */}
        <div className="lg:col-span-2">
          <div
            className="card min-h-[600px] flex flex-col overflow-hidden"
            style={{
              borderTopColor: lead.digitalPainScore > 60
                ? "var(--danger)"
                : lead.digitalPainScore > 30
                  ? "var(--warning)"
                  : "var(--success)",
              borderTopWidth: "3px",
            }}
          >

            {/* Report header */}
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "var(--border)" }}>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" style={{ color: "var(--accent)" }} />
                <span className="text-sm font-semibold" style={{ color: "var(--text)" }}>
                  {t.detail.aiReport}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor: isLoading ? "var(--warning)" : error ? "var(--danger)" : "var(--success)",
                  }}
                />
                <span className="text-xs" style={{ color: "var(--text-subtle)" }}>
                  {isLoading ? t.detail.generating : error ? "Erro" : "Gemini AI"}
                </span>
              </div>
            </div>

            {/* Report body */}
            <div className="p-6 flex-1">
              {isLoading ? (
                <div className="space-y-4 pt-2">
                  {/* Skeleton loader */}
                  {[...Array(5)].map((_, idx) => (
                    <div key={idx} style={{ animationDelay: `${idx * 120}ms` }}>
                      <div className="skeleton h-3.5 mb-2" style={{ width: idx % 2 === 0 ? "45%" : "60%" }} />
                      <div className="skeleton h-2.5 mb-1.5" style={{ width: "100%" }} />
                      <div className="skeleton h-2.5 mb-1.5" style={{ width: "92%" }} />
                      <div className="skeleton h-2.5" style={{ width: "76%" }} />
                    </div>
                  ))}
                  <div className="flex items-center gap-2 pt-2" style={{ color: "var(--text-muted)" }}>
                    <div
                      className="w-4 h-4 rounded-full border-2 animate-spin shrink-0"
                      style={{ borderColor: "var(--border)", borderTopColor: "var(--accent)" }}
                    />
                    <span className="text-xs">{t.detail.generateHint}</span>
                  </div>
                </div>
              ) : error ? (
                <div
                  className="flex flex-col items-center justify-center h-full py-24 gap-4"
                  style={{ color: "var(--danger)" }}
                >
                  <AlertCircle className="w-10 h-10 opacity-70" />
                  <div className="text-center">
                    <p className="text-sm font-medium">{error}</p>
                  </div>
                  <button
                    onClick={() => window.location.reload()}
                    className="btn-outline-sm"
                    style={{ borderColor: "var(--danger-border)", color: "var(--danger)" }}
                  >
                    {t.detail.reportError}
                  </button>
                </div>
              ) : report ? (
                <div className="report-prose">
                  <Markdown>{report}</Markdown>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
