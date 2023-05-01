import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";

export default function InteractiveHeading(props) {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const color = isHovering ? "primary" : "initial";

  return (
    <Typography
      variant={props.variant}
      color={color}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {props.text}
    </Typography>
  );
}