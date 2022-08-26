import React, { useState, useRef, useEffect } from "react";
import Page from "./components/Page";
import { Button, Box, Avatar } from "@mui/material";
import ImageMasonry from "./components/ImageMasonry";

import useAuth from "./components/useAuth";
import useOnScreen from "./components/useOnScreen";

function App() {
  const app_id = "51400649";
  const auth = useAuth({ apiId: app_id, settings: 4 });

  const btnRef = useRef(null);
  const isOnScreen = useOnScreen(btnRef);

  useEffect(() => {
    if (isOnScreen) {
      handleClick();
    }
  } , [isOnScreen]);

  const [images, setImages] = useState(null);
  const add_offset = () => {
    return images ? { offset: images.length } : {};
  };

  const handleClick = () => {
    if (!auth.signedIn) return;
    window.VK.Api.call(
      "photos.get",
      {
        owner_id: auth.user.id,
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
      <Page innerSx={{ pl: 2, py: 2 }}>
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

        {images && <ImageMasonry itemData={images} />}
        <Button ref={btnRef} variant="contained" color="primary" onClick={handleClick}>
          Загрузить
        </Button>
      </Page>
    </div>
  );
}

export default App;
