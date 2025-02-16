import React, { useState } from 'react';
import axios from 'axios';

const Flashcard = ({ flashcard, onUpdate }) => {
  const handleUpdate = async (correct) => {
    try {
      await axios.put(`/api/flashcards/${flashcard._id}`, { correct });
      onUpdate();
    } catch (err) {
      console.error("Error updating flashcard:", err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/flashcards/${flashcard._id}`);
      onUpdate();
    } catch (err) {
      console.error("Error deleting flashcard:", err);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow bg-gray-50 flex flex-col items-center space-y-3 transition-transform transform hover:scale-105">
      <p className="text-lg font-medium text-center text-gray-900">{flashcard.question}</p>
      <div className="flex space-x-3">
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition-all" onClick={() => handleUpdate(true)}>✅ Got it right</button>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600 transition-all" onClick={() => handleUpdate(false)}>❌ Got it wrong</button>
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition-all" onClick={handleDelete}>🗑 Delete</button>
      </div>
    </div>
  );
};
export default Flashcard;
