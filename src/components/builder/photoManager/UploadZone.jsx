import { ImagePlus, Images } from "lucide-react";
export default function UploadZone({ onUpload }) {
  const handleChange = (e) => { const files=Array.from(e.target.files || []); if(files.length) onUpload(files); e.target.value=""; };
  return <label className="mb-6 flex min-h-44 w-full cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-violet-200 bg-gradient-to-br from-violet-50/80 via-white to-cyan-50/70 p-7 text-center transition hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-md"><div className="grid h-14 w-14 place-items-center rounded-2xl bg-white shadow-md"><ImagePlus className="h-5 w-5 text-violet-600"/></div><div className="mt-4 text-sm font-extrabold text-[#2c2038]">Add your memories</div><div className="mt-1 flex items-center gap-1.5 text-xs text-[#8b7e94]"><Images className="h-3.5 w-3.5"/>Choose several photos at once</div><input hidden type="file" accept="image/*" multiple onChange={handleChange}/></label>;
}
