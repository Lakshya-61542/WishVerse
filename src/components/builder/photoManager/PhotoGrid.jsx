import PhotoCard from "./PhotoCard";
export default function PhotoGrid({ photos, coverImage, onCover, onCrop, onDelete }) {
  if (!photos.length) return <div className="rounded-2xl border border-dashed border-violet-100 bg-white/60 py-14 text-center text-sm text-[#9b8fa4]">Your uploaded memories will appear here.</div>;
  return <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">{photos.map(photo=><PhotoCard key={photo.id} photo={photo} isCover={coverImage?.id===photo.id} onCover={()=>onCover(photo)} onCrop={()=>onCrop(photo.id)} onDelete={()=>onDelete(photo.id)}/>)}</div>;
}
