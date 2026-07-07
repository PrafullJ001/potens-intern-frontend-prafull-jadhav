import { useState, useRef, useEffect } from "react";
import { Mic, Square } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import { speechService } from "../services/speechService";
import { cx } from "../utils/helpers";

export default function VoiceRecorder({ onTranscript }) {
  const { t, lang } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [supported] = useState(() => speechService.isSupported());
  const controllerRef = useRef(null);

  // stop any active recognition if the component unmounts mid-listen
  useEffect(() => {
    return () => controllerRef.current?.stop();
  }, []);

  function handleToggle() {
    if (isListening) {
      controllerRef.current?.stop();
      setIsListening(false);
      return;
    }

    setIsListening(true);
    controllerRef.current = speechService.start({
      lang: lang === "mr" ? "mr-IN" : "en-IN",
      onResult: (transcript) => {
        onTranscript(transcript);
      },
      onEnd: () => setIsListening(false),
      onError: () => setIsListening(false),
    });
  }

  if (!supported) {
    return (
      <p className="text-xs text-slate-400 italic break-words">
        {t("details.voiceUnsupported")}
      </p>
    );
  }

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5 break-words">
        {t("details.voiceLabel")}
      </label>
      <button
        type="button"
        onClick={handleToggle}
        aria-pressed={isListening}
        aria-label={isListening ? t("details.voiceListening") : t("details.voiceStart")}
        className={cx(
          "w-full min-h-[48px] flex items-center justify-center gap-2.5 py-3.5 px-3 rounded-xl border transition-all duration-200 touch-manipulation",
          isListening
            ? "border-red-200 bg-red-50 text-red-600"
            : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
        )}
      >
        <span className="relative flex items-center justify-center shrink-0">
          {isListening && (
            <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-60 animate-ping" />
          )}
          {isListening ? (
            <Square size={16} className="relative fill-current" />
          ) : (
            <Mic size={18} className="relative" strokeWidth={1.75} />
          )}
        </span>
        <span className="text-sm font-medium break-words">
          {isListening ? t("details.voiceListening") : t("details.voiceStart")}
        </span>
      </button>
    </div>
  );
}