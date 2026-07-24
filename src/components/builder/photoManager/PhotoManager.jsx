import getCroppedImage from "../../../utils/getCroppedImage";
import CropModal from "./CropModal";
import { useState } from "react";

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