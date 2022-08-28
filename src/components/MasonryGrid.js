import React from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import LazyImage from "./LazyImage";

import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";

export default function MasonryGrid(props) {
  return (
    <Box>
      <ImageList
        sx={{
          height: 400,
          transform: "translateZ(0)",
        }}
        cols={3}
        gap={8}
        rowHeight={200}
      >
        {props.itemData.map((item) => (
          <ImageListItem key={item.img}>
            <a href={item.orig} target="_blank">
              {/* <LazyImage image={item} /> */}
              <img
                src={item.src}
                alt={item.src}
                loading="lazy"
                style={{ width: "100%", height: 150, objectFit: "cover"  }}
              />
            </a>
            <ImageListItemBar
              position="below"
              title={
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <FavoriteBorderRoundedIcon fontSize="small" /> {item.likes}
                  <ChatBubbleOutlineRoundedIcon fontSize="small" />{" "}
                  {item.comments}
                </Box>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

// export default function TitlebarBelowMasonryImageList() {
//   return (
//     <Box sx={{ width: 500, height: 450, overflowY: 'scroll' }}>
//       <ImageList variant="masonry" cols={3} gap={8}>
//         {itemData.map((item) => (
//           <ImageListItem key={item.img}>
//             <img
//               src={`${item.img}?w=248&fit=crop&auto=format`}
//               srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
//               alt={item.title}
//               loading="lazy"
//             />
//             <ImageListItemBar position="below" title={item.author} />
//           </ImageListItem>
//         ))}
//       </ImageList>
//     </Box>
//   );
// }
