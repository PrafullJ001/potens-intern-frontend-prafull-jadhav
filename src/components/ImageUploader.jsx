import { useRef } from "react";
import { X, Camera } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import { MAX_PHOTO_DIMENSION } from "../utils/constants";

// Downscales the image via canvas before converting to base64 —
// keeps localStorage payload small and uploads bearable on slow 3G.
function downscaleImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > MAX_PHOTO_DIMENSION || height > MAX_PHOTO_DIMENSION) {
          const scale = MAX_PHOTO_DIMENSION / Math.max(width, height);
          width = Math.round(width * scale);
          height = Math.round(height * scale);
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.7));
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function ImageUploader({ image, onChange }) {
  const { t } = useLanguage();
  const inputRef = useRef(null);

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await downscaleImage(file);
      onChange(dataUrl);
    } catch {
      // silently ignore unreadable files — user can just retry
    }
    e.target.value = "";
  }

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
        {t("details.photoLabel")}{" "}
        <span className="text-slate-400 font-normal">({t("common.optional")})</span>
      </label>

      {image ? (
        <div className="relative w-full rounded-xl overflow-hidden border border-slate-200">
          <img src={image} alt="" className="w-full h-48 object-cover" />
          <button
            type="button"
            onClick={() => onChange(null)}
            aria-label={t("common.remove")}
            className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1.5 backdrop-blur-sm active:scale-90 transition-transform"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-full h-32 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-slate-300 hover:text-slate-500 transition-colors"
        >
          <Camera size={22} strokeWidth={1.75} />
          <span className="text-sm">{t("details.photoHint")}</span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFile}
        className="hidden"
      />
    </div>
  );
}