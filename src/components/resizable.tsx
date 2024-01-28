import "./resizable.css";
import React, { useState } from "react";
import { ResizableBox } from "react-resizable";

interface ResizableProps {
  direction: "horizontal" | "vertical";
  children?: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  return (
    <ResizableBox
      width={Infinity}
      height={300}
      resizeHandles={["s"]}
      handleSize={[10, 10]}
      maxConstraints={[Infinity, window.innerHeight * 0.9]}
    >
      {children}
    </ResizableBox>
  );
};

export default Resizable;
