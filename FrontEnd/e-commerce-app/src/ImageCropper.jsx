import React, { useState } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "./getCroppedImg";

const ImageCropper = ({ image, onCropComplete }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const handleCropComplete = async (croppedArea, croppedAreaPixels) => {
    const croppedImage = await getCroppedImg(image, croppedAreaPixels);
    onCropComplete(croppedImage);
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "400px" }}>
      <Cropper
        image={image}
        crop={crop}
        zoom={zoom}
        aspect={1}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={handleCropComplete}
      />
    </div>
  );
};

export default ImageCropper;
