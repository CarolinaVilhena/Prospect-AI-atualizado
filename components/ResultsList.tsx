"use client";

import { useState } from "react";
import { Lead } from "@/types";
import {
  LayoutGrid,
  List,
  Star,
  MapPin,
  Building2,
  ExternalLink,
  Phone,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface ResultsListProps {
  results: Lead[];
  onSelectLead: (lead: Lead) => void;
  onBack: () => void;
}

type ViewMode = "card" | "table";

interface ScoreCfg {
  scoreClass: string;
  label: string;
  barColor: string;
  textColor: string;
  leftBorder: string;
}

function getScoreCfg(score: number, scoreHigh: string, scoreMid: string, scoreLow: string): ScoreCfg {
  if (score > 60) return {
    scoreClass: "score-high",
    label: scoreHigh,
    barColor: "var(--danger)",
    textColor: "var(--danger)",
    leftBorder: "var(--danger)",
  };
  if (score > 30) return {
    scoreClass: "score-mid",
    label: scoreMid,
    barColor: "var(--warning)",
    textColor: "var(--warning)",
    leftBorder: "var(--warning)",
  };
  return {
    scoreClass: "score-low",
    label: scoreLow,
    barColor: "var(--success)",
    textColor: "var(--success)",
    leftBorder: "var(--success)",
  };
}

/* ── Mini score bar ────────────────────────────── */
function ScoreBar({ score, color }: { score: number; color: string }) {
  return (
    <div className="flex items-center gap-2 mt-2">
      <div
        className="flex-1 h-1.5 rounded-full overflow-hidden"
        style={{ background: "var(--surface-2)" }}
      >
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${score}%`, background: color }}
        />
      </div>
      <span className="text-[10px] font-bold tabular-nums" style={{ color }}>
        {score}
      </span>
    </div>
  );
}

/* ════════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════════ */
export function ResultsList({ results, onSelectLead, onBack }: ResultsListProps) {
  const { t } = useLanguage();
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    if (typeof window !== "undefined") {
      const s = localStorage.getItem("prospectai-view-mode");
      if (s === "card" || s === "table") return s;
    }
    return "card";
  });

  const toggleView = (mode: ViewMode) => {
    setViewMode(mode);
    localStorage.setItem("prospectai-view-mode", mode);
  };

  return (
    <div className="space-y-6">

      {/* ── Page header ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={onBack}
            className="btn-ghost -ml-2 mb-2"
            style={{ fontSize: 13 }}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {t.results.newSearch}
          </button>
          <h2
            className="text-3xl font-black tracking-tight leading-none"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            <span className="gradient-text">{results.length}</span> leads
          </h2>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            {t.results.subtitle}
          </p>
        </div>

        {/* View toggle */}
        <div className="view-toggle">
          <button
            onClick={() => toggleView("card")}
            className={cn("view-toggle-btn", viewMode === "card" && "active")}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.results.viewCards}</span>
          </button>
          <button
            onClick={() => toggleView("table")}
            className={cn("view-toggle-btn", viewMode === "table" && "active")}
          >
            <List className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.results.viewTable}</span>
          </button>
        </div>
      </div>

      {/* ── Card view ────────────────────────── */}
      {viewMode === "card" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {results.map((lead, i) => {
            const cfg = getScoreCfg(lead.digitalPainScore, t.results.scoreHigh, t.results.scoreMid, t.results.scoreLow);
            return (
              <div
                key={lead.id}
                className="lead-card card-stagger"
                style={{ animationDelay: `${i * 55}ms` }}
                onClick={() => onSelectLead(lead)}
              >
                {/* Left color accent bar */}
                <div className="flex flex-1">
                  <div
                    className="w-1 shrink-0 rounded-l-[16px]"
                    style={{ background: cfg.leftBorder }}
                  />

                  <div className="flex-1 flex flex-col">
                    <div className="p-5">
                      {/* Name + badge */}
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3
                          className="font-bold text-base leading-snug line-clamp-2 flex-1"
                          style={{ color: "var(--text)" }}
                        >
                          {lead.name}
                        </h3>
                        <span className={`score-badge ${cfg.scoreClass} shrink-0`}>
                          {lead.digitalPainScore}
                        </span>
                      </div>

                      {/* Pain score bar */}
                      <ScoreBar score={lead.digitalPainScore} color={cfg.barColor} />

                      {/* Meta */}
                      <div className="mt-3.5 space-y-1.5">
                        <div className="flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
                          <Building2 className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{lead.primaryType?.replace(/_/g, " ") || t.results.localBusiness}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
                          <MapPin className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{lead.city}, {lead.state}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Star className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--warning)" }} />
                          <span style={{ color: "var(--text)" }}>{lead.rating || "N/A"}</span>
                          <span style={{ color: "var(--text-subtle)" }}>({lead.userRatingCount || 0} {t.results.reviews})</span>
                        </div>
                      </div>

                      {/* AI Summary */}
                      {lead.aiSummary && (
                        <div
                          className="mt-4 rounded-xl p-3 border text-xs italic leading-relaxed line-clamp-3"
                          style={{
                            background: "var(--surface-2)",
                            borderColor: "var(--border)",
                            color: "var(--text-muted)",
                          }}
                        >
                          &quot;{lead.aiSummary}&quot;
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    <div
                      className="flex items-center justify-between px-5 py-3 border-t mt-auto"
                      style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}
                    >
                      <span className="text-xs font-semibold" style={{ color: cfg.textColor }}>
                        {cfg.label}
                      </span>
                      <span
                        className="text-xs font-bold flex items-center gap-0.5"
                        style={{ color: "var(--accent)" }}
                      >
                        {t.results.viewReport}
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* ── Table view ───────────────────────── */
        <div
          className="rounded-2xl overflow-hidden overflow-x-auto"
          style={{
            background: "var(--surface)",
            border: "1.5px solid var(--border)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <table className="w-full text-sm text-left">
            <thead
              className="text-xs uppercase"
              style={{
                background: "linear-gradient(to right, var(--surface-2), #F5F7FF)",
                borderBottom: "1.5px solid var(--border)",
                color: "var(--text-subtle)",
              }}
            >
              <tr>
                <th className="px-5 py-3.5 font-bold tracking-wider">{t.results.tableCompany}</th>
                <th className="px-5 py-3.5 font-bold tracking-wider">{t.results.tableLocation}</th>
                <th className="px-5 py-3.5 font-bold tracking-wider">{t.results.tableRating}</th>
                <th className="px-5 py-3.5 font-bold tracking-wider">{t.results.tableScore}</th>
                <th className="px-5 py-3.5 font-bold tracking-wider">{t.results.tableContact}</th>
                <th className="px-5 py-3.5 font-bold tracking-wider text-right">{t.results.tableAction}</th>
              </tr>
            </thead>
            <tbody>
              {results.map((lead) => {
                const cfg = getScoreCfg(lead.digitalPainScore, t.results.scoreHigh, t.results.scoreMid, t.results.scoreLow);
                return (
                  <tr
                    key={lead.id}
                    className="cursor-pointer transition-colors"
                    style={{ borderBottom: "1px solid var(--border)" }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLTableRowElement).style.background = "var(--surface-2)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLTableRowElement).style.background = "transparent")
                    }
                    onClick={() => onSelectLead(lead)}
                  >
                    <td className="px-5 py-4">
                      {/* Left border accent */}
                      <div className="flex items-start gap-2">
                        <div
                          className="w-0.5 self-stretch shrink-0 rounded-full mt-0.5"
                          style={{ background: cfg.leftBorder, minHeight: 32 }}
                        />
                        <div>
                          <div className="font-bold truncate max-w-[180px]" style={{ color: "var(--text)" }} title={lead.name}>
                            {lead.name}
                          </div>
                          <div className="text-xs mt-0.5 truncate max-w-[180px]" style={{ color: "var(--text-muted)" }}>
                            {lead.primaryType?.replace(/_/g, " ")}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap" style={{ color: "var(--text-muted)" }}>
                      {lead.city}, {lead.state}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Star className="w-3.5 h-3.5" style={{ color: "var(--warning)" }} />
                        <span className="font-bold" style={{ color: "var(--text)" }}>{lead.rating || "—"}</span>
                        <span className="text-xs" style={{ color: "var(--text-subtle)" }}>
                          ({lead.userRatingCount || 0})
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`score-badge ${cfg.scoreClass}`}>{lead.digitalPainScore}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-3">
                        {lead.nationalPhoneNumber ? (
                          <a
                            href={`tel:${lead.nationalPhoneNumber}`}
                            title={lead.nationalPhoneNumber}
                            onClick={(e) => e.stopPropagation()}
                            className="transition-colors"
                            style={{ color: "var(--text-subtle)" }}
                            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)")}
                            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-subtle)")}
                          >
                            <Phone className="w-4 h-4" />
                          </a>
                        ) : (
                          <Phone className="w-4 h-4" style={{ color: "var(--border-hover)" }} />
                        )}
                        {lead.websiteUri ? (
                          <a
                            href={lead.websiteUri}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="transition-colors"
                            style={{ color: "var(--text-subtle)" }}
                            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)")}
                            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-subtle)")}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        ) : (
                          <ExternalLink className="w-4 h-4" style={{ color: "var(--border-hover)" }} />
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={(e) => { e.stopPropagation(); onSelectLead(lead); }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all"
                        style={{
                          background: "var(--accent-light)",
                          color: "var(--accent)",
                          border: "1px solid rgba(79,70,229,0.15)",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.background = "var(--accent)";
                          (e.currentTarget as HTMLButtonElement).style.color = "white";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.background = "var(--accent-light)";
                          (e.currentTarget as HTMLButtonElement).style.color = "var(--accent)";
                        }}
                      >
                        {t.results.viewReport}
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
