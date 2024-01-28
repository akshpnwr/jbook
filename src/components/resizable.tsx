import "./resizable.css";
import React from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";

interface ResizableProps {
  direction: "horizontal" | "vertical";
  children?: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps;

  if (direction === "horizontal") {
    resizableProps = {
      className: "resize-horizontal",
      width: window.innerWidth,
      height: Infinity,
      resizeHandles: ["e"],
      maxConstraints: [window.innerWidth, Infinity],
      minConstraints: [window.innerWidth * 0.2, Infinity],
    };
  } else {
    resizableProps = {
      className: "resize-vertical",
      width: Infinity,
      resizeHandles: ["s"],
      height: 300,
      minConstraints: [Infinity, 24],
      maxConstraints: [Infinity, window.innerHeight * 0.9],
    };
  }
  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
