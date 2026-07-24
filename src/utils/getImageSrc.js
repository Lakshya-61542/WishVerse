export default function getImageSrc(image) {

  if (!image) return "";

  // Published website (string)
  if (typeof image === "string") {
    return image;
  }

  // Published website (object)
  if (image.url) {
    return image.url;
  }

  // Builder
  if (image.cropped) {
    return image.cropped;
  }

  if (image.preview) {
    return image.preview;
  }

  return "";

}