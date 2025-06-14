
import { useState, useCallback } from "react";

type TranslationState = {
  loading: boolean;
  error: string | null;
  translated: string;
};

const LIBRE_TRANSLATE_URL = "https://libretranslate.de/translate";

export function useTranslation() {
  const [state, setState] = useState<TranslationState>({
    loading: false,
    error: null,
    translated: "",
  });

  const translate = useCallback(
    async (text: string, targetLang: string, sourceLang: string = "auto") => {
      setState({ loading: true, error: null, translated: "" });
      try {
        const res = await fetch(LIBRE_TRANSLATE_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            q: text,
            source: sourceLang,
            target: targetLang,
            format: "text",
          }),
        });
        if (!res.ok) throw new Error("Translation API error");
        const data = await res.json();
        setState({ loading: false, error: null, translated: data.translatedText });
        return data.translatedText;
      } catch (e: any) {
        setState({ loading: false, error: e.message || "Error", translated: "" });
        return "";
      }
    },
    [],
  );

  return { ...state, translate };
}
