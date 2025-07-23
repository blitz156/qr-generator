import { useUser } from "./UserContext";
import TRANSLATIONS from "../translations";

// Карта языков для toLocaleString
const LOCALE_MAP = {
  ru: "ru-RU",
  en: "en-US",
  es: "es-ES",
  fr: "fr-FR",
  de: "de-DE",
  it: "it-IT",
  zh: "zh-CN",
  ja: "ja-JP",
  pt: "pt-PT",
  ar: "ar-EG",
  hi: "hi-IN",
  tr: "tr-TR",
  ko: "ko-KR",
  pl: "pl-PL",
  uk: "uk-UA",
  nl: "nl-NL",
  sv: "sv-SE",
};

export default function useTranslations() {
  const { userInfo } = useUser();
  const lang = userInfo?.language || "en";

  // Транслятор по ключу
  const t = (key) => {
    if (TRANSLATIONS[key] && TRANSLATIONS[key][lang]) {
      return TRANSLATIONS[key][lang];
    }
    // fallback: английский или ключ
    return TRANSLATIONS[key]?.en || key;
  };

  // Форматтер дат с учетом языка
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    const locale = LOCALE_MAP[lang] || "en-US";
    return d.toLocaleString(locale);
  };

  return { t, formatDate, lang };
}
