import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import Header from "../components/Header";
import ProgressStepper from "../components/ProgressStepper";
import Button from "../components/Button";
import { useLanguage } from "../hooks/useLanguage";
import { storageService } from "../services/storageService";
import { generateReferenceId } from "../utils/generateReferenceId";

export default function ConfirmationPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const hasSubmitted = useRef(false);

  const [submission, setSubmission] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    function goOnline() { setIsOnline(true); }
    function goOffline() { setIsOnline(false); }
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  useEffect(() => {
    // guard against double-submit from React StrictMode / re-renders
    if (hasSubmitted.current) return;

    const draft = storageService.getDraft();
    if (!draft?.category || !draft?.description) {
      navigate("/", { replace: true });
      return;
    }

    hasSubmitted.current = true;

    const record = {
      referenceId: generateReferenceId(),
      category: draft.category,
      description: draft.description,
      image: draft.image || null,
      status: "submitted",
      createdAt: Date.now(),
    };

    storageService.saveSubmission(record);

    if (!navigator.onLine) {
      storageService.queueSubmission(record);
    }

    storageService.clearDraft();
    setSubmission(record);
  }, [navigate]);

  if (!submission) return null;

  return (
    <div className="min-h-[100svh] flex flex-col bg-slate-50">
      <Header />
      <ProgressStepper currentStep="confirmation" />

      <main className="flex-1 w-full max-w-md sm:max-w-lg mx-auto px-4 pt-8 pb-10 flex flex-col items-center text-center">
        {/* micro-interaction: check mark draws itself in on mount, once, respects reduced-motion via global CSS */}
        <div className="w-16 h-16 shrink-0 rounded-full bg-emerald-50 flex items-center justify-center mb-5">
          <Check
            size={30}
            strokeWidth={2.5}
            className="text-emerald-600 animate-[check-in_0.4s_ease-out]"
          />
        </div>

        <h1 className="text-lg sm:text-xl font-semibold text-slate-900 mb-1 break-words">
          {t("confirmation.title")}
        </h1>
        <p className="text-sm text-slate-500 mb-8 break-words">
          {t("confirmation.subtitle")}
        </p>

        <div className="w-full bg-white border border-slate-200 rounded-2xl p-5 mb-3">
          <p className="text-xs text-slate-400 mb-1 break-words">
            {t("confirmation.refLabel")}
          </p>
          <p className="text-lg font-mono font-semibold text-slate-900 tracking-wide break-all">
            {submission.referenceId}
          </p>
          <p className="text-xs text-slate-400 mt-2 break-words">
            {t("confirmation.refHint")}
          </p>
        </div>

        {!isOnline && (
          <p className="text-xs text-amber-600 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 w-full break-words">
            {t("confirmation.pendingSync")}
          </p>
        )}

        <div
          className="w-full mt-8 space-y-3"
          style={{ paddingBottom: "max(0px, env(safe-area-inset-bottom))" }}
        >
          <Button variant="secondary" onClick={() => navigate("/")}>
            {t("confirmation.newReport")}
          </Button>
        </div>
      </main>
    </div>
  );
}