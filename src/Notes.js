import React, { useState } from 'react';

const Note = ({ title, content }) => {
  const [editableContent, setEditableContent] = useState(content);

  const handleContentChange = (e) => {
    setEditableContent(e.target.value);
  };

  return (
    <div className="note">
      <h3>{title}</h3>
      <textarea
        rows="4"
        cols="50"
        value={editableContent}
        onChange={handleContentChange}
      />
    </div>
  );
};

export default Note;

