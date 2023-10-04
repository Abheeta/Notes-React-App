import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Note from './Notes';
import Pagination from './Pagination';
import StickyNote from './StickyNote';
import Modal from 'react-bootstrap/Modal';



import './StickyNote.css'; // Import your CSS file

const PinnedNote = ({ pinnedNote, psetCurrentPage,  pcurrentPage, setCurrentPage }) => {
  const [show, setShow] = useState(false);
  const [editableContent, setEditableContent] = useState(pinnedNote.content);
  const [lastEditTime, setLastEditTime] = useState(new Date().toLocaleString());
  const [originalContent, setOriginalContent] = useState(pinnedNote.content);
  const [createTitle, setCreateTitle] = useState(pinnedNote.title);
  const [createContent, setCreateContent] = useState(pinnedNote.content);
  const [isHovered, setIsHovered] = useState(false);
  const [editable, setEditable] = useState(false);
  
  const handleEditClick = (e) => {
    e.stopPropagation();
    setShow(true);
    setEditable(true);
    console.log("Edit");
  };

  const handleUnpinClick = (e) => {
    e.stopPropagation();
    updateNote({pinned: false}); 
    

  }

  const handleClose = () => {
    setShow(false);
    if (originalContent !== editableContent) {
        // Update the last edit time only if the content has changed
        setOriginalContent(editableContent); // Update the originalContent on modal close
      setLastEditTime(new Date().toLocaleString());

      }
  };

  const updateNote = (update) => {
      fetch(`/api/notes/${pinnedNote._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(update), 
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);

        if(update.title){

          setShow(false);
          setCurrentPage(-1);
          
        } else {

          psetCurrentPage(-1);
          setCurrentPage({value: pcurrentPage});
          

        }
        
      })
      ;
    
  }
  const handleSave = () => {

    updateNote({title: createTitle, content: createContent}); 

  }

  const handleGridClick = (e) => {
    setShow(true);
    setEditable(false);
  }

  const handleDeleteClick = (e) => {
    e.stopPropagation();
      fetch(`/api/notes/${pinnedNote._id}`, {
        method: "DELETE"
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        let pageno = pcurrentPage;
        psetCurrentPage({value: pcurrentPage});

      })

  }

  const handleContentChange = (e) => {
    setEditableContent(e.target.value);
  };

  return (
    <>
      <div className="note" onClick={(e) => handleGridClick(e)}>
         {/* Date and last edit time */}
         <div className="note-info top-right">
         <button onClick={handleUnpinClick}><img width="20" height="20" src="https://img.icons8.com/ios/50/pin--v1.png" alt="pin--v1"/></button>
          <button  onClick={handleEditClick}><img width="20" height="20" src="https://img.icons8.com/ios/50/edit--v1.png" alt="edit--v1"/></button>
          <button onClick={handleDeleteClick}><img width="20" height="20" src="https://img.icons8.com/ios-glyphs/30/filled-trash.png" alt="filled-trash"/></button>
         <p className="last-edit-time"> {new Date(pinnedNote.updatedAt).toLocaleDateString()}</p>
          <p className="last-edit-time"> {new Date(pinnedNote.updatedAt).toLocaleTimeString()}</p>
          
          {/* <p className="note-date">{new Date().toLocaleString()}</p> */}
        </div>
        <h3>{pinnedNote.title}</h3>
        <p>{pinnedNote.content}</p>
      </div>

      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{editable ? (<input type="text" value={createTitle} onChange={(e) => setCreateTitle(e.target.value)} />) : (<b>{createTitle}</b>)}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editable ? (
          <textarea
            className="editable-content"
            value={createContent}
            onChange={(e) => setCreateContent(e.target.value)}
          />
          ) : (<p>{createContent}</p>)}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PinnedNote;
