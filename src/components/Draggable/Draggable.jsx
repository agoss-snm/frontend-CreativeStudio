import React from "react";
import Draggable from "react-draggable";

const DraggableComponent = ({ children, onDrag, onDragStop }) => {
  return (
    <Draggable onDrag={onDrag} onStop={onDragStop}>
      {children}
    </Draggable>
  );
};

export default DraggableComponent;