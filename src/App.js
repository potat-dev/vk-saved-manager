import React, { useState, useRef, useEffect } from "react";
import Page from "./components/Page";
import { Button, Box } from "@mui/material";
// import MasonryGrid from "./components/MasonryGrid";
import Progress from "./components/Progress";

import { RateLimiter } from "limiter";
import useAuth from "./components/useAuth";
import useVK from "./components/useVK";

const MasonryGrid = React.lazy(() => import("./components/MasonryGrid"));

function App() {
  const app_id = "51400649";
  const VK = useVK({ apiId: app_id, settings: 4 });
  // const auth = useAuth({ apiId: app_id, settings: 4 });
  const limiter = new RateLimiter({
    tokensPerInterval: 1,
    interval: 400,
  });

  const targetSize = "m";
  const [images, setImages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // let loadingValue = Math.round((imagesLoaded / imagesTotal) * 100);
  const [loadingValue, setLoadingValue] = useState(0);

  // if images loaded display images only after 5 seconds
  const [displayImages, setDisplayImages] = useState(false);

  if (!isLoading && images) {
    setTimeout(() => {
      setDisplayImages(true);
    }, 5000);
  }

  const fetchImages = async () => {
    // ограничить повторное нажатие кнопки
    const data = await VK.Api("photos.get", {
      owner_id: VK.User.id,
      album_id: "saved",
      count: 0,
    });
    console.log(data.count);

    const api_calls = Math.ceil(data.count / 100);
    const imagesTotal = api_calls;
    const pages = Array.from(Array(api_calls).keys());
    console.log(pages);
    var imagesLoaded = 0;

    // create an array of promises
    const promises = pages.map(async (page) => {
      await limiter.removeTokens(1);

      const responce = await VK.Api("photos.get", {
        owner_id: VK.User.id,
        album_id: "saved",
        count: 100,
        offset: page * 100,
        extended: 1,
        rev: 1,
      });

      const images = responce.items.map((image) => {
        let size = image.sizes.find((size) => size.type === targetSize);
        image.sizes.sort((a, b) => {
          return b.width * b.height - a.width * a.height;
        });
        return {
          src: size.url,
          height: size.height,
          width: size.width,
          likes: image.likes.count,
          comments: image.comments.count,
          orig: image.sizes[0].url,
        };
      });

      // increment the count
      imagesLoaded++;
      console.log(page, "loaded");
      // force update slider value
      setLoadingValue(Math.round((imagesLoaded / imagesTotal) * 100));
      console.log(
        (imagesLoaded / imagesTotal) * 100,
        "percent",
        imagesLoaded,
        imagesTotal
      );
      return images;
    });

    // wait for all promises to resolve
    const results = await Promise.all(promises);

    // flatten the array
    // console.log("before flat");
    const images = results.flat();
    console.log(images);
    // console.log("after flat");
    setImages(images);
  };

  return (
    <div>
      <Page innerSx={{ px: 2, py: 2 }} vk={VK}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
          <Button variant="contained" color="primary" onClick={fetchImages}>
            Загрузить
          </Button>
          <Progress value={loadingValue} />
        </Box>

        {images && "Всего фотографий: " + images.length}
        {images && (
          <React.Suspense fallback={<p>Loading page...</p>}>
            <MasonryGrid itemData={images} />
          </React.Suspense>
        )}
        {/* as in this article */}
        {/* https://blog.logrocket.com/optimizing-performance-react-application/ */}
        {/* https://codesandbox.io/s/silly-ives-c03ln?file=/src/App.js */}
      </Page>
    </div>
  );
}

export default App;
