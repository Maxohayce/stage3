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

    const handleSearch = () => {
        if (searchInput.length > 0) {
            const filtered = list.map((group) => {
                const filteredItems = group.items.filter((image) =>
                    image.imgTag.toLowerCase().includes(searchInput.toLowerCase())
                );
                return { ...group, items: filteredItems };
            });
            setFilteredImages(filtered);
        } else {
            // Clear the filtered images when the search input is empty
            setFilteredImages([]);
        }
    };

    useEffect(() => {
        // Update filtered images whenever the list or searchInput changes
        handleSearch();
    }, [list, searchInput]);

    const handleDragEnter = (e, params) => {
        e.preventDefault();
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

    return (
        <div className="gallery">
            <div className="searchBar">
                <input
                    className="search"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    type="text"
                    placeholder="Search for tag"
                />
                <button
                    className="searchButton"
                    type="button"
                    onClick={handleSearch}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="inherit">
                        <path d="M14 14L10 10M11.3333 6.66667C11.3333 9.244 9.244 11.3333 6.66667 11.3333C4.08934 11.3333 2 9.244 2 6.66667C2 4.08934 4.08934 2 6.66667 2C9.244 2 11.3333 4.08934 11.3333 6.66667Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
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
