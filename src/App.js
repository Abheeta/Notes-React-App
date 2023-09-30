import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Note from './Notes';
import Pagination from './Pagination';
import StickyNote from './StickyNote';




const App = () => {
  const notesData = [
    {
      title: "Note 1",
      content: "This is the content of Note 1."
    },
    {
      title: "Note 2",
      content: "This is the content of Note 2."
    },
    {
      title: "Note 3",
      content: "This is the content of Note 3."
    },
  
    {
      title: "Note 4",
      content: "This is the content of Note 3."
    },
    {
      title: "Note 5",
      content: "This is the content of Note 3."
    },
    {
      title: "Note 6",
      content: "This is the content of Note 3."
    },
    {
      title: "Note 7",
      content: "This is the content of Note 3."
    },
    {
      title: "Note 8",
      content: "This is the content of Note 3."
    },
    {
      title: "Note 9",
      content: "This is the content of Note 3."
    },
    // Add more note objects as needed
  ];
  const notesPerPage = 6;

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(notesData.length / notesPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = notesData.slice(indexOfFirstNote, indexOfLastNote);

  return (
    <div className="container">
      <div className="note-grid">
        {currentNotes.map((note, index) => (
          <StickyNote key={index} title={note.title} content={note.content} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default App;
