import React, { useRef, useState } from 'react';
import "./gallery.css";

import ImageData from "../constants/imageData";
import Card from '../card/card';


const Gallery = () => {
    const [list, setList] = useState(data)
    const [images, setImages] = React.useState(ImageData);
    const [dragging, setDragging] = useState(false);

    const dragItem = useRef();
    const dragNode = useRef();

    const handleDragStart = (e, params) => {
        console.log("drag starting...", params)
        dragItem.current = params;
        dragNode.current = e.target;
        dragNode.current.addEventListener("dragend", handleDragStartEnd)
        setTimeout(() => {
            setDragging(true);
        }, 0);
    }

    const handleDragEnter = (e, params) => {
        console.log("Entering drag...")
        const currentItem = dragItem.current;
        if (e.target !== dragNode.current) {
            console.log("target is not the same")
            setList(oldList => {
                let newList = JSON.parse(JSON.stringify(oldList));
                newList[params.grp1].items.splice(params.item1, 0, newList[currentItem.grp1].items.splice(currentItem.item1, 1)(0))
                dragItem.current = params
                return newList
            })
        }
    }

    const handleDragEnd = () => {
        console.log("ending drag")
        setDragging(false)
        dragNode.current.removeEventListener("dragend", handleDragEnd);
        dragItem.current = null;
        dragNode.current = null;
    }


    const getStyles = (params) => {
        const currentItem = dragItem.current;
        if (currentItem.grp1 === params.grp1 && currentItem.Item1 === params.item1) {
            return "current dnd-item"
        }
        return "dnd-item"
    }

    return (
        <div className="gallery">
            <div className="dnd-group" onDragEnter={dragging && !grp.items.length ? (e) => handleDragEnter(e, { grp1, item1: 0 })}>
                <h4>First Column</h4>
                {images.map((image, index) => (

                    <div
                        draggable
                        onDragStart={(e) => { handleDragStart(e) }}
                        // onDragEnd={(e) => {handleDragEnd(e,)} }
                        onDragEnter={dragging ? (e) => { handleDragEnter(e, { grp1, item1 }) } : null}
                        key={image.id}
                        className={dragging ? getStyles() : "dnd-item"}>
                        <Card
                            src={image.img}
                            title={image.title}
                            id={image.id}
                            index={index}
                        />
                    </div>
                ))}
            </div>
            <div className="dnd-group">
                <h4>Second Column</h4>
                {images.map((image, index) => (

                    <div key={image.id} className="dnd-item">
                        <Card
                            src={image.img}
                            title={image.title}
                            id={image.id}
                            index={index}
                        />
                    </div>
                ))}
            </div>
            <div className="dnd-group">
                <h4>Third Column</h4>
                {images.map((image, index) => (

                    <div key={image.id} className="dnd-item">
                        <Card
                            src={image.img}
                            title={image.title}
                            id={image.id}
                            index={index}
                        />
                    </div>
                ))}
            </div>
            <div className="dnd-group">
                <h4>Fourth Column</h4>
                {images.map((image, index) => (

                    <div key={image.id} className="dnd-item">
                        <Card
                            src={image.img}
                            title={image.title}
                            id={image.id}
                            index={index}
                        />
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Gallery;