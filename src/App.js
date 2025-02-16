import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Add Routes, Route, Link
import FlashcardList from './components/FlashcardList';
import AllFlashcards from './components/AllFlashcards';

import axios from 'axios';
import './App.css';

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [showFlashcards, setShowFlashcards] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/flashcards', { question, answer });
      setQuestion('');
      setAnswer('');
    } catch (error) {
      console.error("Error adding flashcard:", error);
    }
  };

  const toggleFlashcards = () => {
    setShowFlashcards(!showFlashcards);
  };

  return (
    <Router>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Routes>
        <Route path="/all-flashcards" element={<AllFlashcards />} />          <Route path="/flashcard-boxes" element={<FlashcardList />} />
          <Route path="/" element={
            <div className="box">
              <form onSubmit={handleSubmit}>
                <div>
                  <label>Question:</label>
                  <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Answer:</label>
                  <input
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    required
                  />
                </div>
                <button type="submit">Add Flashcard</button>
              </form>
              <Link to="/flashcard-boxes" className="toggle-button">
                Go to Flashcard Boxes
              </Link>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
