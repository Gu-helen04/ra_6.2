import RenderNote from "./RenderNote";
import PreLoader from "./Loader";
import { addNote, removeNote, refresh } from "./FetchApi";

import { useState, useEffect } from "react";

export default function CRUD() {
    const [noteText, setNoteText] = useState({content: ''});
    const [preloader, setPreloader] = useState(false)
    const [notes, setNotes] = useState([]);

    const apiURL = 'https://ra-crud-backend.onrender.com/';

    const refreshFunction = () => {
        setPreloader(true);

        refresh(apiURL).then((result) => {
            setNotes(() => result);
            setPreloader(false);
        });
    }

    useEffect(() => {
        refreshFunction();
    }, []);

    const handleChange = (e) => {
        const { value } = e.target;
        setNoteText((prevText => ({...prevText, content: value})));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        await addNote(apiURL, noteText);
  
        refreshFunction();

        setNoteText({content: ''});
    };

    const handleClickRefresh = () => {
        refreshFunction();
    };

    const handleClickRemove = async (apiURL, id) => {
        await removeNote(apiURL, id);
        refreshFunction();
    };

    return (
        <div className="CRUD-container">
            <div className="notes-container">
                <div className="notes-container-header">
                    <h2 className="notes-container-title">NOTES</h2>
                    <button className="notes-container-btn" onClick={handleClickRefresh}>
                        &#11118;
                    </button>
                    {preloader ? <PreLoader /> : null}
                </div>
                <div className="notes-container-body">
                    {notes.map(item => <RenderNote key={item.id} apiURL={apiURL} body={item} handleClickRemove={handleClickRemove}/>)}
                </div>
            </div>
            <form className="CRUD-form" onSubmit={handleSubmit}>
                <span className="form-title">New note</span>
                <textarea className="form-input" value={noteText.content} required onChange={handleChange}>

                </textarea>
                <button className="form-btn">
                    &#10148;
                </button>
            </form>
        </div>
    )
}