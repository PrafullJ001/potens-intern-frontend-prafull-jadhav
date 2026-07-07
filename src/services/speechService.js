const SpeechRecognition =
  typeof window !== "undefined" &&
  (window.SpeechRecognition || window.webkitSpeechRecognition);

export const speechService = {
  isSupported() {
    return !!SpeechRecognition;
  },

  // returns a controller { stop() } — call onResult(text) as final transcripts arrive
  start({ lang = "en-IN", onResult, onEnd, onError }) {
    if (!SpeechRecognition) {
      onError?.(new Error("unsupported"));
      return { stop: () => {} };
    }

    const recognition = new SpeechRecognition();
    recognition.lang = lang;
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((r) => r[0].transcript)
        .join(" ");
      onResult?.(transcript);
    };

    recognition.onerror = (e) => onError?.(e);
    recognition.onend = () => onEnd?.();

    recognition.start();

    return { stop: () => recognition.stop() };
  },
};