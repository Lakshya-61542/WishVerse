import { useState } from "react";
import Cropper from "react-easy-crop";

export default function CropModal({

    photo,
    onClose,
    onSave,

}) {

    const [crop, setCrop] = useState({
        x:0,
        y:0,
    });

    const [zoom, setZoom] = useState(1);

    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">

            <div className="w-[650px] rounded-3xl bg-zinc-900 p-8">

                <div className="relative h-[420px] overflow-hidden rounded-2xl">

                    <Cropper

                        image={photo.preview}

                        crop={crop}

                        zoom={zoom}

                        aspect={1}

                        cropShape="round"

                        showGrid={false}

                        onCropChange={setCrop}

                        onZoomChange={setZoom}

                        onCropComplete={(_, pixels)=>{

                            setCroppedAreaPixels(pixels);

                        }}

                    />

                </div>

                <input

                    className="mt-8 w-full"

                    type="range"

                    min={1}

                    max={3}

                    step={0.1}

                    value={zoom}

                    onChange={(e)=>setZoom(Number(e.target.value))}

                />

                <div className="mt-8 flex justify-end gap-4">

                    <button

                        onClick={onClose}

                        className="rounded-xl bg-white/10 px-6 py-3 text-white"

                    >

                        Cancel

                    </button>

                    <button

                        onClick={()=>onSave(croppedAreaPixels)}

                        className="rounded-xl bg-violet-600 px-6 py-3 text-white"

                    >

                        Save Crop

                    </button>

                </div>

            </div>

        </div>

    );

}