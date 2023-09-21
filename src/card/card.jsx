import React from "react";
import "./card.css";

const Card = ({ src, title }) => {

    return (
        <div className="card">
            <img src={src} alt={title} />
        </div>
    );
}


export default Card;