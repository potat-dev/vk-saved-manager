import * as React from "react";
import Box from "@mui/material/Box";
import Masonry from "@mui/lab/Masonry";
import { styled } from "@mui/material/styles";
import LazyImage from "./LazyImage";

import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";

const Label = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  alignItems: "center",
  color: theme.palette.text.secondary,
  borderBottomLeftRadius: 8,
  borderBottomRightRadius: 8,
  display: "flex",
  gap: 3,
}));

export default function ImageMasonry(props) {
  return (
    <Box>
      <Masonry columns={{ xs: 2, md: 3, lg: 4 }} spacing={2} sx={{ pr: 0 }}>
        {props.itemData.map((item, index) => (
          <div key={index}>
            <LazyImage image={item} />
            <Label>
              <FavoriteBorderRoundedIcon fontSize="small" /> {item.likes}
              <ChatBubbleOutlineRoundedIcon fontSize="small" /> {item.comments}
            </Label>
          </div>
        ))}
      </Masonry>
    </Box>
  );
}
