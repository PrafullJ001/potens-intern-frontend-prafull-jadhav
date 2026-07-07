export function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function timeAgo(timestamp, lang = "en") {
  const diffMs = Date.now() - timestamp;
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return lang === "mr" ? "आत्ताच" : "just now";
  if (mins < 60) return lang === "mr" ? `${mins} मिनिटांपूर्वी` : `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return lang === "mr" ? `${hrs} तासांपूर्वी` : `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return lang === "mr" ? `${days} दिवसांपूर्वी` : `${days}d ago`;
}