import React from "react";

const VideoCard = ({ data }) => {
  return (
    <div className="flex justify-center">
      <iframe
        className="w-full h-auto aspect-video"
        src={data}
        width="150"
        height="100"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoCard;
