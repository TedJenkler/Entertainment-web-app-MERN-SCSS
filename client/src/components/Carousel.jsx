import { useEffect, useRef, useState } from "react";
import settings from '../assets/images/settings.png';
import bookmark from '../assets/images/Bookmark.png';
import favorite from '../assets/images/like.png';
import { useDispatch, useSelector } from "react-redux";
import { addBookmark } from "../features/bookmark/bookmarkSlice";
import { addFavorite } from "../features/favorite/favoriteSlice";

const Carousel = ({ data, h1 }) => {
    const carouselRef = useRef(null);
    const menuRef = useRef(null);
    const [menu, setMenu] = useState(null);
    const dispatch = useDispatch();
    const userid = useSelector((state) => state.auth.user?.tmdbid);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenu(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);

    const scrollLeft = () => {
        carouselRef.current.scrollBy({
            left: -window.innerWidth - 335,
            behavior: 'smooth'
        });
    };

    const scrollRight = () => {
        carouselRef.current.scrollBy({
            left: window.innerWidth - 335,
            behavior: 'smooth'
        });
    };

    const handleMenu = (id) => {
        setMenu(prevMenu => (prevMenu === id ? null : id));
    };

    const handleBookmark = (id, media_type) => {
        dispatch(addBookmark({ userid, media_id: id, media_type }));
    };

    const handleFavorite = (id, media_type) => {
        dispatch(addFavorite({ userid, media_id: id, media_type }));
    };

    return (
        <section className="carousel-section">
            <h1 className="carousel-header">{h1}</h1>
            <div className="carousel">
                <button className="carousel-button prev" onClick={scrollLeft}>
                    ‹
                </button>
                <div className="carousel-container" ref={carouselRef}>
                    {data.map((card, index) => (
                        <div className="card" key={index} ref={menu === card.id ? menuRef : null}>
                            <div className="settings">
                                <img onClick={() => handleMenu(card.id)} src={settings} alt="settings" />
                            </div>
                            {menu === card.id ? (
                                <div className="card_menu">
                                    <div onClick={() => handleBookmark(card.id, card.media_type)}>
                                        <img src={bookmark} alt="bookmark" />
                                        <p>bookmark</p>
                                    </div>
                                    <div onClick={() => handleFavorite(card.id, card.media_type)}>
                                        <img src={favorite} alt="favorite" />
                                        <p>favorite</p>
                                    </div>
                                </div>
                            ) : (
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${card.poster_path}`}
                                    alt={card.title}
                                />
                            )}
                            <h3 className="card-title">{card.title || card.name}</h3>
                        </div>
                    ))}
                </div>
                <button className="carousel-button next" onClick={scrollRight}>
                    ›
                </button>
            </div>
        </section>
    );
};

export default Carousel;