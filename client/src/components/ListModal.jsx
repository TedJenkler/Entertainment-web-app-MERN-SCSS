import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userLists } from '../features/list/listslice';

function ListModal() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const lists = useSelector((state) => state.list.lists);
    const mediaData = useSelector((state) => state.list.modalData);
    console.log(mediaData)

    useEffect(() => {
        if (user?.tmdbid) {
            dispatch(userLists({ account_id: user.tmdbid }));
        }
    }, [dispatch, user]);

    return (
        <section className="list-modal">
            <header className="list-modal-header">
                <h1>Add “{mediaData.name || mediaData.title}” to lists</h1>
            </header>
            <div className="list-modal-content">
                <div className="list-modal-container">
                    <header className="list-modal-container-header">
                        <h2>Select lists</h2>
                        <button className="list-modal-new-list-button">+ New list</button>
                    </header>
                    <div className="list-modal-display">
                        {lists && lists.map((item) => (
                            <label className="list-item" key={item.id}>
                                <input defaultChecked={item.mediaid.includes(mediaData.id)} type="checkbox" />
                                <p>{item.name}</p>
                            </label>
                        ))}
                    </div>
                </div>
                <button className="list-modal-add-button">
                    Add To Lists
                </button>
            </div>
        </section>
    );
}

export default ListModal;