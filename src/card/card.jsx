import React from "react";
import "./card.css";

const Card = ({ src, title, tag }) => {

    return (
        <div className="card">
            <img src={src} alt={title} />
            <p>{tag}</p>
        </div>
    );
}


export default Card;