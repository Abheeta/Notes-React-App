import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import './StickyNote.css'; // Import your CSS file

const StickyNote = ({ title, content }) => {
  const [show, setShow] = useState(false);
  const [editableContent, setEditableContent] = useState(content);
  const [lastEditTime, setLastEditTime] = useState(new Date().toLocaleString());
  const [originalContent, setOriginalContent] = useState(content);


  
  const handleGridClick = () => {
    setShow(true);
  };


  const handleClose = () => {
    setShow(false);
    if (originalContent !== editableContent) {
        // Update the last edit time only if the content has changed
        setOriginalContent(editableContent); // Update the originalContent on modal close
      setLastEditTime(new Date().toLocaleString());


      }
  };
//   const handleShow = () => setShow(true);

  const handleContentChange = (e) => {
    setEditableContent(e.target.value);
  };

  return (
    <>
      <div className="note" onClick={handleGridClick}>
         {/* Date and last edit time */}
         <div className="note-info top-right">
          {lastEditTime && (
            <p className="last-edit-time"> {lastEditTime}</p>
          )}
          {/* <p className="note-date">{new Date().toLocaleString()}</p> */}
        </div>
        <h3>{title}</h3>
        <p>{content}</p>
      </div>

      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            className="editable-content"
            value={editableContent}
            onChange={handleContentChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={handleClose}>
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default StickyNote;
