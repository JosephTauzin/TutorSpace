import React, { useRef, useEffect, useState } from "react";

const Canvas = ({ text = "Hey bro what is up", width = 500, height = 500, onImageURLChange }) => {
  const canvasRef = useRef(null);
  const [imageURL, setImageURL] = useState();
    console.log("canvas.js: ", text);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = "12px Georgia";
    context.fillText(text, 10, 90);

    let url = canvas.toDataURL('image/png')
    setImageURL(url);
    onImageURLChange(url);  // calling the function passed as prop
  }, [text, onImageURLChange]);

  return <canvas ref={canvasRef} width={width} height={height} />;
};

export default Canvas;