import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Flashcard from './Flashcard';

const FlashcardList = () => {
  const [flashcards, setFlashcards] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBox, setSelectedBox] = useState(null);

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://herctask-8haw.onrender.com/api/flashcards");
      const groupedFlashcards = response.data.reduce((acc, card) => {
        acc[card.box] = acc[card.box] || [];
        acc[card.box].push(card);
        return acc;
      }, {});

      setFlashcards(groupedFlashcards);
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
    <div className="container">
      <div className="box-container">
        {[1, 2, 3, 4, 5].map((box) => (
          <div
            key={box}
            className="box"
            onClick={() => setSelectedBox(selectedBox === box ? null : box)}
          >
            <h2>📦 Box {box} ({flashcards[box]?.length || 0} flashcards)</h2>
            {selectedBox === box && flashcards[box]?.length ? (
              <div>
                {flashcards[box].map((flashcard) => (
                  <Flashcard key={flashcard._id} flashcard={flashcard} onUpdate={fetchFlashcards} />
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlashcardList;
