import React, { useState } from "react";
import Page from "./components/Page";
import VkAuth from "./components/VkAuth";
import { Button } from "@mui/material";
import ImageMasonry from "./components/ImageMasonry";

function App() {
  const app_id = "51400649";
  const handleVkResponse = (data) => {
    console.warn(data);
  };
  const [images, setImages] = useState(null);
  const add_offset = () => {
    return images ? { offset: images.length } : {};
  };

  const handleClick = () => {
    window.VK.Api.call(
      "photos.get",
      {
        owner_id: window.VK._session.mid,
        v: "5.131",
        rev: 1,
        extended: 1,
        count: 50,
        album_id: "saved",
        ...add_offset(),
      },
      function (r) {
        if (r.response) {
          console.log(r.response);
          let list = r.response.items.map((item) => {
            // find max size
            item.sizes.sort((a, b) => {
              return b.width * b.height - a.width * a.height;
            });
            const targetSize = "m";
            let size = item.sizes.find((size) => size.type === targetSize);
            return {
              src: size.url,
              height: size.height,
              width: size.width,
              likes: item.likes.count,
              comments: item.comments.count,
              orig: item.sizes[0].url,
            };
          });
          console.log(list);
          if (images) {
            setImages((images) => [...images, ...list]);
          } else {
            setImages(list);
          }
        }
      }
    );
  };

  return (
    <div>
      <Page innerSx={{ px: 3, py: 1 }}>
        <VkAuth apiId={app_id} callback={handleVkResponse} settings={4} />
        {images && <ImageMasonry itemData={images} />}
        <Button variant="contained" color="primary" onClick={handleClick}>
          Test API
        </Button>
      </Page>
    </div>
  );
}

export default App;
