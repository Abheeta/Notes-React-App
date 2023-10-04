import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import './StickyNote.css'; // Import your CSS file

const StickyNote = ({ note, setCurrentPage,  currentPage, psetCurrentPage }) => {
  const [show, setShow] = useState(false);
  const [editableContent, setEditableContent] = useState(note.content || "");
  const [lastEditTime, setLastEditTime] = useState(new Date().toLocaleString());
  const [originalContent, setOriginalContent] = useState(note.content || "");
  const [createTitle, setCreateTitle] = useState(note.title);
  const [createContent, setCreateContent] = useState(note.content || "");
  const [isHovered, setIsHovered] = useState(false);
  const [editable, setEditable] = useState(false);
  
  const handlePinClick = (e) => {
    e.stopPropagation();
    updateNote({pinned: true}); 
    

  }
  
  const handleEditClick = (e) => {
    e.stopPropagation();
    setShow(true);
    setEditable(true);
    console.log("Edit");
  };


  const handleClose = () => {
    setShow(false);
    if (originalContent !== editableContent) {
        // Update the last edit time only if the content has changed
        setOriginalContent(editableContent); // Update the originalContent on modal close
      setLastEditTime(new Date().toLocaleString());

      }
  };

  const updateNote = (update) => {
      fetch(`/api/notes/${note._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(update), 
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if(update.pinned){
          psetCurrentPage(-1);
          setCurrentPage({value: currentPage});
        } else {
          setShow(false);
          setCurrentPage(-1);

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
      fetch(`/api/notes/${note._id}`, {
        method: "DELETE"
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        let pageno = currentPage;
        setCurrentPage({value: currentPage});

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
         <button onClick={handlePinClick}><img width="20" height="20" src="https://img.icons8.com/ios/50/pin--v1.png" alt="pin--v1"/></button>
          <button  onClick={handleEditClick}><img width="20" height="20" src="https://img.icons8.com/ios/50/edit--v1.png" alt="edit--v1"/></button>
          <button onClick={handleDeleteClick}><img width="20" height="20" src="https://img.icons8.com/ios-glyphs/30/filled-trash.png" alt="filled-trash"/></button>
         <p className="last-edit-time"> {new Date(note.updatedAt).toLocaleDateString()}</p>
          <p className="last-edit-time"> {new Date(note.updatedAt).toLocaleTimeString()}</p>
          
          {/* <p className="note-date">{new Date().toLocaleString()}</p> */}
        </div>
        <h3>{note.title}</h3>
        <p>{note.content}</p>
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

export default StickyNote;
