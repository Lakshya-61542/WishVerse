import getCroppedImg from "../../utils/cropImage";
import Cropper from "react-easy-crop";
import { useState } from "react";

export default function ImageCropper({
  image,
  setCroppedAreaPixels,

}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setLocalCroppedAreaPixels] =
  useState(null);

  return (
    <div className="w-full">

      <div className="relative h-[400px] w-full overflow-hidden rounded-2xl bg-black">

        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={1}
          cropShape="round"
          showGrid={false}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={(_, croppedPixels) => {
  setLocalCroppedAreaPixels(croppedPixels);
  setCroppedAreaPixels(croppedPixels);
}}
        />

      </div>

      <div className="mt-6">

        <label className="mb-2 block text-white">
          Zoom
        </label>

        <input
          type="range"
          min={1}
          max={3}
          step={0.1}
          value={zoom}
          onChange={(e) => setZoom(e.target.value)}
          className="w-full"
        />

        <div className="mt-6 flex gap-4">

  <button
  type="button"
  onClick={async () => {
    const cropped = await getCroppedImg(
      image,
      croppedAreaPixels
    );

    
  }}
  className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white"
>
  Save Crop
</button>

  <button
    type="button"
    className="rounded-xl bg-white/10 px-6 py-3 font-semibold text-white"
  >
    Reset
  </button>

</div>

      </div>

    </div>
  );

}