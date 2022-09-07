import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import LazyImage from "./LazyImage";

import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";

export default function MasonryGrid(props) {
  // wait 5 seconds before loading images

  return (
    <Box>
      <ImageList
        sx={{
          height: 500,
          transform: "translateZ(0)",
        }}
        cols={3}
        gap={8}
      >
        {props.itemData.map((item) => (
          <ImageListItem key={item.img}>
            <a href={item.orig} target="_blank">
              {/* <LazyImage image={item} /> */}
              <img
                src={item.src}
                alt={item.src}
                loading="lazy"
                style={{ width: "100%", height: 150, objectFit: "cover" }}
              />
            </a>
            <ImageListItemBar
              position="below"
              title={
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                    alignContent: "center",
                  }}
                >
                  <FavoriteBorderRoundedIcon fontSize="small" />
                  {item.likes + " "}
                  <ChatBubbleOutlineRoundedIcon fontSize="small" />
                  {" " + item.comments}
                </Box>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}
