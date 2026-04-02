"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Locale } from "@/lib/i18n";

interface LangOption {
  locale: Locale;
  flag: string;
  label: string;
  shortLabel: string;
}

const LANG_OPTIONS: LangOption[] = [
  { locale: "pt", flag: "🇧🇷", label: "Português", shortLabel: "PT" },
  { locale: "es", flag: "🇪🇸", label: "Español", shortLabel: "ES" },
  { locale: "en", flag: "🇺🇸", label: "English", shortLabel: "EN" },
];

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      className="inline-flex items-center gap-1 rounded-2xl p-1"
      style={{
        background: "var(--surface)",
        border: "1.5px solid var(--border)",
        boxShadow: "var(--shadow-sm)",
      }}
      role="group"
      aria-label="Language selector"
    >
      {LANG_OPTIONS.map((opt) => {
        const isActive = locale === opt.locale;
        return (
          <button
            key={opt.locale}
            type="button"
            onClick={() => setLocale(opt.locale)}
            title={opt.label}
            aria-pressed={isActive}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 12px",
              borderRadius: "12px",
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: "13px",
              fontWeight: isActive ? 700 : 500,
              transition: "all 0.18s cubic-bezier(0.4,0,0.2,1)",
              background: isActive ? "var(--accent)" : "transparent",
              color: isActive ? "#ffffff" : "var(--text-muted)",
              boxShadow: isActive ? "0 2px 8px var(--accent-glow)" : "none",
              transform: isActive ? "scale(1.02)" : "scale(1)",
            }}
          >
            <span style={{ fontSize: "1.25em", lineHeight: 1 }}>{opt.flag}</span>
            <span className="hidden sm:inline">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
