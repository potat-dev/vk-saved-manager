import React, { useState } from "react";
import Page from "./components/Page";
import { Button, Box, Avatar } from "@mui/material";
import MasonryGrid from "./components/MasonryGrid";
import Progress from "./components/Progress";

import { RateLimiter } from "limiter";
import useAuth from "./components/useAuth";

function App() {
  const app_id = "51400649";
  const auth = useAuth({ apiId: app_id, settings: 4 });
  const limiter = new RateLimiter({
    tokensPerInterval: 1,
    interval: 400,
  });

  const targetSize = "m";
  const [images, setImages] = useState(null);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [imagesTotal, setImagesTotal] = useState(0);
  const loadingValue = Math.round((imagesLoaded / imagesTotal) * 100);

  // turn the function into a promise
  // * WORKS * //
  const apiCall = (method, payload) => {
    return new Promise((resolve, reject) => {
      window.VK.Api.call(method, { ...payload, v: "5.131" }, (data) => {
        if (data.response) {
          resolve(data.response);
        } else {
          reject(data);
        }
      });
    });
  };

  const fetchImages = async () => {
    // ограничить повторное нажатие кнопки
    const data = await apiCall("photos.get", {
      owner_id: auth.user.id,
      album_id: "saved",
      count: 0,
    });
    console.log(data.count);

    const api_calls = Math.ceil(data.count / 100);
    setImagesTotal(api_calls);
    const pages = Array.from(Array(api_calls).keys());
    console.log(pages);

    // create an array of promises
    const promises = pages.map(async (page) => {
      await limiter.removeTokens(1);

      const responce = await apiCall("photos.get", {
        owner_id: auth.user.id,
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
      setImagesLoaded((count) => count + 1);
      return images;
    });

    // wait for all promises to resolve
    const results = await Promise.all(promises);
    console.log(results);

    // flatten the array
    const images = results.flat();
    console.log(images);
    setImages(images);
  };

  return (
    <div>
      <Page innerSx={{ px: 2, py: 2 }}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
          {auth.signedIn ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                auth.signOut();
                setImages(null);
              }}
            >
              Выйти
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={auth.signIn}>
              Войти
            </Button>
          )}

          {auth.signedIn && auth.user && (
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              Вы вошли как {auth.user.name} {auth.user.surname}
              <Avatar
                alt={auth.user.name + " " + auth.user.surname}
                src={auth.user.photo}
                sx={{ height: 36, width: 36 }}
              />
            </Box>
          )}
        </Box>

        <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
          <Button variant="contained" color="primary" onClick={fetchImages}>
            Загрузить
          </Button>
        </Box>

        {images && "Всего фотографий: " + images.length}
        <Progress value={loadingValue} />

        {images && <MasonryGrid itemData={images} />}
      </Page>
    </div>
  );
}

export default App;
