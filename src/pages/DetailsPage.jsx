import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ProgressStepper from "../components/ProgressStepper";
import DescriptionInput from "../components/DescriptionInput";
import ImageUploader from "../components/ImageUploader";
import Button from "../components/Button";
import { useLanguage } from "../hooks/useLanguage";
import { storageService } from "../services/storageService";
import VoiceRecorder from "../components/VoiceRecorder";

export default function DetailsPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const draft = storageService.getDraft() || {};

  const [description, setDescription] = useState(draft.description || "");
  const [image, setImage] = useState(draft.image || null);

  // redirect back if no category chosen (e.g. direct URL visit)
  if (!draft.category) {
    navigate("/", { replace: true });
    return null;
  }

  function persistDraft(updates) {
    storageService.saveDraft({ ...storageService.getDraft(), ...updates });
  }

  function handleDescriptionChange(value) {
    setDescription(value);
    persistDraft({ description: value });
  }

  function handleImageChange(value) {
    setImage(value);
    persistDraft({ image: value });
  }

  function handleNext() {
    if (!description.trim()) return;
    persistDraft({ description, image });
    navigate("/confirmation");
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <ProgressStepper currentStep="details" />

      <main className="flex-1 max-w-md w-full mx-auto px-4 pt-2 pb-28">
        <h1 className="text-xl font-semibold text-slate-900 mb-1">
          {t("details.title")}
        </h1>
        <p className="text-sm text-slate-500 mb-6">{t("details.subtitle")}</p>

        <div className="space-y-6">
          <DescriptionInput value={description} onChange={handleDescriptionChange} />
          <VoiceRecorder
            onTranscript={(transcript) => {
              const merged = description
                ? `${description} ${transcript}`
                : transcript;
              handleDescriptionChange(merged.slice(0, 500));
            }}
          />
          <ImageUploader image={image} onChange={handleImageChange} />
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-100 p-4">
        <div className="max-w-md mx-auto flex gap-3">
          <Button variant="secondary" onClick={() => navigate(-1)} className="w-auto px-5">
            {t("common.back")}
          </Button>
          <Button onClick={handleNext} disabled={!description.trim()}>
            {t("common.next")}
          </Button>
        </div>
      </div>
    </div>
  );
}