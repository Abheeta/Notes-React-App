import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Note from './Notes';
import Pagination from './Pagination';
import StickyNote from './StickyNote';
import Modal from 'react-bootstrap/Modal';





const App = () => {


  const notesPerPage = 6;
  const [notes, setNotes] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [show, setShow] = useState(false);
  const [createTitle, setCreateTitle] = useState("");
  const [createContent, setCreateContent] = useState("");


  useEffect(()=>{
    if(typeof currentPage!=="number"){
      setCurrentPage(currentPage.value);
    }
    else if(currentPage < 0) setCurrentPage(1);
    else {
    fetch(`/api/notes?page=${currentPage}&pinned=${false}`)
    .then(res => res.json())
    .then(data =>
      { 
        console.log(data);
        setNotes(data.notes);
        setTotalPages(data.totalPages);
      })
    }
  }, [currentPage])

  const handleCreate = () => {
    setCreateContent("");
    setCreateTitle("");
    setShow(true);

  }

  const handleSave = () => {
    fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: createTitle,
        content: createContent,
        pinned: false
      }), 
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setShow(false);
      setCurrentPage(-1);
      
      
    })
    ;
    
  };

  

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  return (
    <div className="container">
      <div className="note-grid">
        {notes.map((note, index) => (
          <StickyNote key={index} note={note} setCurrentPage={setCurrentPage} currentPage={currentPage} />
        ))}
      </div>

      <Modal show={show} onHide={() => setShow(false)} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title><input type="text" value={createTitle} onChange={(e) => setCreateTitle(e.target.value)} /></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            className="editable-content"
            value={createContent}
            onChange={(e) => setCreateContent(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
        </Modal.Footer>
      </Modal>


      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />



      <button onClick={() => handleCreate()} >Create</button>
    </div>


  );
};

export default App;
