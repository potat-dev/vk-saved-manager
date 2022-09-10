import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";

export default function CustomRatio() {
  return (
    <Sheet
      variant="outlined"
      sx={{ width: "full", borderRadius: "md", overflow: "auto" }}
    >
      <AspectRatio ratio="2">
        <img
          src="https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800"
          srcSet="https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800&dpr=2 2x"
          alt="A beautiful landscape."
        />
      </AspectRatio>
    </Sheet>
  );
}
