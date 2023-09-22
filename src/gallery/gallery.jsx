import { useRef, useState, useEffect } from 'react';
import './gallery.css';

import ImageData from '../constants/imageData';
import Card from '../card/card';

const Gallery = () => {
    const [list, setList] = useState(ImageData);
    const [dragging, setDragging] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [filteredImages, setFilteredImages] = useState([]);

    const dragItem = useRef();
    const dragNode = useRef();

    useEffect(() => {
        // Update filtered images whenever the list changes
        if (searchInput.length > 0) {
            const filtered = list.filter((group) => {
                return group.items.some((image) => {
                    return image.imgTag.toLowerCase().includes(searchInput.toLowerCase());
                });
            });
            setFilteredImages(filtered);
        } else {
            setFilteredImages([]);
        }
    }, [list, searchInput]);

    const handleDragEnter = (e, params) => {
        console.log('Entering drag...');
        const currentItem = dragItem.current;
        if (e.target !== dragNode.current) {
            console.log('target is not the same');
            setList((oldList) => {
                const newList = JSON.parse(JSON.stringify(oldList));
                const { grp1, img1 } = params;
                const { grp1: currentGroup, img1: currentImage } = currentItem;
                const imageToMove = newList[currentGroup].items[currentImage];

                newList[currentGroup].items.splice(currentImage, 1);
                newList[grp1].items.splice(img1, 0, imageToMove);

                dragItem.current = params;
                return newList;
            });
        }
    };

    const handleDragStart = (e, params) => {
        e.stopPropagation();
        console.log('drag starting...', params);
        dragItem.current = params;
        dragNode.current = e.target;
        dragNode.current.addEventListener('dragend', handleDragEnd);
        setTimeout(() => {
            setDragging(true);
        }, 0);
    };

    const handleDragEnd = () => {
        console.log('ending drag');
        setDragging(false);
        dragNode.current.removeEventListener('dragend', handleDragEnd);
        dragItem.current = null;
        dragNode.current = null;
    };

    const getStyles = (params) => {
        const currentItem = dragItem.current;
        if (currentItem && currentItem.grp1 === params.grp1 && currentItem.img1 === params.img1) {
            return 'current dnd-item';
        }
        return 'dnd-item';
    };

    const handleSearch = (e) => {
        setSearchInput(e.target.value);
    };

    return (
        <div className="gallery">
            <input
                className="search"
                value={searchInput}
                onChange={handleSearch}
                type="text"
                placeholder="Search for tag"
            />
            <div className="dnd-area">
                {(searchInput.length === 0 || filteredImages.length === 0) ? (
                    list.map((grp, grp1) => (
                        <div
                            key={grp.title}
                            className="dnd-group"
                            onDragEnter={
                                dragging && !grp.items.length
                                    ? (e) => handleDragEnter(e, { grp1, img1: 0 })
                                    : null
                            }
                        >
                            <h4>{grp.title}</h4>
                            {grp.items?.map((image, img1) => (
                                <div
                                    draggable
                                    onDragStart={(e) => {
                                        handleDragStart(e, { grp1, img1 });
                                    }}
                                    onDragEnter={
                                        dragging ? (e) => handleDragEnter(e, { grp1, img1 }) : null
                                    }
                                    key={grp.title + image.id}
                                    className={dragging ? getStyles({ grp1, img1 }) : 'dnd-item'}
                                >
                                    <Card src={image.img} title={image.title} id={image.id} />
                                </div>
                            ))}
                        </div>
                    ))
                ) : (
                    filteredImages.map((grp, grp1) => (
                        <div
                            key={grp.title}
                            className="dnd-group"
                            onDragEnter={
                                dragging && !grp.items.length
                                    ? (e) => handleDragEnter(e, { grp1, img1: 0 })
                                    : null
                            }
                        >
                            <h4>{grp.title}</h4>
                            {grp.items?.map((image, img1) => (
                                <div
                                    draggable
                                    onDragStart={(e) => {
                                        handleDragStart(e, { grp1, img1 });
                                    }}
                                    onDragEnter={
                                        dragging ? (e) => handleDragEnter(e, { grp1, img1 }) : null
                                    }
                                    key={grp.title + image.id}
                                    className={dragging ? getStyles({ grp1, img1 }) : 'dnd-item'}
                                >
                                    <Card src={image.img} title={image.title} id={image.id} />
                                </div>
                            ))}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Gallery;
