import getCroppedImage from "../../../utils/getCroppedImage";
import CropModal from "./CropModal";
import { useState } from "react";
import { Camera } from "lucide-react";

import UploadZone from "./UploadZone";
import PhotoGrid from "./PhotoGrid";

export default function PhotoManager({

    images,
    setImages,

    coverImage,
    setCoverImage,

}) {

  const [selectedPhoto, setSelectedPhoto] = useState(null);

 const handleUpload = (files) => {

  const uploaded = files.map((file) => ({
    id: crypto.randomUUID(),
    file,
    preview: URL.createObjectURL(file),
    cropped: null,
  }));

  const next = [...images, ...uploaded];

  setImages(next);

  if (!coverImage?.id && next.length) {
    setCoverImage(next[0])
  }
};

  const handleDelete = (id) => {

    const updated = images.filter(photo => photo.id !== id);

    setImages(updated);

    if (coverImage?.id === id) {
    setCoverImage(updated.length ? updated[0] : null);
}

  };

  return (

    <>
      <div className="mb-8"><div className="builder-kicker"><Camera className="h-3.5 w-3.5"/> Your memories</div><h1 className="builder-title">Build the visual story</h1><p className="builder-subtitle">Upload the moments that matter most. Pick a cover photo and crop anything that needs a closer frame.</p></div>

      <UploadZone
        onUpload={handleUpload}
      />

      <PhotoGrid
  photos={images}
  coverImage={coverImage}
  onCover={setCoverImage}
  onCrop={(id) => {
    const photo = images.find((p) => p.id === id);
    setSelectedPhoto(photo);
  }}
  onDelete={handleDelete}
/>


{selectedPhoto && (
  <CropModal
    photo={selectedPhoto}
    onClose={() => setSelectedPhoto(null)}
    onSave={async (pixels) => {

    const cropped = await getCroppedImage(
        selectedPhoto.preview,
        pixels
    );

    setImages((prev)=>

        prev.map((photo)=>

            photo.id===selectedPhoto.id

            ? {
                ...photo,
                cropped,
              }

            : photo

        )

    );

    setSelectedPhoto(null);

}}
  />
)}
    </>

  );

}