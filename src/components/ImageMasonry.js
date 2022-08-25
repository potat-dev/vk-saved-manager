import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";
import { styled } from "@mui/material/styles";
import LazyImage from "./LazyImage";

const Label = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
}));

export default function ImageMasonry(props) {
  return (
    <Box>
      <Masonry columns={{ xs: 2, md: 3, lg: 4 }} spacing={2}>
        {props.itemData.map((item, index) => (
          <div key={index}>
            <LazyImage image={item} />
            <Label>
              id: {index + 1} likes: {item.likes}, comments: {item.comments}
            </Label>
          </div>
        ))}
      </Masonry>
    </Box>
  );
}
