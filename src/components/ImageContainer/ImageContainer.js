import React from "react";
import "./ImageContainer.css";

const ImageContainer = (props) => {
    return (
        <img src = {props.imgsrc} onClick={props.onClick} className="image-container" />
    );
};

export default ImageContainer;