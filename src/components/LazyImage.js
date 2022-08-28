import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const MyImage = ({ image }) => (
  <div>
    <LazyLoadImage
      // visibleByDefault={true}
      alt="image"
      height={image.height}
      src={image.src}
      width={image.width}
      delayTime={0}
      style={{
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        display: "block",
        width: "100%",
        height: "100%",
      }}
    />
  </div>
);

export default MyImage;
