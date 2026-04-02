"use client";

import { useState, useRef, useEffect } from "react";
import { COUNTRIES } from "@/lib/constants";
import { SearchParams } from "@/types";
import {
  Search,
  MapPin,
  Target,
  Globe,
  Sparkles,
  ArrowRight,
  Zap,
  TrendingUp,
  FileText,
  ChevronDown,
  Check,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface SearchFormProps {
  onSearch: (params: SearchParams) => void;
  isLoading: boolean;
}

/* ── Country flag map ──────────────────────────── */
const COUNTRY_FLAGS: Record<string, string> = {
  BR: "🇧🇷", PT: "🇵🇹", ES: "🇪🇸", US: "🇺🇸", MX: "🇲🇽",
  AR: "🇦🇷", CO: "🇨🇴", CL: "🇨🇱", PE: "🇵🇪", UY: "🇺🇾",
  PY: "🇵🇾", EC: "🇪🇨", BO: "🇧🇴", VE: "🇻🇪", GB: "🇬🇧",
  CA: "🇨🇦", AU: "🇦🇺",
};

const STATE_PLACEHOLDERS: Record<string, string> = {
  ES: "Madrid",  US: "California", PT: "Lisboa",   MX: "Jalisco",
  AR: "Córdoba", CO: "Antioquia",  CL: "Valparaíso", PE: "Lima",
  UY: "Montevidéu", PY: "Asunción", EC: "Guayaquil", BO: "Santa Cruz",
  VE: "Caracas", GB: "England",   CA: "Ontario",   AU: "New South Wales",
};

const CITY_PLACEHOLDERS: Record<string, string> = {
  BR: "São Paulo", PT: "Porto",     ES: "Barcelona",  US: "New York",
  MX: "Guadalajara", AR: "Buenos Aires", CO: "Bogotá", CL: "Santiago",
  PE: "Lima",     UY: "Montevidéu", PY: "Asunción",  EC: "Quito",
  BO: "La Paz",   VE: "Caracas",   GB: "London",     CA: "Toronto",
  AU: "Sydney",
};

/* ── Decorative mini-card ──────────────────────── */
function MiniCard({ name, type, city, score, scoreClass, className, style }: {
  name: string; type: string; city: string; score: number; scoreClass: string; className?: string; style?: React.CSSProperties;
}) {
  return (
    <div
      className={className}
      style={{
        background: "rgba(255,255,255,0.90)",
        border: "1.5px solid rgba(79,70,229,0.12)",
        borderRadius: 14,
        padding: "10px 12px",
        width: 168,
        boxShadow: "0 4px 16px rgba(79,70,229,0.10), 0 1px 4px rgba(15,23,42,0.06)",
        backdropFilter: "blur(8px)",
        ...style,
      }}
    >
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <div className="text-xs font-bold truncate" style={{ color: "var(--text)", maxWidth: 100 }}>{name}</div>
        <span className={`score-badge ${scoreClass} shrink-0`}>{score}</span>
      </div>
      <div className="text-[10px] font-medium" style={{ color: "var(--accent)", opacity: 0.8 }}>{type}</div>
      <div className="text-[10px] mt-0.5" style={{ color: "var(--text-subtle)" }}>{city}</div>
    </div>
  );
}

/* ── Feature pill ──────────────────────────────── */
function FeaturePill({ icon: Icon, label }: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  label: string;
}) {
  return (
    <div
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full"
      style={{
        background: "var(--surface)",
        border: "1.5px solid var(--border)",
        color: "var(--text-muted)",
        boxShadow: "var(--shadow-xs)",
      }}
    >
      <Icon className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} />
      {label}
    </div>
  );
}

/* ── Premium Custom Select ─────────────────────── */
interface SelectOption { value: string; label: string; }

function CustomSelect({
  value,
  onChange,
  options,
  label,
  icon: Icon,
  showFlags = false,
  searchable = true,
  emptyLabel,
  searchPlaceholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: SelectOption[];
  label: React.ReactNode;
  icon?: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  showFlags?: boolean;
  searchable?: boolean;
  emptyLabel?: string;
  searchPlaceholder?: string;
}) {
  const [open, setOpen]   = useState(false);
  const [query, setQuery] = useState("");
  const wrapRef   = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  /* Close on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* Focus search on open */
  useEffect(() => {
    if (open && searchable) {
      const t = setTimeout(() => inputRef.current?.focus(), 40);
      return () => clearTimeout(t);
    }
  }, [open, searchable]);

  /* Close on Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); setQuery(""); } };
    if (open) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  const filtered = query
    ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
    : options;

  const selected = options.find((o) => o.value === value);
  const displayLabel = selected?.label || emptyLabel || "";
  const flag = showFlags && value ? COUNTRY_FLAGS[value] : null;

  return (
    <div ref={wrapRef} className="custom-sel-wrap">
      <button
        type="button"
        onClick={() => { setOpen((v) => !v); if (open) setQuery(""); }}
        className={`custom-sel-trigger${open ? " open" : ""}`}
      >
        <div className="custom-sel-inner">
          <span className="custom-sel-label">
            {Icon && <Icon className="w-3 h-3 inline mr-1" />}
            {label}
          </span>
          <span className="custom-sel-value">
            {flag && <span style={{ fontSize: "1.1em", lineHeight: 1 }}>{flag}</span>}
            <span className="truncate">{displayLabel}</span>
          </span>
        </div>
        <ChevronDown className="custom-sel-chevron" />
      </button>

      {open && (
        <div className="custom-sel-dropdown">
          {searchable && (
            <div className="custom-sel-search">
              <Search className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--text-subtle)" }} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchPlaceholder || "Search..."}
              />
            </div>
          )}
          <div className="custom-sel-list">
            {filtered.length > 0 ? (
              filtered.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => { onChange(opt.value); setOpen(false); setQuery(""); }}
                  className={`custom-sel-option${value === opt.value ? " sel-active" : ""}`}
                >
                  {showFlags && COUNTRY_FLAGS[opt.value] && (
                    <span style={{ fontSize: "1.15em", lineHeight: 1 }}>{COUNTRY_FLAGS[opt.value]}</span>
                  )}
                  <span className="flex-1 text-left truncate">{opt.label}</span>
                  {value === opt.value && (
                    <Check className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--accent)" }} />
                  )}
                </button>
              ))
            ) : (
              <p className="custom-sel-empty">{searchPlaceholder ? "—" : "No results"}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════════ */
export function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const { t } = useLanguage();
  const [icp, setIcp]       = useState("");
  const [service, setService] = useState("");
  const [country, setCountry] = useState("BR");
  const [state, setState]   = useState("SP");
  const [city, setCity]     = useState("");

  const selectedCountry = COUNTRIES.find((c) => c.value === country);
  const countryStates   = selectedCountry?.states ?? [];

  const handleCountryChange = (v: string) => { setCountry(v); setState(""); };
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onSearch({ icp, service, country, state, city }); };

  /* Options for the country dropdown */
  const countryOptions: SelectOption[] = COUNTRIES.map((c) => ({ value: c.value, label: c.label }));

  /* Options for the state dropdown */
  const stateOptions: SelectOption[] = [
    { value: "", label: t.form.allCountry },
    ...countryStates.map((s) => ({ value: s.value, label: `${s.label} (${s.value})` })),
  ];

  const mockLeads = [
    { ...t.hero.mockLeads[0], score: 87, scoreClass: "score-high" },
    { ...t.hero.mockLeads[1], score: 62, scoreClass: "score-mid"  },
    { ...t.hero.mockLeads[2], score: 74, scoreClass: "score-mid"  },
  ];

  return (
    <div className="max-w-2xl mx-auto">

      {/* ── Hero ──────────────────────────────── */}
      <section className="hero-aurora text-center rounded-3xl pt-12 pb-8 px-6 mb-8 relative">
        {/* Dot grid texture */}
        <div className="hero-grid-overlay" />
        <div className="relative z-10">

          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold mb-8"
            style={{
              background: "var(--accent-light)",
              border: "1.5px solid rgba(79,70,229,0.2)",
              color: "var(--accent)",
              boxShadow: "0 2px 8px var(--accent-glow-sm)",
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {t.hero.badge}
          </div>

          {/* Headline */}
          <h1
            className="text-5xl sm:text-6xl font-black leading-[1.05] tracking-tight mb-5"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            {t.hero.headline1}
            <br />
            <span className="gradient-text">{t.hero.headline2}</span>
          </h1>

          <p
            className="text-base max-w-sm mx-auto leading-relaxed mb-8"
            style={{ color: "var(--text-muted)" }}
          >
            {t.hero.subtitle}
          </p>

          {/* Floating mock lead cards */}
          <div className="flex justify-center gap-4 mb-9 flex-wrap">
            <MiniCard {...mockLeads[0]} className="float-card-1" />
            <MiniCard {...mockLeads[1]} className="float-card-2" style={{ marginTop: -12 } as React.CSSProperties} />
            <MiniCard {...mockLeads[2]} className="float-card-3 hidden sm:block" />
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-2.5">
            <div className="card-stagger" style={{ animationDelay: "200ms" }}>
              <FeaturePill icon={Zap}        label={t.hero.pills.leads} />
            </div>
            <div className="card-stagger" style={{ animationDelay: "300ms" }}>
              <FeaturePill icon={TrendingUp} label={t.hero.pills.painScore} />
            </div>
            <div className="card-stagger" style={{ animationDelay: "400ms" }}>
              <FeaturePill icon={FileText}   label={t.hero.pills.report} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Form card ─────────────────────────── */}
      <div
        className="rounded-2xl"
        style={{
          background: "var(--surface)",
          border: "1.5px solid var(--border)",
          boxShadow: "0 4px 24px rgba(15,23,42,0.08), 0 1px 4px rgba(15,23,42,0.04)",
        }}
      >
        {/* Card top bar */}
        <div
          className="flex items-center justify-between px-7 py-3.5 border-b rounded-t-2xl"
          style={{
            background: "linear-gradient(to right, var(--accent-light), #F8F5FF)",
            borderColor: "rgba(79,70,229,0.12)",
          }}
        >
          <div className="flex items-center gap-2">
            <Target className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} />
            <span className="text-xs font-bold tracking-wide uppercase" style={{ color: "var(--accent)" }}>
              {t.form.title}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-subtle)" }}>
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse-dot"
              style={{ backgroundColor: "var(--success)", display: "inline-block" }}
            />
            {t.form.aiActive}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-7 space-y-5">

          {/* ── ICP field ── */}
          <div>
            <div className="fl fl-ta-wrap">
              <textarea
                required
                value={icp}
                onChange={(e) => setIcp(e.target.value)}
                placeholder=" "
                rows={3}
                className="fl-ta"
              />
              <label className="fl-lbl">{t.form.icp.label}</label>
            </div>
            <p className="text-xs mt-1.5 ml-1" style={{ color: "var(--text-subtle)" }}>
              {t.form.icp.hint}
            </p>
          </div>

          {/* ── Service field ── */}
          <div>
            <div className="fl fl-ta-wrap">
              <textarea
                required
                value={service}
                onChange={(e) => setService(e.target.value)}
                placeholder=" "
                rows={3}
                className="fl-ta"
              />
              <label className="fl-lbl">{t.form.service.label}</label>
            </div>
            <p className="text-xs mt-1.5 ml-1" style={{ color: "var(--text-subtle)" }}>
              {t.form.service.hint}
            </p>
          </div>

          {/* ── Location divider ── */}
          <div className="flex items-center gap-3 pt-1">
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" style={{ color: "var(--accent)", opacity: 0.7 }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-subtle)" }}>
                {t.form.location}
              </span>
            </div>
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
          </div>

          {/* ── Country — premium custom select ── */}
          <CustomSelect
            value={country}
            onChange={handleCountryChange}
            options={countryOptions}
            label={t.form.country}
            icon={Globe}
            showFlags
            searchable
            searchPlaceholder={t.form.searchPlaceholder}
          />

          {/* ── State + City ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* State */}
            {countryStates.length > 0 ? (
              <CustomSelect
                value={state}
                onChange={setState}
                options={stateOptions}
                label={t.form.stateRegion}
                searchable={countryStates.length > 6}
                emptyLabel={t.form.allCountry}
                searchPlaceholder={t.form.searchPlaceholder}
              />
            ) : (
              <div className="fl fl-in-wrap">
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder=" "
                  className="fl-in"
                />
                <label className="fl-lbl">
                  {STATE_PLACEHOLDERS[country] ? `${t.form.stateRegion} (ex: ${STATE_PLACEHOLDERS[country]})` : t.form.stateRegion}
                </label>
              </div>
            )}

            {/* City */}
            <div className="fl fl-in-wrap">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder=" "
                className="fl-in"
              />
              <label className="fl-lbl">
                {CITY_PLACEHOLDERS[country] ? `${t.form.city} (ex: ${CITY_PLACEHOLDERS[country]})` : `${t.form.city} (${t.form.allCountry.toLowerCase()})`}
              </label>
            </div>
          </div>

          {/* ── Submit ── */}
          <div className="pt-2">
            <button type="submit" disabled={isLoading} className="btn-prime w-full">
              {isLoading ? (
                <>
                  <div
                    className="w-4 h-4 border-2 rounded-full animate-spin"
                    style={{ borderColor: "rgba(255,255,255,0.3)", borderTopColor: "white" }}
                  />
                  {t.form.searching}
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  {t.form.searchBtn}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="text-center text-xs mt-3" style={{ color: "var(--text-subtle)" }}>
              {isLoading ? t.form.searchingHint : t.form.footer}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
