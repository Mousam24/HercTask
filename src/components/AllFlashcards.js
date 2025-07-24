import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Flashcard from './Flashcard';
import '../App.css'; // Adjusted import path

const AllFlashcards = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://herctask-8haw.onrender.com/api/flashcards");
      setFlashcards(response.data);
    } catch (err) {
      setError(err);
      console.error("Error fetching flashcards:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading-message">Loading flashcards...</div>;
  if (error) return <div className="error-message">Error: {error.message}</div>;

  return (
    <div className="all-flashcards-vertical">
      {flashcards.map((flashcard) => (
        <Flashcard key={flashcard._id} flashcard={flashcard} onUpdate={fetchFlashcards} />
      ))}
    </div>
  );
};

export default AllFlashcards;
